const NJ = (function () {
  "use strict";

  const STORAGE_LANG = "nj-lang";
  const STORAGE_THEME = "nj-theme";
  const root = document.documentElement;

  function readStore(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {

    }
  }

  let lang = readStore(STORAGE_LANG, "ka") === "en" ? "en" : "ka";
  let theme = readStore(STORAGE_THEME, "dark") === "light" ? "light" : "dark";

  const LAYOUT = {
    header: `
    <div class="topbar text-mono">
      <div class="topbar-item">
        <span class="topbar-dot" aria-hidden="true"></span>
        <span>GMT <time data-clock>00:00:00</time></span>
      </div>
      <div class="topbar-item"><span data-i18n="consoleBar.location"></span></div>
      <div class="topbar-item"><span data-i18n="consoleBar.stats"></span></div>
    </div>
    <nav class="navbar" aria-label="Main">
      <a href="index.html" class="logo">NAVIGO<span>JOBS</span></a>
      <div class="navbar-right">
        <div class="navbar-links" id="nj-navlinks">
        <a href="jobs.html" data-i18n="nav.links.0.label"></a>
        <a href="index.html#employers" data-i18n="nav.links.1.label"></a>
        <a href="index.html#how-it-works" data-i18n="nav.links.2.label"></a>
        <a href="contact.html" data-i18n="nav.links.3.label"></a>
        </div>
        <div class="navbar-actions">
          <button type="button" class="lang-btn text-mono" data-lang-toggle data-i18n-aria-label="ui.langToggle" title="ქართული / English">EN</button>
          <button type="button" class="theme-btn" data-theme-toggle data-i18n-aria-label="ui.themeToggle" title="Dark / Light">☾</button>
          <button type="button" class="menu-btn" data-burger aria-controls="nj-navlinks" aria-expanded="false" data-i18n-aria-label="nav.menuLabel">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>`,
    footer: `
    <footer class="footer">
      <a href="index.html" class="logo">NAVIGO<span>JOBS</span></a>
      <nav class="footer-links" aria-label="Footer">
        <a href="jobs.html" data-i18n="nav.links.0.label"></a>
        <a href="index.html#employers" data-i18n="nav.links.1.label"></a>
        <a href="index.html#how-it-works" data-i18n="nav.links.2.label"></a>
        <a href="contact.html" data-i18n="nav.links.3.label"></a>
        <a href="privacy.html" data-i18n="footer.privacy"></a>
      </nav>
      <div class="text-mono" data-i18n="footer.copy"></div>
    </footer>`,
  };

  function renderLayout() {
    document.querySelectorAll("[data-layout]").forEach(function (el) {
      el.outerHTML = LAYOUT[el.dataset.layout];
    });
  }

  function t(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, translations[lang]);
  }

  function applyTranslations() {
    root.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const value = t(el.dataset.i18n);
      if (typeof value === "string") el.textContent = value.replace("{open}", jobs.length);
    });

    ["placeholder", "aria-label", "title"].forEach(function (attr) {
      document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
        const value = t(el.getAttribute("data-i18n-" + attr));
        if (typeof value === "string") el.setAttribute(attr, value);
      });
    });

    document.querySelectorAll("[data-open-count]").forEach(function (el) {
      el.textContent = jobs.length;
    });

    const pageKey = document.body.dataset.page;
    if (pageKey && t("meta." + pageKey)) document.title = t("meta." + pageKey);

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.textContent = lang === "ka" ? "EN" : "GE";

    document.dispatchEvent(new CustomEvent("nj:langchange", { detail: { lang: lang } }));
  }

  function toggleLang() {
    lang = lang === "ka" ? "en" : "ka";
    writeStore(STORAGE_LANG, lang);
    applyTranslations();
  }

  function applyTheme() {
    root.classList.remove("theme-dark", "theme-light");
    root.classList.add("theme-" + theme);
    const btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.textContent = theme === "dark" ? "☾" : "☀";
      btn.setAttribute("aria-pressed", String(theme === "light"));
    }
  }

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    writeStore(STORAGE_THEME, theme);
    applyTheme();
  }

  function startClock() {
    const el = document.querySelector("[data-clock]");
    if (!el) return;
    const tick = function () {
      el.textContent = new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" });
    };
    tick();
    setInterval(tick, 1000);
  }

  function initBurger() {
    const burger = document.querySelector("[data-burger]");
    const links = document.getElementById("nj-navlinks");
    if (!burger || !links) return;

    const setOpen = function (open) {
      links.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".navbar")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function markCurrentLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-links a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href === current) a.setAttribute("aria-current", "page");
    });
  }

  function initTouchedFields() {
    document.addEventListener("focusout", function (e) {
      if (e.target.matches(".form-input, .form-select")) e.target.classList.add("is-touched");
    });
  }

  function init() {
    renderLayout();
    applyTheme();
    applyTranslations();
    startClock();
    initBurger();
    markCurrentLink();
    initTouchedFields();

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.addEventListener("click", toggleLang);
    const themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  }

  return {
    init: init,
    t: t,
    getLang: function () { return lang; },
    escapeHtml: function (str) {
      return String(str).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },
  };
})();

document.addEventListener("DOMContentLoaded", NJ.init);
