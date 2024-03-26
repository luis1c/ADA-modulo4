const validate = () => {
    let forms = document.querySelectorAll('.needs-validation');
    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
};

function salvarNome(){
    const nome = document.getElementById('nome').value;
    localStorage.setItem('nome', nome);
    
}

function mostrarNome(){
    const nome = localStorage.getItem('nome');
    alert(`Nome armazenado: ${nome}`);
}

function limparNome(){
    localStorage.removeItem('nome');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const nome = localStorage.getItem('nome');
    if (nome) {
        document.getElementById('formularioExemplo').value = name;
    }
});

window.addEventListener('load', validate);