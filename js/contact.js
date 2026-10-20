// Formulario de contacto. Sin servidor: el envío es simulado.
// #contacto/pedido (o colaboraciones, eventos, general) preselecciona el motivo.

const form = document.getElementById("rbtForm");
const successMessage = document.getElementById("successMessage");
const enviarBtn = form.querySelector(".btn-enviar");
const campoPedido = document.getElementById("campo-pedido");
const mensajeInput = document.getElementById("contacto-mensaje");
const contadorMensaje = document.getElementById("contador-mensaje");

const patronEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function errorDe(field) {
  return field.closest(".form-group").querySelector(".error-msg");
}

function marcarCampo(field, mensaje) {
  const error = errorDe(field);
  error.textContent = mensaje;
  error.classList.toggle("show", Boolean(mensaje));
  field.closest(".form-group").classList.toggle("invalido", Boolean(mensaje));
}

function validarCampo(field) {
  const valor = field.value.trim();
  if (!valor) return "Este campo es obligatorio";
  if (field.type === "email" && !patronEmail.test(valor)) return "Correo inválido";
  if (field.name === "message" && valor.length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres)";
  return "";
}

function motivoSeleccionado() {
  return form.querySelector("input[name=subject]:checked");
}

function actualizarMotivo() {
  const motivo = motivoSeleccionado();
  campoPedido.classList.toggle("visible", motivo && motivo.value === "pedido");
  if (motivo) marcarCampo(motivo, "");
}

function actualizarContador() {
  contadorMensaje.textContent = `${mensajeInput.value.length} / ${mensajeInput.maxLength}`;
}

form.querySelectorAll("input[name=subject]").forEach((radio) => {
  radio.addEventListener("change", actualizarMotivo);
});

// Validación en vivo: el error se limpia apenas el campo queda bien.
form.querySelectorAll("input[required]:not([type=radio]), textarea[required]").forEach((field) => {
  field.addEventListener("blur", () => {
    if (field.value.trim()) marcarCampo(field, validarCampo(field));
  });
  field.addEventListener("input", () => {
    if (field.closest(".form-group").classList.contains("invalido")) {
      marcarCampo(field, validarCampo(field));
    }
  });
});

mensajeInput.addEventListener("input", actualizarContador);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("input[required]:not([type=radio]), textarea[required]").forEach((field) => {
    const mensaje = validarCampo(field);
    marcarCampo(field, mensaje);
    if (mensaje) valid = false;
  });

  const primerMotivo = form.querySelector("input[name=subject]");
  if (!motivoSeleccionado()) {
    marcarCampo(primerMotivo, "Elige un motivo");
    valid = false;
  }

  if (!valid) {
    const primerError = form.querySelector(".invalido input, .invalido textarea");
    if (primerError) primerError.focus();
    return;
  }

  enviarBtn.disabled = true;
  enviarBtn.textContent = "Enviando…";

  setTimeout(() => {
    document.getElementById("success-nombre").textContent = form.firstName.value.trim();
    document.getElementById("success-email").textContent = form.email.value.trim();

    form.reset();
    actualizarMotivo();
    actualizarContador();
    enviarBtn.disabled = false;
    enviarBtn.textContent = "Enviar mensaje";

    form.style.display = "none";
    successMessage.classList.add("show");
  }, 600);
});

document.getElementById("contacto-otro").addEventListener("click", () => {
  successMessage.classList.remove("show");
  form.style.display = "";
  form.firstName.focus();
});

document.addEventListener("rbt:ruta", (e) => {
  const { nombre, param } = e.detail;
  if (nombre !== "contacto" || !param) return;
  const radio = form.querySelector(`input[name=subject][value="${CSS.escape(param)}"]`);
  if (radio) {
    radio.checked = true;
    actualizarMotivo();
  }
});

actualizarContador();

// Dropdowns personalizados (los usa el checkout para la provincia).
document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
  const selected = dropdown.querySelector(".dropdown-selected");
  const options = dropdown.querySelector(".dropdown-options");
  const input = dropdown.querySelector("input[type=hidden]");

  selected.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const text = option.textContent;
      selected.textContent = text;
      input.value = value;
      dropdown.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});
