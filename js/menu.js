const toggleSubmenuButton = document.getElementById("toggle-submenu");
const submenu = document.getElementById("submenu");
const submenuItems = document.querySelectorAll(".submenu-item");

// Botones específicos del footer
const footerButtons = document.querySelectorAll(".secondary-list .hover-button");

// 👉 1. Manejo del botón "Tienda"
toggleSubmenuButton.addEventListener("click", () => {
  const isVisible = submenu.classList.toggle("visible");

  if (isVisible) {
    toggleSubmenuButton.classList.add("active");

    // Quitar active de los botones del footer
    footerButtons.forEach(btn => btn.classList.remove("active"));
  } else {
    toggleSubmenuButton.classList.remove("active");
    submenuItems.forEach(item => item.classList.remove("active"));
  }
});

// 👉 2. Ítems del submenú
submenuItems.forEach(item => {
  item.addEventListener("click", () => {
    submenuItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");
    toggleSubmenuButton.classList.add("active");

    // Quitar active del footer
    footerButtons.forEach(btn => btn.classList.remove("active"));
  });
});

// 👉 3. Otros botones (no "Tienda")
const allMenuButtons = document.querySelectorAll(".hover-button");

allMenuButtons.forEach(button => {
  if (button === toggleSubmenuButton) return;

  button.addEventListener("click", () => {
    // Cerrar submenu y desactivar "Tienda"
    submenu.classList.remove("visible");
    toggleSubmenuButton.classList.remove("active");
    submenuItems.forEach(item => item.classList.remove("active"));

    // ❗️ Quitar .active de los 3 botones específicos del footer
    footerButtons.forEach(btn => btn.classList.remove("active"));
  });
});

// 👉 4. Footer buttons — solo permiten 1 activo entre sí
footerButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    // Activar solo el botón clicado
    footerButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
