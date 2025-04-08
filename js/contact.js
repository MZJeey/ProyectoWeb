document.addEventListener("DOMContentLoaded", function () {
  loadData();

  document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);

      let nombre = this.name.value;
      let correo = this.email.value;

      fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            this.reset();
          } else {
            alert("Su mensaje no pudo ser enviado.");
          }
        })
        .catch((error) => {
          alert("Error:" + error.message);
        });
    });
});

// FormularioFooter
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formFooter")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);

      fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            const modal = new bootstrap.Modal(
              document.getElementById("staticBackdrop")
            );
            modal.show();
            this.reset();
          } else {
            alert("No se pudo completar la suscripción.");
          }
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    });
});

let currentImageIndex = 0;
let interval; // Para almacenar el intervalo de cambio

function loadImages() {
  fetch("json/productosTienda.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error en la carga del JSON");
      }
      return res.json();
    })
    .then((productos) => {
      if (!productos || productos.length === 0) {
        console.error("No se encontraron productos en el JSON");
        return;
      }

      const imagenElement = document.getElementById("imagen");
      if (!imagenElement) {
        console.error("No se encontró el elemento con id 'imagen'");
        return;
      }

      const totalImages = productos.length;

      // Función para cambiar la imagen
      function changeImage() {
        imagenElement.src = productos[currentImageIndex].imagen;
        imagenElement.alt = productos[currentImageIndex].categoria.nombre;
        imagenElement.style.display = "block";

        currentImageIndex = (currentImageIndex + 1) % totalImages;
      }

      interval = setInterval(changeImage, 5000);
      changeImage();
    })
    .catch((error) => {
      console.error("Error al cargar imágenes:", error);
    });
}

document.addEventListener("DOMContentLoaded", loadImages);
