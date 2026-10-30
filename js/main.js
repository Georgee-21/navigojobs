/* =========================================================
   NavigoJobs — საერთო სკრიპტი (ყველა გვერდზე იტვირთება)
   - ენის გადართვა (ქართული / English) + შენახვა localStorage-ში
   - თემის გადართვა (dark / light) + შენახვა
   - კონსოლის ზოლის GMT საათი
   - მობილური მენიუ (burger)
   - შესვლის მოდალური ფანჯარა
   ========================================================= */

const NJ = (function () {
  "use strict";

  const STORAGE_LANG = "nj-lang";
  const STORAGE_THEME = "nj-theme";
  const root = document.documentElement;

  /* ---------- localStorage დამხმარეები ----------
     ზოგ ბრაუზერში (პრივატული რეჟიმი, file://) localStorage შეიძლება
     მიუწვდომელი იყოს — ამიტომ try/catch-ში ვახვევთ. */
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
      /* შენახვა ვერ მოხერხდა — გვერდი მაინც მუშაობს */
    }
  }

  let lang = readStore(STORAGE_LANG, "ka") === "en" ? "en" : "ka";
  let theme = readStore(STORAGE_THEME, "dark") === "light" ? "light" : "dark";

  /* ---------- თარგმანი ----------
     t("hero.titleEm") → translations[lang].hero.titleEm
     მასივის ინდექსიც მუშაობს: t("nav.links.0.label") */
  function t(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, translations[lang]);
  }

  function applyTranslations() {
    root.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const value = t(el.dataset.i18n);
      if (typeof value === "string") el.textContent = value;
    });

    // ატრიბუტების თარგმანი: data-i18n-placeholder, data-i18n-aria-label, data-i18n-title
    ["placeholder", "aria-label", "title"].forEach(function (attr) {
      document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
        const value = t(el.getAttribute("data-i18n-" + attr));
        if (typeof value === "string") el.setAttribute(attr, value);
      });
    });

    const pageKey = document.body.dataset.page;
    if (pageKey && t("meta." + pageKey)) document.title = t("meta." + pageKey);

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.textContent = lang === "ka" ? "EN" : "GE";

    // გვერდის სკრიპტებს (home.js, jobs.js...) ვატყობინებთ, რომ ენა შეიცვალა
    document.dispatchEvent(new CustomEvent("nj:langchange", { detail: { lang: lang } }));
  }

  function toggleLang() {
    lang = lang === "ka" ? "en" : "ka";
    writeStore(STORAGE_LANG, lang);
    applyTranslations();
  }

  /* ---------- თემა ---------- */
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

  /* ---------- კონსოლის საათი (GMT) ---------- */
  function startClock() {
    const el = document.querySelector("[data-clock]");
    if (!el) return;
    const tick = function () {
      el.textContent = new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- მობილური მენიუ ---------- */
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

  /* ---------- მიმდინარე გვერდის ბმულის მონიშვნა ---------- */
  function markCurrentLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-links a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href === current) a.setAttribute("aria-current", "page");
    });
  }

  /* ---------- შესვლის მოდალი ---------- */
  function initLoginModal() {
    const overlay = document.getElementById("nj-login");
    const openBtn = document.querySelector("[data-login-open]");
    if (!overlay || !openBtn) return;

    const dialog = overlay.querySelector(".modal");
    const form = overlay.querySelector("form");
    const success = overlay.querySelector("[data-success]");
    let lastFocused = null;

    function focusable() {
      return Array.prototype.filter.call(
        dialog.querySelectorAll("button, input, a[href]"),
        function (el) { return el.offsetParent !== null; }
      );
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        close();
        return;
      }
      // Tab ღილაკით ფოკუსი ფანჯრის შიგნით რჩება
      if (e.key === "Tab") {
        const items = focusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function open() {
      lastFocused = document.activeElement;
      form.reset();
      form.hidden = false;
      success.hidden = true;
      dialog.querySelectorAll(".is-touched").forEach(function (el) { el.classList.remove("is-touched"); });
      overlay.hidden = false;
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", onKeyDown);
      form.querySelector("input").focus();
    }

    function close() {
      overlay.hidden = true;
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeyDown);
      if (lastFocused) lastFocused.focus();
    }

    openBtn.addEventListener("click", open);
    overlay.querySelector("[data-login-close]").addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.hidden = true;
      success.hidden = false;
      overlay.querySelector("[data-login-close]").focus();
    });
  }

  /* ---------- ფორმის ველების "შეხების" მონიშვნა ----------
     წითელი ჩარჩო მხოლოდ მაშინ ჩანს, როცა მომხმარებელმა ველი დატოვა */
  function initTouchedFields() {
    document.addEventListener("focusout", function (e) {
      if (e.target.matches(".form-input, .form-select")) e.target.classList.add("is-touched");
    });
  }

  /* ---------- გაშვება ---------- */
  function init() {
    applyTheme();
    applyTranslations();
    startClock();
    initBurger();
    markCurrentLink();
    initLoginModal();
    initTouchedFields();

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.addEventListener("click", toggleLang);
    const themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  }

  // გვერდის სკრიპტებისთვის საჯარო ფუნქციები
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

// სკრიპტები defer-ით იტვირთება, ამიტომ გვერდის სკრიპტები (home.js, jobs.js...)
// თავიანთ nj:langchange მსმენელებს DOMContentLoaded-მდე არეგისტრირებენ.
document.addEventListener("DOMContentLoaded", NJ.init);
