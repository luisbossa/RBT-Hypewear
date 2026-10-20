// Privacidad (índice + datos guardados en el navegador) y FAQ (buscador,
// filtros por tema y acordeón).

/*==================== PRIVACIDAD ====================*/

const privacyDatos = document.getElementById("privacy-datos");
const privacyBorrar = document.getElementById("privacy-borrar");
const privacyEstado = document.getElementById("privacy-estado");
let borrarConfirmado = false;

// El índice usa botones con scroll: un enlace "#id" cambiaría la ruta del router.
document.querySelectorAll("#privacy-indice button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.ir).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function leerLocal(clave) {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
}

function renderDatosNavegador() {
  let pedidos = [];
  try {
    pedidos = JSON.parse(leerLocal("rbt-pedidos")) || [];
  } catch {
    pedidos = [];
  }
  const cantidad = Carrito.cantidadTotal();
  const newsletter = leerLocal("rbt-newsletter");

  const filas = [
    ["Carrito", cantidad ? `${cantidad} ${cantidad === 1 ? "artículo" : "artículos"}` : "Vacío"],
    ["Pedidos", pedidos.length ? `${pedidos.length} guardado${pedidos.length === 1 ? "" : "s"}` : "Ninguno"],
    ["Newsletter", newsletter || "Sin suscripción"],
  ];

  privacyDatos.innerHTML = "";
  filas.forEach(([clave, valor]) => {
    const dt = document.createElement("dt");
    dt.textContent = clave;
    const dd = document.createElement("dd");
    dd.textContent = valor;
    privacyDatos.append(dt, dd);
  });

  const hayDatos = cantidad || pedidos.length || newsletter;
  privacyBorrar.disabled = !hayDatos;
}

function reiniciarBorrar() {
  borrarConfirmado = false;
  privacyBorrar.textContent = "Borrar mis datos de este navegador";
  privacyBorrar.classList.remove("confirmar");
}

// Dos pasos para evitar borrados accidentales.
privacyBorrar.addEventListener("click", () => {
  if (!borrarConfirmado) {
    borrarConfirmado = true;
    privacyBorrar.textContent = "¿Seguro? Toca de nuevo para borrar";
    privacyBorrar.classList.add("confirmar");
    privacyEstado.textContent = "";
    return;
  }

  Carrito.vaciar();
  try {
    localStorage.removeItem("rbt-pedidos");
    localStorage.removeItem("rbt-newsletter");
  } catch {
    // Sin almacenamiento disponible: no había nada guardado.
  }
  reiniciarBorrar();
  renderDatosNavegador();
  privacyEstado.textContent = "Listo. Borramos tu carrito, tus pedidos guardados y tu suscripción de este navegador.";
});

/*==================== FAQ ====================*/

const faqTemas = {
  pedidos: "Pedidos",
  pagos: "Pagos",
  envios: "Envíos",
  devoluciones: "Devoluciones",
  productos: "Productos",
};

