const pixels_a_moure = 15;

function moureEsquerra() {
  let element = document.getElementById("avio");
  let posicioActual = getAvioPos(element);
  let novaPosicio = {
    left: posicioActual.left - pixels_a_moure,
    top: posicioActual.top
  };
  element.style.left = novaPosicio.left + "px";
  element.style.top = novaPosicio.top + "px";
  console.log("Volem moure l'avió a l'esquerra");
}

function moureDreta() {
  let element = document.getElementById("avio");
  let posicioActual = getAvioPos(element);
  let novaPosicio = {
    left: posicioActual.left + pixels_a_moure,
    top: posicioActual.top
  };
  element.style.left = novaPosicio.left + "px";
  element.style.top = novaPosicio.top + "px";
  console.log("Volem moure l'avió a la dreta");
}

function moureAmunt() {
  let element = document.getElementById("avio");
  let posicioActual = getAvioPos(element);
  let novaPosicio = {
    left: posicioActual.left,
    top: posicioActual.top - pixels_a_moure
  };
  element.style.left = novaPosicio.left + "px";
  element.style.top = novaPosicio.top + "px";
  console.log("Volem moure l'avió amunt");
}

function moureAvall() {
  let element = document.getElementById("avio");
  let posicioActual = getAvioPos(element);
  let novaPosicio = {
    left: posicioActual.left,
    top: posicioActual.top + pixels_a_moure
  };
  element.style.left = novaPosicio.left + "px";
  element.style.top = novaPosicio.top + "px";
  console.log("Volem moure l'avió avall");
}

function passarANumero(n) {
  return parseInt(n == "auto" ? 0 : n);
}

function getAvioPos(element) {
  let obj = {
    left: passarANumero(getComputedStyle(element).left),
    top: passarANumero(getComputedStyle(element).top)
  };
  return obj;
}

function moureAvio(evt) {
  switch (evt.keyCode) {
    case 37:
      moureEsquerra();
      break;
    case 39:
      moureDreta();
      break;
    case 38:
      moureAmunt();
      break;
    case 40:
      moureAvall();
      break;
    case 49:
      // Quan es prem la tecla '1' (codi 49), activar la música
      console.log("S'ha activat la música");
      break;
    // Afegir més casos segons sigui necessari
  }
}

function pararAvio(evt) {
  console.log("Parem l'avió");
  // Afegeix qualsevol lògica addicional per a quan es pari l'avió
}

function docReady() {
  window.addEventListener("keydown", moureAvio);
  window.addEventListener("keyup", pararAvio);
}

// Assegura't que aquesta línia s'executi quan la pàgina estigui totalment carregada
document.addEventListener("DOMContentLoaded", docReady);
