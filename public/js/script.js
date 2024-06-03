function clickHome(e) {
    e.preventDefault();
    document.getElementById("home").style.display = "grid";
    document.getElementById("sobre").style.display = "none";
}
function clickSobre(e) {
    e.preventDefault();
    document.getElementById("home").style.display = "none";
    document.getElementById("sobre").style.display = "block";
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

