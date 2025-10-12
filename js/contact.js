const form = document.getElementById("rbtForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Limpiar mensajes previos
  document.querySelectorAll(".error-msg").forEach((msg) => {
    msg.textContent = "";
    msg.classList.remove("show");
  });

  // Validación básica
  form.querySelectorAll("input, textarea").forEach((field) => {
    if (!field.value.trim()) {
      valid = false;
      field.nextElementSibling.textContent = "Este campo es obligatorio";
      field.nextElementSibling.classList.add("show");
    } else if (field.type === "email") {
      const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!pattern.test(field.value)) {
        valid = false;
        field.nextElementSibling.textContent = "Correo inválido";
        field.nextElementSibling.classList.add("show");
      }
    }
  });

  if (valid) {
    form.reset();
    successMessage.classList.add("show");

    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
  }
});
