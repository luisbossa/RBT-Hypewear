// Videoteca: el video de RBT (archivo local) y videos de skate de YouTube que
// se reproducen dentro del mismo reproductor. #videos/<id> abre un video.
// El iframe de YouTube solo se crea al darle play (youtube-nocookie.com).

const videoCategorias = {
  rbt: "RBT",
  "costa-rica": "Costa Rica",
  inspiracion: "Inspiración",
};

const videosSkate = [
  {
    id: "crooks-bs-slide",
    categoria: "rbt",
    titulo: "CROOK´S BS SLIDE",
    descripcion: "Clip de Dario C. para RBT, grabado y editado por Alex.",
    creditos: [
      ["Skater", "Dario C."],
      ["Video", "Alex"],
    ],
    miniatura: "/images/video-cover.jpg",
  },
  {
    id: "la-sele",
    youtube: "qpTCB7hC6NY",
    categoria: "costa-rica",
    titulo: "LA SELE - Costa Rica y Panamá",
    descripcion:
      "Video grabado en análogo por Costa Rica y Panamá, con la primera generación de skaters pro de la región en sus spots de casa.",
    creditos: [
      ["Por", "Tony Roberts"],
      ["Año", "2002"],
      ["Lugar", "Costa Rica y Panamá"],
    ],
  },
  {
    id: "tico-time",
    youtube: "8eSUvbf34dQ",
    categoria: "costa-rica",
    titulo: "Tico Time in Costa Rica",
    descripcion:
      "El team de Gravity Skateboards recorre Costa Rica: paisajes, spots y el ambiente local.",
    creditos: [
      ["Por", "Gravity Skateboards"],
      ["Lugar", "Costa Rica"],
    ],
  },
  {
    id: "el-cano",
    youtube: "kqhD898d5Qw",
    categoria: "costa-rica",
    titulo: "Skateboarding El Caño",
    descripcion: "Sesión en El Caño durante el viaje de Gravity por Costa Rica.",
    creditos: [
      ["Por", "Gravity Skateboards"],
      ["Lugar", "Costa Rica"],
    ],
  },
  {
    id: "cocodrilos-diy",
    youtube: "vlBOI8p-LyI",
    categoria: "costa-rica",
    titulo: "Crocodiles and DIY Skateparks in Costa Rica",
    descripcion:
      "El team latinoamericano de Volcom entre cocodrilos y skateparks DIY. Parte 2 de su viaje por Costa Rica.",
    creditos: [
      ["Por", "Volcom"],
      ["Lugar", "Costa Rica"],
    ],
  },
  {
    id: "tierra-blanca",
    youtube: "9xcTva6hOtw",
    categoria: "costa-rica",
    titulo: "Bowl Skating in Tierra Blanca",
    descripcion: "Sesión de bowl en Tierra Blanca, Cartago.",
    creditos: [
      ["Lugar", "Tierra Blanca, Cartago"],
      ["Año", "2016"],
    ],
  },
  {
    id: "candyland",
    youtube: "Yk1cLKpzHck",
    categoria: "inspiracion",
    titulo: "CANDYLAND",
    descripcion:
      "Video de William Strobeck para Supreme en San Francisco, con Pablo Ramirez, Kader Sylla, Rowan Zorilla, Tyshawn Jones y más.",
    creditos: [
      ["Por", "William Strobeck"],
      ["Para", "Supreme"],
      ["Lugar", "San Francisco"],
    ],
  },
  {
    id: "supreme-brooklyn",
    youtube: "h7Xui3kkh5U",
    categoria: "inspiracion",
    titulo: "Supreme Brooklyn",
    descripcion: "Con Sully Cormier, Troy Gipson, Mark Gonzales y Kader Sylla.",
    creditos: [
      ["Para", "Supreme"],
      ["Año", "2024"],
    ],
  },
  {
    id: "coronados",
    youtube: "0aGAV69RrV0",
    categoria: "inspiracion",
    titulo: "Thrasher Presents: CORONADOS",
    descripcion: "Felipe, Nikolai, Emilio y una camada de nuevos talentos salen a las calles.",
    creditos: [["Por", "Thrasher Magazine"]],
  },
];

