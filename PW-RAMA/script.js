'use strict';
//alert("Bienvenido a nuestra página web");

//let valor = confirm("Mensaje con acción a confirmar");

/*document.addEventListener("DOMContentLoaded", function () {
    // Pide al usuario que ingrese su nombre
    let nombre = prompt("Por favor, ingresa tu nombre:");

    // Verifica si el usuario ingresó un nombre o dejó el campo vacío
    if (nombre === null || nombre === "") {
        alert("Error: No ingresaste tu nombre. Por favor, inténtalo de nuevo.");
    } else {
        // Crea un elemento de encabezado para mostrar el mensaje de bienvenida
        let encabezado = document.createElement("h1");
        encabezado.textContent = "Bienvenido, " + nombre;

        // Agrega el encabezado a la parte superior derecha de la página
        encabezado.style.position = "fixed";
        encabezado.style.top = "10px";
        encabezado.style.right = "10px";
        document.body.appendChild(encabezado);
        
    }
});*/

function main() {
    // Obtener el formulario
    let formulario = document.getElementById("registroForm");

    // Agregar un evento de envio al formulario
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();     // Evitar el envio predeterminado del formulario

        // Obtener los valores de los campos
        let nombre     = document.getElementById("nombre").value;
        let email      = document.getElementById("email").value;
        let contraseña = document.getElementById("pwd").value;

        // Realizar la validación ded datos (puedes personalizar esto segun tu necesidades)
        if(nombre.trim() === "") {
            alert("Por favor, ingresa tu nombre.");
        }
        else if(!isValidEmail(email)) {
            alert("Por favor, ingresa una dirección de correo electronico.");
        }
        else if(pwd.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
        }
        else {
            // Si todos los datos son válidos, puedes enviar el formulario o realizar otras acciones aquí
            alert("Registro existoso. ¡Bienvenido, " + nombre + "!");
            formulario.reset();
        }
    });

    // Función para validar el formato del correo electronico
    function isValidEmail(email) {
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }
}
document.addEventListener('DOMContentLoaded', main);