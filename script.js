const validate = () => {
    let forms = document.querySelectorAll('.needs-validation');
    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            // Limpar todos os itens do localStorage após o clique no botão "Salvar"
            if (form.checkValidity()) {
                limparLocalStorage();
            }
        });
    });
};

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
        return false;
    return true;
}

document.getElementById('cpf').addEventListener('blur', function() {
    const cpfInput = this.value;
    const isValidCPF = validarCPF(cpfInput);
    if (!isValidCPF) {
        this.classList.remove('is-valid'); // Removemos a classe 'is-valid' se o CPF for inválido
        this.classList.add('is-invalid'); // Adicionamos a classe 'is-invalid' para destacar que o CPF é inválido
    } else {
        this.classList.remove('is-invalid'); // Removemos a classe 'is-invalid' se o CPF for válido
        this.classList.add('is-valid'); // Adicionamos a classe 'is-valid' para indicar que o CPF é válido
    }
});

window.addEventListener('load', () => {
    const campos = ['nome', 'surname', 'birthday', 'profission', 'cpf', 'email', 'password', 'telefone', 'address'];

    campos.forEach(campo => {
        const value = localStorage.getItem(campo);
        if (value) {
            document.getElementById(campo).value = value;
        }
    });

    validate();
});

document.addEventListener('change', (event) => {
    if (event.target.matches('.form-control')) {
        const { id, value } = event.target;
        localStorage.setItem(id, value);
    }
});

function limparLocalStorage() {
    localStorage.clear();
}
