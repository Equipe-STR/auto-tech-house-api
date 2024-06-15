document.addEventListener('DOMContentLoaded', (e) => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = 'index.html';
    }
})