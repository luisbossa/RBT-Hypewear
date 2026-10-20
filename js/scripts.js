document.addEventListener("DOMContentLoaded", () => {
  const footerDate = document.querySelector(".footer-date");

  // Siempre en hora de Costa Rica, sin importar desde dónde se visite.
  const formato = new Intl.DateTimeFormat("es-CR", {
    timeZone: "America/Costa_Rica",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function actualizarFecha() {
    const p = Object.fromEntries(
      formato.formatToParts(new Date()).map(({ type, value }) => [type, value])
    );
    footerDate.textContent = `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute} CR`;
  }

  actualizarFecha();
  setInterval(actualizarFecha, 15000);

  // Newsletter del footer: sin servidor, el correo se guarda en este navegador.
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMsg = document.getElementById("newsletter-msg");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.email.value.trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newsletterMsg.textContent = "Ingresa un correo válido.";
      newsletterMsg.classList.add("error");
      return;
    }

    try {
      localStorage.setItem("rbt-newsletter", email);
    } catch {
      // Sin almacenamiento disponible: igual confirmamos la suscripción.
    }
    newsletterForm.reset();
    newsletterMsg.classList.remove("error");
    newsletterMsg.textContent = "¡Listo! Te avisaremos del próximo drop.";
  });
});
