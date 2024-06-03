var alarmeIntervalId = -1;
function ativarAlarme(){
    const elemento = document.getElementById("alarme-texto")
    elemento.innerHTML = "ALARME ATIVADO"
    if (alarmeIntervalId==-1) {
        alarmeIntervalId = setInterval(alterarCorAlarme, 100);
    }
    carregarDados()
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

function desativarAlarme(){
    const elemento = document.getElementById("alarme-texto")
    clearInterval(alarmeIntervalId);
    alarmeIntervalId = -1
    document.getElementById("sirene-ativada").style.display = 'none'
    document.getElementById("sirene-desativada").style.display = 'block'
    elemento.style.color = "#000000"
    elemento.innerHTML = "Sem detecção"
    carregarDados()
}

function configurarAtivacaoSireneAlarme(ligarSireneAlarmeBool) {
    if (ligarSireneAlarmeBool) {
        ativarAlarme()
    }
    else{
        desativarAlarme()
    }
}
