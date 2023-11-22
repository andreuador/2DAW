document.addEventListener('DOMContentLoaded', (event) => {
    let name = document.getElementById("nom");
    let surname = document.getElementById("cognoms");
    let address = document.getElementById("adreça");
    let email = document.getElementById("email");
    let companyName = document.getElementById("nom-empresa");
    let dni = document.getElementById("dni");
    let password = document.getElementById("password");
    let phone = document.getElementById("mobil");
    let cif = document.getElementById("cif");
    let nif = document.getElementById("manager-nif");

    let form = document.getElementById("form-control");
    let camps = document.querySelectorAll(".form-group");
    let errorMessage = document.getElementById('errorMessage');
    let successMessage = document.getElementById('successMessage');
    let modalCorrect = document.getElementById('modal-correct');
    let modalIncorrect = document.getElementById('modal-incorrect-email');
    let modalPwd = document.getElementById('modal-incorrect-pwd');
    let closeModal = document.querySelectorAll('.close')[0];
    let closeModalEmail = document.querySelectorAll('.close-email')[0];
    let closeModalPwd = document.querySelectorAll('.close-pwd')[0];

    eventsRatoli(name);

    camps.forEach(text => {
        text.addEventListener('mousemove', () => {
            text.classList.add('hovered');
        });

        text.addEventListener('mouseout', () => {
            text.classList.remove('hovered');
        });
    });

    name.addEventListener('input', (event) => {
        validarCamps(name);
        console.log(name.value);
    });

    surname.addEventListener('input', (event) => {
        validarCamps(surname);
        console.log(surname.value);
    });

    address.addEventListener('input', (event) => {
        validarCamps(address);
        console.log(address.value);
    });

    email.addEventListener('input', (event) => {
        validarCamps(email);
        console.log(email.value);
    });

    companyName.addEventListener('input', (event) => {
        validarCamps(companyName);
        console.log(companyName.value);
    });

    dni.addEventListener('input', (event) => {
        ValidDNI();
        console.log(dni.value);
    });

    password.addEventListener('input', (event) => {
        validarCamps(password);
        console.log(password.value);
    });

    phone.addEventListener('input', (event) => {
        validarCamps(phone);
        console.log(phone.value);
    });

    cif.addEventListener('input', (event) => {
        validarCamps(cif);
        console.log(cif.value);
    });

    nif.addEventListener('input', (event) => {
        validarCamps(nif);
        console.log(nif.value);
    });

    function validarCamps(data) {
        if (data.validity.patternMismatch || data.value === "") {
            data.classList.remove('valid');
            data.classList.add('invalid');
        }
        else {
            data.classList.remove('invalid');
            data.classList.add('valid');
        }
    }

    function eventsRatoli(inputElement) {
        inputElement.addEventListener('mouseover', function () {
            inputElement.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
        });
    
        inputElement.addEventListener('mouseout', function () {
            inputElement.style.backgroundColor = ''; // Restaurar el color de fondo original
        });
    }

    function ValidDNI() {
        let dni = document.getElementById("dni").value;
        let dniLetters = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X",
            "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

        let dniN = dni.substr(0, 8);
        let dniL = dni.substr(8, 9);

        let residuo = dniN % 23
        dniKey = dniLetters[residuo];

        if (dniL == dniKey)
            return true

        return false
    }
});