document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const shippingSelect = document.getElementById("shipping-type");
  const payButton = document.getElementById("btn-pagar");

  // Ajustar altura del header si estamos en carrito.html
  if (window.location.href.includes("carrito.html")) {
    const header = document.getElementById("header");
    if (window.innerWidth >= 768 && header) {
      header.style.height = "400px";
    }
  }

  let cart = JSON.parse(localStorage.getItem("carrito")) || [];

  function updateCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

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

  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(cart));
    updateCart();

    Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  // Cambiar tipo de envío
  shippingSelect.addEventListener("change", updateCart);

  // Cambiar cantidad de productos
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

  // Eliminar producto del carrito
  cartItems.addEventListener("click", function (e) {
    if (e.target.closest(".btn-danger")) {
      const index = e.target.closest(".btn-danger").dataset.index;
      removeItem(index);
    }
  });

  // Pagar
  payButton.addEventListener("click", function (e) {
    e.preventDefault();

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // Validar que el carrito no esté vacío
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "No hay productos en tu carrito para pagar",
        icon: "warning",
      });
      return;
    }

    if (!usuarioLogueado || !usuarioLogueado.email) {
      Swal.fire({
        title: "Inicio de sesión requerido",
        html: `
          <p>Para completar tu compra necesitas iniciar sesión.</p>
          <p>¿Deseas iniciar sesión o registrarte ahora?</p>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Registrarse",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          // Guardar la URL actual para redirigir después del login
          localStorage.setItem("redirectAfterLogin", window.location.href);
          window.location.href = "registro.html"; // Página de login
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.setItem("redirectAfterLogin", window.location.href);
          window.location.href = "registroCuenta.html"; // Página de registro
        }
      });
      return;
    }

    // Validar número de tarjeta
    const cardNumber = document.getElementById("inputNumero").value.trim();
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un número de tarjeta válido",
        icon: "error",
      });
      return;
    }

    // Pago exitoso
    Swal.fire({
      title: "¡Pago exitoso!",
      text: "Tu pedido ha sido procesado",
      icon: "success",
    }).then(() => {
      // Limpiar carrito y formulario
      localStorage.removeItem("carrito");
      cart = [];
      updateCart();

      document.getElementById("inputNumero").value = "";
      document.getElementById("inputNombre").value = "";
      document.getElementById("selectMes").selectedIndex = 0;
      document.getElementById("selectYear").selectedIndex = 0;
      document.getElementById("inputCCV").value = "";
    });
  });

  // Inicializar carrito al cargar la página
  updateCart();
});
