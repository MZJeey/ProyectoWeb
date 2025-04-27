const registrar = document.querySelector("#formRegistro");

registrar.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombreNuevo").value;
  const email = document.querySelector("#correoNuevo").value;
  const password = document.querySelector("#passwordNuevo").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const usuarioExistente = users.find((u) => u.email === email);

  if (usuarioExistente) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El correo ya está registrado",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  users.push({
    name: nombre,
    email: email,
    password: password,
  });

  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Ahora puedes iniciar sesión",
    confirmButtonText: "Aceptar",
  }).then(() => {
    window.location.href = "registro.html";
  });
});
