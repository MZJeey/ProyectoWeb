let productosTienda = []; // Array global para almacenar los productos

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tienda");
  const buscador = document.querySelector(".buscador"); // Capturar el input de búsqueda
  const botonBusqueda = document.querySelector(".btn-outline-success");

  // Cambiar el tamaño del header solo en la página "tienda.html"
  if (window.location.href.indexOf("tienda.html") > -1) {
    console.log("Cambiando altura del header");
    const header = document.getElementById("header");
    const texto = document.querySelector(".header__texto");

    // Cambiar solo la altura si estamos en una pantalla grande
    if (window.innerWidth >= 768) {
      if (header) {
        header.style.height = "200px"; // Cambia la altura del header para pantallas grandes
      }
      if (texto) {
        texto.style.display = "none"; // Oculta el texto si lo deseas
      }
    }
  }

  // Cargar productos desde el archivo JSON
  fetch("json/productosTienda.json")
    .then((response) => response.json())
    .then((productos) => {
      productosTienda = productos; // Asignar los productos al array global
      mostrarProductos(productosTienda); // Mostrar todos los productos inicialmente
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));

  // Evento de búsqueda
  botonBusqueda.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    const valorBusqueda = buscador.value.toLowerCase(); // Valor del input en minúsculas
    const productosFiltrados = productosTienda.filter((producto) => {
      const nombre = producto.categoria.nombre.toLowerCase();
      const categoria = producto.categoria.id.toLowerCase();
      const precio = producto.precio.toString(); // Convertir precio a string
      return (
        nombre.includes(valorBusqueda) ||
        categoria.includes(valorBusqueda) ||
        precio.includes(valorBusqueda)
      );
    });
    mostrarProductos(productosFiltrados); // Mostrar productos filtrados
  });

  // También podemos permitir que presionar Enter ejecute la búsqueda
  buscador.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      botonBusqueda.click(); // Simula el clic en el botón de búsqueda
    }
  });
});

function filtrarProducto(categoria) {
  if (categoria === "") {
    mostrarProductos(productosTienda); // Mostrar todos si no hay filtro
  } else {
    const productosFiltrados = productosTienda.filter(
      (producto) => producto.categoria.id === categoria
    );
    mostrarProductos(productosFiltrados);
  }
}
function mostrarProductos(productos) {
  const productosTiendaList = document.getElementById("contenedor-tienda");
  productosTiendaList.innerHTML = ""; // Limpiar el contenedor

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="producto" onclick="verDetalle(${producto.id})">
        <img class="imagen-producto" src="${producto.imagen}" alt="">
        <div class="detalle-producto">
          <h3>${producto.categoria.nombre}</h3>
          <p>${producto.precio}</p>
          <a class="ir-tienda" onclick="verDetalle(${producto.id})">Ver Producto</a>
        </div>
      </div>
    `;
    productosTiendaList.appendChild(card);
  });
}

function verDetalle(id) {
  fetch("json/productosTienda.json")
    .then((response) => response.json())
    .then((productos) => {
      const selectedProduct = productos.find((producto) => producto.id === id);
      if (selectedProduct) {
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(selectedProduct)
        );
        window.location.href = "detalleProducto.html"; // Redirige a la página de detalles
      }
    })
    .catch((error) => console.error("Hubo un error", error));
}
