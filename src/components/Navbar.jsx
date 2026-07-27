import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LoginModal from "./LoginModal.jsx";

const navHrefs = {
  jobs: "/jobs",
  employers: "/#employers",
  how: "/#how-it-works",
  contact: "/contact",
};

const routedLinks = new Set(["jobs", "contact"]);

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <nav className="nj-nav">
      <Link to="/" className="nj-logo" style={{ textDecoration: "none" }}>
        NAVIGO<span>JOBS</span>
      </Link>
      <div className="nj-nav-right">
        <div className={`nj-navlinks${menuOpen ? " nj-navlinks-open" : ""}`}>
          {t.nav.links.map((link) =>
            routedLinks.has(link.key) ? (
              <Link
                key={link.key}
                to={navHrefs[link.key]}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.key}
                href={navHrefs[link.key]}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="nj-nav-actions">
          <button className="nj-btn-ghost" onClick={() => setLoginOpen(true)}>
            {t.nav.login}
          </button>
          <button
            className="nj-lang-toggle nj-mono"
            onClick={toggleLang}
            aria-label="Switch language"
            title="ქართული / English"
          >
            {lang === "ka" ? "EN" : "GE"}
          </button>
          <button
            className="nj-theme-toggle"
            onClick={onToggleTheme}
            aria-label="თემის გადართვა"
            title="Dark / Light"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>
          <button
            className={`nj-burger${menuOpen ? " nj-burger-active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t.nav.menuLabel}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </nav>
  );
}
