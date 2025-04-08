document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("header");
  const header = document.createElement("div");

  header.innerHTML = `
  <nav class="navbar   navbar-expand-lg"  id="navInferior"  >
      <div class="contenedor-principal container-fluid">
        <a class="navbar-brand marca" href="#"><img  class="logo-nav" src="Img/istiompax-indica.webp" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="lista-enlaces navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item ">
              <a class="nav-link enlaces-pag" aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link enlaces-pag" href="contacto.html">Contacto</a>
            </li>
            <li class="nav-item  ">
              <a class="nav-link  enlaces-pag" href="tienda.html">Tienda</a>
            </li>
            <li class="nav-item  ">
              <a class="nav-link enlaces-pag" href="nosotros.html">Nosotros</a>
            </li> 
          </ul>
          
        </div>
      </div>
    </nav>
    <div class="header__texto">
      <h2 class="no-margin">Full Pesca con goldFish</h2>
      <p class="no-margin"> las mejores marcar y equipo para la pesca</p>
       <a href="tienda.html">Ver Todos los Productos</a>
  </div>
  `;
  contenedor.appendChild(header);
});
