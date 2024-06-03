var incendioIntervalId=-1;
function ativarIncendio(){
    const elemento = document.getElementById("incendio-texto")
    elemento.innerHTML = "INCÊNDIO DETECTADO"
    if (incendioIntervalId==-1) {
        incendioIntervalId = setInterval(alterarCorIncendio, 100);
    }
    carregarDados()
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

function desativarIncendio(){
    const elemento = document.getElementById("incendio-texto")
    document.getElementById("fogo-ativado").style.display = 'none'
    document.getElementById("fogo-desativado").style.display = 'block'
    elemento.style.color = "#000000"
    elemento.innerHTML = "Sem detecção"
    clearInterval(incendioIntervalId);
    incendioIntervalId = -1
    carregarDados()
}

function configurarAtivacaoSireneIncendio(ligarSireneIncendioBool) {
    if (ligarSireneIncendioBool) {
        ativarIncendio()
    }
    else{
        desativarIncendio()
    }
}