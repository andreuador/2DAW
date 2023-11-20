'use strict';
function main() {

    // Variables
    let nameInput = document.getElementById("nom");
    let surnameInput = document.getElementById("cognoms");
    let emailInput = document.getElementById("email");
    let pwdInput = document.getElementById("password");
    let dniInput = document.getElementById("dni");
    let phoneInput = document.getElementById("mobil");
    let cifInput = document.getElementById("cif");
    let nifInput = document.getElementById("manager-nif");
    let addressInput = document.getElementById("adreça");

    let form = document.getElementById("form");
    let errorMessage   = document.getElementById('errorMessage');
    let successMessage = document.getElementById('successMessage');

    // Expressions
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.])[A-Za-z\d-_.]{8,}$/;
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    const phoneRegex = /^[0-9]{9}$/;
    const cifRegex = /^[A-HJNP-SUW][0-9]{7}[0-9A-J]$/;

    // Funcions
    validarCamps(nameInput, 'Camp obligatori');
    validarCamps(surnameInput, 'Camp obligatori');
    validarCamps(emailInput, 'Camp obligatori');
    validarCamps(pwdInput, 'Camp obligatori');
    validarCamps(dniInput, 'Camp obligatori');
    validarCamps(phoneInput, 'Camp obligatori');
    validarCamps(cifInput, 'Campo obligatori');
    validarCamps(nifInput, 'Camp Obligatori');

    eventsRatoli(nameInput);
    eventsRatoli(surnameInput);
    eventsRatoli(emailInput);
    eventsRatoli(pwdInput);
    eventsRatoli(dniInput);
    eventsRatoli(phoneInput);
    eventsRatoli(cifInput);
    eventsRatoli(nifInput);
    eventsRatoli(addressInput);

    form.addEventListener('submit', function(event) {
        let name = nameInput.value;
        let surname = surnameInput.value;
        let email = emailInput.value;
        let pwd = pwdInput.value;
        let dni = dniInput.value;
        let phone = phoneInput.value;
        let cif = cifInput.value;
        let nif = nifInput.value;
    
        let isValid = true;
    
        if (!nameRegex.test(name) || !nameRegex.test(surname)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nom o cognoms incorrectes'
            });
            isValid = false;
        } else if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correu electrònic incorrecte'
            });
            isValid = false;
        } else if (!pwdRegex.test(pwd)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_'
            });
            isValid = false;
        } else if (!dniRegex.test(dni)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'DNI incorrecte'
            });
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Numero de mòbil incorrecte'
            });
            isValid = false;
        } /*else if (!cifRegex.test(cif)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CIF incorrecte'
            });
            isValid = false;
        }*/ else if (!dniRegex.test(nif)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'NIF incorrecte'
            });
            isValid = false;
        }
    
        if (isValid) {
            // Todas las validaciones son correctas, puedes mostrar el mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Registre completat',
                text: '¡Registre completat amb éxit!'
            });
        } else {
            event.preventDefault();
        }
    });
       

    function validarCamps(camps, missatge) {
        // Agrega un event d'escolta al camp d'entrada de texto per al event "input".
        camps.addEventListener('input', () => {

            // Establece un mensaje de validación personalizado en blanco.
            camps.setCustomValidity('');

            // Verificar el campo de entrada de texto. Si el campo está vacío y es obligatorio, esta función devolverá "false". Si el campo contiene texto, devolverá "true".
            camps.checkValidity();

            // Añadir o quitar clases CSS según la validez del campo
            if (camps.checkValidity()) {
                camps.classList.remove('invalid');
                camps.classList.add('valid');
            } else {
                camps.classList.remove('valid');
                camps.classList.add('invalid');
            }
        });

        // Agrega un event d'escolta al camp d'entrada de texto para el evento "invalid".
        camps.addEventListener('invalid', () => {

            // Esta línea establece un mensaje de validación personalizado que indica al usuario que debe completar el campo.
            camps.setCustomValidity(missatge);
        });
    }

    function eventsRatoli(inputElement) {
        inputElement.addEventListener('mouseover', function () {
            inputElement.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
        });
    
        inputElement.addEventListener('mouseout', function () {
            inputElement.style.backgroundColor = ''; // Restaurar el color de fondo original
        });
    }

}

document.addEventListener('DOMContentLoaded', main);
