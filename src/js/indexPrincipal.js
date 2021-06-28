// Seleccionamos los elementos del HTML
const productoscaja = document.getElementById('contenedor-productos');
const productos = document.getElementById('productos');
const footer = document.getElementById('footer');
const navC = document.getElementById('carritonav');
const templateProducto = document.getElementById('producto-template').content; // Aca poner Content xd
const templateFooter = document.getElementById('footer-template').content;
const templateCarrito = document.getElementById('carrito-template').content;
const templateNavegacionCantidad = document.getElementById('template-navcantidad').content;
const body = document.querySelector("body");

const fragment = document.createDocumentFragment();
let carrito = {}

// Esperamos a que el documento este listo
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        inyectarCarrito()
    }
    irCarrito();
})
productoscaja.addEventListener('click', e => {
    agregarCarrito(e);
})

productos.addEventListener('click', e => {
    btnAccion(e);
})


// Llamamos al JSON
const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        //console.log(data);
        mostrarProductos(data)
    } catch (error) {
        console.error();
    }
}

const mostrarProductos = data => {
    data.forEach(producto => {
        // Le agregamos el valor seguún el JSON
        const {
            nombre,
            precio,
            imagen,
            id
        } = producto;
        templateProducto.getElementById('nombre').textContent = nombre
        templateProducto.getElementById('precio').textContent = precio
        templateProducto.getElementById('imagen').setAttribute("src", imagen)
        templateProducto.getElementById('btn').dataset.id = id
        const clone = templateProducto.cloneNode(true);
        fragment.appendChild(clone)
    })
    productoscaja.appendChild(fragment);
}

const NombrePulseraPopUp = () => {
    
}

const agregarCarrito = e => {

    if (e.target.classList.contains('formulario__submit')) {
        modificarCarrito(e.target.parentElement);
    }
    e.stopPropagation();
    if (e.target.classList.contains('formulario__submit')) {
        //console.log('holaxd');
        const contenedorOverlay = document.getElementById('overlay');
        const contenedor = document.getElementById('popup');
        const cerrarPopUp = document.getElementById('cerrar-btn');
        const irCarro = document.getElementById('btn-ir');
        const seguirComprando = document.getElementById('btn-seguir');
        contenedorOverlay.classList.add('active');
        contenedor.classList.add('active');

        cerrarPopUp.addEventListener('click', function () {
            contenedorOverlay.classList.remove('active');
        })
        irCarro.addEventListener('click', function () {
            contenedorOverlay.classList.remove('active');
            const slideShow = document.querySelector('.slideshow');
            const cajaProductos = document.querySelector('.contenedor');
            const carrito = document.querySelector("#carrito");
            slideShow.classList.add('quitar-slider');
            cajaProductos.classList.add('quitar-boxproductos');
            carrito.classList.remove('carrito-novisible');
            carrito.classList.add('carrito-visible');
        })
        seguirComprando.addEventListener('click', function () {
            contenedorOverlay.classList.remove('active');
        })
    }
}

const irCarrito = () => {
    const botonNavegacionCarrito = document.querySelector('#carrito-nav');
    // Pasar al Carrito de compras
    botonNavegacionCarrito.addEventListener('click', () => {
        const slideShow = document.querySelector('.slideshow');
        const cajaProductos = document.querySelector('.contenedor');
        const carrito = document.querySelector("#carrito");


        slideShow.classList.add('quitar-slider');
        cajaProductos.classList.add('quitar-boxproductos');
        carrito.classList.remove('carrito-novisible');
        carrito.classList.add('carrito-visible');
    })
}

const modificarCarrito = objeto => {
    //console.log(objeto);
    
    const producto = {
        id: objeto.querySelector('.formulario__submit').dataset.id,
        nombre: objeto.querySelector('#nombre').textContent,
        precio: objeto.querySelector('#precio').textContent,
        imagen: objeto.querySelector("#imagen").src,
        cantidad: 1,
    }

    // Mostramos el valor del nombre por el PopUps
    const NombrePulseraPopUp = document.querySelector('.nombrePulsera');
    NombrePulseraPopUp.innerHTML = `Pulsera ${producto.nombre} añadida`;
    const imagenPulseraPopUP = document.querySelector('.iconcheck');
    imagenPulseraPopUP.innerHTML = `<img src="${producto.imagen}" class="imagenPopUp">`;
    // Verificar si ya existe uno anteriormente para agregarle otro
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1

    }

    // Lo añadimos al objeto
    carrito[producto.id] = {...producto}
    inyectarCarrito();
}


const inyectarCarrito = () => {
    //console.log(carrito);
    productos.innerHTML = '';
    
    Object.values(carrito).forEach(producto => {
        const {
            nombre,
            cantidad,
            id
        } = producto
        templateCarrito.querySelector('th').textContent = id
        templateCarrito.getElementById('carrito-nombre').textContent = nombre
        templateCarrito.getElementById('carrito-cantidad').textContent = cantidad
        templateCarrito.querySelector('.agregar-carrito').dataset.id = id
        templateCarrito.querySelector('.restar-carrito').dataset.id = id

        const resultado = parseInt(producto.precio * producto.cantidad);
        templateCarrito.querySelector('span').textContent = resultado // * producto.cantidad

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    productos.appendChild(fragment)


    pintarFooter();

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = '';
    navC.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="sin-productos">No hay productos Seleccionados</th>
        `;
        navC.innerHTML = `<span class="cero-nav">0</span>`

        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0); // Arreglar parseando

    //console.log(nPrecio);

    templateNavegacionCantidad.querySelector('#cantidadM').textContent = nCantidad;
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone)
    footer.append(fragment);

    const clone2 = templateNavegacionCantidad.cloneNode(true);
    fragment.appendChild(clone2);
    navC.append(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        inyectarCarrito();
    })

    const irComprar = document.getElementById('ir-comprar');
    irComprar.addEventListener('click', () => {
        const contenedorForm = document.getElementById("overlay-form");
        const campos = document.getElementById("form-popup");
        const cerrarForm = document.getElementById("close-btn");

        contenedorForm.classList.add('activ');
        campos.classList.add('activ');

        cerrarForm.addEventListener('click', () => {
            contenedorForm.classList.remove('activ');
        })
    })

}


const btnAccion = e => {
    
    if (e.target.classList.contains('agregar-carrito')) {
        //console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {
            ...producto
        }
        inyectarCarrito();
    }

    if (e.target.classList.contains('restar-carrito')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        inyectarCarrito();
    }

    e.stopPropagation()
}