const videoContainer = document.getElementById("video-container");
const videoEmbed = document.getElementById("video-embed");
const videoTag = document.getElementById("video-tag");
const videoTitulo = document.getElementById("video-titulo");
const videoDesc = document.getElementById("video-desc");
const videoCreditos = document.getElementById("video-creditos");
const videoFuente = document.getElementById("video-fuente");
const videosGrid = document.getElementById("videos-grid");
const videosFiltros = document.getElementById("videos-filtros");
const shareVideoBtn = document.getElementById("video-share");

let videoActual = videosSkate[0];
let filtroVideo = "";
let videosActivo = false; // lo actualiza el router con "rbt:ruta"

function miniaturaVideo(v) {
  return v.miniatura || `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`;
}

// Si YouTube está bloqueado la miniatura no carga: se muestra un respaldo.
function crearMiniaturaVideo(v) {
  const img = document.createElement("img");
  img.src = miniaturaVideo(v);
  img.alt = "";
  img.loading = "lazy";
  img.addEventListener("error", () => img.parentElement.classList.add("sin-miniatura"));
  return img;
}

function duracionLocal() {
  if (!video.duration) return "-";
  const segundos = Math.round(video.duration);
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, "0")}`;
}

function renderCreditos(v) {
  videoCreditos.innerHTML = "";
  const filas = v.youtube ? v.creditos : [...v.creditos, ["Duración", duracionLocal()]];
  filas.forEach(([clave, valor]) => {
    const dt = document.createElement("dt");
    dt.textContent = clave;
    const dd = document.createElement("dd");
    dd.textContent = valor;
    videoCreditos.append(dt, dd);
  });
}

// El video local tarda en cargar su duración.
video.addEventListener("loadedmetadata", () => {
  if (!videoActual.youtube) renderCreditos(videoActual);
});

/*---------- REPRODUCTOR ----------*/

function cargarIframe(v) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0&modestbranding=1`;
  iframe.title = v.titulo;
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  videoEmbed.innerHTML = "";
  videoEmbed.appendChild(iframe);
}

// Portada con botón de play: el iframe no se carga hasta que se pide.
function mostrarPortada(v) {
  videoEmbed.innerHTML = "";
  const portada = document.createElement("button");
  portada.className = "video-portada";
  portada.setAttribute("aria-label", `Reproducir ${v.titulo}`);
  portada.appendChild(crearMiniaturaVideo(v));

  const respaldo = document.createElement("span");
  respaldo.className = "video-respaldo";
  respaldo.textContent = v.titulo;

  const play = document.createElement("span");
  play.className = "video-button";
  play.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>';

  portada.append(respaldo, play);
  portada.addEventListener("click", () => cargarIframe(v));
  videoEmbed.appendChild(portada);
}

function seleccionarVideo(id, { reproducir = false, actualizarUrl = true } = {}) {
  const v = videosSkate.find((x) => x.id === id) || videosSkate[0];
  videoActual = v;

  const esYoutube = Boolean(v.youtube);
  videoContainer.classList.toggle("modo-youtube", esYoutube);

  if (esYoutube) {
    pausarVideoLocal();
    if (reproducir) cargarIframe(v);
    else mostrarPortada(v);
  } else {
    videoEmbed.innerHTML = "";
    if (reproducir && video.paused) playBtn.click();
  }

  videoTag.textContent = videoCategorias[v.categoria];
  videoTag.classList.toggle("video-tag-rbt", v.categoria === "rbt");
  videoTitulo.textContent = v.titulo;
  videoDesc.textContent = v.descripcion;
  renderCreditos(v);

  videoFuente.innerHTML = "";
  if (esYoutube) {
    videoFuente.append("Video de YouTube. Los derechos pertenecen a sus autores. ");
    const enlace = document.createElement("a");
    enlace.className = "product-link";
    enlace.href = `https://www.youtube.com/watch?v=${v.youtube}`;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Ver en YouTube";
    videoFuente.appendChild(enlace);
  }

  videosGrid.querySelectorAll(".video-card").forEach((card) => {
    card.classList.toggle("activo", card.dataset.id === v.id);
  });

  if (actualizarUrl && videosActivo) {
    history.replaceState(null, "", `#videos/${v.id}`);
  }
}

