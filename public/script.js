var botaoLimparHis = document.querySelector("#limpar-historico")
botaoLimparHis.addEventListener('click', function(e){
    var table = document.querySelector('#historico')
    var tam = ((table.rows.length)-1)
    e.preventDefault();
    
    while (tam > 0) {
        table.deleteRow(tam);
        tam--;
    }
})


const primariaAtivada =document.querySelector('#primaria-ativada');
const primariaDesativada = document.querySelector('#primaria-desativada');
const secundariaAtivada = document.querySelector('#secundaria-ativada');
const secundariaDesativada = document.querySelector('#secundaria-desativada');
const statusBaterias = document.querySelector('#status-baterias').children;
statusBaterias[0].style.color = "green";
statusBaterias[1].style.color = "black";

function n(){}

function alternarBateriaPrimaria() {
    secundariaAtivada.style.display = "none";
    secundariaDesativada.style.display = "block";
    primariaDesativada.style.display = "none";
    primariaAtivada.style.display = "block";

    statusBaterias[0].style.color = "green";
    statusBaterias[1].style.color = "black";
}

function alternarBateriaSecundaria(){
    primariaAtivada.style.display = "none";
    primariaDesativada.style.display = "block";
    secundariaDesativada.style.display = "none";
    secundariaAtivada.style.display = "block";

    statusBaterias[1].style.color = "green";
    statusBaterias[0].style.color = "black";
}
var incendioFuncionando = true
const botaoIncedio = document.querySelector("#incendio-button");
botaoIncedio.addEventListener("click", function (e){
    e.preventDefault();
    if (incendioFuncionando){
        incendioFuncionando = false
        botaoIncedio.innerHTML = "DESLIGADO";
        botaoIncedio.style.backgroundColor = "#FD002E";
    }
    else{
        incendioFuncionando = true
        botaoIncedio.innerHTML = "LIGADO";
        botaoIncedio.style.backgroundColor = "#04328C";
    }
})
var alarmeFuncionando = true
const botaoAlarme = document.querySelector("#alarme-button");
botaoAlarme.addEventListener("click", function (e){
    e.preventDefault();
    if (alarmeFuncionando){
        alarmeFuncionando = false
        botaoAlarme.innerHTML = "DESLIGADO";
        botaoAlarme.style.backgroundColor = "#FD002E";
    }
    else{
        alarmeFuncionando = true
        botaoAlarme.innerHTML = "LIGADO";
        botaoAlarme.style.backgroundColor = "#04328C";
    }
})
function clickHome(e) {
    e.preventDefault();
    document.getElementById("home").style.display = "grid";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("login").style.display = "none";
}
function clickSobre(e) {
    e.preventDefault();
    document.getElementById("home").style.display = "none";
    document.getElementById("sobre").style.display = "block";
    document.getElementById("login").style.display = "none";
}
function clickLogin(e) {
    e.preventDefault();
    document.getElementById("home").style.display = "none";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("login").style.display = "block";
}
document.getElementById("botao-home").addEventListener("click", clickHome);
document.getElementById("botao-sobre").addEventListener("click", clickSobre);

function addCard(nomeEvento) {
    // Seleciona a tabela
    var table = document.querySelector('#historico');
    // Insere uma nova linha no final da tabela
    var newRow = table.insertRow(1);
    // Insere novas células na linha
    var hora = newRow.insertCell(0);
    var evento = newRow.insertCell(1);
    var data = newRow.insertCell(2);
    var now = new Date();
    // Adiciona o conteúdo às células
    hora.innerHTML = now.toLocaleTimeString();
    evento.innerHTML = nomeEvento;
    data.innerHTML =  now.toLocaleDateString();
}
var alarmeIntervalId;
function ativarAlarme(){
    console.log('passou aqui')
    addCard("Alarme iniciado")
    const elemento = document.getElementById("alarme-texto")
    elemento.innerHTML = "ALARME ATIVADO"
    alarmeIntervalId = setInterval(alterarCorAlarme, 100);
}
var alarmeColorido = false
function alterarCorAlarme(){
    const elemento = document.getElementById("alarme-texto")
    if (alarmeColorido) {
        alarmeColorido= false
        document.getElementById("sirene-ativada").style.display = 'none'
        document.getElementById("sirene-desativada").style.display = 'block'
        elemento.style.color = "#000000"
    }
    else{
        alarmeColorido= true
        document.getElementById("sirene-ativada").style.display = 'block'
        document.getElementById("sirene-desativada").style.display = 'none'
        elemento.style.color = "#ff0000"
    }
}

var incendioIntervalId;
function ativarIncendio(){
    addCard("Incendio iniciado")
    const elemento = document.getElementById("incendio-texto")
    elemento.innerHTML = "INCÊNDIO DETECTADO"
    incendioIntervalId = setInterval(alterarCorIncendio, 100);
}

var incendioColorido = false
function alterarCorIncendio(){
    const elemento = document.getElementById("incendio-texto")
    if (incendioColorido) {
        incendioColorido= false
        document.getElementById("fogo-ativado").style.display = 'none'
        document.getElementById("fogo-desativado").style.display = 'block'
        elemento.style.color = "#000000"
    }
    else{
        incendioColorido= true
        document.getElementById("fogo-ativado").style.display = 'block'
        document.getElementById("fogo-desativado").style.display = 'none'
        elemento.style.color = "#ff0000"
    }
}

function desativarAlarme(){
    const elemento = document.getElementById("alarme-texto")
    clearInterval(alarmeIntervalId);
    document.getElementById("sirene-ativada").style.display = 'none'
    document.getElementById("sirene-desativada").style.display = 'block'
    elemento.style.color = "#000000"
    elemento.innerHTML = "Sem detecção"
    addCard("Alarme terminado")
}

function desativarIncendio(){
    const elemento = document.getElementById("incendio-texto")
    document.getElementById("fogo-ativado").style.display = 'none'
    document.getElementById("fogo-desativado").style.display = 'block'
    elemento.style.color = "#000000"
    elemento.innerHTML = "Sem detecção"
    clearInterval(incendioIntervalId);
    addCard("Incendio terminado")
}

const socket = new WebSocket('ws://localhost:8080/');

socket.onopen = () => {
  console.log('Conexão estabelecida.');
  socket.send('Olá, servidor!');
};

socket.onmessage = (event) => {
  ativarAlarme()
};

socket.onclose = () => {
  console.log('Conexão fechada.');
};
