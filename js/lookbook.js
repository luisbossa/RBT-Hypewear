// Lookbook 2025: visor con información de cada look, vista cuadrícula,
// filtros por estilo y pantalla completa. #lookbook/5 abre el look 5.

const estilosLook = {
  estampados: "Estampados",
  camuflaje: "Camuflaje",
  clasicos: "Clásicos",
};

const modelos = [
  {
    titulo: "Floral Fleece",
    descripcion:
      "Fleece de cuello alto con flores en rojo, rosado y azul, el contraste justo para un día gris.",
    prendas: ["Chaqueta fleece floreada", "Gorro tejido rosado", "Jeans oscuros"],
    locacion: "Estudio",
    estilo: "estampados",
    imagen: "/images/lookbook/look-1.jpg",
  },
  {
    titulo: "Bloom",
    descripcion:
      "Camisa negra de manga corta con flores en acuarela. Fresca, amplia y lista para el verano.",
    prendas: ["Camisa manga corta con estampado floral", "Pantalón negro"],
    locacion: "Estudio",
    estilo: "estampados",
    imagen: "/images/lookbook/look-2.jpg",
  },
  {
    titulo: "All White",
    descripcion:
      "Conjunto blanco de pies a cabeza: chaqueta de trabajo y pantalón a juego, para la noche en la calle.",
    prendas: ["Chaqueta de trabajo blanca", "Pantalón blanco", "Gorro blanco", "Tenis negros"],
    locacion: "Calle, de noche",
    estilo: "clasicos",
    imagen: "/images/lookbook/look-3.jpg",
  },
  {
    titulo: "Varsity",
    descripcion:
      "La varsity de siempre: cuerpo negro, mangas claras y parches bordados con números.",
    prendas: ["Chaqueta varsity con parches", "Gorro tejido negro"],
    locacion: "Estudio",
    estilo: "clasicos",
    imagen: "/images/lookbook/look-4.jpg",
  },
  {
    titulo: "Bamboo",
    descripcion:
      "Bomber crema sobre camisa de mezclilla, con pantalón camuflaje de bosque.",
    prendas: ["Bomber crema", "Camisa de mezclilla", "Pantalón camuflaje de bosque"],
    locacion: "Exterior, bambú",
    estilo: "camuflaje",
    imagen: "/images/lookbook/look-5.jpg",
  },
  {
    titulo: "Plaid",
    descripcion:
      "Sobrecamisa de cuadros grises con cierre completo. Una capa ligera para todos los días.",
    prendas: ["Sobrecamisa de cuadros con cierre"],
    locacion: "Estudio",
    estilo: "clasicos",
    imagen: "/images/lookbook/look-6.jpg",
  },
  {
    titulo: "8 Ball",
    descripcion:
      "Chaqueta acolchada con estampado de flores y forro café, combinada con pantalón gris.",
    prendas: ["Chaqueta acolchada estampada", "Pantalón gris"],
    locacion: "Estudio",
    estilo: "estampados",
    imagen: "/images/lookbook/look-7.jpg",
  },
  {
    titulo: "Night Shift",
    descripcion:
      "Chaqueta negra técnica con bolso cruzado y pantalón estampado. Todo lo necesario a mano.",
    prendas: ["Chaqueta negra", "Bolso cruzado", "Pantalón estampado"],
    locacion: "Exterior, madera",
    estilo: "clasicos",
    imagen: "/images/lookbook/look-8.jpg",
  },
  {
    titulo: "Desert Camo",
    descripcion:
      "Hoodie con cierre en camuflaje café y naranja sobre jeans holgados de tiro alto.",
    prendas: ["Hoodie con cierre camuflaje", "Jeans holgados"],
    locacion: "Desierto",
    estilo: "camuflaje",
    imagen: "/images/lookbook/look-9.jpg",
  },
  {
    titulo: "Digi Camo",
    descripcion:
      "Conjunto completo en camuflaje digital gris: hoodie con capucha y pantalón a juego.",
    prendas: ["Hoodie camuflaje digital", "Pantalón camuflaje digital"],
    locacion: "Estudio",
    estilo: "camuflaje",
    imagen: "/images/lookbook/look-10.jpg",
  },
  {
    titulo: "Wild",
    descripcion:
      "Puffer con camuflaje de hojas sobre camiseta gráfica negra, rematado con gorro blanco.",
    prendas: ["Puffer camuflaje de hojas", "Camiseta gráfica negra", "Gorro tejido blanco"],
    locacion: "Estudio",
    estilo: "camuflaje",
    imagen: "/images/lookbook/look-11.jpg",
  },
  {
    titulo: "Purple",
    descripcion:
      "Conjunto deportivo morado con gráficos de colores en las mangas y el pecho.",
    prendas: ["Hoodie morado con gráficos", "Pantalón deportivo morado"],
    locacion: "Estudio",
    estilo: "estampados",
    imagen: "/images/lookbook/look-12.jpg",
  },
  {
    titulo: "Leopard",
    descripcion:
      "Chaqueta de trabajo con estampado leopardo, pantalón estampado y gorra, frente al mar.",
    prendas: ["Chaqueta de trabajo leopardo", "Pantalón estampado", "Gorra"],
    locacion: "Costa",
    estilo: "estampados",
    imagen: "/images/lookbook/look-13.jpg",
  },
  {
    titulo: "Curb",
    descripcion:
      "Estilo skater de calle: chaqueta verde con cierre, chino caqui amplio y tenis de skate.",
    prendas: ["Chaqueta verde con cierre", "Pantalón chino caqui", "Tenis de skate"],
    locacion: "Calle",
    estilo: "clasicos",
    imagen: "/images/lookbook/look-14.jpg",
  },
  {
    titulo: "Sunset",
    descripcion:
      "Camiseta gráfica tie-dye y pantalón claro, para el atardecer en el agua.",
    prendas: ["Camiseta gráfica tie-dye", "Pantalón claro"],
    locacion: "Mar, al atardecer",
    estilo: "estampados",
    imagen: "/images/lookbook/look-15.jpg",
  },
  {
    titulo: "Postcard",
    descripcion:
      "Chaqueta y pantalón a juego con gráficos tipo postal. Un conjunto para que te vean de espaldas.",
    prendas: ["Chaqueta con estampado de postal", "Pantalón a juego"],
    locacion: "Exterior",
    estilo: "estampados",
    imagen: "/images/lookbook/look-16.jpg",
  },
];

