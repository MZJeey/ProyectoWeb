document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const informacion = document.querySelector(".seccion-carrusel");

  document.addEventListener("scroll", function () {
    if (informacion.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}
