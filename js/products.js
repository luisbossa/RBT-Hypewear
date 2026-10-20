// Catálogo de la tienda. Las tallas guardan las unidades disponibles (0 = agotada).
// "drop" enlaza el producto con su celda en la sección Drop invierno 2025.

const categorias = {
  ropa: "Ropa",
  accesorios: "Accesorios",
  decks: "Decks",
};

const productos = [
  {
    id: "abrigo-poder-electrico",
    categoria: "ropa",
    drop: 1,
    nombre: "Abrigo Poder Eléctrico",
    color: "Negro",
    descripcion:
      "Este abrigo es perfecto para el invierno frío y tiene un diseño eléctrico.",
    precio: 62000,
    imagenes: ["/images/drop/coat-1.avif", "/images/drop/coat-1.1.avif"],
    tallas: { S: 2, M: 0, L: 3, XL: 1 },
  },
  {
    id: "abrigo-rbt-moderno",
    categoria: "ropa",
    drop: 2,
    nombre: "Abrigo RBT Moderno",
    color: "Gris",
    descripcion:
      "Abrigo con corte moderno, cómodo y resistente, ideal para uso diario.",
    precio: 54000,
    imagenes: ["/images/drop/coat-2.png", "/images/drop/coat-2.2.png"],
    tallas: { S: 4, M: 5, L: 2, XL: 0 },
  },
  {
    id: "abrigo-rbt-vintage",
    categoria: "ropa",
    drop: 3,
    nombre: "Abrigo RBT Vintage",
    color: "Café",
    descripcion: "Diseño vintage con materiales ecológicos y acabado premium.",
    precio: 58000,
    imagenes: ["/images/drop/coat-3.jpg", "/images/drop/coat-3.3.jpg"],
    tallas: { S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: "abrigo-rbt-fortaleza-termica",
    categoria: "ropa",
    drop: 4,
    nombre: "Abrigo RBT Fortaleza Térmica",
    color: "Negro",
    descripcion:
      "Modelo con aislamiento térmico reforzado, ideal para climas extremos.",
    precio: 68000,
    imagenes: ["/images/drop/coat-4.webp", "/images/drop/coat-4.4.webp"],
    tallas: { S: 1, M: 3, L: 3, XL: 2 },
  },
  {
    id: "abrigo-rbt-urbano",
    categoria: "ropa",
    drop: 5,
    nombre: "Abrigo RBT Urbano",
    color: "Verde oliva",
    descripcion: "Diseño urbano con bolsillos funcionales y personalizado.",
    precio: 52000,
    imagenes: ["/images/drop/coat-5.webp", "/images/drop/coat-5.5.webp"],
    tallas: { S: 3, M: 2, L: 0, XL: 1 },
  },
  {
    id: "abrigo-rbt-denim-revival",
    categoria: "ropa",
    drop: 6,
    nombre: "Abrigo RBT Denim Revival",
    color: "Denim gris",
    descripcion:
      "Abrigo vintage confeccionado a partir de retazos de jeans grises.",
    precio: 56000,
    imagenes: ["/images/drop/coat-6.webp", "/images/drop/coat-6.6.webp"],
    tallas: { S: 0, M: 1, L: 0, XL: 0 },
  },
  {
    id: "abrigo-rbt-minimal",
    categoria: "ropa",
    drop: 7,
    nombre: "Abrigo RBT Minimal",
    color: "Blanco",
    descripcion:
      "Estilo minimalista con detalles técnicos y materiales reciclados.",
    precio: 49000,
    imagenes: ["/images/drop/coat-7.webp", "/images/drop/coat-7.7.webp"],
    tallas: { S: 2, M: 4, L: 4, XL: 2 },
  },
  {
    id: "abrigo-rbt-polar",
    categoria: "ropa",
    drop: 8,
    nombre: "Abrigo RBT Polar",
    color: "Negro",
    descripcion:
      "Inspirado en el diseño polar, con múltiples bolsillos y estructura robusta.",
    precio: 64000,
    imagenes: ["/images/drop/coat-8.webp", "/images/drop/coat-8.8.webp"],
    tallas: { S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: "abrigo-rbt-mistico",
    categoria: "ropa",
    drop: 9,
    nombre: "Abrigo RBT Místico",
    color: "Estampado",
    descripcion: "Abrigo con estampado místico, ideal para el día a día.",
    precio: 55000,
    imagenes: ["/images/drop/coat-9.jpg", "/images/drop/coat-9.9.jpg"],
    tallas: { S: 1, M: 2, L: 2, XL: 0 },
  },
  {
    id: "camiseta-hopeless",
    categoria: "ropa",
    nuevo: true,
    nombre: "Camiseta Hopeless",
    color: "Negro",
    descripcion: "Camiseta gráfica de algodón pesado, corte oversize.",
    precio: 16000,
    imagenes: ["/images/t-shirt1.jpg"],
    tallas: { S: 5, M: 6, L: 4, XL: 2 },
  },
  {
    id: "camiseta-savior",
    categoria: "ropa",
    nuevo: true,
    nombre: "Camiseta Savior",
    color: "Negro",
    descripcion: "Camiseta gráfica con estampado posterior, corte oversize.",
    precio: 16000,
    imagenes: ["/images/t-shirt2.jpg"],
    tallas: { S: 3, M: 0, L: 5, XL: 3 },
  },
  {
    id: "camiseta-visduction",
    categoria: "ropa",
    nuevo: true,
    nombre: "Camiseta Visduction",
    color: "Negro",
    descripcion: "Camiseta gráfica de algodón pesado, corte oversize.",
    precio: 16000,
    imagenes: ["/images/t-shirt3.jpg"],
    tallas: { S: 4, M: 4, L: 3, XL: 0 },
  },
];

// Medidas aproximadas de la prenda en plano.
const guiaTallas = {
  columnas: ["Talla", "Pecho (cm)", "Largo (cm)", "Manga (cm)"],
  filas: [
    ["S", 54, 70, 21],
    ["M", 57, 72, 22],
    ["L", 60, 74, 23],
    ["XL", 63, 76, 24],
  ],
};

function llenarTablaTallas(tabla) {
  tabla.innerHTML = "";
  const cabecera = tabla.createTHead().insertRow();
  guiaTallas.columnas.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    cabecera.appendChild(th);
  });
  const cuerpo = tabla.createTBody();
  guiaTallas.filas.forEach((fila) => {
    const tr = cuerpo.insertRow();
    fila.forEach((valor) => (tr.insertCell().textContent = valor));
  });
}

const formatoColones = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

function formatoPrecio(monto) {
  return formatoColones.format(monto);
}

function buscarProducto(id) {
  return productos.find((p) => p.id === id);
}

function estaAgotado(producto) {
  return Object.values(producto.tallas).every((unidades) => unidades === 0);
}
