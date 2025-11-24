const form = document.getElementById("rbtForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  document.querySelectorAll(".error-msg").forEach((msg) => {
    msg.textContent = "";
    msg.classList.remove("show");
  });

  form.querySelectorAll("input, textarea, custom-dropdown").forEach((field) => {
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

document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
  const selected = dropdown.querySelector(".dropdown-selected");
  const options = dropdown.querySelector(".dropdown-options");
  const input = dropdown.querySelector("input[type=hidden]");
  const caret = dropdown.querySelector(".dropdown-caret");

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
