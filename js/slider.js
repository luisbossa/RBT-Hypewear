const imgSlider = document.getElementById("img-slider-img");
const newsBackBtn = document.getElementById("news-back");
const newsNextBtn = document.getElementById("news-next");

let indice = 0;
const total = 3;

function actualizarimgSlider() {
  imgSlider.style.transform = `translateX(-${indice * 100}%)`;

  // Estado del botón izquierdo
  if (indice === 0) {
    newsBackBtn.classList.add("disabled");
  } else {
    newsBackBtn.classList.remove("disabled");
  }

  // Estado del botón derecho
  if (indice === total - 1) {
    newsNextBtn.classList.add("disabled");
  } else {
    newsNextBtn.classList.remove("disabled");
  }
}

// Click botón newsBackBtn
newsBackBtn.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    actualizarimgSlider();
  }
});

// Click botón newsNextBtn
newsNextBtn.addEventListener("click", () => {
  if (indice < total - 1) {
    indice++;
    actualizarimgSlider();
  }
});

// Swipe en móviles
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

// Aplicar estado inicial al cargar
actualizarimgSlider();
