// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el producto del localStorage
  const producto = JSON.parse(localStorage.getItem("selectedProduct"));
  console.log("Producto cargado:", producto); // Depuración mejorada

  if (producto) {
    // Mostrar los detalles del producto
    document.getElementById("product-detail").innerHTML = `
    
      <div class="imagen-detalle">
      
        <img class="detalle-imagen" src="${producto.imagen}" alt="${producto.categoria.nombre}" />
      </div>
      <div class="detalle-articulos">
        
        <div class="otros-detalles">
          <h1 class="justificar">Nombre: ${producto.categoria.nombre}</h1>
          <h2 class="justificar">Precio: ${producto.precio}</h2>
          <h2 class="justificar">Descripción: ${producto.categoria.descripcion}</h2>
          <div class="contenedor-botones">
            <button class="btn-agregar" id="btn-agregar">Agregar al carrito</button>
             <button class="btn-regresar" id="btn-regresar" >Regresar</button>
          </div>
        </div>
      </div>
    `;

    // Configurar el evento del botón después de que el HTML se haya insertado
    document
      .getElementById("btn-agregar")
      .addEventListener("click", function () {
        agregarAlCarrito(producto.id);
      });
    document
      .getElementById("btn-regresar")
      .addEventListener("click", function () {
        regresar();
      });
  } else {
    document.getElementById("product-detail").innerHTML = `
      <div class="error-producto">
        <p>No se encontró el producto.</p>
        <a href="tienda.html" class="btn-volver">Volver a la tienda</a>
      </div>
    `;
  }

  // Ajustar el header solo en tienda.html
  if (window.location.pathname.includes("tienda.html")) {
    console.log("Ajustando header para tienda.html");
    const header = document.getElementById("header");
    const texto = document.querySelector(".header__texto");

    if (window.innerWidth >= 768) {
      if (header) header.style.height = "200px";
      if (texto) texto.style.display = "none";
    }
  }
});

// Función mejorada para agregar al carrito con confirmación
function agregarAlCarrito(productId) {
  console.log("Agregando producto al carrito:", productId);

  fetch("json/productosTienda.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar productos");
      return response.json();
    })
    .then((productos) => {
      const producto = productos.find((p) => p.id === productId);

      if (!producto) throw new Error("Producto no encontrado");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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

      // Notificación con opciones
      Swal.fire({
        title: "¡Producto agregado!",
        html: `

          <div style="margin: 1rem 0; text-align: center;">
          <img src="${producto.imagen}" 
               style="max-height: 120px; border-radius: 8px; border: 1px solid #eee;"
               alt="${producto.categoria.nombre}"/>
          <h4 style="margin: 0.5rem 0 0; color: #333;">${producto.categoria.nombre}</h4>
          <p style="color: #28a745; font-weight: bold;">${producto.precio}</p>
        </div>
        <p>¿Qué deseas hacer ahora?</p>`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
        showDenyButton: true,
        denyButtonText: "Ver carrito",
        footer: `Total en carrito: ${carrito.length} producto(s)`,
        timer: 5000, // Cierra automáticamente después de 5 segundos
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Ir al carrito para pagar
          window.location.href = "carrito.html";
        } else if (result.isDenied) {
          // Mostrar vista previa del carrito
          mostrarVistaPreviaCarrito(carrito);
        }
        // Si hace clic en "Seguir comprando" o se cierra, no hacer nada
      });
    })
    .catch((error) => {
      console.error("Error al agregar al carrito:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
}
function regresar() {
  window.location.href = "tienda.html";
}

// Función para mostrar vista previa del carrito
function mostrarVistaPreviaCarrito(carrito) {
  let listaProductos = "";
  let total = 0;

  carrito.forEach((item) => {
    const precio =
      parseFloat(item.precio.replace(/[^0-9.-]+/g, "")) * item.quantity;
    total += precio;
    listaProductos += `
      <div class="carrito-item">
        <img src="${item.imagen}" width="40" style="margin-right:10px">
        <span>${item.categoria.nombre} (${item.quantity})</span>
        <span style="margin-left:auto">$${precio.toFixed(2)}</span>
      </div>
    `;
  });

  Swal.fire({
    title: "Tu carrito de compras",
    html: `
      <div style="max-height:400px; overflow-y:auto; margin-bottom:1rem">
        ${listaProductos || "<p>No hay productos en el carrito</p>"}
      </div>
      <div style="font-weight:bold; border-top:1px solid #eee; padding-top:1rem">
        Total: $${total.toFixed(2)}
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Pagar ahora",
    cancelButtonText: "Seguir comprando",
    showDenyButton: true,
    denyButtonText: "Vaciar carrito",
    width: "800px",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "carrito.html";
    } else if (result.isDenied) {
      Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("carrito");
          Swal.fire({
            title: "Carrito vaciado",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    }
  });
}
