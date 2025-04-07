const { useState, useEffect } = React;

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("json/producto.json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar productos");
        return response.json();
      })
      .then(setProductos)
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  const comprarAhora = (productoId) => {
    fetch("json/producto.json")
      .then((res) => res.json())
      .then((productos) => {
        const producto = productos.find((p) => p.id === productoId);
        if (!producto) throw new Error("Producto no encontrado");

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const existente = carrito.find((item) => item.id === producto.id);
        if (existente) {
          existente.quantity = (existente.quantity || 1) + 1;
        } else {
          carrito.push({
            id: producto.id,
            imagen: producto.imagen,
            precio: producto.precio,
            categoria: {
              nombre: producto.categoria.nombre,
              id: producto.categoria.id,
            },
            quantity: 1,
          });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "carrito.html";
      })
      .catch((error) => {
        console.error("Error en comprarAhora:", error);
        alert("Error al agregar al carrito: " + error.message);
      });
  };

  const verDetalle = (productoId) => {
    fetch("json/producto.json")
      .then((res) => res.json())
      .then((productos) => {
        const producto = productos.find((p) => p.id === productoId);
        if (!producto) throw new Error("Producto no encontrado");

        localStorage.setItem(
          "selectedProduct",
          JSON.stringify({
            id: producto.id,
            imagen: producto.imagen,
            precio: producto.precio,
            categoria: {
              nombre: producto.categoria.nombre,
              id: producto.categoria.id,
              descripcion: producto.categoria.descripcion,
            },
          })
        );
        window.location.href = "detalleProducto.html";
      })
      .catch((error) => {
        console.error("Error al ver detalles:", error);
        alert("Error al ver detalles del producto.");
      });
  };

  return (
    <div className="contenedor-productos">
      {productos.map((producto) => (
        <div className="card" key={producto.id}>
          <div className="producto">
            <img
              className="imagen-producto"
              src={producto.imagen}
              alt={producto.categoria.nombre}
            />
            <div className="detalle-producto">
              <h3>{producto.categoria.nombre}</h3>
              <p>{producto.precio}</p>
              <div className="botones">
                <button
                  className="btn-ver"
                  onClick={() => verDetalle(producto.id)}
                >
                  Ver Producto
                </button>
                <button
                  className="btn-comprar"
                  onClick={() => comprarAhora(producto.id)}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Montar React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
