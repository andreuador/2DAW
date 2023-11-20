'use strict';
function main() {

    Swal.fire({
        title: 'Bienvenido a nuestra página',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

    let emailInput     = document.getElementById('email');
    let pwdInput       = document.getElementById('password');
    let errorMessage   = document.getElementById('errorMessage');
    let successMessage = document.getElementById('successMessage');
    let form           = document.getElementById('form-control');
    let modalCorrect   = document.getElementById('modal-correct');
    let modalIncorrect = document.getElementById('modal-incorrect-email');
    let modalPwd       = document.getElementById('modal-incorrect-pwd');
    let closeModal     = document.querySelectorAll('.close')[0];
    let closeModalEmail     = document.querySelectorAll('.close-email')[0];
    let closeModalPwd     = document.querySelectorAll('.close-pwd')[0];

    validarCamps(emailInput, 'Campo obligatorio');
    validarCamps(pwdInput, 'Campo obligatorio');
    listaCorreos();

    // Agregar eventos de ratón para cambiar el color de fondo cuando el ratón pasa por encima
    emailInput.addEventListener('mouseover', function () {
        emailInput.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
    });

    emailInput.addEventListener('mouseout', function () {
        emailInput.style.backgroundColor = ''; // Restaurar el color de fondo original
    });

    pwdInput.addEventListener('mouseover', function () {
        pwdInput.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
    });

    pwdInput.addEventListener('mouseout', function () {
        pwdInput.style.backgroundColor = ''; // Restaurar el color de fondo original
    });

    // Expresión para validar el correo electrónico.
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expresión para validar la contraseña.
    let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.])[A-Za-z\d-_.]{8,}$/;

    form.addEventListener('submit', function (event) {
        let email = emailInput.value;
        let pwd = pwdInput.value;

        if (!emailRegex.test(email) || !pwdRegex.test(pwd)) {
            event.preventDefault(); // Evitar que se envíe el formulario
            if (!emailRegex.test(email)) {
                //errorMessage.textContent = 'Correo electrónico inválio';

                // Sweet Alert
                /*Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Correo electronico inválido!'
                });*/

                // Modal
                modalIncorrect.style.display = 'block';
                closeModalEmail.onclick = function () {
                    modalIncorrect.style.display = 'none';
                };
                window.onclick = function (event) {
                    if (event.target == modalIncorrect) {
                        modalIncorrect.style.display = 'none';
                    }
                };
            } else {
                //errorMessage.textContent = 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y uno de los siguientes caracteres especiales: -_';

                // Sweet Alert
                /*Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contraseña debe contener al menos 8 carácteres, incluyendo una mayúscula, una minúscula, un número y uno de los siguientes caracteres especiales: -_!'
                });*/

                // Modal
                modalPwd.style.display = 'block';
                closeModalPwd.onclick = function () {
                    modalPwd.style.display = 'none';
                };
                window.onclick = function (event) {
                    if (event.target == modalPwd) {
                        modalPwd.style.display = 'none';
                    }
                };
            }
        } else {
            event.preventDefault(); // Evitar que se envíe el formulario
            errorMessage.textContent = ''; // Limpiar el mensaje de error si todo está bien
            //successMessage.textContent = 'Inicio de sesión correcto';

            // Sweet Alert
            /*Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Inicio de sesión correcto!',
                showConfirmButton: true,
              });*/
            
            // Modal
            modalCorrect.style.display = 'block';
            closeModal.onclick = function () {
                modalCorrect.style.display = 'none';
            };
            window.onclick = function (event) {
                if (event.target == modalCorrect) {
                    modalCorrect.style.display = 'none';
                }
            };
            successMessage.style.color = '#181d33'; // Establecer el color del mensaje de éxito

            document.cookie = `email=${email}; path=/`; // Almacena el correo electrónico en la cookie
            document.cookie = `loggedIn=true; path=/`; // Almacena un indicador de inicio de sesión en la cookie

            // Reiniciar el formulario
            form.reset();
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

    function listaCorreos() {
        document.getElementById('email').addEventListener('input', function () {
            let username = this.value;
            let suggestionsContainer = document.getElementById('suggestions');
            let domains = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com']; // Puedes agregar más dominios aquí

            suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias anteriores

            domains.forEach(function (domain) {
                let suggestion = document.createElement('li');
                suggestion.textContent = username + domain;
                suggestion.addEventListener('click', function () {
                    document.getElementById('email').value = suggestion.textContent;
                    suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias después de hacer clic en una opción
                    // Establecer la validez del campo de correo electrónico al seleccionar una sugerencia
                    document.getElementById('email').setCustomValidity('');
                });
                suggestionsContainer.appendChild(suggestion);
            });

            // Mostrar la lista desplegable si hay sugerencias
            if (domains.some(domain => username.length > 0)) {
                suggestionsContainer.classList.add('show');
            } else {
                suggestionsContainer.classList.remove('show');
            }
        });

        // Ocultar la lista desplegable cuando se hace clic fuera de ella
        document.addEventListener('click', function (event) {
            if (!document.getElementById('suggestions').contains(event.target)) {
                document.getElementById('suggestions').classList.remove('show');
                // Establecer la validez del campo de correo electrónico si no se selecciona ninguna sugerencia
                document.getElementById('email').checkValidity();
            }
        });
    }

}

document.addEventListener('DOMContentLoaded', main);
