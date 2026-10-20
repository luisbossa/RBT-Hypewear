// Ayuda: #ayuda/envios, #ayuda/devoluciones, #ayuda/tallas, #ayuda/pedido.
// El estado del pedido se busca entre los pedidos guardados en este navegador.

const helpTabs = document.querySelectorAll(".help-tabs .hover-button");
const helpPanels = document.querySelectorAll(".help-panel");
const pedidoForm = document.getElementById("pedido-form");
const pedidoInput = document.getElementById("pedido-input");
const pedidoResultado = document.getElementById("pedido-resultado");
const pedidosRecientes = document.getElementById("pedidos-recientes");

const nombresPago = {
  sinpe: "SINPE Móvil",
  transferencia: "Transferencia bancaria",
  paypal: "PayPal",
};

llenarTablaTallas(document.getElementById("help-tallas"));

function leerPedidos() {
  try {
    return JSON.parse(localStorage.getItem("rbt-pedidos")) || [];
  } catch {
    return [];
  }
}

function mostrarPanel(nombre) {
  const existe = [...helpPanels].some((p) => p.dataset.panel === nombre);
  const activo = existe ? nombre : "envios";

  helpPanels.forEach((p) => {
    p.style.display = p.dataset.panel === activo ? "block" : "none";
  });
  helpTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.route === `ayuda/${activo}`);
  });

  if (activo === "pedido") renderPedidosRecientes();
}

function renderPedido(pedido) {
  pedidoResultado.innerHTML = "";

  if (!pedido) {
    const p = document.createElement("p");
    p.className = "error-msg show";
    p.textContent =
      "No encontramos ese pedido en este navegador. Revisa el número o escríbenos desde Contacto.";
    pedidoResultado.appendChild(p);
    return;
  }

  const fecha = new Date(pedido.fecha).toLocaleDateString("es-CR", {
    timeZone: "America/Costa_Rica",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const filas = [
    ["Pedido", pedido.numero],
    ["Fecha", fecha],
    ["Estado", "Recibido - esperando pago"],
    ["Pago", nombresPago[pedido.cliente.pago] || pedido.cliente.pago],
    ["Total", formatoPrecio(pedido.total)],
  ];

  const tabla = document.createElement("dl");
  tabla.className = "pedido-datos";
  filas.forEach(([clave, valor]) => {
    const dt = document.createElement("dt");
    dt.textContent = clave;
    const dd = document.createElement("dd");
    dd.textContent = valor;
    tabla.append(dt, dd);
  });

  const lista = document.createElement("ul");
  lista.className = "checkout-lineas";
  pedido.lineas.forEach((l) => {
    const producto = buscarProducto(l.id);
    const li = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.textContent = `${l.cantidad} × ${producto ? producto.nombre : l.id} (${l.talla})`;
    const precio = document.createElement("span");
    precio.textContent = formatoPrecio(l.precio * l.cantidad);
    li.append(nombre, precio);
    lista.appendChild(li);
  });

  pedidoResultado.append(tabla, lista);
}

function renderPedidosRecientes() {
  const pedidos = leerPedidos().slice(-5).reverse();
  pedidosRecientes.innerHTML = "";
  if (!pedidos.length) return;

  const titulo = document.createElement("p");
  titulo.textContent = "Tus pedidos recientes:";
  pedidosRecientes.appendChild(titulo);

  pedidos.forEach((pedido) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cart-quitar";
    btn.textContent = pedido.numero;
    btn.addEventListener("click", () => {
      pedidoInput.value = pedido.numero;
      renderPedido(pedido);
    });
    pedidosRecientes.appendChild(btn);
  });
}

pedidoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const numero = pedidoInput.value.trim().toUpperCase();
  if (!numero) return;
  renderPedido(leerPedidos().find((p) => p.numero === numero));
});

document.addEventListener("rbt:ruta", (e) => {
  if (e.detail.nombre === "ayuda") mostrarPanel(e.detail.param);
});
