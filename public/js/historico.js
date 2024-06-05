function carregarDados() {
    fetch(`http://${config.BASE_URL}/sensorsReading/`, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer "+localStorage.getItem('token')
        }})
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('table');
            table.innerHTML = `<tr>
                <th>Data</th>
                <th>Nome</th>
                <th>Valor</th>
            </tr>`;
            data.forEach(item => {
                const formattedDate = new Date(item.date).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${item.name}</td>
                    <td>${item.read}</td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => alert("Primeiro faça o login")
    );
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
});

var botaoLimparHis = document.querySelector("#limpar-historico")
botaoLimparHis.addEventListener('click', function(e){
    fetch(`http://${config.BASE_URL}/sensorsReading/`, {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer "+localStorage.getItem('token')
        }
    }).then(response => response.json());
    carregarDados();
})