const lookVisor = document.getElementById("look-visor");
const lookGrid = document.getElementById("look-grid");
const lookFiltros = document.getElementById("look-filtros");
const miniaturas = document.getElementById("miniaturas");
const imagenGrande = document.getElementById("imagen-grande");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const lookContador = document.getElementById("look-contador");
const lookNumero = document.getElementById("look-numero");
const lookPrendas = document.getElementById("look-prendas");
const lookLocacion = document.getElementById("look-locacion");
const lookEstilo = document.getElementById("look-estilo");
const lookCompartir = document.getElementById("look-compartir");
const lightbox = document.getElementById("look-lightbox");
const lightboxImg = document.getElementById("look-lightbox-img");
const lightboxCaption = document.getElementById("look-lightbox-caption");

let modeloActual = 0;
let filtroLook = "";
let lookbookActivo = false; // lo actualiza el router con "rbt:ruta"

const numeroLook = (i) => String(i + 1).padStart(2, "0");

// Looks visibles con el filtro actual (índices dentro de "modelos").
function looksVisibles() {
  return modelos
    .map((_, i) => i)
    .filter((i) => !filtroLook || modelos[i].estilo === filtroLook);
}

function mostrarModelo(index, actualizarUrl = true) {
  modeloActual = (index + modelos.length) % modelos.length;
  const modelo = modelos[modeloActual];

  imagenGrande.src = modelo.imagen;
  imagenGrande.alt = `Look ${numeroLook(modeloActual)} - ${modelo.titulo}`;
  lookNumero.textContent = `Look ${numeroLook(modeloActual)}`;
  titulo.textContent = modelo.titulo;
  descripcion.textContent = modelo.descripcion;
  lookLocacion.textContent = modelo.locacion;
  lookEstilo.textContent = estilosLook[modelo.estilo];

  lookPrendas.innerHTML = "";
  modelo.prendas.forEach((prenda) => {
    const li = document.createElement("li");
    li.textContent = prenda;
    lookPrendas.appendChild(li);
  });

  const visibles = looksVisibles();
  const pos = visibles.indexOf(modeloActual);
  lookContador.textContent =
    pos === -1 ? "" : `${numeroLook(pos)} / ${String(visibles.length).padStart(2, "0")}`;

  miniaturas.querySelectorAll("button").forEach((btn) => {
    const activo = Number(btn.dataset.index) === modeloActual;
    btn.classList.toggle("activo", activo);
    // Centra la miniatura activa dentro de la tira, sin mover la página.
    if (activo) {
      miniaturas.scrollTo({
        left: btn.offsetLeft - miniaturas.clientWidth / 2 + btn.clientWidth / 2,
        behavior: "smooth",
      });
    }
  });

  if (lightbox.classList.contains("open")) actualizarLightbox();

  // Precarga los vecinos para que el cambio sea instantáneo.
  [modeloActual - 1, modeloActual + 1].forEach((i) => {
    new Image().src = modelos[(i + modelos.length) % modelos.length].imagen;
  });

  // Actualiza el enlace sin disparar el router (replaceState no emite hashchange).
  if (actualizarUrl && lookbookActivo) {
    history.replaceState(null, "", `#lookbook/${modeloActual + 1}`);
  }
}

