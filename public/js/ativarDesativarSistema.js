var incendioFuncionando = true
const botaoIncedio = document.querySelector("#incendio-button");
botaoIncedio.addEventListener("click", function (e){
    e.preventDefault();
    if (incendioFuncionando){
        desligarIncendio()
    }
    else{
        ligarIncendio()
    }
})

function configurarFuncionamentoIncendio(incendioAtivarBool) {
    function desligarFuncionamentoIncendio(){
        incendioFuncionando = false
        botaoIncedio.innerHTML = "DESLIGADO";
        botaoIncedio.style.backgroundColor = "#FD002E";
    }
    function ligarFuncionamentoIncendio(){
        incendioFuncionando = true
        botaoIncedio.innerHTML = "LIGADO";
        botaoIncedio.style.backgroundColor = "#04328C";
    }
    if (incendioAtivarBool) {
        ligarFuncionamentoIncendio()
    }
    else{
        desligarFuncionamentoIncendio()
    }
}

var alarmeFuncionando = true
const botaoAlarme = document.querySelector("#alarme-button");
botaoAlarme.addEventListener("click", function (e){
    e.preventDefault();
    if (alarmeFuncionando){
        desligarAlarme()
    }
    else{
        ligarAlarme()
    }
})

function configurarFuncionamentoAlarme(alarmeAtivarBool) {
    function desligarFuncionamentoAlarme(){
        alarmeFuncionando = false
        botaoAlarme.innerHTML = "DESLIGADO";
        botaoAlarme.style.backgroundColor = "#FD002E";
    }
    function ligarFuncionamentoAlarme(){
        alarmeFuncionando = true
        botaoAlarme.innerHTML = "LIGADO";
        botaoAlarme.style.backgroundColor = "#04328C";
    }
    if (alarmeAtivarBool) {
        ligarFuncionamentoAlarme()
    }
    else{
        desligarFuncionamentoAlarme()
    }
}