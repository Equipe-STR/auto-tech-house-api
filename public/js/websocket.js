const socket = new WebSocket(`ws://${config.BASE_URL}/`);
socket.onopen = () => {
  console.log('Conexão estabelecida.');
  socket.send('{"status": "conexao"}');
};

socket.onmessage = (event) => {
    const status = JSON.parse(event.data)
    console.log(status)
    configurarFuncionamentoAlarme(status['alarmeFuncionando'])
    configurarFuncionamentoIncendio(status['incendioFuncionando'])
    configurarAtivacaoSireneAlarme(status['alarme'])
    configurarAtivacaoSireneIncendio(status['incendio'])
    configurarFonte(status['fonte'])
    configurarConexaoESP(status['espConectado'])

};

socket.onclose = () => {
  console.log('Conexão fechada.');
};

function ligarAlarme() {
    socket.send('{"status": "trocaAtivação", "alarmeFuncionando": true}');
}
function desligarAlarme() {
    socket.send('{"status": "trocaAtivação", "alarmeFuncionando": false}');
}
function ligarIncendio() {
    socket.send('{"status": "trocaAtivação", "incendioFuncionando": true}');
}
function desligarIncendio() {
    socket.send('{"status": "trocaAtivação", "incendioFuncionando": false}');
}
