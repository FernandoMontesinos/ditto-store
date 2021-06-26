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
    // Obtenemos el nombre y verificamos si es válido 
    obtenerNombre();
    // Correo
    obtenerCorreo();
    // Direccion
    obtenerDireccion();
    // Fecha 
    fechaEntrega();
    // Lo mostramos en el popup
    mostrarResumenCompra();
    // Deshabilitamos fechas anteriores
    deshabilitarFechasAnteriores();


}

const form = document.getElementById('form');
const nombreform = document.getElementById('nombre-form');
const correo = document.getElementById('correo-form');
const lugar = document.getElementById('lugar-form');

const funcionalidadPopupResumen = () => form.addEventListener('submit', (e) => {
    carrito = {};
    inyectarCarrito();
    e.preventDefault();
    const contenedorFormulario = document.getElementById("overlay-form");
    const OverlayResumenCompra = document.getElementById("overlay-resumenCompra");
    const contenedorResumenCompra = document.getElementById("resumenCompra");

    contenedorFormulario.classList.remove('activ');
    OverlayResumenCompra.classList.add('activado');
    contenedorResumenCompra.classList.add('activado');
    if (OverlayResumenCompra.classList.contains('activado')) {
        mostrarResumenCompra(); // Carga el resumen de la cita
    }
    // cerrarResumenCompra.addEventListener('click', (e) => {
    //     //OverlayResumenCompra.classList.remove('activado');
    // })


});

const obtenerNombre = () => {
    const nombreInput = document.getElementById('nombre-form');

    nombreInput.addEventListener('input', (e) => {
        const datoNombre = e.target.value.trim(); // Quitamos espacios en blanco
        //console.log(datoNombre);

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
        //console.log(datoCorreo)
    })
}

const obtenerDireccion = () => {
    const direccionInput = document.getElementById('lugar-form');

    direccionInput.addEventListener('input', (e) => {
        const datoDireccion = e.target.value.trim();
        datosComprador.direccion = datoDireccion
        //console.log(datoDireccion);
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
            //console.log(datoFecha)
        }
    });
}


const mostrarResumenCompra = () => {
    const {
        nombre,
        correo,
        direccion,
        fecha
    } = datosComprador;

    // Seleccionamos el contenedor del resumen
    const resumenContenedor = document.getElementById('resumenCompra');
    const OverlayResumenCompra = document.getElementById('overlay-resumenCompra');
    // Lo limpiamos de datos anteriores
    while (resumenContenedor.firstChild) {
        resumenContenedor.removeChild(resumenContenedor.firstChild);
    }
    // Validamos el objeto
    if (Object.values(datosComprador).includes('')) {
        const noDatos = document.createElement('P');
        noDatos.textContent = 'Faltan Datos'
        // Lo agregamos al container
        resumenContenedor.appendChild(noDatos);
        return;
    }

    const cerrarResumenCompra = document.createElement('P');
    cerrarResumenCompra.innerHTML = `<a class="cerrarResumen-btn" id="cerrarResumen-btn"><svg xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="#F5D655" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
    </svg></a>`;
    // Agregar el evento listener :) 
    cerrarResumenCompra.addEventListener('click', () => {
        OverlayResumenCompra.classList.remove('activado');
        carrito = {}
    })

    const headingConfirmacion = document.createElement('H2');
    headingConfirmacion.innerHTML = `Confirmación de Pedido`

    const nombreComprador = document.createElement('P');
    nombreComprador.innerHTML = `<span>Muchas gracias por tu compra </span>${nombre}<br> <span>su pedido ha sido registrado exitosamente.</span>`;

    const headingPedido = document.createElement('H2');
    headingPedido.innerHTML = `Datos de Entrega`

    const direccionComprador = document.createElement('P');
    direccionComprador.innerHTML = `<span class="dataResumen">Dirección: </span> ${direccion}`;

    const fechaComprador = document.createElement('P');
    fechaComprador.innerHTML = `<span class="dataResumen">Fecha: </span> ${fecha}`;

    const correoComprador = document.createElement('P');
    correoComprador.innerHTML = `<span>Le enviamos a su correo</span> ${correo}<br><span>Mas información sobre la entrega.</span>`;

    resumenContenedor.appendChild(cerrarResumenCompra);
    resumenContenedor.appendChild(headingConfirmacion);
    resumenContenedor.appendChild(nombreComprador);
    resumenContenedor.appendChild(headingPedido);
    resumenContenedor.appendChild(direccionComprador);
    resumenContenedor.appendChild(fechaComprador);
    resumenContenedor.appendChild(correoComprador);
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