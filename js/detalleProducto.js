// Primero, carga el producto desde localStorage
const producto = JSON.parse(localStorage.getItem("selectedProduct"));
console.log(producto); // Verificar si el producto se está recuperando correctamente

if (producto) {
  document.getElementById("product-detail").innerHTML = `
    <div class="imagen-detalle">
      <img class="detalle-imagen" src="${producto.imagen}" alt="" />
    </div>
    <div class="detalle-articulos">
      <div class="otros-detalles">
        <h1 class="justificar categoria">${producto.categoria.id}</h1>
        <h1 class="justificar">Nombre: ${producto.categoria.nombre}</h1>
        <h2 class="justificar">Precio: ${producto.precio}</h2>
        <h2 class="justificar">Descripcion: ${producto.categoria.descripcion}</h2>
        <div class="agregar">
        <button class="btn-agregar" id="btn-agregar" onclick="agregarAlCarrito()">Agregar al carrito</button>
        
      </div>
      </div>
    </div>
  `;
} else {
  document.getElementById("product-detail").innerHTML =
    "<p>No se encontró el producto.</p>";
}
// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si estamos en la página de detalle del producto
  if (window.location.href.indexOf("detalleProducto.html") > -1) {
    console.log("Cambiando altura del header");
    // Cambiar la altura del header a 300px
    const header = document.getElementById("header");
    if (header) {
      header.style.height = "200px";
    }
    const texto = document.getElementById("header__texto");
    if (texto) {
      texto.style.display = "none";
    }
  }
});
