const carrusel = document.getElementById("carruselImagenes");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let indice = 0;
const total = 3;

// Función para mover el carrusel y actualizar botones
function actualizarCarrusel() {
  carrusel.style.transform = `translateX(-${indice * 100}%)`;

  // Estado del botón izquierdo
  if (indice === 0) {
    anterior.classList.add("disabled");
  } else {
    anterior.classList.remove("disabled");
  }

  // Estado del botón derecho
  if (indice === total - 1) {
    siguiente.classList.add("disabled");
  } else {
    siguiente.classList.remove("disabled");
  }
}

// Click botón anterior
anterior.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    actualizarCarrusel();
  }
});

// Click botón siguiente
siguiente.addEventListener("click", () => {
  if (indice < total - 1) {
    indice++;
    actualizarCarrusel();
  }
});

// Swipe en móviles
let inicioX = 0;
let finX = 0;

carrusel.addEventListener("touchstart", (e) => {
  inicioX = e.touches[0].clientX;
});

carrusel.addEventListener("touchend", (e) => {
  finX = e.changedTouches[0].clientX;
  let diferencia = inicioX - finX;

  if (diferencia > 50 && indice < total - 1) {
    indice++;
    actualizarCarrusel();
  } else if (diferencia < -50 && indice > 0) {
    indice--;
    actualizarCarrusel();
  }
});

// Aplicar estado inicial al cargar
actualizarCarrusel();
