document.addEventListener("DOMContentLoaded", (event) => {
    const elements = {
        name: document.getElementById("nom"),
        surname: document.getElementById("cognoms"),
        email: document.getElementById("email"),
        dniInput: document.getElementById("dni"),
        password: document.getElementById("password"),
        phone: document.getElementById("mobil"),
        cifInput: document.getElementById("cif"),
        nifInput: document.getElementById("manager-nif"),
    };

    const camps = document.querySelectorAll(".form-group");
    const form = document.getElementById("form-control");

    const messages = {
        errorMessage: document.getElementById('errorMessage'),
        successMessage: document.getElementById('successMessage'),
        modalCorrect: document.getElementById('modal-correct'),
        modalIncorrect: document.getElementById('modal-incorrect-email'),
        modalPwd: document.getElementById('modal-incorrect-pwd'),
        closeModal: document.querySelectorAll('.close')[0],
        closeModalEmail: document.querySelectorAll('.close-email')[0],
        closeModalPwd: document.querySelectorAll('.close-pwd')[0],
    };

    const regexPatterns = {
        name: /^[a-zA-Z ]{0,25}$/,
        email: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
        dni: /^[0-9]{8}[A-Z]$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        phone: /^[0-9]{9}$/,
        cif: /^[A-Za-z]{1}[0-9]{8}$/,
    };

    eventsRatoli(elements.name);
    eventsRatoli(elements.surname);
    eventsRatoli(elements.email);
    eventsRatoli(elements.dniInput);
    eventsRatoli(elements.password);
    eventsRatoli(elements.phone);
    eventsRatoli(elements.cifInput);
    eventsRatoli(elements.nifInput);

    camps.forEach((text) => {
        text.addEventListener("mousemove", () => {
            text.classList.add("hovered");
        });

        text.addEventListener("mouseout", () => {
            text.classList.remove("hovered");
        });
    });

    elements.name.addEventListener("input", (event) => {
        validarCamps(elements.name);
        console.log(elements.name.value);
    });

    elements.surname.addEventListener("input", (event) => {
        validarCamps(elements.surname);
    });

    elements.email.addEventListener("input", (event) => {
        validarCamps(elements.email);
    });

    elements.dniInput.addEventListener("input", (event) => {
        validarCamps(elements.dniInput);
    });

    elements.password.addEventListener('input', (event) => {
        validarCamps(elements.password);
    });

    elements.phone.addEventListener('input', (event) => {
        validarCamps(elements.phone);
    });

    elements.cifInput.addEventListener('input', (event) => {
        validarCamps(elements.cifInput);
    });

    elements.nifInput.addEventListener('input', (event) => {
        validarCamps(elements.nifInput);
    });

    form.addEventListener("submit", (event) => {
        let nom = elements.name.value;
        let cognoms = elements.surname.value;
        let correu = elements.email.value;
        let dni = elements.dniInput.value;
        let contrasenya = elements.password.value;
        let mobil = elements.phone.value;
        let cif = elements.cifInput.value;
        let nif = elements.nifInput.value;

        if (
            !regexPatterns.name.test(nom) ||
            !regexPatterns.name.test(cognoms) ||
            !regexPatterns.email.test(correu) ||
            !regexPatterns.dni.test(dni) ||
            !regexPatterns.password.test(contrasenya) ||
            !regexPatterns.phone.test(mobil) ||
            !regexPatterns.cif.test(cif) ||
            !regexPatterns.dni.test(nif)
        ) {
            event.preventDefault();
            if (!regexPatterns.name.test(nom) || !regexPatterns.name.test(cognoms)) {
                showError("Nom o cognoms incorrectes!");
            } else if (!regexPatterns.email.test(correu)) {
                showError("Correu electrònic incorrecte!");
            } else if (!regexPatterns.dni.test(dni) || !regexPatterns.dni.test(nif)) {
                showError("DNI incorrecte o NIF incorrecte!");
            } else if (!regexPatterns.password.test(contrasenya)) {
                showError("La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_");
            } else if (!regexPatterns.phone.test(mobil)) {
                showError("Numero de mòbil incorrecte");
            } else if (!regexPatterns.cif.test(cif)) {
                showError("CIF incorrecte");
            }
        } else {
            event.preventDefault();
            messages.errorMessage.textContent = '';
            messages.modalCorrect.style.display = 'block';
            messages.closeModal.onclick = function () {
                messages.modalCorrect.style.display = 'none';
            };
            window.onclick = function (event) {
                if (event.target == messages.modalCorrect) {
                    messages.modalCorrect.style.display = 'none';
                }
            };
            messages.successMessage.style.color = '#181d33';
            document.cookie = `email=${correu}; path=/`;
            document.cookie = `loggedIn=true; path=/`;
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
            inputElement.style.backgroundColor = '#f0f0f0';
        });

        inputElement.addEventListener('mouseout', function () {
            inputElement.style.backgroundColor = '';
        });
    }

    function showError(message) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
        });
    }
});
