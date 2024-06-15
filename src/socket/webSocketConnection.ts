import { wss } from '../app';
import 'express-async-errors';
import { sendEmail } from '../utils/sendEmail';
import WebSocket, { WebSocketServer, WebSocket as wsType } from 'ws';
import { Message } from './dtos/Message';
import { Status } from './dtos/Status';
import { alarmeAtivadoBanco, alarmeDesativadoBanco, incendioAtivadoBanco, incendioDesativadoBanco } from './cadastrarAlarme';

const status: Status = {
    alarme: false,
    alarmeFuncionando: true,
    incendio: false,
    incendioFuncionando: true,
    fonte: 1, // primária,
    espConectado: false,
};

function espalharParaTodosClientes(ws: wsType, message: string){
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
    });
}

function enviarEmail(texto:string){
    sendEmail(process.env.MAIL_DEST, 'Alerta Detectado', `<b>${texto}</b>`, `<b>${texto}</b>`)
    .then(messageId => console.log(`E-mail enviado com sucesso, ID: ${messageId}`))
    .catch(error => console.error(`Erro ao enviar e-mail: ${error}`));
}

function trocaAtivacao(parsedMessage:Message, ws: wsType){
    if ('alarmeFuncionando' in parsedMessage) {
        status['alarmeFuncionando'] = parsedMessage['alarmeFuncionando']
        console.log(JSON.stringify(status))
        espalharParaTodosClientes(ws, JSON.stringify(status))
    }
    if ('incendioFuncionando' in parsedMessage) {
        status['incendioFuncionando'] = parsedMessage['incendioFuncionando']
        console.log(JSON.stringify(status))
        espalharParaTodosClientes(ws, JSON.stringify(status))
    }
    return
}

function conexaoESP(parsedMessage:Message, ws: wsType){
    console.log("ESP CONECTADO");
    status['espConectado'] = true
    if ('alarme' in parsedMessage) {
        if (parsedMessage['alarme'] && status['alarme']!=parsedMessage['alarme']) {
            enviarEmail("ALARME FOI DETECTADO")
            alarmeAtivadoBanco()
        }
        if (!parsedMessage['alarme'] && status['alarme']!=parsedMessage['alarme']) {
            alarmeDesativadoBanco()
        }
        status['alarme'] = parsedMessage['alarme']
    }
    if ('incendio' in parsedMessage) {
        if (parsedMessage['incendio'] && status['incendio']!=parsedMessage['incendio']) {
            enviarEmail("INCENDIO FOI DETECTADO")
            incendioAtivadoBanco()
        }
        if (parsedMessage['incendio'] && status['incendio']!=parsedMessage['incendio']) {
            enviarEmail("INCENDIO FOI DETECTADO")
            incendioDesativadoBanco()
        }
        status['incendio'] = parsedMessage['incendio']
    }
    if ('fonte' in parsedMessage) {
        status['fonte'] = parsedMessage['fonte']
    }
    espalharParaTodosClientes(ws, JSON.stringify(status));
}

wss.on('connection', (ws: wsType) => {
    var conectionESP = false
    let epsTimeout: NodeJS.Timeout | null = null;
    console.log('Cliente conectado via WebSocket');
    ws.on('message', (message: string) => {   
        try {
            const parsedMessage:Message = JSON.parse(message.toString());
            if (parsedMessage['status']=='conexaoESP') {
                clearTimeout(epsTimeout);
                conexaoESP(parsedMessage, ws)
                conectionESP = true
                epsTimeout = setTimeout(() => {
                    if (status.espConectado) {
                        console.log("ESP DESCONECTADO POR TIMEOUT");
                        status.espConectado = false;
                        status.alarme=false;
                        status.incendio = false;
                        status.fonte = 1;
                        espalharParaTodosClientes(ws, JSON.stringify(status));
                    }
                }, 30000);
            }
            if (parsedMessage['status']=='conexao') {
                espalharParaTodosClientes(ws, JSON.stringify(status))
                return
            }
            if (parsedMessage['status']=='trocaAtivação') {
                trocaAtivacao(parsedMessage, ws)
            }
        }
        catch (error){
            console.log(`Erro ao processar a mensagem: ${error}`);
            ws.send(JSON.stringify({ error: 'Formato de mensagem inválido' }));
        }
    });
    
    ws.on('close', () => {
        if (conectionESP) {
            console.log("ESP DESCONECTADO");
            status['espConectado'] = false
            espalharParaTodosClientes(ws, JSON.stringify(status))
            return
        }
        console.log('Cliente desconectado');
    });
});
