document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");

  fetch("json/producto.json")
    .then((response) => response.json())
    .then((productos) => {
      productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <div class="producto">
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.categoria.nombre}">
            <div class="detalle-producto">
              <h3>${producto.categoria.nombre}</h3>
              <p>${producto.precio}</p>
              <div class="botones">
                <button class="btn-ver" onclick="verDetalle(${producto.id})">Ver Producto</button>
                <button class="btn-comprar" onclick="comprarAhora(${producto.id}, event)">Comprar</button>
              </div>
            </div>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));
});

// Función optimizada para comprar
function comprarAhora(productId, event) {
  // Detenemos la propagación del evento completamente
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  console.log("Ejecutando comprarAhora para producto:", productId); // Debug

  fetch("json/producto.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar productos");
      return response.json();
    })
    .then((productos) => {
      const producto = productos.find((p) => p.id === productId);

      if (!producto) throw new Error("Producto no encontrado");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      console.log("Carrito actual:", carrito); // Debug

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
      console.log("Carrito actualizado:", carrito); // Debug

      // Redirección opcional - puedes comentarla para debuggear
      window.location.href = "carrito.html";
    })
    .catch((error) => {
      console.error("Error en comprarAhora:", error);
      // Mostrar mensaje al usuario
      alert("Error al agregar al carrito: " + error.message);
    });
}

// Función para ver detalles
function verDetalle(index) {
  fetch("json/producto.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return response.json();
    })
    .then((productos) => {
      const selectedProduct = productos.find(
        (producto) => producto.id === index
      );

      if (selectedProduct) {
        // Guardar producto completo en localStorage
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify({
            id: selectedProduct.id,
            imagen: selectedProduct.imagen,
            precio: selectedProduct.precio,
            categoria: {
              nombre: selectedProduct.categoria.nombre,
              id: selectedProduct.categoria.id,
              descripcion: selectedProduct.categoria.descripcion,
            },
            // Puedes agregar más propiedades si son necesarias
          })
        );

        // Redirigir a la página de detalle
        window.location.href = "detalleProducto.html";
      } else {
        throw new Error("Producto no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al ver detalles:", error);

      // Mostrar notificación al usuario
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el producto. Por favor intenta nuevamente.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    });
}
