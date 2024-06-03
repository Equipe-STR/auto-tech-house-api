const primariaAtivada =document.querySelector('#primaria-ativada');
const primariaDesativada = document.querySelector('#primaria-desativada');
const secundariaAtivada = document.querySelector('#secundaria-ativada');
const secundariaDesativada = document.querySelector('#secundaria-desativada');
const statusBaterias = document.querySelector('#status-baterias').children;
statusBaterias[0].style.color = "green";
statusBaterias[1].style.color = "black";

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

function configurarFonte(fonteUsada) {
    if (fonteUsada==1) {
        alternarBateriaPrimaria()
    }
    else{
        alternarBateriaSecundaria()
    }
}
