import React from "react";
import { Link } from "react-router-dom";
import "./EmployerBand.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function EmployerBand() {
  const { t } = useLanguage();

  return (
    <section className="nj-band" id="employers">
      <div
        className="nj-band-bg"
        style={{ backgroundImage: "url(/captain-view.jpg)" }}
      />
      <div className="nj-band-overlay" />
      <div className="nj-band-inner">
        <div className="nj-band-panel">
          <div className="nj-eyebrow nj-mono">{t.employerBand.kicker}</div>
          <h2 className="nj-h2">{t.employerBand.title}</h2>
          <p className="nj-sub">{t.employerBand.sub}</p>
        </div>
        <div>
          <Link to="/register-company" className="nj-btn-primary" style={{ width: "100%" }}>
            {t.employerBand.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
