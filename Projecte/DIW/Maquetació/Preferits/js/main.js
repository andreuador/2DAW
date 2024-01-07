document.addEventListener("DOMContentLoaded", (event) => {
    const elements = {
        email: document.getElementById("email"),
        password: document.getElementById("password"),
        form: document.getElementById("form-control"),
        camps: document.querySelectorAll(".form-group"),
        errorMessage: document.getElementById("errorMessage"),
        successMessage: document.getElementById("successMessage"),
        modalCorrect: document.getElementById("modal-correct"),
        modalIncorrect: document.getElementById("modal-incorrect-email"),
        modalPwd: document.getElementById("modal-incorrect-pwd"),
        closeModal: document.querySelectorAll(".close")[0],
        closeModalEmail: document.querySelectorAll(".close-email")[0],
        closeModalPwd: document.querySelectorAll(".close-pwd")[0],
    };

    const regexPatterns = {
        emailRegex: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    listaCorreos();

    elements.camps.forEach((text) => {
        text.addEventListener("mousemove", () => {
            text.classList.add("hovered");
        });

        text.addEventListener("mouseout", () => {
            text.classList.remove("hovered");
        });
    });

    elements.email.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#f0f0f0";
    });
    
    elements.email.addEventListener("mouseout", function () {
        this.style.backgroundColor = "";
    });
    
    elements.email.addEventListener("mousemove", () => {
        elements.email.classList.add("hovered");
    });
    
    elements.email.addEventListener("mouseout", () => {
        elements.email.classList.remove("hovered");
    });

    elements.form.addEventListener("submit", function (event) {
        let correu = elements.email.value;
        let contrasenya = elements.password.value;

        let isValid = true;

        if (
            !regexPatterns.emailRegex.test(correu) ||
            !regexPatterns.passwordRegex.test(contrasenya)
        ) {
            event.preventDefault();
            if (!regexPatterns.emailRegex.test(correu)) {
                elements.modalIncorrect.style.display = "block";
                elements.closeModalEmail.onclick = function () {
                    elements.modalIncorrect.style.display = "none";
                };
                window.onclick = function (event) {
                    if (event.target == elements.modalIncorrect) {
                        elements.modalIncorrect.style.display = "none";
                    }
                };
                isValid = false;
            } else if (!regexPatterns.passwordRegex.test(contrasenya)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_",
                });
            }
        } else {
            event.preventDefault();
            elements.errorMessage.textContent = "";
            elements.modalCorrect.style.display = "block";
            elements.closeModal.onclick = function () {
                elements.modalCorrect.style.display = "none";
            };
            window.onclick = function (event) {
                if (event.target == elements.modalCorrect) {
                    elements.modalCorrect.style.display = "none";
                }
            };
            elements.successMessage.style.color = "#181d33";

            document.cookie = `email=${correu}; path=/`;
            document.cookie = `loggedIn=true; path=/`;

            elements.form.reset();
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

    function listaCorreos() {
        elements.email.addEventListener("input", function () {
            let username = this.value;
            let suggestionsContainer = document.getElementById("suggestions");
            let domains = [
                "@gmail.com",
                "@hotmail.com",
                "@outlook.com",
                "@yahoo.com",
            ];

            suggestionsContainer.innerHTML = "";

            domains.forEach(function (domain) {
                let suggestion = document.createElement("li");
                suggestion.textContent = username + domain;
                suggestion.addEventListener("click", function () {
                    elements.email.value = suggestion.textContent;
                    suggestionsContainer.innerHTML = "";
                    elements.email.setCustomValidity("");
                });
                suggestionsContainer.appendChild(suggestion);
            });

            if (domains.some((domain) => username.length > 0)) {
                suggestionsContainer.classList.add("show");
            } else {
                suggestionsContainer.classList.remove("show");
            }
        });

        document.addEventListener("click", function (event) {
            if (!document.getElementById("suggestions").contains(event.target)) {
                document.getElementById("suggestions").classList.remove("show");
                elements.email.checkValidity();
            }
        });
    }

    function likeButtonClick(button) {
		// Verifica si el botón ya ha sido marcado como "Me gusta"
		if (button.classList.contains('liked')) {
			// Si ya le gustaba, cambia el estilo y el texto para indicar que ya no le gusta
			button.classList.remove('liked');
			button.style.backgroundColor = '';
			button.style.color = '';
			button.innerHTML = 'Me gusta';
		} else {
			// Si no le gustaba, cambia el estilo y el texto para indicar que le gusta
			button.classList.add('liked');
			button.style.backgroundColor = 'green';
			button.style.color = 'white';
			button.innerHTML = '¡Te gusta!';
		}
	}
});