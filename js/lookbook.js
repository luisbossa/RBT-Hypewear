const modelos = [
  {
    titulo: "Modelo 1",
    descripcion: "Chaqueta negra oversize.",
    imagen: "/images/lookbook/look-1.jpg",
  },
  {
    titulo: "Modelo 2",
    descripcion: "Abrigo rojo RBT clásico.",
    imagen: "/images/lookbook/look-2.jpg",
  },
  {
    titulo: "Modelo 3",
    descripcion: "Camisa de cuadros otoño.",
    imagen: "/images/lookbook/look-3.jpg",
  },
  {
    titulo: "Modelo 4",
    descripcion: "Estilo streetwear urbano.",
    imagen: "/images/lookbook/look-4.jpg",
  },
  {
    titulo: "Modelo 5",
    descripcion: "Sudadera blanca con logo.",
    imagen: "/images/lookbook/look-5.jpg",
  },
  {
    titulo: "Modelo 6",
    descripcion: "Outfit casual beige.",
    imagen: "/images/lookbook/look-6.jpg",
  },
  {
    titulo: "Modelo 7",
    descripcion: "Gorra + chaqueta bomber.",
    imagen: "/images/lookbook/look-7.jpg",
  },
  {
    titulo: "Modelo 8",
    descripcion: "Look monocromático blanco.",
    imagen: "/images/lookbook/look-8.jpg",
  },
  {
    titulo: "Modelo 9",
    descripcion: "Jeans rotos y camiseta logo.",
    imagen: "/images/lookbook/look-9.jpg",
  },
  {
    titulo: "Modelo 10",
    descripcion: "Look relajado con mochila.",
    imagen: "/images/lookbook/look-10.jpg",
  },
  {
    titulo: "Modelo 11",
    descripcion: "Tonalidades pastel.",
    imagen: "/images/lookbook/look-11.jpg",
  },
  {
    titulo: "Modelo 12",
    descripcion: "Jersey con estampado.",
    imagen: "/images/lookbook/look-12.jpg",
  },
  {
    titulo: "Modelo 13",
    descripcion: "Chaqueta varsity RBT.",
    imagen: "/images/lookbook/look-13.jpg",
  },
  {
    titulo: "Modelo 14",
    descripcion: "Estilo skater callejero.",
    imagen: "/images/lookbook/look-14.jpg",
  },
  {
    titulo: "Modelo 15",
    descripcion: "Cazadora con capucha.",
    imagen: "/images/lookbook/look-15.jpg",
  },
  {
    titulo: "Modelo 16",
    descripcion: "Look completo RBT.",
    imagen: "/images/lookbook/look-16.jpg",
  },
];

const miniaturas = document.getElementById("miniaturas");
const imagenGrande = document.getElementById("imagen-grande");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");

function mostrarModelo(index) {
  const modelo = modelos[index];
  imagenGrande.src = modelo.imagen;
  imagenGrande.alt = modelo.titulo;
  titulo.textContent = modelo.titulo;
  descripcion.textContent = modelo.descripcion;
}

function generarMiniaturas() {
  modelos.forEach((modelo, index) => {
    const img = document.createElement("img");
    img.src = modelo.imagen;
    img.alt = modelo.titulo;
    img.addEventListener("click", () => mostrarModelo(index));
    miniaturas.appendChild(img);
  });

  // Mostrar el primero por defecto
  mostrarModelo(0);
}

document.addEventListener("DOMContentLoaded", generarMiniaturas);
