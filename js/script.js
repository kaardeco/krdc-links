/**
 * ============================================================================
 *  SCRIPT PRINCIPAL
 *  Lê SITE_DATA (js/data.js), renderiza a página e cuida dos efeitos visuais.
 *  Não precisa editar este arquivo para atualizar conteúdo — edite data.js.
 * ============================================================================
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* --------------------------------------------------------------------
   * Ícones (SVG inline, estilo feather/lucide, sem dependência externa)
   * ------------------------------------------------------------------ */
  const ICONS = {
    instagram:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M17.5 6.5h.01"/>',
    twitter:
      '<path d="M4 4l16 16M20 4L4 20"/>',
    tiktok:
      '<path d="M15 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M15 3c.3 2.5 2 4.3 4.5 4.6"/>',
    youtube:
      '<rect x="2.5" y="5.5" width="19" height="13" rx="3"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z"/>',
    soundcloud:
      '<path d="M3 14v3M6 12v5M9 10v7M12 9v8M15 11v6M18 8.5A3.5 3.5 0 0 1 21 12v2a2.5 2.5 0 0 1-2.5 2.5H15V8.5Z"/>',
    mail:
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    ticket:
      '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"/>',
    play:
      '<circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3V9Z"/>',
  };

  function svgIcon(name, extraClass) {
    const paths = ICONS[name] || ICONS.mail;
    return (
      '<svg class="' +
      (extraClass || "") +
      '" viewBox="0 0 24 24" fill="none" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths +
      "</svg>"
    );
  }

  /* --------------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------------ */
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function formatDate(isoDate) {
    // Evita problemas de fuso horário interpretando a data como local
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(year, (month || 1) - 1, day || 1);
    const dd = String(date.getDate()).padStart(2, "0");
    const months = [
      "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
      "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
    ];
    return `${dd} ${months[date.getMonth()]}`;
  }

  /* --------------------------------------------------------------------
   * Render: Redes sociais
   * ------------------------------------------------------------------ */
  function renderSocials() {
    const list = document.getElementById("socials-list");
    if (!list || !Array.isArray(SITE_DATA.socials)) return;

    SITE_DATA.socials.forEach((social) => {
      const li = el("li");
      const a = el(
        "a",
        "social-link",
        svgIcon(social.icon, "social-link__icon") +
          "<span>" + social.name + "</span>"
      );
      a.href = social.url || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", social.name);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* --------------------------------------------------------------------
   * Render: Sets em destaque
   * ------------------------------------------------------------------ */
  function renderSets() {
    const wrap = document.getElementById("sets-list");
    if (!wrap || !SITE_DATA.sets) return;

    Object.values(SITE_DATA.sets).forEach((set) => {
      const card = el("article", "set-card");

      const thumb = el("div", "set-card__thumb");
      if (set.thumbnail) {
        const img = el("img");
        img.src = set.thumbnail;
        img.alt = set.title || "";
        img.loading = "lazy";
        thumb.appendChild(img);
      } else {
        thumb.innerHTML = svgIcon("play");
      }

      const body = el(
        "div",
        "set-card__body",
        '<p class="set-card__label">' + (set.label || "SET") + "</p>" +
          '<p class="set-card__title">' + (set.title || "") + "</p>" +
          '<span class="set-card__link">assistir / ouvir →</span>'
      );

      const stretch = el("a", "set-card__stretch");
      stretch.href = set.url || "#";
      stretch.target = "_blank";
      stretch.rel = "noopener noreferrer";
      stretch.setAttribute(
        "aria-label",
        (set.label || "Set") + ": " + (set.title || "")
      );

      card.appendChild(thumb);
      card.appendChild(body);
      card.appendChild(stretch);
      wrap.appendChild(card);
    });
  }

  /* --------------------------------------------------------------------
   * Render: Agenda
   * ------------------------------------------------------------------ */
  function renderAgenda() {
    const wrap = document.getElementById("agenda-list");
    if (!wrap) return;

    const events = Array.isArray(SITE_DATA.agenda) ? SITE_DATA.agenda : [];

    const header = el("div", "agenda__row agenda__row--header");
    header.innerHTML =
      '<span>data</span><span>evento</span><span>ingresso</span>';
    wrap.appendChild(header);

    if (events.length === 0) {
      wrap.appendChild(
        el("div", "agenda__empty", "&gt; nenhuma data confirmada no momento.")
      );
      return;
    }

    const sorted = [...events].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    sorted.forEach((eventItem) => {
      const row = el("div", "agenda__row");

      const date = el("span", "agenda__date", formatDate(eventItem.date));

      const info = el(
        "div",
        "agenda__event",
        '<span class="agenda__city">' + (eventItem.city || "") + "</span>" +
          '<span class="agenda__venue">' + (eventItem.venue || "") + "</span>"
      );

      let ticket;
      if (eventItem.ticketUrl) {
        ticket = el(
          "a",
          "agenda__ticket",
          svgIcon("ticket", "agenda__ticket-icon") + " INGRESSO"
        );
        ticket.href = eventItem.ticketUrl;
        ticket.target = "_blank";
        ticket.rel = "noopener noreferrer";
      } else {
        ticket = el("span", "agenda__ticket", "EM BREVE");
        ticket.style.opacity = "0.5";
      }

      row.appendChild(date);
      row.appendChild(info);
      row.appendChild(ticket);
      wrap.appendChild(row);
    });
  }

  /* --------------------------------------------------------------------
   * Render: Perfil / footer (dados simples)
   * ------------------------------------------------------------------ */
  function renderProfileAndFooter() {
    const p = SITE_DATA.profile || {};
    const f = SITE_DATA.footer || {};

    const avatarImg = document.getElementById("avatar-img");
    if (avatarImg && p.avatar) {
      avatarImg.src = p.avatar;
      avatarImg.alt = p.avatarAlt || "";
    }

    const brandLogo = document.getElementById("brand-logo");
    if (brandLogo && p.logo) brandLogo.src = p.logo;

    const handle = document.querySelector(".handle");
    if (handle && p.handle) handle.textContent = p.handle;

    const bio = document.querySelector(".bio");
    if (bio && p.bio) bio.textContent = p.bio;

    const tagline = document.querySelector(".tagline");
    if (tagline && p.tagline) tagline.textContent = p.tagline;

    const footerEmail = document.getElementById("footer-email");
    if (footerEmail && f.email) {
      footerEmail.textContent = f.email;
      footerEmail.href = "mailto:" + f.email;
    }

    const footerName = document.getElementById("footer-name");
    if (footerName && f.copyrightName) footerName.textContent = f.copyrightName;

    const footerYear = document.getElementById("footer-year");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  }

  /* --------------------------------------------------------------------
   * Stagger: numera os elementos [data-animate] para o CSS escalonar
   * ------------------------------------------------------------------ */
  function prepareStaggerIndexes() {
    document.querySelectorAll("[data-animate]").forEach((node, index) => {
      node.style.setProperty("--stagger-index", String(index));
    });
  }

  /* --------------------------------------------------------------------
   * Efeito de boot / terminal no header
   * ------------------------------------------------------------------ */
  function runBootSequence(onDone) {
    const bootLine = document.getElementById("boot-line");

    if (prefersReducedMotion || !bootLine) {
      document.body.classList.add("is-loaded");
      if (onDone) onDone();
      return;
    }

    const messages = ["carregando sistema", "conectando…", "pronto."];
    let i = 0;

    function typeNext() {
      if (i >= messages.length) {
        document.body.classList.add("is-loaded");
        if (onDone) onDone();
        return;
      }
      bootLine.innerHTML = "&gt; " + messages[i] + '<span class="blink-cursor">_</span>';
      i += 1;
      setTimeout(typeNext, 420);
    }

    typeNext();
  }

  /* --------------------------------------------------------------------
   * Fundo: ruído/dither em canvas (leve, gerado uma vez e reaproveitado)
   * ------------------------------------------------------------------ */
  function initDitherCanvas() {
    const canvas = document.getElementById("dither-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const SCALE = 3; // tamanho do "pixel" do grão
    const DENSITY = 0.035; // fração de pixels com grão visível (esparso = sóbrio)

    function draw() {
      const w = Math.ceil(window.innerWidth / SCALE);
      const h = Math.ceil(window.innerHeight / SCALE);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w * SCALE + "px";
      canvas.style.height = h * SCALE + "px";

      // Grão esparso e transparente (a maioria dos pixels fica com alpha 0)
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const show = Math.random() < DENSITY;
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
        imageData.data[i + 3] = show ? Math.random() * 90 : 0;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    draw();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 250);
    });
  }

  /* --------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfileAndFooter();
    renderSocials();
    renderSets();
    // renderAgenda(); // seção desativada a pedido — reative junto com a <section> comentada em index.html
    prepareStaggerIndexes();
    initDitherCanvas();
    runBootSequence();
  });
})();
