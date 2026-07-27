import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <>
      <header className="nj-jobs-hero nj-contact-hero">
        <div
          className="nj-jobs-hero-bg"
          style={{ backgroundImage: "url(/captain-view.jpg)" }}
        />
        <div className="nj-jobs-hero-overlay" />
        <div className="nj-jobs-hero-inner">
          <Link to="/" className="nj-jobs-back nj-mono">
            {c.backHome}
          </Link>
          <div className="nj-jobs-hero-panel">
            <div className="nj-kicker">{c.kicker}</div>
            <h1 className="nj-h2 nj-jobs-hero-title">{c.title}</h1>
            <p className="nj-p">{c.sub}</p>
          </div>
        </div>
      </header>

      <section className="nj-section nj-contact">
        <div className="nj-contact-grid">
          <a className="nj-contact-card" href={`tel:${c.phoneValue.replace(/\s+/g, "")}`}>
            <div className="nj-contact-icon">☎</div>
            <div className="nj-contact-label nj-mono">{c.phoneLabel}</div>
            <div className="nj-contact-value">{c.phoneValue}</div>
          </a>

          <a className="nj-contact-card" href={`mailto:${c.emailValue}`}>
            <div className="nj-contact-icon">✉</div>
            <div className="nj-contact-label nj-mono">{c.emailLabel}</div>
            <div className="nj-contact-value">{c.emailValue}</div>
          </a>

          <div className="nj-contact-card nj-contact-card-static">
            <div className="nj-contact-icon">📍</div>
            <div className="nj-contact-label nj-mono">{c.addressLabel}</div>
            <div className="nj-contact-value">{c.addressValue}</div>
          </div>
        </div>

        <div className="nj-contact-map-wrap">
          <div className="nj-contact-map-title nj-mono">{c.mapTitle}</div>
          <div className="nj-contact-map">
            <iframe
              title="office-map"
              src="https://www.google.com/maps?q=Batumi+Sea+Port,+Batumi,+Georgia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
