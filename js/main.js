const frutasTienda = [
  {
    id: 1,
    nombre: "Anana",
    precio: 3000,
    ruta_img: "assets/anana.jpg",
  },
  {
    id: 2,
    nombre: "Arandano",
    precio: 5000,
    ruta_img: "assets/arandano.jpg",
  },
  {
    id: 3,
    nombre: "Banana",
    precio: 1000,
    ruta_img: "assets/banana.jpg",
  },
  {
    id: 4,
    nombre: "Frambuesa",
    precio: 4000,
    ruta_img: "assets/frambuesa.png",
  },
  {
    id: 5,
    nombre: "Frutilla",
    precio: 3000,
    ruta_img: "assets/frutilla.jpg",
  },
  {
    id: 6,
    nombre: "Kiwi",
    precio: 2000,
    ruta_img: "assets/kiwi.jpg",
  },
  {
    id: 7,
    nombre: "Mandarina",
    precio: 800,
    ruta_img: "assets/mandarina.jpg",
  },
  {
    id: 8,
    nombre: "Naranja",
    precio: 9000,
    ruta_img: "assets/naranja.jpg",
  },
  {
    id: 9,
    nombre: "Pera",
    precio: 2500,
    ruta_img: "assets/pera.jpg",
  },
  {
    id: 10,
    nombre: "Pomelo Amarillo",
    precio: 2000,
    ruta_img: "assets/pomelo-amarillo.jpg",
  },
  {
    id: 11,
    nombre: "Pomelo Rojo",
    precio: 2000,
    ruta_img: "assets/pomelo-rojo.jpg",
  },
  {
    id: 12,
    nombre: "Sandia",
    precio: 980,
    ruta_img: "assets/sandia.jpg",
  },
  {
    id: 13,
    nombre: "Manzana",
    precio: 1500,
    ruta_img: "assets/manzana.jpg",
  },
];

/*---------------------
VARIABLES DEL DOM
-----------------------*/
let carrito = [];
let htmlCarrito = "";

/*---------------------
VARIABLES DEL DOM
-----------------------*/
const barraBusqueda = document.getElementById("barra-busqueda");

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

const datoAlumno = document.getElementById("dato-alumno");

const contadorCarrito = document.getElementById("contador-carrito");

const totalCarrito = document.getElementById("total-carrito");

const botonOrdenarPrecio = document.getElementById("boton-ordenar-precio");

const botonOrdenarNombre = document.getElementById("boton-ordenar-nombre");

/*---------------------
ESCUCHADORES DE EVENTOS
-----------------------*/
/*input se puede utilizar si nos interesa que se detecte un cambio
de pegar texto con el mouse sin utilizar el teclado
*/
barraBusqueda.addEventListener("input", filtrarProducto);

/*---------------------
 crea una copia del array original con slice()
 y luego lo ordena con sort()
-----------------------*/

botonOrdenarPrecio.addEventListener("click", function () {
  const productosOrdenados = frutasTienda
    .slice()
    .sort((a, b) => a.precio - b.precio);
  mostrarLista(productosOrdenados);
});

/*---------------------
    crea una copia del array original con slice()
    y la ordena alfabeticamente con sort() y localeCompare()
-----------------------*/

botonOrdenarNombre.addEventListener("click", function () {
  const productosOrdenados = frutasTienda
    .slice()
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  mostrarLista(productosOrdenados);
});

/*---------------------
        FUNCIONES
-----------------------*/

function mostrarLista(array) {
  let htmlProductos = "";
  array.forEach((fruta) => {
    htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}$</p>
            <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `;
  });
  contenedorProductos.innerHTML = htmlProductos;
}

function filtrarProducto() {
  let valorBusqueda = barraBusqueda.value.toLowerCase();

  let productosFiltrados = frutasTienda.filter((fruta) => {
    return fruta.nombre.toLowerCase().includes(valorBusqueda);
  });

  mostrarLista(productosFiltrados);
}

function agregarACarrito(idFruta) {
  carrito.push(frutasTienda.find((fruta) => fruta.id == idFruta));
  mostrarCarrito();

  actualizarCarrito();
}

function mostrarCarrito() {
  htmlCarrito = "<ul>";
  carrito.forEach((fruta, index) => {
    htmlCarrito += `
        <li class="bloque-item">
        <p class="nombre-item">${fruta.nombre} - ${fruta.precio}</p>
        <button class="boton-eliminar" onclick="eliminarDelCarrito1(${index})">Eliminar</button>
        </li>   
        `;
  });
  htmlCarrito += `
        </ul>
        <div> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>
    `;

  contenedorCarrito.innerHTML = htmlCarrito;
  actualizarContador();
}

// Eliminamos por indice
function eliminarDelCarrito1(indiceDelObj) {
  console.log("Se elimina por indice");
  console.log(indiceDelObj);
  carrito.splice(indiceDelObj, 1);
  mostrarCarrito();

  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();

  vaciarCarritoLocalStorage();
}

function cargarCarrito(params) {
  console.log("Cargando carrito desde el local storage al JS");
  let textoCarritoLeido = localStorage.getItem("carrito");

  if (!textoCarritoLeido) {
    mostrarCarrito();
  } else {
    carrito = JSON.parse(textoCarritoLeido);
    mostrarCarrito();
  }
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarritoLocalStorage() {
  localStorage.removeItem("carrito");
}

/*---------------------
 datos del alumno
 consologea el dato y lo muestra en el HTML
-----------------------*/

function imprimirDatoAlumno() {
  const alumno = {
    dni: "36069887",
    nombre: "Juan Manuel",
    apellido: "Depaolo",
  };
  console.log(
    `Alumno: ${alumno.apellido}, ${alumno.nombre} - DNI: ${alumno.dni}`
  );
  datoAlumno.innerText = ` ${alumno.nombre} ${alumno.apellido} `;
}

/*-------------------------------------------------------------

    actualiza el contador de productos y el total del carrito
    usando reduce() para sumar los precios

----------------------------------------------------------------------*/

function actualizarContador() {
  const cantidad = carrito.length;
  const total = carrito.reduce(
    (acumulador, fruta) => acumulador + fruta.precio,
    0
  );
  if (cantidad > 0) {
    contadorCarrito.style.display = "inline";
    contadorCarrito.innerText = `Carrito: ${cantidad} productos`;
    totalCarrito.innerText = `Total: $${total}`;
  } else {
    contadorCarrito.style.display = "none";
    totalCarrito.innerText = `Total: $0`;
  }
}

function init() {
  mostrarLista(frutasTienda);
  cargarCarrito();
  mostrarCarrito();
  imprimirDatoAlumno();
}

init();
