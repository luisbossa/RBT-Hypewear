const dropGrid = document.getElementById("drop-grid");
const toggleSection = document.getElementById("drop-img-toggle");
const imagenesContainer = toggleSection.querySelector(".drop-imgs");
const tituloElem = toggleSection.querySelector("#drop-titulo");
const textoElem = toggleSection.querySelector("#drop-texto");
const precioElem = toggleSection.querySelector("#drop-precio");
const frontalBtn = toggleSection.querySelector(".btn.frontal");
const posteriorBtn = toggleSection.querySelector(".btn.posterior");
const comprarBtn = document.getElementById("drop-comprar");
const dropPrev = document.getElementById("drop-prev");
const dropNext = document.getElementById("drop-next");
const dropContador = document.getElementById("drop-contador");

const dropItems = productos
  .filter((p) => p.drop)
  .sort((a, b) => a.drop - b.drop);

function renderDropGrid() {
  dropGrid.innerHTML = "";

  dropItems.forEach((item) => {
    const cell = document.createElement("div");
    cell.className = "drop-cell";

    const btn = document.createElement("button");
    btn.dataset.route = `drop/${item.drop}`;

    const img = document.createElement("img");
    img.src = item.imagenes[0];
    img.alt = item.nombre;
    img.loading = "lazy";

    const info = document.createElement("span");
    info.className = "shop-item-info";
    const nombre = document.createElement("span");
    nombre.textContent = item.nombre;
    info.appendChild(nombre);

    btn.append(img, info);
    if (estaAgotado(item)) {
      const tag = document.createElement("span");
      tag.className = "sold-out-tag";
      tag.textContent = "agotado";
      btn.appendChild(tag);
    }

    cell.appendChild(btn);
    dropGrid.appendChild(cell);
  });

  document.getElementById("drop-meta").textContent = `${dropItems.length} artículos`;
}

function loadingImgToggle(index) {
  const posicion = dropItems.findIndex((p) => p.drop === index);
  const item = dropItems[posicion];
  if (!item) {
    location.hash = "drop";
    return;
  }

  imagenesContainer.innerHTML = "";

  item.imagenes.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${item.nombre} Imagen ${i + 1}`;
    if (i === 0) img.classList.add("activo");
    imagenesContainer.appendChild(img);
  });

  tituloElem.textContent = item.nombre;
  textoElem.textContent = item.descripcion;
  precioElem.textContent = estaAgotado(item)
    ? "Agotado"
    : formatoPrecio(item.precio);
  comprarBtn.dataset.route = `producto/${item.id}`;
  mostrarVista(0);

  // Navegación circular entre artículos del drop.
  const total = dropItems.length;
  dropPrev.href = `#drop/${dropItems[(posicion - 1 + total) % total].drop}`;
  dropNext.href = `#drop/${dropItems[(posicion + 1) % total].drop}`;
  dropContador.textContent = `${posicion + 1} / ${total}`;
}

function mostrarVista(vista) {
  const imgs = imagenesContainer.querySelectorAll("img");
  if (imgs.length < 2) return;
  imgs.forEach((img, i) => img.classList.toggle("activo", i === vista));
  frontalBtn.classList.toggle("activo", vista === 0);
  posteriorBtn.classList.toggle("activo", vista === 1);
}

frontalBtn.addEventListener("click", () => mostrarVista(0));
posteriorBtn.addEventListener("click", () => mostrarVista(1));

document.addEventListener("keydown", (e) => {
  if (toggleSection.style.display === "none") return;
  if (e.key === "ArrowRight") dropNext.click();
  if (e.key === "ArrowLeft") dropPrev.click();
});

document.addEventListener("rbt:ruta", (e) => {
  const { nombre, param } = e.detail;
  if (nombre !== "drop") return;
  if (param) loadingImgToggle(Number(param));
  else renderDropGrid();
});
