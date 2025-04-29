const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const usuarioExistente = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuarioExistente) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Usuario o contraseña incorrectos",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Inicio de sesión exitoso",
    text: `Bienvenido de nuevo ${usuarioExistente.name}`,
    confirmButtonText: "Aceptar",
  }).then(() => {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioExistente));

    // Redirigir si quieres
    window.location.href = "carrito.html";
  });
});
