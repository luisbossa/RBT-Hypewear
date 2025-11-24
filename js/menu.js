const toggleSubmenuButton = document.getElementById("toggle-submenu");
const submenu = document.getElementById("submenu");
const submenuItems = document.querySelectorAll(".submenu-item");

const footerButtons = document.querySelectorAll(
  ".secondary-list .hover-button"
);

toggleSubmenuButton.addEventListener("click", () => {
  const isVisible = submenu.classList.toggle("visible");

  if (isVisible) {
    toggleSubmenuButton.classList.add("active");

    footerButtons.forEach((btn) => btn.classList.remove("active"));
  } else {
    toggleSubmenuButton.classList.remove("active");
    submenuItems.forEach((item) => item.classList.remove("active"));
  }
});

submenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    submenuItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");
    toggleSubmenuButton.classList.add("active");

    footerButtons.forEach((btn) => btn.classList.remove("active"));
  });
});

const allMenuButtons = document.querySelectorAll(".hover-button");

allMenuButtons.forEach((button) => {
  if (button === toggleSubmenuButton) return;

  button.addEventListener("click", () => {
    submenu.classList.remove("visible");
    toggleSubmenuButton.classList.remove("active");
    submenuItems.forEach((item) => item.classList.remove("active"));

    footerButtons.forEach((btn) => btn.classList.remove("active"));
  });
});

footerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    footerButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
