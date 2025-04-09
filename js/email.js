// Inicialización de EmailJS (asegúrate de que esté antes de tu código)
emailjs.init("G5aiXIx2Aw1fqfmBi"); // Tu Public Key ya está correcta

const stepMenuOne = document.querySelector(".formbold-step-menu1");
const stepMenuTwo = document.querySelector(".formbold-step-menu2");
const stepMenuThree = document.querySelector(".formbold-step-menu3");

const stepOne = document.querySelector(".formbold-form-step-1");
const stepTwo = document.querySelector(".formbold-form-step-2");
const stepThree = document.querySelector(".formbold-form-step-3");

const formSubmitBtn = document.querySelector(".formbold-btn");
const formBackBtn = document.querySelector(".formbold-back-btn");
const miFormulario = document.getElementById("miFormulario");

// Asignar eventos a los botones de confirmación
document.querySelectorAll(".formbold-confirm-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.classList.contains("active")) {
      enviarFormulario();
    } else {
      // Lógica para "No, rechazo"
      miFormulario.reset();
      resetearFormulario();
    }
  });
});

// Navegación entre pasos
formSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (stepMenuOne.classList.contains("active")) {
    if (!validarPaso1()) return;

    stepMenuOne.classList.remove("active");
    stepMenuTwo.classList.add("active");
    stepOne.classList.remove("active");
    stepTwo.classList.add("active");
    formBackBtn.classList.add("active");
  } else if (stepMenuTwo.classList.contains("active")) {
    if (!validarPaso2()) return;

    stepMenuTwo.classList.remove("active");
    stepMenuThree.classList.add("active");
    stepTwo.classList.remove("active");
    stepThree.classList.add("active");

    formBackBtn.classList.remove("active");
  }
});

// Botón Atrás
formBackBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (stepMenuTwo.classList.contains("active")) {
    stepMenuOne.classList.add("active");
    stepMenuTwo.classList.remove("active");
    stepOne.classList.add("active");
    stepTwo.classList.remove("active");
    formBackBtn.classList.remove("active");
  } else if (stepMenuThree.classList.contains("active")) {
    stepMenuTwo.classList.add("active");
    stepMenuThree.classList.remove("active");
    stepTwo.classList.add("active");
    stepThree.classList.remove("active");
    formSubmitBtn.textContent = "Siguiente";
  }
});

// Validaciones
function validarPaso1() {
  const campos = ["firstname", "lastname", "dob", "email", "address"];
  let valido = true;

  campos.forEach((campo) => {
    const input = document.getElementById(campo);
    if (!input.value.trim()) {
      input.style.borderColor = "red";
      valido = false;
    } else {
      input.style.borderColor = "";
    }
  });

  if (!valido) alert("Por favor completa todos los campos del primer paso");
  return valido;
}

function validarPaso2() {
  const mensaje = document.getElementById("message");
  if (!mensaje.value.trim()) {
    mensaje.style.borderColor = "red";
    alert("Por favor escribe tu mensaje");
    return false;
  }
  mensaje.style.borderColor = "";
  return true;
}

// Función mejorada para enviar
function enviarFormulario() {
  // Calcular edad
  const dob = document.getElementById("dob").value;
  if (dob) {
    const hoy = new Date();
    const nacimiento = new Date(dob);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    document.getElementById("edad").value = edad;
  }

  // Enviar con EmailJS (REEMPLAZA CON TUS DATOS REALES)
  emailjs
    .sendForm("service_i9vikgg", "template_6adbzaq", miFormulario)
    .then(() => {
      alert("¡Formulario enviado con éxito!");
      miFormulario.reset();
      resetearFormulario();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Error al enviar: " + (error.text || "Por favor intenta más tarde")
      );
    });
}

function resetearFormulario() {
  stepMenuThree.classList.remove("active");
  stepMenuOne.classList.add("active");
  stepThree.classList.remove("active");
  stepOne.classList.add("active");
  formSubmitBtn.textContent = "Siguiente";
}

// Mapa
let map = L.map("mi_mapa").setView([10.014391, -84.214132], 20);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Gold Fish tienda de Pesca | <a href="https://openstreetmap.org">OSM</a>',
}).addTo(map);
let marker = L.marker([10.014391, -84.214132]).addTo(map);
marker.bindPopup("<b>Gold Fihs!</b><br />").openPopup();
