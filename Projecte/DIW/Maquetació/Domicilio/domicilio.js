let desplegable=document.getElementById("barraUser");
console.log(desplegable);
desplegable.addEventListener("click", mostrar);


function mostrar() {
    document.getElementById("myForm").style.display = "block";
}