// Avanza o retrocede dentro de los looks del filtro activo.
function moverLook(delta) {
  const visibles = looksVisibles();
  const pos = visibles.indexOf(modeloActual);
  const siguiente = pos === -1 ? 0 : (pos + delta + visibles.length) % visibles.length;
  mostrarModelo(visibles[siguiente]);
}

/*---------- MINIATURAS, CUADRÍCULA Y FILTROS ----------*/

function crearMiniatura(i, clase) {
  const btn = document.createElement("button");
  btn.className = clase;
  btn.dataset.index = i;
  btn.setAttribute("aria-label", `Look ${numeroLook(i)} - ${modelos[i].titulo}`);

  const img = document.createElement("img");
  img.src = modelos[i].imagen;
  img.alt = "";
  img.loading = "lazy";
  btn.appendChild(img);
  return btn;
}

function renderLooks() {
  const visibles = looksVisibles();

  miniaturas.innerHTML = "";
  lookGrid.innerHTML = "";

  visibles.forEach((i) => {
    const mini = crearMiniatura(i, "look-mini");
    mini.addEventListener("click", () => mostrarModelo(i));
    miniaturas.appendChild(mini);

    const celda = crearMiniatura(i, "look-celda");
    const info = document.createElement("span");
    info.className = "look-celda-info";
    const numero = document.createElement("span");
    numero.className = "y-color";
    numero.textContent = numeroLook(i);
    const nombre = document.createElement("span");
    nombre.textContent = modelos[i].titulo;
    info.append(numero, nombre);
    celda.appendChild(info);
    celda.addEventListener("click", () => {
      cambiarVista("visor");
      mostrarModelo(i);
    });
    lookGrid.appendChild(celda);
  });

  // Si el look actual quedó fuera del filtro, salta al primero visible.
  if (!visibles.includes(modeloActual)) mostrarModelo(visibles[0]);
  else mostrarModelo(modeloActual, false);
}

