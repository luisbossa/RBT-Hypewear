// Feed de noticias, de la más reciente a la más antigua.
// #noticias muestra la lista y #noticias/<id> abre el post con el slider.

const noticias = [
  {
    id: "video-crooks-bs-slide",
    fecha: "01/12/2025",
    titulo: "Video - CROOK´S BS SLIDE",
    texto: [
      "Nuevo clip de Dario C., grabado y editado por Alex.",
      "Míralo completo en la sección de videos.",
    ],
    imagenes: ["/images/video-cover.jpg"],
    enlace: { texto: "Ver video", ruta: "videos/crooks-bs-slide" },
  },
  {
    id: "lookbook-2025",
    fecha: "15/11/2025",
    titulo: "Lookbook 2025",
    texto: [
      "16 looks que resumen la temporada: chaquetas floreadas, camuflaje, varsity y piezas clásicas de RBT.",
      "Recorre el lookbook completo y encuentra tu próximo outfit.",
    ],
    imagenes: [
      "/images/lookbook/look-1.jpg",
      "/images/lookbook/look-7.jpg",
      "/images/lookbook/look-13.jpg",
    ],
    enlace: { texto: "Ver lookbook", ruta: "lookbook" },
  },
  {
    id: "drop-invierno-2025",
    fecha: "01/11/2025",
    titulo: "Drop invierno 2025",
    texto: [
      "Llegan 9 abrigos para la temporada fría: puffers, denim reciclado y diseños con estampado.",
      "Las unidades son limitadas y algunas tallas ya están agotadas.",
    ],
    imagenes: [
      "/images/drop/coat-1.avif",
      "/images/drop/coat-4.webp",
      "/images/drop/coat-8.webp",
    ],
    enlace: { texto: "Ver drop", ruta: "drop" },
  },
  {
    id: "rbt-nuevos-disenos",
    fecha: "04/09/2025",
    titulo: "RBT - Nuevos diseños",
    texto: [
      "Para esta temporada de septiembre, RBT lanzará 3 nuevas camisetas gráficas.",
      "Disponibles el 22 de septiembre.",
    ],
    imagenes: [
      "/images/t-shirt1.jpg",
      "/images/t-shirt2.jpg",
      "/images/t-shirt3.jpg",
    ],
    enlace: { texto: "Comprar camisetas", ruta: "tienda/nuevo" },
  },
];

const newsLista = document.getElementById("news-lista");
const newsFecha = document.getElementById("news-fecha");
const newsTitulo = document.getElementById("news-titulo");
const newsTexto = document.getElementById("news-texto");
const newsEnlace = document.getElementById("news-enlace");
const newsPrev = document.getElementById("news-prev");
const newsNext = document.getElementById("news-sig");

function renderNoticias() {
  newsLista.innerHTML = "";

  noticias.forEach((n) => {
    const item = document.createElement("article");
    item.className = "news-item";

    const imgLink = document.createElement("a");
    imgLink.className = "news-item-img";
    imgLink.href = `#noticias/${n.id}`;
    const img = document.createElement("img");
    img.src = n.imagenes[0];
    img.alt = n.titulo;
    img.loading = "lazy";
    imgLink.appendChild(img);

    const cuerpo = document.createElement("div");
    cuerpo.className = "news-item-body";

    const fecha = document.createElement("span");
    fecha.className = "y-color";
    fecha.textContent = n.fecha;

    const titulo = document.createElement("h4");
    titulo.textContent = n.titulo;

    const extracto = document.createElement("p");
    extracto.textContent = n.texto[0];

    const leer = document.createElement("a");
    leer.className = "product-link";
    leer.href = `#noticias/${n.id}`;
    leer.textContent = "Leer más";

    cuerpo.append(fecha, titulo, extracto, leer);
    item.append(imgLink, cuerpo);
    newsLista.appendChild(item);
  });

  document.getElementById("news-meta").textContent = `${noticias.length} publicaciones`;
}

function enlazarNoticia(link, noticia, texto) {
  link.style.visibility = noticia ? "visible" : "hidden";
  if (!noticia) return;
  link.href = `#noticias/${noticia.id}`;
  link.title = noticia.titulo;
  link.textContent = texto;
}

function renderNoticia(id) {
  const i = noticias.findIndex((n) => n.id === id);
  if (i === -1) {
    location.hash = "noticias";
    return;
  }

  const n = noticias[i];
  cargarSlider(n.imagenes, n.titulo);
  newsFecha.textContent = n.fecha;
  newsTitulo.textContent = n.titulo;

  newsTexto.innerHTML = "";
  n.texto.forEach((parrafo) => {
    const p = document.createElement("p");
    p.textContent = parrafo;
    newsTexto.appendChild(p);
  });

  newsEnlace.href = `#${n.enlace.ruta}`;
  newsEnlace.textContent = n.enlace.texto;

  // La lista va de nueva a vieja: "anterior" es la siguiente en el arreglo.
  enlazarNoticia(newsPrev, noticias[i + 1], "‹ Anterior");
  enlazarNoticia(newsNext, noticias[i - 1], "Siguiente ›");
}

document.addEventListener("rbt:ruta", (e) => {
  const { nombre, param } = e.detail;
  if (nombre !== "noticias") return;
  if (param) renderNoticia(param);
  else renderNoticias();
});
