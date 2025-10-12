document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-loaded");

  const menuToggle = document.querySelector(".menu-toggle");
  const menuWrapper = document.querySelector(".menu-wrapper");
  const panelWrapper = document.querySelector(".panel-wrapper");

  const sections = {
    noticias: document.querySelector(".news-wrapper"),
    preview: document.querySelector(".rubik-container"),
    lookbook: document.getElementById("lookbook"),
    videos: document.getElementById("video-section"),
    about: document.getElementById("about-section"),
    contact: document.getElementById("contact-section"),
    carrusel2: document.getElementById("carrusel-2"),
  };

  const buttons = {
    noticias: document.getElementById("btn-noticias"),
    preview: document.getElementById("btn-preview"),
    lookbook: document.getElementById("btn-lookbook"),
    videos: document.getElementById("btn-videos"),
    about: document.getElementById("btn-about"),
    contact: document.getElementById("btn-contact"),
    menu: document.getElementById("btn-menu-footer"),
  };

  const backButtons = {
    btnBack: document.getElementById("btn-back"),
    btnBack2: document.getElementById("btn-back2"),
    btnBack3: document.getElementById("btn-back3"),
    btnBack4: document.getElementById("btn-back4"),
    btnBack5: document.getElementById("btn-back5"),
    btnBack6: document.getElementById("btn-back6"),
    btnBack7: document.getElementById("btn-back7"),
  };

  // Ocultar todas las secciones
  function ocultarTodo() {
    Object.values(sections).forEach((el) => {
      if (el) el.style.display = "none";
    });
    if (menuWrapper) menuWrapper.classList.remove("open");
  }

  // Mostrar una sección específica
  function mostrarSeccion(nombre, tipo = "flex") {
    if (!sections[nombre]) return;
    ocultarTodo();
    if (panelWrapper) {
      panelWrapper.style.opacity = "1";
      panelWrapper.style.visibility = "visible";
    }
    sections[nombre].style.display = tipo;
  }

  // Inicialización
  ocultarTodo();
  if (panelWrapper) {
    panelWrapper.style.opacity = "0";
    panelWrapper.style.visibility = "hidden";
    panelWrapper.style.transition = "opacity 0.3s ease, visibility 0.3s ease";
  }

  // Evento para mostrar menú al hacer click en el logo
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (panelWrapper) {
        panelWrapper.style.opacity = "1";
        panelWrapper.style.visibility = "visible";
      }
      ocultarTodo();
      menuWrapper.classList.add("open");
    });
  }

  // Eventos para botones de navegación
  if (buttons.menu) {
    buttons.menu.addEventListener("click", () => {
      if (panelWrapper) {
        panelWrapper.style.opacity = "1";
        panelWrapper.style.visibility = "visible";
      }
      ocultarTodo();
      menuWrapper.classList.add("open");
    });
  }

  if (buttons.noticias)
    buttons.noticias.addEventListener("click", () =>
      mostrarSeccion("noticias", "flex")
    );
  if (buttons.preview)
    buttons.preview.addEventListener("click", () =>
      mostrarSeccion("preview", "grid")
    );
  if (buttons.lookbook)
    buttons.lookbook.addEventListener("click", () =>
      mostrarSeccion("lookbook", "grid")
    );
  if (buttons.videos)
    buttons.videos.addEventListener("click", () =>
      mostrarSeccion("videos", "flex")
    );
  if (buttons.about)
    buttons.about.addEventListener("click", () =>
      mostrarSeccion("about", "flex")
    );
  if (buttons.contact)
    buttons.contact.addEventListener("click", () =>
      mostrarSeccion("contact", "flex")
    );

  // -----------------------
  // BOTONES DE "VOLVER" (sin modificar)
  // -----------------------
  const {
    btnBack,
    btnBack2,
    btnBack3,
    btnBack4,
    btnBack5,
    btnBack6,
    btnBack7,
  } = backButtons;

  if (btnBack)
    btnBack.addEventListener("click", (e) => {
      e.preventDefault();
      ocultarTodo();
      menuWrapper.classList.add("open");
    });

  if (btnBack2)
    btnBack2.addEventListener("click", (e) => {
      e.preventDefault();
      ocultarTodo();
      if (rubik) rubik.style.display = "none";
      menuWrapper.classList.add("open");
    });

  btnBack3.addEventListener("click", (e) => {
    e.preventDefault();
    if (sections.carrusel2) sections.carrusel2.style.display = "none";
    if (sections.preview) sections.preview.style.display = "grid";
  });

  btnBack4.addEventListener("click", (e) => {
    e.preventDefault();
    sections.lookbook.style.display = "none";
    menuWrapper.classList.add("open");
  });

  btnBack5.addEventListener("click", (e) => {
    e.preventDefault();
    sections.videos.style.display = "none";
    menuWrapper.classList.add("open");
  });

  btnBack6.addEventListener("click", (e) => {
    e.preventDefault();
    sections.about.style.display = "none";
    menuWrapper.classList.add("open");
  });

  btnBack7.addEventListener("click", (e) => {
    e.preventDefault();
    sections.contact.style.display = "none";
    menuWrapper.classList.add("open");
  });
});
