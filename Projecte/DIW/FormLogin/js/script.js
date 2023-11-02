'use strict';

function main() {
    let form = document.getElementById("form-control");
    let errorMessage = document.getElementById("errorMessage");
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let submitButton = document.querySelector('#submit');

    validarCampos(username, 'Campo obligatorio');
    validarCampos(password, 'Campo obligatorio');

    username.addEventListener('input', function() {
        username.value = username.value.replace(/\s/g, ''); // Eliminar espacios en blanco
    });

    // Agregar evento de escucha al campo de contraseña para evitar espacios en blanco
    password.addEventListener('input', function() {
        password.value = password.value.replace(/\s/g, ''); // Eliminar espacios en blanco
    });

    function validarCampos(campo, mensaje) {
        campo.addEventListener('input', () => {
            campo.setCustomValidity('');
            campo.checkValidity();
        });

        campo.addEventListener('invalid', () => {
            campo.setCustomValidity(mensaje);
        });
    }

    function validarPassword() {
        let passwordValue = password.value;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_\.])[A-Za-z\d\-_\.]+$/;

        if (passwordRegex.test(passwordValue)) {
            errorMessage.textContent = "";
            submitButton.disabled = false; // Habilitar el botón de iniciar sesión
            console.log("boto activat");
        } else {
            errorMessage.textContent = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo especial (-_.).";
            submitButton.disabled = true; // Deshabilitar el botón de iniciar sesión
            console.log("boto desactivat");
        }
    }

    // Agregar evento de escucha al campo de contraseña para validarla en tiempo real
    password.addEventListener('input', validarPassword);

    function validateForm(event) {
        // Obtener el valor de usuario y contraseña
        let usernameValue = username.value;
        let passwordValue = password.value;
    
        // Expresión regular para verificar que no haya acentos en el usuario y la contraseña
        let accentsRegex = /[áéíóúÁÉÍÓÚ]/;
        
        // Expresión regular para verificar espacios en blanco
        let spaceRegex = /\s/;
    
        let isValid = true;
    
        // Validar usuario y contraseña
        if (accentsRegex.test(usernameValue)) {
            event.preventDefault();
            errorMessage.textContent = "El usuario no puede contener acentos.";
            isValid = false;
        } else if (spaceRegex.test(usernameValue)) {
            event.preventDefault();
            errorMessage.textContent = "El usuario no puede contener espacios en blanco.";
            isValid = false;
        } else if (accentsRegex.test(passwordValue)) {
            event.preventDefault();
            errorMessage.textContent = "La contraseña no puede contener acentos.";
            isValid = false;
        } else if (spaceRegex.test(passwordValue)) {
            event.preventDefault();
            errorMessage.textContent = "La contraseña no puede contener espacios en blanco.";
            isValid = false;
        } else {
            errorMessage.textContent = ""; // Limpiar el mensaje de error si no hay errores
        }
    
        // Devolver isValid para usarlo en otro lugar si es necesario
        return isValid;
    }
    form.addEventListener("submit", validateForm);
    
}

document.addEventListener('DOMContentLoaded', main);