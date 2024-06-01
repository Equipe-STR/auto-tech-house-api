import { wss } from '../app';
import 'express-async-errors';
import { sendEmail } from '../utils/sendEmail';
import WebSocket, { WebSocketServer, WebSocket as wsType } from 'ws';

wss.on('connection', (ws: wsType) => {
  console.log('Cliente conectado via WebSocket');

  ws.on('message', (message: string) => {
      console.log(message.toString());
      sendEmail(process.env.MAIL_DEST, 'Disparo de sensor', 'sua casa foi invadida', '<b>sua casa foi invadida</b>')
      .then(messageId => console.log(`E-mail enviado com sucesso, ID: ${messageId}`))
      .catch(error => console.error(`Erro ao enviar e-mail: ${error}`));
      wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
          }
      });
  });

  ws.on('close', () => {
      console.log('Cliente desconectado');
  });
});
