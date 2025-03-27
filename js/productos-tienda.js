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
        header.style.height = "200px";
      }
      if (texto) {
        texto.style.display = "none";
      }
    }
  }

  // Cargar productos desde el archivo JSON
  fetch("json/productosTienda.json")
    .then((response) => response.json())
    .then((productos) => {
      productosTienda = productos;
      mostrarProductos(productosTienda);
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));

  // Evento de búsqueda
  botonBusqueda.addEventListener("click", (event) => {
    event.preventDefault();
    const valorBusqueda = buscador.value.toLowerCase();
    const productosFiltrados = productosTienda.filter((producto) => {
      const nombre = producto.categoria.nombre.toLowerCase();
      const categoria = producto.categoria.id.toLowerCase();
      const precio = producto.precio.toString();
      return (
        nombre.includes(valorBusqueda) ||
        categoria.includes(valorBusqueda) ||
        precio.includes(valorBusqueda)
      );
    });
    mostrarProductos(productosFiltrados);
  });

  // También podemos permitir que presionar Enter ejecute la búsqueda
  buscador.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      botonBusqueda.click();
    }
  });
});

function filtrarProducto(categoria) {
  if (categoria === "") {
    mostrarProductos(productosTienda);
  } else {
    const productosFiltrados = productosTienda.filter(
      (producto) => producto.categoria.id === categoria
    );
    mostrarProductos(productosFiltrados);
  }
}
function mostrarProductos(productos) {
  const productosTiendaList = document.getElementById("contenedor-tienda");
  productosTiendaList.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="producto" onclick="verDetalle(${producto.id})">
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.categoria.nombre}">
        <div class="detalle-producto">
          <h3>${producto.categoria.nombre}</h3>
          <p>${producto.precio}</p>
          <div class="botones">
                <button class="btn-ver" onclick="verDetalle(${producto.id})">Ver Producto</button>
                <button class="btn-comprar" onclick="comprarAhora(${producto.id}, event)">Comprar</button>
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
        window.location.href = "detalleProducto.html";
      }
    })
    .catch((error) => console.error("Hubo un error", error));
}

function comprarAhora(productId, event) {
  // Detenemos la propagación del evento completamente
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  console.log("Ejecutando comprarAhora para producto:", productId); // Debug

  fetch("json/productostienda.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar productos");
      return response.json();
    })
    .then((productos) => {
      const producto = productos.find((p) => p.id === productId);

      if (!producto) throw new Error("Producto no encontrado");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      console.log("Carrito actual:", carrito);

      const productoExistente = carrito.find((item) => item.id === productId);

      if (productoExistente) {
        productoExistente.quantity = (productoExistente.quantity || 1) + 1;
      } else {
        carrito.push({
          id: producto.id,
          imagen: producto.imagen,
          precio: producto.precio,
          categoria: {
            nombre: producto.categoria.nombre,
            id: producto.categoria.id,
          },
          quantity: 1,
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("Carrito actualizado:", carrito);

      // Redirección opcional - puedes comentarla para debuggear
      window.location.href = "carrito.html";
    })
    .catch((error) => {
      console.error("Error en comprarAhora:", error);
      // Mostrar mensaje al usuario
      alert("Error al agregar al carrito: " + error.message);
    });
}

{
  /* <a class="ir-tienda" onclick="verDetalle(${producto.id})">Ver Producto</a> */
}
