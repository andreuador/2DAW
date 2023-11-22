document.addEventListener('DOMContentLoaded', (event) => {
    Swal.fire({
        title: 'Benvingut a la nostra pàgina',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });

    let email = document.getElementById("email");
    let password = document.getElementById("password");
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

    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    listaCorreos();

    email.addEventListener('mouseover', function () {
        email.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
    });

    email.addEventListener('mouseout', function () {
        email.style.backgroundColor = ''; // Restaurar el color de fondo original
    });

    password.addEventListener('mouseover', function () {
        password.style.backgroundColor = '#f0f0f0'; // Cambiar a un color más oscuro
    });

    password.addEventListener('mouseout', function () {
        password.style.backgroundColor = ''; // Restaurar el color de fondo original
    });

    camps.forEach(text => {
        text.addEventListener('mousemove', () => {
            text.classList.add('hovered');
        });

        text.addEventListener('mouseout', () => {
            text.classList.remove('hovered');
        });
    });

    email.addEventListener('input', (event) => {
        validarCamps(email);
        console.log(email.value);
    });

    password.addEventListener('input', (event) => {
        validarCamps(password);
        console.log(password.value);
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

    form.addEventListener('submit', function (event) {
        let correu = email.value;
        let contrasenya = password.value;

        let isValid = true;

        if (!emailRegex.test(correu) || !passwordRegex.test(contrasenya)) {
            event.preventDefault(); // Evitar que se envíe el formulario
            if (!emailRegex.test(correu)) {
                //errorMessage.textContent = 'Correu electrònic incorrecte';

                // Sweet Alert
                /*Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Correu electrònic incorrecte!'
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
                isValid = false;
            } else if (!passwordRegex.test(contrasenya)) {
                //errorMessage.textContent = 'La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_';

                // Sweet Alert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_'
                });

                // Modal
                /*modalPwd.style.display = 'block';
                closeModalPwd.onclick = function () {
                    modalPwd.style.display = 'none';
                };
                window.onclick = function (event) {
                    if (event.target == modalPwd) {
                        modalPwd.style.display = 'none';
                    }
                };*/
            }
        } else {
            event.preventDefault();
            errorMessage.textContent = '';
            //successMessage.textContent = 'Inici de sessió correcte!';

            // Sweet Alert
            /*Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Inici de sessió correcte!',
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
});