document.addEventListener("DOMContentLoaded", (event) => {

    // Defeneix diferents elements HTML utilitzats en el script
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

    // Defineix patrons d'expressió regular per validar el correu electrònic i la contrasenya
    const regexPatterns = {
        emailRegex: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

     // Inicialitza la llista de dominis de correu electrònic suggerits
    llistaCorreus();

    // Afegeix escoltadors d'esdeveniments per mouseover i mouseout als elements del formulari
    elements.camps.forEach((text) => {
        text.addEventListener("mousemove", () => {
            text.classList.add("hovered");
        });

        text.addEventListener("mouseout", () => {
            text.classList.remove("hovered");
        });
    });

    // Afegeix escoltadors d'esdeveniments per mouseover, mouseout i mousemove a l'entrada de correu electrònic
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

    // Afegeix l'escoltador d'esdeveniments de presentació del formulari
    elements.form.addEventListener("submit", function (event) {

         // Valida el correu electrònic i la contrasenya utilitzant expressions regulars
        let correu = elements.email.value;
        let contrasenya = elements.password.value;

        let isValid = true;

        if (
            !regexPatterns.emailRegex.test(correu) ||
            !regexPatterns.passwordRegex.test(contrasenya)
        ) {
            event.preventDefault();
            if (!regexPatterns.emailRegex.test(correu)) {

                // Gestiona correu electrònic o contrasenya no vàlids
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
                updateChart("Correu electrònic incorrecte");
            } else if (!regexPatterns.passwordRegex.test(contrasenya)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La contrasenya ha de contindre almenys 8 caràcters, una majúscula, una minúscula, un número i un dels següents caràcters especials: -_",
                });
                updateChart("Contrasenya incorrecta");
            }
        } else {

            // Gestiona l'enviament correcte del formulari
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
            updateChart("Inici de sessió correcte");
        }
    });

    // Funció per validar els camps d'entrada i aplicar estils
    function validarCamps(data) {
        if (data.validity.patternMismatch || data.value === "") {
            data.classList.remove("valid");
            data.classList.add("invalid");
        } else {
            data.classList.remove("invalid");
            data.classList.add("valid");
        }
    }

    // Funció per gestionar els dominis suggerits pel correu electrònic
    function llistaCorreus() {
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

    /**
     * Funcionalitat del menú per a dispositius mòbils
     */

    let mcMenuBtn = document.getElementById('mcMenuBtn');
    let mcMenuUl = document.querySelector('.mcMenu > ul');

    mcMenuBtn.addEventListener('click', function () {
        mcMenuUl.style.display = (mcMenuUl.style.display === 'none' || mcMenuUl.style.display === '') ? 'block' : 'none';
    });

    /**
     * Chart.js per a les estadístiques de inici de sessió
     */

    let myChart;
    // Funció per a inicialitzar el gràfic
    function initializeChart() {
        const ctx = document.getElementById("loginChart").getContext("2d");
        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Inici de sessió correcte", "Correu electrònic incorrecte", "Contrasenya incorrecta"],
                datasets: [{
                    label: "estadístiques d'inici de sessió",
                    data: [0, 0, 0], // Inicialitza el valors
                    backgroundColor: [
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 206, 86, 0.2)"
                    ],
                    borderColor: [
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 206, 86, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Funció per a actualitzar el gràfic
    function updateChart(category) {
        let index = 0; // Index per al "Inici de sessió correcte"

        if (category === "Correu electrònic incorrecte") {
            index = 1;
        } else if (category === "Contrasenya incorrecta") {
            index = 2;
        }
        myChart.data.datasets[0].data[index]++;
        myChart.update();
    }

    // Inicialitza el gràfic al cargar la pàgina
    initializeChart();
});