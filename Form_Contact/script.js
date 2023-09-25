'use strict';
function main() {
	let form = document.getElementById('form');
	// Guardar tots els inputs
	let inputs = document.querySelectorAll('#form input');

	const expressions = {
		nom: /^[a-zA-ZÀ-ÿ\s]{1, 40}$/
	}
}

document.addEventListener('DOMContentLoaded', main);