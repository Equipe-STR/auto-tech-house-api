function configurarConexaoESP(ativarConexao) {
    function ativarConexaoESP(){
        const labelESP = document.querySelector('#statusESP')
        labelESP.innerHTML = "CASA CONECTADA"
        labelESP.style.backgroundColor = "#04328C";
    }
    
    function desativarConexaoESP(){
        const labelESP = document.querySelector('#statusESP')
        labelESP.innerHTML = "CASA DESCONECTADA"
        labelESP.style.backgroundColor = "#FD002E";
    }
    if (ativarConexao) {
        ativarConexaoESP()
    }else{
        desativarConexaoESP()
    }
}