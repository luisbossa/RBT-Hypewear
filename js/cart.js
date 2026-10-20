// Carrito guardado en localStorage. Emite "rbt:carrito" en cada cambio.

const Carrito = (() => {
  const KEY = "rbt-carrito";
  let items = cargar();

  function cargar() {
    try {
      const guardado = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(guardado) ? guardado : [];
    } catch {
      return [];
    }
  }

  function guardar() {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // Sin almacenamiento (modo privado): el carrito vive solo en esta visita.
    }
    document.dispatchEvent(new CustomEvent("rbt:carrito"));
  }

  function buscar(id, talla) {
    return items.find((it) => it.id === id && it.talla === talla);
  }

  function stock(id, talla) {
    const producto = buscarProducto(id);
    return producto ? producto.tallas[talla] || 0 : 0;
  }

  function agregar(id, talla) {
    const item = buscar(id, talla);
    const actual = item ? item.cantidad : 0;
    if (actual >= stock(id, talla)) return false;

    if (item) item.cantidad++;
    else items.push({ id, talla, cantidad: 1 });
    guardar();
    return true;
  }

  function cambiarCantidad(id, talla, delta) {
    const item = buscar(id, talla);
    if (!item) return;
    item.cantidad = Math.min(item.cantidad + delta, stock(id, talla));
    if (item.cantidad < 1) items = items.filter((it) => it !== item);
    guardar();
  }

  function eliminar(id, talla) {
    items = items.filter((it) => !(it.id === id && it.talla === talla));
    guardar();
  }

  function vaciar() {
    items = [];
    guardar();
  }

  function lineas() {
    return items
      .map((it) => ({ ...it, producto: buscarProducto(it.id) }))
      .filter((linea) => linea.producto);
  }

  function cantidadTotal() {
    return lineas().reduce((total, l) => total + l.cantidad, 0);
  }

  function subtotal() {
    return lineas().reduce((total, l) => total + l.cantidad * l.producto.precio, 0);
  }

  return { agregar, cambiarCantidad, eliminar, vaciar, lineas, cantidadTotal, subtotal };
})();

// Hay contador en el footer y en la navegación superior.
function actualizarContadorCarrito() {
  const cantidad = Carrito.cantidadTotal();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cantidad;
  });
  document.querySelectorAll(".cart-li").forEach((el) => {
    el.style.display = cantidad > 0 ? "" : "none";
  });
}

document.addEventListener("rbt:carrito", actualizarContadorCarrito);
actualizarContadorCarrito();
