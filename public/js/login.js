document.addEventListener('DOMContentLoaded', (e) => {
    const token = localStorage.getItem('token');
    if(token){
        window.location.href = 'home.html';
    }
})


document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Fazer uma requisição assíncrona para verificar as credenciais
    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            return Promise.reject('EMAIL OU SENHA ERRADOS');
        }
    }).then(data => {
        localStorage.setItem('token', data);
        window.location.href = 'home.html';
    }).catch(error => {
        console.log(error);
        alert('EMAIL OU SENHA ERRADOS');
    });
});
