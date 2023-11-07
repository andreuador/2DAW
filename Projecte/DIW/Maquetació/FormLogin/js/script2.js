'use strict';
function main() {

    username.addEventListener('input', function() {
        username.value = username.value.replace(/\s/g, ''); // Eliminar espacios en blanco
        if (!usernameRegex.test(username.value)) {
            errorMessage.textContent = "El nombre de usuario debe tener al menos una letra y máximo 20 caracteres.";
        } else {
            errorMessage.textContent = "";
        }
    });

    document.getElementById("form-control").addEventListener("submit", function(event) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var errorMessage = document.getElementById("errorMessage");
        var usernameRegex = /^[a-zA-Z]{1,20}$/;
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (username.indexOf(' ') >= 0) {
            errorMessage.textContent = "El nombre de usuario no puede contener espacios en blanco.";
            event.preventDefault();
            return;
        }

        if (password.indexOf(' ') >= 0) {
            errorMessage.textContent = "La contraseña no puede contener espacios en blanco.";
            event.preventDefault();
            return;
        }

        if (!usernameRegex.test(username)) {
            errorMessage.textContent = "El nombre de usuario no cumple con los requisitos.";
            event.preventDefault();
            return;
        }

        if (!passwordRegex.test(password)) {
            errorMessage.textContent = "La contraseña no cumple con los requisitos.";
            event.preventDefault();
            return;
        }

        errorMessage.textContent = "";
    });
}
document.addEventListener('DOMContentLoaded', main);