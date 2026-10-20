document.addEventListener("DOMContentLoaded", () => {
  const ENVIO = 3000; // Correos de Costa Rica, tarifa única

  const shopFiltros = document.getElementById("shop-filtros");
  const shopGrid = document.getElementById("shop-grid");
  const shopVacio = document.getElementById("shop-vacio");
  const shopMeta = document.getElementById("shop-meta");
  const shopTitulo = document.getElementById("shop-titulo");

  const productoImg = document.getElementById("product-img");
  const productoThumbs = document.getElementById("product-thumbs");
  const productoNombre = document.getElementById("product-nombre");
  const productoColor = document.getElementById("product-color");
  const productoDesc = document.getElementById("product-desc");
  const productoPrecio = document.getElementById("product-precio");
  const productoTallas = document.getElementById("product-tallas");
  const productoAgregar = document.getElementById("product-agregar");
  const productoEstado = document.getElementById("product-estado");
  const productoAtras = document.getElementById("product-atras");
  const productoMigas = document.getElementById("product-migas");
  const productoRelacionados = document.getElementById("product-relacionados");
  const productoPrev = document.getElementById("product-prev");
  const productoNext = document.getElementById("product-next");

  const miniCart = document.getElementById("mini-cart");
  let miniCartTimeout;

  llenarTablaTallas(document.getElementById("product-guia"));

  const cartLista = document.getElementById("cart-lista");
  const cartVacio = document.getElementById("cart-vacio");
  const cartResumen = document.getElementById("cart-resumen");
  const cartSubtotal = document.getElementById("cart-subtotal");

  const checkoutForm = document.getElementById("checkout-form");
  const checkoutBox = document.getElementById("checkout-box");
  const checkoutLineas = document.getElementById("checkout-lineas");
  const checkoutSubtotal = document.getElementById("checkout-subtotal");
  const checkoutEnvio = document.getElementById("checkout-envio");
  const checkoutTotal = document.getElementById("checkout-total");
  const pedidoConfirmado = document.getElementById("pedido-confirmado");

  let rutaActual = "";
  let productoActual = null;
  let tallaSeleccionada = null;

  function crear(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  /*---------- GRILLA ----------*/

  // "nuevo" es un filtro especial además de las categorías.
  const filtros = { nuevo: "Nuevo", ...categorias };

  function filtrar(filtro) {
    if (!filtro) return productos;
    if (filtro === "nuevo") return productos.filter((p) => p.nuevo);
    return productos.filter((p) => p.categoria === filtro);
  }

  function crearShopItem(p) {
    const item = crear("button", "shop-item");
    item.dataset.route = `producto/${p.id}`;

    const img = crear("img");
    img.src = p.imagenes[0];
    img.alt = p.nombre;
    img.loading = "lazy";
    item.appendChild(img);

    if (estaAgotado(p)) item.appendChild(crear("span", "sold-out-tag", "agotado"));
    else if (p.nuevo) item.appendChild(crear("span", "sold-out-tag new-tag", "nuevo"));

    const info = crear("span", "shop-item-info");
    info.append(
      crear("span", "shop-item-nombre", p.nombre),
      crear("span", "shop-item-precio", formatoPrecio(p.precio))
    );
    item.appendChild(info);
    return item;
  }

  function renderTienda(filtro) {
    if (filtro && !filtros[filtro]) {
      location.hash = "tienda";
      return;
    }

    shopFiltros.innerHTML = "";
    [["", "Todo"], ...Object.entries(filtros)].forEach(([clave, nombre]) => {
      const li = crear("li");
      const btn = crear("button", "hover-button", nombre);
      btn.dataset.route = clave ? `tienda/${clave}` : "tienda";
      if ((filtro || "") === clave) btn.classList.add("active");
      btn.appendChild(crear("span", "filtro-count", filtrar(clave).length));
      li.appendChild(btn);
      shopFiltros.appendChild(li);
    });

    const lista = filtrar(filtro);
    shopGrid.innerHTML = "";
    lista.forEach((p) => shopGrid.appendChild(crearShopItem(p)));

    shopTitulo.textContent = filtro ? filtros[filtro] : "Tienda";
    shopMeta.textContent = `${lista.length} artículos`;
    shopGrid.style.display = lista.length ? "" : "none";
    shopVacio.style.display = lista.length ? "none" : "block";
  }

  /*---------- PRODUCTO ----------*/

  function mostrarImagen(i) {
    productoImg.src = productoActual.imagenes[i];
    productoImg.alt = `${productoActual.nombre} Imagen ${i + 1}`;
    productoThumbs.querySelectorAll("button").forEach((btn, j) => {
      btn.classList.toggle("activo", i === j);
    });
  }

  function renderProducto(id) {
    const p = buscarProducto(id);
    if (!p) {
      location.hash = "tienda";
      return;
    }

    productoActual = p;
    tallaSeleccionada = null;
    productoEstado.textContent = "";

    productoThumbs.innerHTML = "";
    if (p.imagenes.length > 1) {
      p.imagenes.forEach((src, i) => {
        const btn = crear("button");
        const img = crear("img");
        img.src = src;
        img.alt = `${p.nombre} miniatura ${i + 1}`;
        btn.appendChild(img);
        btn.addEventListener("click", () => mostrarImagen(i));
        productoThumbs.appendChild(btn);
      });
    }
    mostrarImagen(0);

    productoNombre.textContent = p.nombre;
    productoColor.textContent = p.color;
    productoDesc.textContent = p.descripcion;
    productoPrecio.textContent = formatoPrecio(p.precio);
    productoAtras.href = `#tienda/${p.categoria}`;

    productoTallas.innerHTML = "";
    const tallas = Object.entries(p.tallas);
    tallas.forEach(([talla, unidades]) => {
      const btn = crear("button", "size-btn", talla);
      btn.type = "button";
      btn.disabled = unidades === 0;
      if (unidades === 0) btn.title = "Agotada";
      btn.addEventListener("click", () => {
        tallaSeleccionada = talla;
        productoEstado.textContent = "";
        productoTallas
          .querySelectorAll(".size-btn")
          .forEach((b) => b.classList.toggle("activo", b === btn));
      });
      productoTallas.appendChild(btn);
    });

    const disponibles = productoTallas.querySelectorAll(".size-btn:not(:disabled)");
    if (tallas.length === 1 && disponibles.length === 1) disponibles[0].click();

    const agotado = estaAgotado(p);
    productoAgregar.disabled = agotado;
    productoAgregar.textContent = agotado ? "Agotado" : "Agregar al carrito";

    // Migas: Tienda / Categoría / Producto
    productoMigas.innerHTML = "";
    const aTienda = crear("a", "", "Tienda");
    aTienda.href = "#tienda";
    const aCategoria = crear("a", "", categorias[p.categoria]);
    aCategoria.href = `#tienda/${p.categoria}`;
    productoMigas.append(aTienda, " / ", aCategoria, " / ", crear("span", "", p.nombre));

    // Anterior / siguiente dentro de la misma categoría (circular).
    const hermanos = productos.filter((x) => x.categoria === p.categoria);
    const pos = hermanos.indexOf(p);
    productoPrev.href = `#producto/${hermanos[(pos - 1 + hermanos.length) % hermanos.length].id}`;
    productoNext.href = `#producto/${hermanos[(pos + 1) % hermanos.length].id}`;

    // Relacionados: primero los disponibles de la misma categoría.
    productoRelacionados.innerHTML = "";
    hermanos
      .filter((x) => x !== p)
      .sort((a, b) => estaAgotado(a) - estaAgotado(b))
      .slice(0, 4)
      .forEach((x) => productoRelacionados.appendChild(crearShopItem(x)));
  }

  function mostrarMiniCarrito(producto, talla) {
    document.getElementById("mini-cart-img").src = producto.imagenes[0];
    document.getElementById("mini-cart-nombre").textContent = producto.nombre;
    document.getElementById("mini-cart-detalle").textContent =
      `Talla ${talla} / ${formatoPrecio(producto.precio)}`;
    const cantidad = Carrito.cantidadTotal();
    document.getElementById("mini-cart-cantidad").textContent =
      `${cantidad} ${cantidad === 1 ? "artículo" : "artículos"}`;
    document.getElementById("mini-cart-subtotal").textContent =
      formatoPrecio(Carrito.subtotal());

    miniCart.classList.add("show");
    clearTimeout(miniCartTimeout);
    miniCartTimeout = setTimeout(ocultarMiniCarrito, 5000);
  }

  function ocultarMiniCarrito() {
    miniCart.classList.remove("show");
  }

  document.getElementById("mini-cart-cerrar").addEventListener("click", ocultarMiniCarrito);

  productoAgregar.addEventListener("click", () => {
    if (!productoActual) return;

    if (!tallaSeleccionada) {
      productoEstado.textContent = "Selecciona una talla.";
      return;
    }

    if (!Carrito.agregar(productoActual.id, tallaSeleccionada)) {
      productoEstado.textContent = "No quedan más unidades en esta talla.";
      return;
    }

    productoEstado.textContent = "";
    mostrarMiniCarrito(productoActual, tallaSeleccionada);
  });

  /*---------- CARRITO ----------*/

  function renderCarrito() {
    const lineas = Carrito.lineas();
    cartLista.innerHTML = "";
    cartVacio.style.display = lineas.length ? "none" : "block";
    cartResumen.style.display = lineas.length ? "" : "none";

    lineas.forEach(({ id, talla, cantidad, producto }) => {
      const fila = crear("li", "cart-item");

      const link = crear("a", "cart-item-img");
      link.href = `#producto/${id}`;
      const img = crear("img");
      img.src = producto.imagenes[0];
      img.alt = producto.nombre;
      link.appendChild(img);

      const info = crear("div", "cart-item-info");
      info.append(
        crear("p", "cart-item-nombre", producto.nombre),
        crear("p", "cart-item-detalle", `${producto.color} / Talla ${talla}`)
      );

      const qty = crear("div", "qty");
      const menos = crear("button", "qty-btn", "−");
      menos.setAttribute("aria-label", "Quitar uno");
      menos.addEventListener("click", () => Carrito.cambiarCantidad(id, talla, -1));
      const mas = crear("button", "qty-btn", "+");
      mas.setAttribute("aria-label", "Agregar uno");
      mas.disabled = cantidad >= producto.tallas[talla];
      mas.addEventListener("click", () => Carrito.cambiarCantidad(id, talla, 1));
      qty.append(menos, crear("span", "qty-num", cantidad), mas);

      const quitar = crear("button", "cart-quitar", "Eliminar");
      quitar.addEventListener("click", () => Carrito.eliminar(id, talla));
      info.append(qty, quitar);

      fila.append(
        link,
        info,
        crear("p", "cart-item-precio", formatoPrecio(producto.precio * cantidad))
      );
      cartLista.appendChild(fila);
    });

    cartSubtotal.textContent = formatoPrecio(Carrito.subtotal());
  }

  document.addEventListener("rbt:carrito", () => {
    if (rutaActual === "carrito") renderCarrito();
  });

  /*---------- CHECKOUT ----------*/

  function renderCheckout() {
    const lineas = Carrito.lineas();
    if (!lineas.length) {
      location.hash = "carrito";
      return;
    }

    checkoutBox.style.display = "";
    pedidoConfirmado.style.display = "none";

    checkoutLineas.innerHTML = "";
    lineas.forEach(({ talla, cantidad, producto }) => {
      const fila = crear("li");
      fila.append(
        crear("span", "", `${cantidad} × ${producto.nombre} (${talla})`),
        crear("span", "", formatoPrecio(producto.precio * cantidad))
      );
      checkoutLineas.appendChild(fila);
    });

    const subtotal = Carrito.subtotal();
    checkoutSubtotal.textContent = formatoPrecio(subtotal);
    checkoutEnvio.textContent = formatoPrecio(ENVIO);
    checkoutTotal.textContent = formatoPrecio(subtotal + ENVIO);
  }

  function marcarError(campo, mensaje) {
    const error = campo.closest(".form-group").querySelector(".error-msg");
    error.textContent = mensaje;
    error.classList.add("show");
  }

  function validarCheckout() {
    let valido = true;

    checkoutForm.querySelectorAll(".error-msg").forEach((msg) => {
      msg.textContent = "";
      msg.classList.remove("show");
    });

    checkoutForm.querySelectorAll("[required]").forEach((campo) => {
      if (campo.type === "radio") return;
      const valor = campo.value.trim();

      if (!valor) {
        valido = false;
        marcarError(campo, "Este campo es obligatorio");
      } else if (campo.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor)) {
        valido = false;
        marcarError(campo, "Correo inválido");
      } else if (campo.type === "tel" && !/^[0-9\s-]{8,}$/.test(valor)) {
        valido = false;
        marcarError(campo, "Teléfono inválido");
      }
    });

    const pago = checkoutForm.querySelector("input[name=pago]");
    if (!checkoutForm.querySelector("input[name=pago]:checked")) {
      valido = false;
      marcarError(pago, "Selecciona un método de pago");
    }

    return valido;
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarCheckout()) return;

    const datos = new FormData(checkoutForm);
    const subtotal = Carrito.subtotal();
    const pedido = {
      numero: `RBT-${Date.now().toString().slice(-6)}`,
      fecha: new Date().toISOString(),
      cliente: Object.fromEntries(datos),
      lineas: Carrito.lineas().map(({ id, talla, cantidad, producto }) => ({
        id,
        talla,
        cantidad,
        precio: producto.precio,
      })),
      total: subtotal + ENVIO,
    };

    try {
      const pedidos = JSON.parse(localStorage.getItem("rbt-pedidos")) || [];
      pedidos.push(pedido);
      localStorage.setItem("rbt-pedidos", JSON.stringify(pedidos));
    } catch {
      // El pedido se confirma igual aunque no se pueda guardar localmente.
    }

    document.getElementById("pedido-numero").textContent = pedido.numero;
    document.getElementById("pedido-correo").textContent = pedido.cliente.email;
    document.getElementById("pedido-total").textContent = formatoPrecio(pedido.total);

    checkoutForm.reset();
    const provincia = checkoutForm.querySelector(".custom-dropdown");
    provincia.querySelector(".dropdown-selected").textContent = "Provincia";
    provincia.querySelector("input[type=hidden]").value = "";

    Carrito.vaciar();
    checkoutBox.style.display = "none";
    pedidoConfirmado.style.display = "flex";
    window.scrollTo(0, 0);
  });

  /*---------- RUTAS ----------*/

  document.addEventListener("rbt:ruta", (e) => {
    const { nombre, param } = e.detail;
    rutaActual = nombre;
    if (nombre !== "producto") ocultarMiniCarrito();

    if (nombre === "tienda") renderTienda(param);
    if (nombre === "producto") renderProducto(param);
    if (nombre === "carrito") renderCarrito();
    if (nombre === "checkout") renderCheckout();
  });
});
