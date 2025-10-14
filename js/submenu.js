document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-submenu");
  const submenu = document.getElementById("submenu");

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    submenu.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    submenu.classList.remove("open");
  });

  submenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
