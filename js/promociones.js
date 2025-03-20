$(document).ready(function () {
  const marquee = $("#text");
  const speed = 50; // Velocidad del desplazamiento

  function animateMarquee() {
    const marqueeWidth = $("#marquee").width();
    const textWidth = marquee.width();
    const totalWidth = marqueeWidth + textWidth;

    // Colocamos el texto al principio (fuera de la vista)
    marquee.css({ transform: `translateX(${marqueeWidth}px)` });

    // Animación para mover el texto
    marquee.animate(
      { left: -textWidth },
      {
        duration: totalWidth * speed,
        easing: "linear",
        complete: animateMarquee,
      }
    );
  }

  animateMarquee();
});
