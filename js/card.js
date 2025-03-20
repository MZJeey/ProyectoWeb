document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");

  // Cargar productos desde el archivo JSON
  fetch("json/producto.json")
    .then((response) => response.json())
    .then((productos) => {
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

        contenedor.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));
});

function verDetalle(index) {
  fetch("json/producto.json")
    .then((response) => response.json())
    .then((productos) => {
      const selectedProduct = productos.find(
        (producto) => producto.id === index
      );
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