/*---------- LISTA ----------*/

function renderVideos() {
  videosGrid.innerHTML = "";

  videosSkate
    .filter((v) => !filtroVideo || v.categoria === filtroVideo)
    .forEach((v) => {
      const card = document.createElement("button");
      card.className = "video-card";
      card.dataset.id = v.id;
      if (v.id === videoActual.id) card.classList.add("activo");

      const thumb = document.createElement("span");
      thumb.className = "video-card-thumb";
      thumb.appendChild(crearMiniaturaVideo(v));
      const respaldo = document.createElement("span");
      respaldo.className = "video-respaldo";
      respaldo.textContent = v.titulo;
      const ahora = document.createElement("span");
      ahora.className = "video-card-ahora";
      ahora.textContent = "Reproduciendo";
      thumb.append(respaldo, ahora);

      const info = document.createElement("span");
      info.className = "video-card-info";
      const cat = document.createElement("span");
      cat.className = "video-card-cat";
      cat.textContent = videoCategorias[v.categoria];
      const titulo = document.createElement("span");
      titulo.className = "video-card-titulo";
      titulo.textContent = v.titulo;
      const autor = document.createElement("span");
      autor.className = "video-card-autor";
      autor.textContent = v.creditos.map(([, valor]) => valor).slice(0, 2).join(" / ");
      info.append(cat, titulo, autor);

      card.append(thumb, info);
      card.addEventListener("click", () => {
        seleccionarVideo(v.id, { reproducir: true });
        document.getElementById("video-section").scrollIntoView({ behavior: "smooth" });
      });
      videosGrid.appendChild(card);
    });
}

function renderFiltrosVideo() {
  videosFiltros.innerHTML = "";
  [["", "Todos"], ...Object.entries(videoCategorias)].forEach(([clave, nombre]) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "hover-button";
    btn.textContent = nombre;
    if (clave === filtroVideo) btn.classList.add("active");

    const count = document.createElement("span");
    count.className = "filtro-count";
    count.textContent = videosSkate.filter((v) => !clave || v.categoria === clave).length;
    btn.appendChild(count);

    btn.addEventListener("click", () => {
      filtroVideo = clave;
      renderFiltrosVideo();
      renderVideos();
    });
    li.appendChild(btn);
    videosFiltros.appendChild(li);
  });
}

/*---------- BOTONES ----------*/

document.getElementById("video-more").addEventListener("click", () => {
  document.getElementById("videos-lista").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("video-next").addEventListener("click", () => {
  const i = videosSkate.indexOf(videoActual);
  seleccionarVideo(videosSkate[(i + 1) % videosSkate.length].id, { reproducir: true });
});

shareVideoBtn.addEventListener("click", async () => {
  const datos = {
    title: `RBT Videos - ${videoActual.titulo}`,
    url: `${location.origin}${location.pathname}#videos/${videoActual.id}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(datos);
      return;
    }
    await navigator.clipboard.writeText(datos.url);
    shareVideoBtn.textContent = "¡Enlace copiado!";
  } catch (err) {
    if (err.name === "AbortError") return;
    shareVideoBtn.textContent = "No se pudo compartir";
  }

  setTimeout(() => {
    shareVideoBtn.textContent = "Compartir";
  }, 2000);
});

/*---------- RUTAS ----------*/

document.addEventListener("rbt:ruta", (e) => {
  const { nombre, param } = e.detail;
  videosActivo = nombre === "videos";

  if (!videosActivo) {
    // Al salir se descarga el iframe para que YouTube deje de sonar.
    if (videoActual.youtube) mostrarPortada(videoActual);
    return;
  }
  if (param) seleccionarVideo(param, { actualizarUrl: false });
});

document.getElementById("videos-meta").textContent = `${videosSkate.length} videos`;
renderFiltrosVideo();
renderVideos();
seleccionarVideo(videoActual.id, { actualizarUrl: false });
