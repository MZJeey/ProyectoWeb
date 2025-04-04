let productosTienda = []; // Array global para almacenar los productos

// Cache de elementos DOM
const DOM = {
  contenedor: document.getElementById("contenedor-tienda"),
  buscador: document.querySelector(".buscador"),
  botonBusqueda: document.querySelector(".btn-outline-success"),
  header: document.getElementById("header"),
  textoHeader: document.querySelector(".header__texto"),
};

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  await inicializarTienda();
  configurarEventos();
});

async function inicializarTienda() {
  // Cambiar el tamaño del header solo en la página "tienda.html"
  if (window.location.href.includes("tienda.html")) {
    ajustarHeader();
  }

  try {
    const response = await fetch("json/productosTienda.json");
    productosTienda = await response.json();
    mostrarProductos(productosTienda);
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
    mostrarErrorAlCargar();
  }
}

function configurarEventos() {
  // Evento de búsqueda (click y enter)
  DOM.botonBusqueda.addEventListener("click", buscarProductos);
  DOM.buscador.addEventListener(
    "keypress",
    (e) => e.key === "Enter" && buscarProductos(e)
  );
}

function ajustarHeader() {
  if (window.innerWidth >= 768) {
    if (DOM.header) DOM.header.style.height = "200px";
    if (DOM.textoHeader) DOM.textoHeader.style.display = "none";
  }
}

function buscarProductos(event) {
  if (event) event.preventDefault();

  const valorBusqueda = DOM.buscador.value.toLowerCase();
  const productosFiltrados = productosTienda.filter(
    (producto) =>
      producto.categoria.nombre.toLowerCase().includes(valorBusqueda) ||
      producto.categoria.id.toLowerCase().includes(valorBusqueda) ||
      producto.precio.toString().includes(valorBusqueda)
  );

  mostrarProductos(productosFiltrados);
}

function filtrarProducto(categoria) {
  const productosFiltrados = categoria
    ? productosTienda.filter((p) => p.categoria.id === categoria)
    : productosTienda;

  mostrarProductos(productosFiltrados);
}

function mostrarProductos(productos) {
  DOM.contenedor.innerHTML = productos
    .map(
      (producto) => `
    <div class="card">
      <div class="producto" onclick="verDetalle(${producto.id})">
        <img class="imagen-producto" src="${producto.imagen}" alt="${
        producto.categoria.nombre
      }" loading="lazy">
        <div class="detalle-producto-tienda">
          <h3>${producto.categoria.nombre}</h3>
          <p>${producto.precio.toLocaleString()}</p>
          <div class="container-buton">
            <button class="btn-producto" onclick="verDetalle(${
              producto.id
            }, event)">Ver</button>
            <button class="btn-compra" onclick="comprarAhora(${
              producto.id
            }, event)">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

async function verDetalle(id, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  try {
    const producto = productosTienda.find((p) => p.id === id);
    if (!producto) throw new Error("Producto no encontrado");

    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    window.location.href = "detalleProducto.html";
  } catch (error) {
    console.error("Error al ver detalle:", error);
    alert("No se pudo cargar el producto");
  }
}

async function comprarAhora(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    const producto = productosTienda.find((p) => p.id === productId);
    if (!producto) throw new Error("Producto no encontrado");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const itemExistente = carrito.find((item) => item.id === productId);

    if (itemExistente) {
      itemExistente.quantity = (itemExistente.quantity || 1) + 1;
    } else {
      carrito.push({
        ...producto,
        quantity: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Opcional: Mostrar notificación
    mostrarNotificacion("Producto agregado al carrito");

    // Redirección opcional
    // window.location.href = "carrito.html";
  } catch (error) {
    console.error("Error en comprarAhora:", error);
    mostrarNotificacion("Error al agregar al carrito", "error");
  }
}

// Helper functions
function mostrarErrorAlCargar() {
  DOM.contenedor.innerHTML = `
    <div class="error-carga">
      <p>No se pudieron cargar los productos. Por favor intenta más tarde.</p>
    </div>
  `;
}

function mostrarNotificacion(mensaje, tipo = "success") {
  const notificacion = document.createElement("div");
  notificacion.className = `notificacion ${tipo}`;
  notificacion.textContent = mensaje;
  document.body.appendChild(notificacion);

  setTimeout(() => notificacion.remove(), 3000);
}
