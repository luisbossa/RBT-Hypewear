// Router por hash: #noticias, #drop/3, #tienda/ropa, #producto/<id>, #carrito...
// Cualquier elemento con data-route navega; cada sección muestra su panel y
// emite "rbt:ruta" para que su script la renderice.

document.addEventListener("DOMContentLoaded", () => {
  const menuWrapper = document.querySelector(".menu-wrapper");

  const sections = {
    noticias: [document.getElementById("news-list"), "flex", "Noticias"],
    noticiasItem: [document.querySelector(".news-wrapper"), "flex", "Noticias"],
    drop: [document.getElementById("drop"), "grid", "Drop invierno 2025"],
    dropItem: [document.getElementById("drop-img-toggle"), "block", "Drop invierno 2025"],
    lookbook: [document.getElementById("lookbook"), "flex", "Lookbook 2025"],
    tienda: [document.getElementById("shop-section"), "flex", "Tienda"],
    producto: [document.getElementById("product-section"), "grid", "Tienda"],
    carrito: [document.getElementById("cart-section"), "flex", "Carrito"],
    checkout: [document.getElementById("checkout-section"), "flex", "Checkout"],
    videos: [document.getElementById("video-section"), "flex", "Videos"],
    random: [document.getElementById("random-section"), "flex", "Random"],
    ayuda: [document.getElementById("help-section"), "flex", "Ayuda"],
    acerca: [document.getElementById("about-section"), "flex", "Acerca de"],
    contacto: [document.getElementById("contact-section"), "flex", "Contacto"],
    privacidad: [document.getElementById("privacy-panel"), "flex", "Privacidad"],
    faq: [document.getElementById("faq-panel"), "flex", "FAQ"],
  };

  const tituloBase = document.title;
  let seccionActual = null;

  function ocultarTodo() {
    Object.values(sections).forEach(([el]) => {
      if (el) el.style.display = "none";
    });
    menuWrapper.classList.remove("open");
  }

  function navegar() {
    const ruta = decodeURIComponent(location.hash.slice(1));
    const [nombre, param] = ruta.split("/");
    // Las rutas con parámetro usan su vista de detalle si existe (drop/3 → dropItem).
    const clave = param && sections[`${nombre}Item`] ? `${nombre}Item` : nombre;

    ocultarTodo();
    seccionActual = sections[clave] ? sections[clave][0] : null;

    if (seccionActual) {
      const [el, tipo, titulo] = sections[clave];
      el.style.display = tipo;
      document.title = `${tituloBase} | ${titulo}`;
      document.body.classList.add("interior");
    } else {
      document.body.classList.remove("interior");
      menuWrapper.classList.add("open");
      document.title = tituloBase;
    }

    window.scrollTo(0, 0);
    document.dispatchEvent(
      new CustomEvent("rbt:ruta", { detail: { ruta, nombre, param } })
    );
  }

  document.addEventListener("click", (e) => {
    const destino = e.target.closest("[data-route]");
    if (!destino) return;
    e.preventDefault();
    location.hash = destino.dataset.route;
  });

  // Escape funciona como el enlace "Atrás" de la sección visible.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !seccionActual) return;
    const atras = seccionActual.querySelector(".btn-back");
    if (atras) atras.click();
  });

  window.addEventListener("hashchange", navegar);
  navegar();
  document.body.classList.add("js-loaded");
});
