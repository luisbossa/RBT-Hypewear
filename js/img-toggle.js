document.addEventListener("DOMContentLoaded", () => {
  const carrusel2 = document.getElementById("carrusel-2");
  const rubikButtons = document.querySelectorAll("#rubik button");
  const imagenesContainer = carrusel2.querySelector(".imagenes");
  const tituloElem = carrusel2.querySelector("#rubik-titulo");
  const textoElem = carrusel2.querySelector("#rubik-texto");
  const frontalBtn = carrusel2.querySelector(".btn.frontal");
  const posteriorBtn = carrusel2.querySelector(".btn.posterior");

  const data = {
    1: {
      titulo: "Abrigo RBT Modelo 1",
      texto:
        "Este abrigo es perfecto para el invierno frío y tiene un diseño clásico de Rats Boys T-shirts.",
      imagenes: ["/images/preview/coat-1.webp", "/images/preview/coat-2.webp"],
    },
    2: {
      titulo: "Abrigo RBT Modelo 2",
      texto:
        "Abrigo con corte moderno, cómodo y resistente, ideal para uso diario.",
      imagenes: ["/images/preview/coat-2.webp", "/images/preview/coat-3.webp"],
    },
    3: {
      titulo: "Abrigo RBT Modelo 3",
      texto: "Diseño vintage con materiales ecológicos y acabado premium.",
      imagenes: ["/images/preview/coat-3.webp", "/images/preview/coat-4.webp"],
    },
    4: {
      titulo: "Abrigo RBT Modelo 4",
      texto:
        "Modelo con aislamiento térmico reforzado, ideal para climas extremos.",
      imagenes: ["/images/preview/coat-4.webp", "/images/preview/coat-5.webp"],
    },
    5: {
      titulo: "Abrigo RBT Modelo 5",
      texto: "Diseño urbano con bolsillos funcionales y capucha ajustable.",
      imagenes: ["/images/preview/coat-5.webp", "/images/preview/coat-6.webp"],
    },
    6: {
      titulo: "Abrigo RBT Modelo 6",
      texto: "Abrigo con tecnología impermeable y detalles reflectantes.",
      imagenes: ["/images/preview/coat-6.webp", "/images/preview/coat-7.webp"],
    },
    7: {
      titulo: "Abrigo RBT Modelo 7",
      texto:
        "Estilo minimalista con detalles técnicos y materiales reciclados.",
      imagenes: ["/images/preview/coat-7.webp", "/images/preview/coat-8.webp"],
    },
    8: {
      titulo: "Abrigo RBT Modelo 8",
      texto:
        "Inspirado en el diseño militar, con múltiples bolsillos y estructura robusta.",
      imagenes: ["/images/preview/coat-8.webp", "/images/preview/coat-9.webp"],
    },
    9: {
      titulo: "Abrigo RBT Modelo 9",
      texto:
        "Con forro polar interior y cierres magnéticos, ideal para el día a día.",
      imagenes: ["/images/preview/coat-9.webp", "/images/preview/coat-1.webp"],
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
    if (rubik) rubik.style.display = "none";
    if (carrusel2) carrusel2.style.display = "block";
  }

  // Activar desde rubik
  rubikButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const index = i + 1;
      loadingImgToggle(index);
      imgToggle();
    });
  });
});
