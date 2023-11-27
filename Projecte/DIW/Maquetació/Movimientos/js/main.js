'use strict';

function main() {
    let datos = [
        {
            ID: "01",
            Fecha: "01/01/2023",
            Marca: "Ferrari",
            Modelo: "458 Italia",
            Proveedor: "Ferrari",
            Cantidad: "10",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "0%",
            Total: "500.000€",
            Comprador: "Juan Alberto"
        },
        {
            ID: "02",
            Fecha: "15/10/2023",
            Marca: "Lamborghini",
            Modelo: "Veneno",
            Proveedor: "Lamborghini",
            Cantidad: "1",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "0%",
            Total: "1.200.000€",
            Comprador: "Maria Isabel"
        },
        {
            ID: "03",
            Fecha: "20/05/2023",
            Marca: "Bentley",
            Modelo: "Continental GT",
            Proveedor: "Bentley",
            Cantidad: "5",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "5%",
            Total: "800.000€",
            Comprador: "Jesus de Barqueta"
        },
        {
            ID: "04",
            Fecha: "19/03/2023",
            Marca: "Audi",
            Modelo: "R8",
            Proveedor: "VolksWagen",
            Cantidad: "20",
            Pago: "Transferencia",
            Tipo: "Particular",
            Descuento: "10%",
            Total: "1.000.000€",
            Comprador: "Daniel Pajero"
        },
        {
            ID: "05",
            Fecha: "01/10/2022",
            Marca: "Aston Martin",
            Modelo: "DB11",
            Proveedor: "Aston Martin",
            Cantidad: "5",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "10%",
            Total: "450.000€",
            Comprador: "Franchelotti S.L"
        },
        {
            ID: "06",
            Fecha: "02/09/2022",
            Marca: "Koenigsegg",
            Modelo: "Jesko",
            Proveedor: "Koenigsegg",
            Cantidad: "1",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "0%",
            Total: "2.800.000€",
            Comprador: "Ruben Baraja S.L"
        },
        {
            ID: "07",
            Fecha: "20/05/2022",
            Marca: "Ford",
            Modelo: "GT",
            Proveedor: "Ford",
            Cantidad: "1",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "0%",
            Total: "1.650.000€",
            Comprador: "Marta Garcia"
        },
        {
            ID: "08",
            Fecha: "29/04/2022",
            Marca: "Jaguar",
            Modelo: "E-Type",
            Proveedor: "Jaguar",
            Cantidad: "1",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "0%",
            Total: "450.000€",
            Comprador: "Julian Alvarez"
        },
        {
            ID: "09",
            Fecha: "19/03/2022",
            Marca: "Mclaren",
            Modelo: "P1",
            Proveedor: "Mclaren",
            Cantidad: "2",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "10%",
            Total: "1.000.000€",
            Comprador: "Krillin"
        },
        {
            ID: "10",
            Fecha: "25/11/2021",
            Marca: "Porsche",
            Modelo: "GT3 RS",
            Proveedor: "Porsche",
            Cantidad: "3",
            Pago: "Transferencia",
            Tipo: "Profesional",
            Descuento: "10%",
            Total: "1.200.000€",
            Comprador: "Ragnar Lothbrook"
        },
    ]

    const resultadosPorPagina = 5; // Cambia esto al número de filas que quieres mostrar por página
    let paginaActual = 1;

    function mostrarDatosEnPagina(datos, pagina) {
        const inicio = (pagina - 1) * resultadosPorPagina;
        const fin = inicio + resultadosPorPagina;
        const datosPagina = datos.slice(inicio, fin);

        const cuerpoTabla = document.getElementById("tablaDatos").getElementsByTagName("tbody")[0];
        cuerpoTabla.innerHTML = ""; // Limpiar el contenido anterior de la tabla

        datosPagina.forEach(fila => {
            const nuevaFila = cuerpoTabla.insertRow();
            Object.values(fila).forEach(valor => {
                const celda = nuevaFila.insertCell();
                celda.textContent = valor;
            });
        });
    }

    function mostrarPaginacion(datos) {
        const totalPaginas = Math.ceil(datos.length / resultadosPorPagina);
        const paginacion = document.getElementById("paginacion");
        paginacion.innerHTML = "";

        for (let i = 1; i <= totalPaginas; i++) {
            const botonPagina = document.createElement("button");
            botonPagina.textContent = i;
            botonPagina.addEventListener("click", () => {
                paginaActual = i;
                mostrarDatosEnPagina(datos, paginaActual);
            });
            paginacion.appendChild(botonPagina);
        }
    }

    // Mostrar la primera página de datos al cargar la página
    mostrarDatosEnPagina(datos, paginaActual);
    mostrarPaginacion(datos);


    window.setMobileTable = function (selector) {
        // if (window.innerWidth > 600) return false;
        const tableEl = document.querySelector(selector);
        const thEls = tableEl.querySelectorAll('thead th');
        const tdLabels = Array.from(thEls).map(el => el.innerText);
        tableEl.querySelectorAll('tbody tr').forEach(tr => {
            Array.from(tr.children).forEach(
                (td, ndx) => td.setAttribute('label', tdLabels[ndx])
            );
        });
    }

    // selector
    var menu = document.querySelector('.hamburger');

    // method
    function toggleMenu(event) {
        this.classList.toggle('is-active');
        document.querySelector(".menuppal").classList.toggle("is_active");
        event.preventDefault();
    }

    // event
    menu.addEventListener('click', toggleMenu, false);
}

document.addEventListener('DOMContentLoaded', main);