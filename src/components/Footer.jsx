import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const navHrefs = {
  jobs: "/jobs",
  employers: "/#employers",
  how: "/#how-it-works",
  contact: "/contact",
};

const routedLinks = new Set(["jobs", "contact"]);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="nj-footer">
      <Link to="/" className="nj-logo" style={{ fontSize: 15, textDecoration: "none" }}>
        NAVIGO<span>JOBS</span>
      </Link>
      <nav className="nj-footer-links">
        {t.nav.links.map((link) =>
          routedLinks.has(link.key) ? (
            <Link key={link.key} to={navHrefs[link.key]}>
              {link.label}
            </Link>
          ) : (
            <a key={link.key} href={navHrefs[link.key]}>
              {link.label}
            </a>
          )
        )}
      </nav>
      <div className="nj-mono">{t.footer.copy}</div>
    </footer>
  );
}
