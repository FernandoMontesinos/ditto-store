// Seleccionamos los elementos del HTML
const productoscaja = document.getElementById('contenedor-productos');
const productos = document.getElementById('productos');
const footer = document.getElementById('footer');
const navC = document.getElementById('carritonav');
const templateProducto = document.getElementById('producto-template').content; // Aca poner Content xd
const templateFooter = document.getElementById('footer-template').content;
const templateCarrito = document.getElementById('carrito-template').content;
const templateNavegacionCantidad = document.getElementById('template-navcantidad').content;
const botonNavegacionCarrito = document.getElementById('carrito-nav');
const templatePopUp = document.getElementById("templatepopup").content;
const templateFormulario = document.getElementById('formularioTemplate').content;
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
        templateProducto.getElementById('nombre').textContent = producto.nombre
        templateProducto.getElementById('precio').textContent = producto.precio
        templateProducto.getElementById('imagen').setAttribute("src", producto.imagen)
        templateProducto.getElementById('btn').dataset.id = producto.id
        const clone = templateProducto.cloneNode(true);
        fragment.appendChild(clone)
    })
    productoscaja.appendChild(fragment);
}

// Le agregamos funcionanlidad al boton 
const agregarCarrito = e => {
    //console.log(e.target.classList.contains('formulario__submit'));

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
        })
        seguirComprando.addEventListener('click', function () {
            contenedorOverlay.classList.remove('active');
        })
    }
}

const modificarCarrito = objeto => {
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.formulario__submit').dataset.id,
        nombre: objeto.querySelector('#nombre').textContent,
        precio: objeto.querySelector('#precio').textContent,
        cantidad: 1
    }
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
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.getElementById('carrito-nombre').textContent = producto.nombre
        templateCarrito.getElementById('carrito-cantidad').textContent = producto.cantidad
        templateCarrito.querySelector('.agregar-carrito').dataset.id = producto.id
        templateCarrito.querySelector('.restar-carrito').dataset.id = producto.id

        const resultado = parseInt(producto.precio * producto.cantidad);
        templateCarrito.querySelector('span').textContent = resultado 

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
        const clone2 = templatePopUp.cloneNode(true);
        fragment.appendChild(clone2)
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

    const btnComprar = document.getElementById('ir-comprar');
    btnComprar.addEventListener('click', () => {
      templateFormulario.querySelector("#formularioTemplate").textContent = nCantidad;

      // 
      const clone3 = templateFormulario.cloneNode(true);
      fragment.appendChild(clone3);
      body.append(fragment);
    })
}

const btnAccion = e => {
    //console.log(e.target)
    if (e.target.classList.contains('agregar-carrito')) {
        //console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
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


// Slider Jquery ---------------------------------------------------------------------------
 $(document).ready(function () {
    let imgItems = $(".slider li").length; // Numero de imagenes
    let imgPosition = 1;
    // Para iterar sobre la paginacion
    for (i = 0; i < imgItems; i++) {
        $(".pagination").append('<li><span class="fas fa-circle"></span></li>');    
    }


    $(".slider li").hide(); // Ocultamos las imagenes
    $(".slider li:first").show(); // Mostramos solo la primera
    $(".pagination li:first").css({ 
        "color": "#F5D655"
    });

    // Funciones
    $(".pagination li").click(pagination);
    $(".right span").click(nextSlider);
    $(".left span").click(prevSlider);

     
    setInterval(function() {
        nextSlider(); 
    }, 4000);

    function pagination() {
        // Para el numero de paginacion
        var paginationPosition = $(this).index() + 1; 
        console.log(paginationPosition);

        $(".slider li").hide();
        $('.slider li:nth-child('+ paginationPosition +')').fadeIn();
        
        $(".pagination li").css({ 
            "color": "#858585"
        })
        $(this).css({ 
            "color": "#F5D655"
        });

        imgPosition = paginationPosition;
    }

    function nextSlider() {
        if(imgPosition >= imgItems) {
           imgPosition = 1;  
        } else {
            imgPosition++;
        }
        $(".pagination li").css({ "color": "#858585"})
        $('.pagination li:nth-child(' + imgPosition + ')').css({ "color": "#F5D655"});
        
        $(".slider li").hide();
        $('.slider li:nth-child('+ imgPosition +')').fadeIn();
    }

    function prevSlider() {
        if(imgPosition <= 1) {
           imgPosition = imgItems;  
        } else {
            imgPosition--;
        }
        $(".pagination li").css({ "color": "#858585"})
        $('.pagination li:nth-child(' + imgPosition + ')').css({ "color": "#F5D655"});
        
        $(".slider li").hide();
        $('.slider li:nth-child('+ imgPosition +')').fadeIn();
    }


});