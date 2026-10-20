// Imagen al azar de todo el archivo de RBT; cada una enlaza a su sección.

const randomImagenes = [
  ...modelos.map((m, i) => ({
    src: m.imagen,
    texto: `Lookbook 2025 - ${m.titulo}`,
    ruta: `lookbook/${i + 1}`,
  })),
  ...productos.flatMap((p) =>
    p.imagenes.map((src) => ({ src, texto: p.nombre, ruta: `producto/${p.id}` }))
  ),
  { src: "/images/video-cover.jpg", texto: "Video - CROOK´S BS SLIDE", ruta: "videos/crooks-bs-slide" },
];

const randomImg = document.getElementById("random-img");
const randomCaption = document.getElementById("random-caption");
const randomOtra = document.getElementById("random-otra");

let randomActual = -1;

function mostrarRandom() {
  let i;
  do {
    i = Math.floor(Math.random() * randomImagenes.length);
  } while (i === randomActual && randomImagenes.length > 1);
  randomActual = i;

  const item = randomImagenes[i];
  randomImg.classList.remove("visible");
  randomImg.onload = () => randomImg.classList.add("visible");
  randomImg.src = item.src;
  randomImg.alt = item.texto;
  randomCaption.textContent = item.texto;
  randomCaption.href = `#${item.ruta}`;
}

randomImg.addEventListener("click", mostrarRandom);
randomOtra.addEventListener("click", mostrarRandom);

document.addEventListener("rbt:ruta", (e) => {
  if (e.detail.nombre === "random") mostrarRandom();
});
