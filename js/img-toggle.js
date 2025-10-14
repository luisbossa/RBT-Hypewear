document.addEventListener("DOMContentLoaded", () => {
  const toggleSection = document.getElementById("drop-img-toggle");
  const dropButtons = document.querySelectorAll("#drop button");
  const imagenesContainer = toggleSection.querySelector(".drop-imgs");
  const tituloElem = toggleSection.querySelector("#drop-titulo");
  const textoElem = toggleSection.querySelector("#drop-texto");
  const frontalBtn = toggleSection.querySelector(".btn.frontal");
  const posteriorBtn = toggleSection.querySelector(".btn.posterior");

  const data = {
    1: {
      titulo: "Abrigo poder eléctrico",
      texto:
        "Este abrigo es perfecto para el invierno frío y tiene un diseño electrico.",
      imagenes: ["/images/drop/coat-1.avif", "/images/drop/coat-1.1.avif"],
    },
    2: {
      titulo: "Abrigo RBT moderno",
      texto:
        "Abrigo con corte moderno, cómodo y resistente, ideal para uso diario.",
      imagenes: ["/images/drop/coat-2.png", "/images/drop/coat-2.2.png"],
    },
    3: {
      titulo: "Abrigo RBT Vintage",
      texto: "Diseño vintage con materiales ecológicos y acabado premium.",
      imagenes: ["/images/drop/coat-3.jpg", "/images/drop/coat-3.3.jpg"],
    },
    4: {
      titulo: "Abrigo RBT fortaleza térmica",
      texto:
        "Modelo con aislamiento térmico reforzado, ideal para climas extremos.",
      imagenes: ["/images/drop/coat-4.webp", "/images/drop/coat-4.4.webp"],
    },
    5: {
      titulo: "Abrigo RBT Urbano",
      texto: "Diseño urbano con bolsillos funcionales y personalizado.",
      imagenes: ["/images/drop/coat-5.webp", "/images/drop/coat-5.5.webp"],
    },
    6: {
      titulo: "Abrigo RBT Denim Revival",
      texto:
        "Abrigo vintage confeccionado a partir de retazos de jeans grises.",
      imagenes: ["/images/drop/coat-6.webp", "/images/drop/coat-6.6.webp"],
    },
    7: {
      titulo: "Abrigo RBT Minimal",
      texto:
        "Estilo minimalista con detalles técnicos y materiales reciclados.",
      imagenes: ["/images/drop/coat-7.webp", "/images/drop/coat-7.7.webp"],
    },
    8: {
      titulo: "Abrigo RBT Polar",
      texto:
        "Inspirado en el diseño polar, con múltiples bolsillos y estructura robusta.",
      imagenes: ["/images/drop/coat-8.webp", "/images/drop/coat-8.8.webp"],
    },
    9: {
      titulo: "Abrigo RBT Místico",
      texto: "Abrigo con estampado místico, ideal para el día a día.",
      imagenes: ["/images/drop/coat-9.jpg", "/images/drop/coat-9.9.jpg"],
    },
  };

  let currentIndex = 0;

  function loadingImgToggle(index) {
    const item = data[index];
    if (!item) return;

    imagenesContainer.innerHTML = "";
    currentIndex = 0;

    item.imagenes.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${item.titulo} Imagen ${i + 1}`;
      if (i === 0) img.classList.add("activo");
      imagenesContainer.appendChild(img);
    });

    tituloElem.textContent = item.titulo;
    textoElem.textContent = item.texto;
  }

  frontalBtn.addEventListener("click", () => {
    const imgs = imagenesContainer.querySelectorAll("img");
    if (imgs.length < 2) return;
    imgs[1].classList.remove("activo");
    imgs[0].classList.add("activo");
    currentIndex = 0;
  });

  posteriorBtn.addEventListener("click", () => {
    const imgs = imagenesContainer.querySelectorAll("img");
    if (imgs.length < 2) return;
    imgs[0].classList.remove("activo");
    imgs[1].classList.add("activo");
    currentIndex = 1;
  });

  function imgToggle() {
    if (drop) drop.style.display = "none";
    if (toggleSection) toggleSection.style.display = "block";
  }

  // Activar desde drop
  dropButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const index = i + 1;
      loadingImgToggle(index);
      imgToggle();
    });
  });
});
