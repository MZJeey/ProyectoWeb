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

  payButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Validaciones
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

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
        html: `<p>Para completar tu compra necesitas iniciar sesión.</p>
               <p>¿Deseas iniciar sesión o registrarte ahora?</p>`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Registrarse",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("redirectAfterLogin", window.location.href);
          window.location.href = "registro.html";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.setItem("redirectAfterLogin", window.location.href);
          window.location.href = "registroCuenta.html";
        }
      });
      return;
    }

    const cardNumber = document.getElementById("inputNumero").value.trim();
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un número de tarjeta válido",
        icon: "error",
      });
      return;
    }

    // Procesar pago
    Swal.fire({
      title: "Procesando pago...",
      text: "Por favor espera un momento",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    // Simular procesamiento de pago
    setTimeout(() => {
      generarFactura();
    }, 1500);
  });

  function generarFactura() {
    // Preparar datos de factura
    const facturaData = {
      numeroFactura: "FACT-" + Date.now().toString().slice(-8),
      clienteNombre:
        document.getElementById("inputNombre").value.trim() ||
        "Cliente no registrado",
      fecha: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      tipoEnvio:
        shippingSelect.value === "tienda"
          ? "Recogida en tienda"
          : "Envío a domicilio",
      productos: [],
      total: 0,
    };

    // Calcular total y agregar productos
    facturaData.total = cart.reduce((total, item) => {
      const price = parseFloat(item.precio.replace(/[^0-9.-]+/g, ""));
      const shippingCost = shippingSelect.value === "postal" ? 5 : 0;
      const quantity = item.quantity || 1;
      const subtotal = price * quantity;
      const totalItem = subtotal + shippingCost;

      facturaData.productos.push({
        nombre: item.categoria.nombre,
        precio: price.toFixed(2),
        cantidad: quantity,
        subtotal: subtotal.toFixed(2),
        envio: shippingCost.toFixed(2),
        total: totalItem.toFixed(2),
        imagen: item.imagen,
      });

      return total + totalItem;
    }, 0);

    // Formatear valores monetarios
    facturaData.total = facturaData.total.toFixed(2);

    // Guardar factura y limpiar carrito
    localStorage.setItem("facturaData", JSON.stringify(facturaData));
    localStorage.removeItem("carrito");

    // Limpiar formulario
    [
      "inputNumero",
      "inputNombre",
      "selectMes",
      "selectYear",
      "inputCCV",
    ].forEach((id) => {
      document.getElementById(id).value = "";
    });

    // Mostrar confirmación y redirigir
    Swal.fire({
      title: "¡Pago exitoso!",
      text: "Serás redirigido a tu factura",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "factura.html";
    });
  }

  // Inicializar carrito
  updateCart();
});
