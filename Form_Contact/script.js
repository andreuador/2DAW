'use strict';

function main() {
    let name    = document.querySelector('#nom');
    let email   = document.querySelector('#email');
    let matter  = document.querySelector('#assumpte');
    let message = document.querySelector('#missatge');
    let order    = document.querySelector('#comanda');

    validarCamps(name, 'Per favor, introdueix el teu nom');
    validarCamps(email, 'Camp obligatori');
    validarCamps(order, 'Camp obligatori');
    validarCamps(matter, 'Camp obligatori');
    validarCamps(message, 'Camp obligatori');

    function validarCamps(camps, missatge) {
        // Agrega un event d'escolta al camp d'entrada de text per al event "input".
        camps.addEventListener('input', () => {

            // Estableix un missatge de validació personalitzat en blanc.
            camps.setCustomValidity('');

            // Verificar el camp d'entrada de text. Si el camp esta buit i es obligatori, esta funció tornarà "false". Si el camp conté text, tornarà "true".
            camps.checkValidity();
            // Mostra el resultat per consola
            console.log(camps.checkValidity);
        });

         // Agrega un event d'escolta al camp d'entrada de text per al event "invalid".
        camps.addEventListener('invalid', () => {

            // Aquesta linea estableix un missatge de validació personalitzat que indica el usuari que ha d'omplir el camp.
            camps.setCustomValidity(missatge);
        })
    }
}

document.addEventListener('DOMContentLoaded', main);

/*'use strict';

function main() {
    let form = document.querySelector('#form-control');
    form.addEventListener('input', validarCamps);

    function validarCamps() {
        let camps = form.querySelectorAll('input, textarea, select');
        camps.forEach(camp => {
            camp.setCustomValidity('');
            camp.checkValidity();
        });
    }

    form.addEventListener('invalid', () => {
        let camp = form.querySelectorAll('input, textarea, select');
        camp.forEach(camp => {
            if (!camp.checkValidity()) {
                camp.setCustomValidity('Camp obligatori');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', main);*/
