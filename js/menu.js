const toggleSubmenuButton = document.getElementById("toggle-submenu");
const submenu = document.getElementById("submenu");

const footerButtons = document.querySelectorAll(
  ".secondary-list .hover-button"
);
const topButtons = document.querySelectorAll(".nav-top .hover-button");

function cerrarSubmenu() {
  submenu.classList.remove("open");
  toggleSubmenuButton.classList.remove("active");
}

toggleSubmenuButton.addEventListener("click", () => {
  const abierto = submenu.classList.toggle("open");
  toggleSubmenuButton.classList.toggle("active", abierto);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".submenu-wrapper")) cerrarSubmenu();
});

// El subrayado del footer sigue a la ruta actual.
document.addEventListener("rbt:ruta", (e) => {
  const { ruta, nombre } = e.detail;
  cerrarSubmenu();

  footerButtons.forEach((btn) => {
    const destino = btn.dataset.route;
    const activo =
      destino === ruta || (destino === "carrito" && nombre === "checkout");
    btn.classList.toggle("active", activo);
  });

  // La navegación superior marca la sección, no la ruta exacta.
  const seccion = { producto: "tienda", checkout: "carrito" }[nombre] || nombre;
  topButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.route === seccion);
  });
});
