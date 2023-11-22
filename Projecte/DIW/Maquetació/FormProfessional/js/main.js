document.addEventListener("DOMContentLoaded", (event) => {
    let name = document.getElementById("nom");
    let surname = document.getElementById("cognoms");
    let email = document.getElementById("email");
    let dniInput = document.getElementById("dni");
    let password = document.getElementById("password");
    let phone = document.getElementById("mobil");
    let cifInput = document.getElementById("cif");
    let nifInput = document.getElementById("manager-nif");

    let camps = document.querySelectorAll(".form-group");
    let form = document.getElementById("form-control");

    let errorMessage = document.getElementById('errorMessage');
    let successMessage = document.getElementById('successMessage');
    let modalCorrect = document.getElementById('modal-correct');
    let modalIncorrect = document.getElementById('modal-incorrect-email');
    let modalPwd = document.getElementById('modal-incorrect-pwd');
    let closeModal = document.querySelectorAll('.close')[0];
    let closeModalEmail = document.querySelectorAll('.close-email')[0];
    let closeModalPwd = document.querySelectorAll('.close-pwd')[0];

    const nameRegex = /^[a-zA-Z ]{0,25}$/;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/;
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^[0-9]{9}$/;
    const cifRegex = /^[A-Za-z]{1}[0-9]{8}$/;

    eventsRatoli(name);
    eventsRatoli(surname);
    eventsRatoli(email);
    eventsRatoli(dniInput);
    eventsRatoli(password);
    eventsRatoli(phone);
    eventsRatoli(cifInput);
    eventsRatoli(nifInput);

    camps.forEach((text) => {
        text.addEventListener("mousemove", () => {
            text.classList.add("hovered");
        });

        text.addEventListener("mouseout", () => {
            text.classList.remove("hovered");
        });
    });

    name.addEventListener("input", (event) => {
        validarCamps(name);
    });

    surname.addEventListener("input", (event) => {
        validarCamps(surname);
    });

    email.addEventListener("input", (event) => {
        validarCamps(email);
    });

    dniInput.addEventListener("input", (event) => {
        validarCamps(dniInput);
    });

    password.addEventListener('input', (event) => {
        validarCamps(password);
    });

    phone.addEventListener('input', (event) => {
        validarCamps(phone);
    });

    cifInput.addEventListener('input', (event) => {
        validarCamps(cifInput);
    });

    nifInput.addEventListener('input', (event) => {
        validarCamps(nifInput);
    });

    form.addEventListener("submit", (event) => {
        let nom = name.value;
        let cognoms = surname.value;
        let correu = email.value;
        let dni = dniInput.value;
        let contrasenya = password.value;
        let mobil = phone.value;
        let cif = cifInput.value;
        let nif = nifInput.value;

        if (
            !nameRegex.test(nom) ||
            !nameRegex.test(cognoms) ||
            !emailRegex.test(correu) ||
            !dniRegex.test(dni) ||
            !passwordRegex.test(contrasenya) ||
            !phoneRegex.test(mobil) ||
            !cifRegex.test(cif) ||
            !dniRegex.test(nif)
        ) {
            event.preventDefault();
            if (!nameRegex.test(nom) || !nameRegex.test(cognoms)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Nom o cognoms incorrectes!",
                });
            } else if (!emailRegex.test(correu)) {
                //errorMessage.textContent = 'Correu electrònic incorrecte';
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Correu electrònic incorrecte!",
                });
            } else if (!dniRegex.test(dni) || !dniRegex.test(nif)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'DNI incorrecte o NIF incorrecte!'
                });
            } else if (!passwordRegex.test(contrasenya)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_'
                });
            } else if (!phoneRegex.test(mobil)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Numero de mòbil incorrecte'
                });
            } else if (!cifRegex.test(cif)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'CIF incorrecte'
                });
            }

        } else {
            event.preventDefault();
            errorMessage.textContent = '';
            //successMessage.textContent = 'Inici de sessió correcte!';
            /*Swal.fire({
                //position: 'top-end',
                icon: "success",
                title: "Inici de sessió correcte!",
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

    function validarCamps(data) {
        if (data.validity.patternMismatch || data.value === "") {
            data.classList.remove("valid");
            data.classList.add("invalid");
        } else {
            data.classList.remove("invalid");
            data.classList.add("valid");
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

    function validarDni() {
        let dni = document.getElementById("dni").value;
        let dniLetters = [
            "T",
            "R",
            "W",
            "A",
            "G",
            "M",
            "Y",
            "F",
            "P",
            "D",
            "X",
            "B",
            "N",
            "J",
            "Z",
            "S",
            "Q",
            "V",
            "H",
            "L",
            "C",
            "K",
            "E",
        ];

        let dniN = dni.substr(0, 8);
        let dniL = dni.substr(8, 9);

        let residuo = dniN % 23;
        dniKey = dniLetters[residuo];

        if (dniL == dniKey) return true;

        return false;
    }
});
