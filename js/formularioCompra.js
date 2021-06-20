// Formulario Compra

const datosComprador = {
    nombre: '',
    correo: '',
    direccion: '',
    fecha: ''
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarResumen();
})

function iniciarResumen() {
    // Agregamos como se muestra y como cerrarlo
    funcionalidadPopupResumen();
    // Obtenemos el nombre y verificamos si es válido y otros valores
    obtenerNombre();
    obtenerCorreo();
    obtenerDireccion();
    fechaEntrega();
    // Lo mostramos en el popup
    mostrarResumenCompra();
    // Deshabilitamos fechas anteriores
    deshabilitarFechasAnteriores();
    

}

const form = document.getElementById('form');
const nombreform = document.getElementById('nombre-form');
const correo = document.getElementById('correo-form');
const numero = document.getElementById('numero-form');
const lugar = document.getElementById('lugar-form');

const funcionalidadPopupResumen = () => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const contenedorFormulario = document.getElementById("overlay-form");
    const OverlayResumenCompra = document.getElementById("overlay-resumenCompra");
    const contenedorResumenCompra = document.getElementById("resumenCompra");
    const cerrarResumenCompra = document.getElementById("cerrarResumen-btn");

    contenedorFormulario.classList.remove('activ');
    OverlayResumenCompra.classList.add('activado');
    contenedorResumenCompra.classList.add('activado');

    cerrarResumenCompra.addEventListener('click', () => {
        OverlayResumenCompra.classList.remove('activado');
    })

});

const obtenerNombre = () => {
    const nombreInput = document.getElementById('nombre-form');

    nombreInput.addEventListener('input', (e) => {
        const datoNombre = e.target.value.trim(); // Quitamos espacios en blanco
        console.log(datoNombre);

        // Validamos que el nombre tenga mas de 3 caracteres 
        if (datoNombre.length < 5) {
            alertaMensaje('Ingrese su nombre Completo')
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            datosComprador.nombre = datoNombre;
        }
    })
}

const alertaMensaje = (mensaje) => {
    // Si hay una alerta, previa entonces no hago otra
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        return;
    }

    // Creamos la alerta 

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    // Lo ponemos en el formulario

    const contenidoFormulario = document.getElementById("form-inputs");
    contenidoFormulario.appendChild(alerta);
}

const obtenerCorreo = () => {
    const correoInput = document.getElementById('correo-form');
    correoInput.addEventListener('input', (e) => {
        const datoCorreo = e.target.value.trim();
        datosComprador.correo = datoCorreo;
        console.log(datoCorreo)
    })
}

const obtenerDireccion = () => {
    const direccionInput = document.getElementById('lugar-form');

    direccionInput.addEventListener('input', (e) => {
        const datoDireccion = e.target.value.trim();
        datosComprador.direccion = datoDireccion
        console.log(datoDireccion);
    })
}

const fechaEntrega = () => {
    const fechaInput = document.getElementById('fecha-form');

    fechaInput.addEventListener('input', (e) => {
        const dia = new Date(e.target.value).getUTCDay();

        if ([0].includes(dia)) { // Los domingos no realizamos entregas
            e.preventDefault();
            fechaInput.value = '';
            alertaMensaje('Los domingos no realizamos entregas, muchas gracias por su comprensión');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            const datoFecha = fechaInput.value;
            datosComprador.fecha = datoFecha;
            console.log(datoFecha)
        }
    });
}

// Solo nos falta mostrar los datos!!!!1**/*/*/*/*/*/*/*/*/*

const mostrarResumenCompra = () => {
    const { nombre, correo, direccion, fecha} = datosComprador;

    // Seleccionamos el contenedor del resumen
    const resumenContenedor  = document.getElementById('resumenCompra');

    const nombreComprador = document.createElement('P');
    nombreComprador.innerHTML= `<span>Nombre: </span>${nombre}`;

    const correoComprador = document.createElement('P');
    correoComprador.innerHTML= `<span>Correo: </span> ${correo}`;

    const direccionComprador = document.createElement('P');
    direccionComprador.innerHTML= `<span>Dirección </span> ${direccion}`;
    
    const fechaComprador = document.createElement('P');
    fechaComprador.innerHTML= `<span>Fecha: </span> ${fecha}`;


    resumenContenedor.appendChild(nombreComprador);
    resumenContenedor.appendChild(correoComprador);
    resumenContenedor.appendChild(direccionComprador);
    resumenContenedor.appendChild(fechaComprador);
}

const deshabilitarFechasAnteriores = () => {
    const inputFecha = document.getElementById('fecha-form');

    const fechaAhora = new Date();
    const year = fechaAhora.getFullYear();
    const mes = fechaAhora.getMonth() + 1;
    const dia = fechaAhora.getDate() + 1;

    // Formato deseado: AAAA-MM-DD

    const fechaDeshabilitar = `${year}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`

    inputFecha.min = fechaDeshabilitar;
 
}