// Las respuestas son contenido fijo del sitio (pueden llevar enlaces internos).
const faqPreguntas = [
  {
    tema: "pedidos",
    pregunta: "¿Cómo puedo hacer un pedido?",
    respuesta:
      'Entra a la <a href="#tienda">Tienda</a>, selecciona el producto que te interese, elige tu talla y agrégalo al carrito. Luego, abre el carrito y completa tus datos de envío para confirmar tu pedido.',
  },
  {
    tema: "pedidos",
    pregunta: "¿Cómo sé el estado de mi pedido?",
    respuesta:
      'Al confirmar tu compra recibes un número de pedido (por ejemplo RBT-123456). Búscalo en <a href="#ayuda/pedido">Ayuda › Estado del pedido</a>.',
  },
  {
    tema: "pedidos",
    pregunta: "¿Puedo cambiar o cancelar mi pedido?",
    respuesta:
      'Escríbenos cuanto antes desde <a href="#contacto/pedido">Contacto</a> con tu número de pedido y vemos cómo ayudarte.',
  },
  {
    tema: "pagos",
    pregunta: "¿Cuáles son los métodos de pago disponibles?",
    respuesta:
      "Aceptamos SINPE Móvil, transferencia bancaria y PayPal. Al confirmar tu pedido te enviamos las instrucciones de pago por correo.",
  },
  {
    tema: "pagos",
    pregunta: "¿Cuándo tengo que pagar?",
    respuesta:
      "Después de confirmar el pedido te llegan las instrucciones de pago por correo. Despachamos el paquete una vez recibido el pago.",
  },
  {
    tema: "envios",
    pregunta: "¿En qué países realizan envíos?",
    respuesta:
      'Actualmente realizamos envíos solo dentro de Costa Rica, a través de Correos de Costa Rica. Más detalles en <a href="#ayuda/envios">Ayuda › Envíos</a>.',
  },
  {
    tema: "envios",
    pregunta: "¿Cuánto cuesta el envío?",
    respuesta: "Tarifa única de ₡3 000 por pedido a cualquier provincia del país.",
  },
  {
    tema: "devoluciones",
    pregunta: "¿Puedo devolver un producto?",
    respuesta:
      "Sí, puedes devolver un producto dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y en su empaque original.",
  },
  {
    tema: "devoluciones",
    pregunta: "¿Cómo inicio una devolución?",
    respuesta:
      'Escríbenos desde <a href="#contacto/pedido">Contacto</a> eligiendo el motivo "Pedido o envío" e incluye tu número de pedido.',
  },
  {
    tema: "productos",
    pregunta: "¿Cómo elijo mi talla?",
    respuesta:
      'Revisa la <a href="#ayuda/tallas">guía de tallas</a> con las medidas de la prenda en plano. Si estás entre dos tallas, elige la mayor para un fit más amplio.',
  },
  {
    tema: "productos",
    pregunta: "¿Van a volver las tallas agotadas?",
    respuesta:
      "Trabajamos con tiradas cortas por temporada. Suscríbete al newsletter del pie de página para enterarte de cada nuevo drop.",
  },
  {
    tema: "productos",
    pregunta: "¿Venden decks y accesorios?",
    respuesta:
      'Próximamente. Síguenos en <a href="https://www.instagram.com/lilalerr" target="_blank" rel="noopener noreferrer">Instagram</a> para enterarte cuando lleguen.',
  },
];

const faqLista = document.getElementById("faq-lista");
const faqFiltros = document.getElementById("faq-filtros");
const faqBuscar = document.getElementById("faq-buscar");
const faqVacio = document.getElementById("faq-vacio");
let faqTema = "";

// Búsqueda sin tildes ni mayúsculas ("envio" encuentra "Envío").
const normalizar = (texto) =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function textoPlano(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent;
}

function renderFaq() {
  const termino = normalizar(faqBuscar.value.trim());
  const visibles = faqPreguntas.filter(
    (f) =>
      (!faqTema || f.tema === faqTema) &&
      (!termino || normalizar(`${f.pregunta} ${textoPlano(f.respuesta)}`).includes(termino))
  );

  faqLista.innerHTML = "";
  visibles.forEach((f) => {
    const item = document.createElement("details");
    item.className = "faq-item";

    const summary = document.createElement("summary");
    const tema = document.createElement("span");
    tema.className = "faq-tema";
    tema.textContent = faqTemas[f.tema];
    const pregunta = document.createElement("span");
    pregunta.className = "faq-pregunta";
    pregunta.textContent = f.pregunta;
    summary.append(pregunta, tema);

    const respuesta = document.createElement("p");
    respuesta.innerHTML = f.respuesta;

    item.append(summary, respuesta);
    // Acordeón: abrir una pregunta cierra las demás.
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqLista.querySelectorAll("details[open]").forEach((d) => {
        if (d !== item) d.open = false;
      });
    });
    faqLista.appendChild(item);
  });

  // Con búsqueda activa y un solo resultado, se abre directamente.
  if (termino && visibles.length === 1) faqLista.firstElementChild.open = true;

  faqVacio.style.display = visibles.length ? "none" : "block";
}

function renderFaqFiltros() {
  faqFiltros.innerHTML = "";
  [["", "Todas"], ...Object.entries(faqTemas)].forEach(([clave, nombre]) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "hover-button";
    btn.textContent = nombre;
    if (clave === faqTema) btn.classList.add("active");

    const count = document.createElement("span");
    count.className = "filtro-count";
    count.textContent = faqPreguntas.filter((f) => !clave || f.tema === clave).length;
    btn.appendChild(count);

    btn.addEventListener("click", () => {
      faqTema = clave;
      renderFaqFiltros();
      renderFaq();
    });
    li.appendChild(btn);
    faqFiltros.appendChild(li);
  });
}

faqBuscar.addEventListener("input", renderFaq);

document.getElementById("faq-meta").textContent = `${faqPreguntas.length} preguntas`;
renderFaqFiltros();
renderFaq();

/*==================== RUTAS ====================*/

document.addEventListener("rbt:ruta", (e) => {
  if (e.detail.nombre === "privacidad") {
    reiniciarBorrar();
    privacyEstado.textContent = "";
    renderDatosNavegador();
  }
});
