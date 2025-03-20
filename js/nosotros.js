document.addEventListener("DOMContentLoaded", function () {
  const nosotrosSection = document.getElementById("nosotros");

  const contenidoHTML = `
      <h1 class="text-uppercase text-center" style="letter-spacing: 5px">
        Nosotros
      </h1>
      <div class="dos-columna">
        <article class="imagen">
          <img src="Img/Fishing-2.jpg" alt="d-block w-100" />
        </article>
        <article class="contenido-nosotros">
          <h1>Somos Dorado Fish</h1>
          <p class="justify-content-center">
            <strong>Dorado Fish</strong> es una compañía dedicada a la pesca y sus accesorios.
            Nos identificamos con todos los pescadores deportivos y artesanales, amamos la pesca 
            y por eso entendemos las necesidades del mercado. Contamos con años de experiencia en 
            la pesca deportiva, distribuimos las mejores marcas internacionales, con respaldo y 
            garantía de fábrica, ofreciendo a los pescadores productos innovadores y de alta calidad.
          </p>
        </article>
      </div>
      <div class="columas-mision">
        <article class="contenido-nosotros">
          <h1 class="mt-4">Nuestra Visión</h1>
          <p class="text-justify">
            Dorado Fish es una empresa comprometida con el medio ambiente,
            incentivando la captura y liberación para la conservación de las 
            especies y preservando los recursos naturales.
          </p>
        </article>
        <article class="imagen-elegirnos">
          <img src="Img/imagenMision.jpg" alt="d-block w-100" />
        </article>
      </div>
    `;

  nosotrosSection.innerHTML = contenidoHTML;
});