function renderFiltros() {
  lookFiltros.innerHTML = "";
  [["", "Todos"], ...Object.entries(estilosLook)].forEach(([clave, nombre]) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "hover-button";
    btn.textContent = nombre;
    if (clave === filtroLook) btn.classList.add("active");

    const count = document.createElement("span");
    count.className = "filtro-count";
    count.textContent = modelos.filter((m) => !clave || m.estilo === clave).length;
    btn.appendChild(count);

    btn.addEventListener("click", () => {
      filtroLook = clave;
      renderFiltros();
      renderLooks();
    });
    li.appendChild(btn);
    lookFiltros.appendChild(li);
  });
}

function cambiarVista(vista) {
  lookVisor.style.display = vista === "visor" ? "" : "none";
  lookGrid.style.display = vista === "grid" ? "" : "none";
  document.querySelectorAll(".look-vistas .hover-button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.vista === vista);
  });
}

document.querySelectorAll(".look-vistas .hover-button").forEach((btn) => {
  btn.addEventListener("click", () => cambiarVista(btn.dataset.vista));
});

/*---------- PANTALLA COMPLETA ----------*/

function actualizarLightbox() {
  const modelo = modelos[modeloActual];
  lightboxImg.src = modelo.imagen;
  lightboxImg.alt = imagenGrande.alt;
  lightboxCaption.textContent = `Look ${numeroLook(modeloActual)} - ${modelo.titulo}`;
}

function abrirLightbox() {
  actualizarLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

imagenGrande.addEventListener("click", abrirLightbox);
document.getElementById("look-cerrar").addEventListener("click", cerrarLightbox);
document.getElementById("lb-prev").addEventListener("click", () => moverLook(-1));
document.getElementById("lb-next").addEventListener("click", () => moverLook(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) cerrarLightbox();
});

/*---------- CONTROLES ----------*/

document.getElementById("look-prev").addEventListener("click", () => moverLook(-1));
document.getElementById("look-next").addEventListener("click", () => moverLook(1));

// Se escucha en captura sobre window para que Escape cierre la pantalla
// completa antes de que el router lo use como "Atrás".
window.addEventListener(
  "keydown",
  (e) => {
    if (!lookbookActivo) return;
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      e.stopPropagation();
      cerrarLightbox();
    }
    if (e.key === "ArrowRight") moverLook(1);
    if (e.key === "ArrowLeft") moverLook(-1);
  },
  true
);

// Swipe en el visor y en la pantalla completa.
[document.getElementById("look-stage"), lightbox].forEach((zona) => {
  let inicio = 0;
  zona.addEventListener("touchstart", (e) => (inicio = e.touches[0].clientX), { passive: true });
  zona.addEventListener("touchend", (e) => {
    const diferencia = inicio - e.changedTouches[0].clientX;
    if (Math.abs(diferencia) > 50) moverLook(diferencia > 0 ? 1 : -1);
  });
});

lookCompartir.addEventListener("click", async () => {
  const url = `${location.origin}${location.pathname}#lookbook/${modeloActual + 1}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: `RBT Lookbook 2025 - ${modelos[modeloActual].titulo}`, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    lookCompartir.textContent = "¡Enlace copiado!";
  } catch (err) {
    if (err.name === "AbortError") return;
    lookCompartir.textContent = "No se pudo compartir";
  }
  setTimeout(() => (lookCompartir.textContent = "Compartir look"), 2000);
});

document.addEventListener("rbt:ruta", (e) => {
  const { nombre, param } = e.detail;
  lookbookActivo = nombre === "lookbook";
  if (!lookbookActivo) {
    cerrarLightbox();
    return;
  }
  if (param) {
    // Un enlace directo debe mostrar el look aunque el filtro lo ocultara.
    const index = Number(param) - 1 || 0;
    if (filtroLook && modelos[index] && modelos[index].estilo !== filtroLook) {
      filtroLook = "";
      renderFiltros();
      renderLooks();
    }
    cambiarVista("visor");
    mostrarModelo(index, false);
  }
});

function generarMiniaturas() {
  renderFiltros();
  renderLooks();
  cambiarVista("visor");
  mostrarModelo(0, false);
}

document.addEventListener("DOMContentLoaded", generarMiniaturas);
