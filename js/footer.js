$(document).ready(function () {
  // Crear el contenido del footer
  const footerHTML = `
      <footer class="footer">
        <div class="footer-logo">
        
        </div>
        <p class="footer-texto">Ven y disfruta.<br>de nuestra gran variedad.</p>
        <div class="iconos-redes-sociales">
          <a href="https://twitter.com/freecodecampES" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-twitter"></i>
          </a>
          <a href="https://github.com/freeCodeCamp/freeCodeCamp" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-github"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/freecodecamp/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="mailto:janedoe@micorreo.com" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-envelope"></i>
          </a>
        </div>
        <div class="derechos-de-autor">Creado por Developers M.C (2025) &#169;</div>
      </footer>
    `;

  // Agregar el footer al final del body
  $("body").append(footerHTML);
});
