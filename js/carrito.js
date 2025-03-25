document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const shippingSelect = document.getElementById("shipping-type");
  const payButton = document.querySelector(".btn-enviar");

  // Cargar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualizar el carrito en la vista
  // Función updateCart corregida
  function updateCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    // Verificar si hay productos antes de calcular
    if (cart.length === 0) {
      totalPriceElement.textContent = "$0.00";
      return;
    }

    const shippingCost = shippingSelect.value === "postal" ? 5 : 0;

    cart.forEach((item, index) => {
      const price = parseFloat(item.precio.replace(/[^0-9.-]+/g, ""));
      const quantity = item.quantity || 1;
      const itemSubtotal = price * quantity;
      subtotal += itemSubtotal;

      cartItems.innerHTML += `
        <tr>
          <td><img src="${item.imagen}" alt="${
        item.categoria.nombre
      }" width="50"></td>
          <td>${item.categoria.nombre}</td>
          <td>${item.precio}</td>
          <td>
            <input type="number" min="1" value="${quantity}" 
                   class="form-control quantity-input" 
                   data-index="${index}">
          </td>
          <td>$${itemSubtotal.toFixed(2)}</td>
          <td>$${shippingCost.toFixed(2)}</td>
          <td>$${(itemSubtotal + shippingCost).toFixed(2)}</td>
          <td>
            <button class="btn btn-danger btn-sm" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });

    const total = subtotal + shippingCost;
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }
  // Eliminar producto del carrito
  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(cart));
    updateCart();

    // Mostrar notificación
    Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  // Event listeners
  shippingSelect.addEventListener("change", updateCart);

  cartItems.addEventListener("change", function (e) {
    if (e.target.classList.contains("quantity-input")) {
      const index = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value);

      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem("carrito", JSON.stringify(cart));
        updateCart();
      }
    }
  });

  cartItems.addEventListener("click", function (e) {
    if (e.target.closest(".btn-danger")) {
      const index = e.target.closest(".btn-danger").dataset.index;
      removeItem(index);
    }
  });

  // Procesar pago
  payButton.addEventListener("click", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "No hay productos en tu carrito",
        icon: "warning",
      });
      return;
    }

    // Validar formulario de tarjeta aquí (puedes agregar más validaciones)
    const cardNumber = document.getElementById("inputNumero").value;
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un número de tarjeta válido",
        icon: "error",
      });
      return;
    }

    // Simular pago exitoso
    Swal.fire({
      title: "¡Pago exitoso!",
      text: "Tu pedido ha sido procesado",
      icon: "success",
    }).then(() => {
      // Vaciar carrito después de pagar
      localStorage.removeItem("carrito");
      cart = [];
      updateCart();

      // Opcional: Redirigir a página de confirmación
      // window.location.href = "confirmacion.html";
    });
  });

  // Inicializar carrito
  updateCart();
});
