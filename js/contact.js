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
