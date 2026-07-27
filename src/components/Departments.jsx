import React from "react";
import { Link } from "react-router-dom";
import "./Departments.css";
import { departments } from "../data.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Departments() {
  const { lang, t } = useLanguage();

  return (
    <section className="nj-section" style={{ paddingTop: 0 }}>
      <div className="nj-section-head">
        <div className="nj-kicker">{t.departments.kicker}</div>
        <h2 className="nj-h2">{t.departments.title}</h2>
        <p className="nj-p">{t.departments.sub}</p>
      </div>
      <div className="nj-dept-grid">
        {departments.map((d) => (
          <Link
            to={`/jobs?dept=${d.code}`}
            className="nj-dept-card"
            key={d.code}
          >
            <div className="nj-dept-code nj-mono">{d.code}</div>
            <div className="nj-dept-title">{d.title}</div>
            <div className="nj-dept-ge">{d.name[lang]}</div>
            <div className="nj-dept-roles">{d.roles[lang]}</div>
            <div className="nj-dept-open nj-mono">
              {d.open} {t.departments.openLabel}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
