function configurarConexaoESP(ativarConexao) {
    function ativarConexaoESP(){
        const labelESP = document.querySelector('#statusESP')
        labelESP.innerHTML = "ESP CONECTADO"
        labelESP.style.backgroundColor = "#04328C";
    }
    
    function desativarConexaoESP(){
        const labelESP = document.querySelector('#statusESP')
        labelESP.innerHTML = "ESP DESCONECTADO"
        labelESP.style.backgroundColor = "#FD002E";
    }
    if (ativarConexao) {
        ativarConexaoESP()
    }else{
        desativarConexaoESP()
    }
}