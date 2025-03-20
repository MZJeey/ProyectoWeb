// import React from "react";
// import ReactDOM from "react-dom/client";

// const images = ["Img/proyecto2.jpg", "Img/proyecto3.jpg", "Img/proyecto5.jpg"];

// let currentIndex = 0;

// function showSlide(index) {
//   const imgElement = document.getElementById("carousel-image");
//   if (imgElement) {
//     imgElement.src = images[index];
//   }
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % images.length;
//   showSlide(currentIndex);
// }

// function prevSlide() {
//   currentIndex = (currentIndex - 1 + images.length) % images.length;
//   showSlide(currentIndex);
// }

// function Carousel() {
//   return (
//     <div style={{ textAlign: "center", margin: "20px" }}>
//       <h1>Carrusel Sencillo</h1>
//       <div style={{ position: "relative", display: "inline-block" }}>
//         <button onClick={prevSlide} style={buttonStyle}>
//           &#10094;
//         </button>
//         <img
//           id="carousel-image"
//           src={images[0]}
//           alt="Carrusel"
//           style={{ width: "800px", height: "400px", borderRadius: "10px" }}
//         />
//         <button onClick={nextSlide} style={{ ...buttonStyle, right: "0" }}>
//           &#10095;
//         </button>
//       </div>
//     </div>
//   );
// }

// const buttonStyle = {
//   position: "absolute",
//   top: "50%",
//   transform: "translateY(-50%)",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   color: "white",
//   border: "none",
//   padding: "10px",
//   cursor: "pointer",
//   borderRadius: "50%",
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Carousel />);

import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<p>Hello</p>);
