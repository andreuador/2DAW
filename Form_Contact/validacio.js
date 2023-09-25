'use strict';

document.getElementById("contacteForm").addEventListener("submit", function(event) {
	let nom = document.getElementById("nom").value;
	let cognoms = document.getElementById("cognoms").value;
	let numFactura = document.getElementById("numFactura").value;
	let assumpte = document.getElementById("assumpte").value;
	let motiu = document.getElementById("motiu").value;
	let missatge = document.getElementById("missatge").value;

	// Expressions per a la validació
	let nomVal = /^[a-zA-Z]+$/;
    let numFacturaVal = /^\d+$/;

    // Validacions

    if(!nomVal.test(nom)) {
    	document.innerHTML = "Per favor posa el teu nom";
    }
})

document.addEventListener('DOMContentLoaded', main);