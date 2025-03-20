$(document).ready(function () {
  // Crear tres columnas dentro del div con id "nuestra-seccion"
  for (var i = 1; i <= 3; i++) {
    $("<div>", {
      class: "columna", // Clase para aplicar los estilos de columna
      text: "Columna " + i, // Texto para identificar las columnas
    }).appendTo("#nuestra-seccion");
  }

  // Estilos para "nuestra-seccion" (usar flexbox para las columnas)
  $("#nuestra-seccion").css({
    display: "flex", // Usar flexbox para las columnas
    gap: "10px", // Espacio entre las columnas
    padding: "20px", // Espaciado interno del contenedor
    backgroundColor: "#fff", // Fondo de prueba para que sea visible
    border: "1px solid red", // Borde temporal para ver el área del contenedor
  });

  // Estilos para las columnas
  $(".columna").css({
    width: "30%", // Ancho de cada columna (30% de la anchura total)
    padding: "10px", // Espaciado interno de cada columna
    backgroundColor: "#f0f0f0", // Fondo de las columnas
    border: "1px solid #ccc", // Borde de las columnas
    textAlign: "center", // Alineación de texto
    boxSizing: "border-box", // Para que el padding no afecte al tamaño total
  });
});
