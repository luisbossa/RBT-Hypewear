const imgSlider = document.getElementById("img-slider-img");
const newsBackBtn = document.getElementById("news-back");
const newsNextBtn = document.getElementById("news-next");
const sliderControles = document.querySelector(".img-slider-div");
const sliderContador = document.getElementById("slider-contador");

let indice = 0;
let total = imgSlider.children.length;

function actualizarimgSlider() {
  imgSlider.style.transform = `translateX(-${indice * 100}%)`;

  if (indice === 0) {
    newsBackBtn.classList.add("disabled");
  } else {
    newsBackBtn.classList.remove("disabled");
  }

  if (indice === total - 1) {
    newsNextBtn.classList.add("disabled");
  } else {
    newsNextBtn.classList.remove("disabled");
  }

  sliderContador.textContent = total > 1 ? `${indice + 1} / ${total}` : "";
}

function cargarSlider(imagenes, alt) {
  imgSlider.innerHTML = "";
  imagenes.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${alt} ${i + 1}`;
    imgSlider.appendChild(img);
  });

  indice = 0;
  total = imagenes.length;
  sliderControles.style.display = total > 1 ? "" : "none";
  actualizarimgSlider();
}

newsBackBtn.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    actualizarimgSlider();
  }
});

newsNextBtn.addEventListener("click", () => {
  if (indice < total - 1) {
    indice++;
    actualizarimgSlider();
  }
});

let inicioX = 0;
let finX = 0;

imgSlider.addEventListener("touchstart", (e) => {
  inicioX = e.touches[0].clientX;
});

imgSlider.addEventListener("touchend", (e) => {
  finX = e.changedTouches[0].clientX;
  let diferencia = inicioX - finX;

  if (diferencia > 50 && indice < total - 1) {
    indice++;
    actualizarimgSlider();
  } else if (diferencia < -50 && indice > 0) {
    indice--;
    actualizarimgSlider();
  }
});

actualizarimgSlider();
