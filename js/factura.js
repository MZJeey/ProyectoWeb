document.addEventListener("DOMContentLoaded", function () {
  // Obtener datos de la factura desde localStorage
  const invoiceData = JSON.parse(localStorage.getItem("facturaData"));

  if (!invoiceData) {
    // Redirigir si no hay datos
    window.location.href = "carrito.html";
    return;
  }

  // Mostrar información de la factura
  document.getElementById("invoice-number").textContent =
    invoiceData.numeroFactura;
  document.getElementById("invoice-date").textContent = invoiceData.fecha;
  document.getElementById("customer-name").textContent =
    invoiceData.clienteNombre;
  document.getElementById("shipping-method").textContent =
    invoiceData.tipoEnvio;
  document.getElementById("invoice-total").textContent = invoiceData.total;

  // Llenar tabla de productos
  const itemsContainer = document.getElementById("invoice-items");
  invoiceData.productos.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" class="product-img"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.subtotal}</td>
            <td>${producto.envio}</td>
            <td>${producto.total}</td>
        `;
    itemsContainer.appendChild(row);
  });
});
