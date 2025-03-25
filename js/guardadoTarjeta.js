// Al inicio del script, después de cargar el carrito
let savedCard = JSON.parse(localStorage.getItem("savedCard")) || null;

// Función para guardar la tarjeta de forma segura
function saveCard() {
  const cardData = {
    number: document.getElementById("inputNumero").value.replace(/\s/g, ""),
    name: document.getElementById("inputNombre").value,
    expiry: {
      month: document.getElementById("selectMes").value,
      year: document.getElementById("selectYear").value,
    },
    // Nota: En producción NUNCA guardes el CVV completo
    last4: document.getElementById("inputNumero").value.slice(-4),
  };

  localStorage.setItem("savedCard", JSON.stringify(cardData));
  return cardData;
}

// Función para cargar los datos de la tarjeta guardada
function loadSavedCard() {
  if (savedCard) {
    document.getElementById("inputNumero").value = savedCard.number.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    );
    document.getElementById("inputNombre").value = savedCard.name;
    document.getElementById("selectMes").value = savedCard.expiry.month;
    document.getElementById("selectYear").value = savedCard.expiry.year;

    Swal.fire({
      title: "Tarjeta cargada",
      html: `Hemos cargado los datos de tu tarjeta terminada en <b>${savedCard.last4}</b>`,
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

// Modificar el evento de pago
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

  // Validación básica
  if (!validateCardForm()) {
    return;
  }

  // Guardar tarjeta antes de procesar
  const cardData = saveCard();

  Swal.fire({
    title: "¿Finalizar compra?",
    html: `
      <p>Total a pagar: <b>${totalPriceElement.textContent}</b></p>
      <p>Tarjeta: **** **** **** ${cardData.last4}</p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Pagar",
    cancelButtonText: "Seguir comprando",
    showDenyButton: true,
    denyButtonText: "Guardar y seguir comprando",
  }).then((result) => {
    if (result.isConfirmed) {
      // Procesar pago
      processPayment();
    } else if (result.isDenied) {
      // Solo guardar tarjeta
      Swal.fire({
        title: "Tarjeta guardada",
        text: "Puedes completar tu compra más tarde",
        icon: "success",
      });
    }
  });
});

// Función para validar el formulario de tarjeta
function validateCardForm() {
  const cardNumber = document
    .getElementById("inputNumero")
    .value.replace(/\s/g, "");
  const cardName = document.getElementById("inputNombre").value;
  const cardMonth = document.getElementById("selectMes").value;
  const cardYear = document.getElementById("selectYear").value;
  const cardCvv = document.getElementById("inputCCV").value;

  if (!cardNumber || cardNumber.length < 16) {
    showValidationError("Por favor ingresa un número de tarjeta válido");
    return false;
  }

  if (!cardName || cardName.length < 3) {
    showValidationError(
      "Por favor ingresa el nombre como aparece en la tarjeta"
    );
    return false;
  }

  if (!cardMonth || !cardYear) {
    showValidationError("Por favor selecciona la fecha de expiración");
    return false;
  }

  if (!cardCvv || cardCvv.length < 3) {
    showValidationError("Por favor ingresa el CVV de 3 dígitos");
    return false;
  }

  return true;
}

function showValidationError(message) {
  Swal.fire({
    title: "Error de validación",
    text: message,
    icon: "error",
  });
}

function processPayment() {
  // Simular procesamiento de pago
  Swal.fire({
    title: "Procesando pago...",
    html: "Por favor espera",
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      // Simular demora de red
      setTimeout(() => {
        Swal.fire({
          title: "¡Pago exitoso!",
          html: `Tu compra por <b>${totalPriceElement.textContent}</b> se completó correctamente`,
          icon: "success",
        }).then(() => {
          // Vaciar carrito pero mantener tarjeta
          localStorage.removeItem("carrito");
          cart = [];
          updateCart();
        });
      }, 2000);
    },
  });
}

// Al cargar la página, cargar tarjeta guardada si existe
loadSavedCard();
