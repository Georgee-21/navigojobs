import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";
import "./Forms.css";
import { departments } from "../data.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import SailorImg from "../assets/sailor.jpg";

export default function PostJob() {
  const { t, lang } = useLanguage();
  const p = t.postJobPage;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <header className="nj-jobs-hero">
        <div
          className="nj-jobs-hero-bg"
           style={{ backgroundImage: `url(${SailorImg})`, transform: "scaleX(-1)" }}
        />
        <div className="nj-jobs-hero-overlay" />
        <div className="nj-jobs-hero-inner">
          <Link to="/" className="nj-jobs-back nj-mono">
            {p.backHome}
          </Link>
          <div className="nj-jobs-hero-panel">
            <div className="nj-kicker">{p.kicker}</div>
            <h1 className="nj-h2 nj-jobs-hero-title">{p.title}</h1>
            <p className="nj-p">{p.sub}</p>
          </div>
        </div>
      </header>

      <section className="nj-section nj-form-page">
        {submitted ? (
          <div className="nj-form-success">
            <div className="nj-form-success-icon">🚢</div>
            <div className="nj-form-success-title">{p.successTitle}</div>
            <p className="nj-p">{p.successMsg}</p>
          </div>
        ) : (
          <form className="nj-form" onSubmit={handleSubmit}>
            <div className="nj-form-row">
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.companyName}</label>
                <input className="nj-form-input" type="text" required />
              </div>
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.contactEmail}</label>
                <input className="nj-form-input" type="email" required />
              </div>
            </div>

            <div className="nj-form-row">
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.rank}</label>
                <input className="nj-form-input" type="text" required />
              </div>
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.department}</label>
                <select className="nj-form-select" defaultValue="" required>
                  <option value="" disabled />
                  {departments.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name[lang]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="nj-form-row">
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.vesselType}</label>
                <input className="nj-form-input" type="text" required />
              </div>
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.zone}</label>
                <input className="nj-form-input" type="text" required />
              </div>
            </div>

            <div className="nj-form-row">
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.contract}</label>
                <input className="nj-form-input" type="text" required />
              </div>
              <div className="nj-form-field">
                <label className="nj-form-label">{p.fields.salary}</label>
                <input className="nj-form-input" type="text" required />
              </div>
            </div>

            <div className="nj-form-field">
              <label className="nj-form-label">{p.fields.description}</label>
              <textarea className="nj-form-textarea" />
            </div>

            <div className="nj-form-actions">
              <button className="nj-btn-primary" type="submit">
                {p.submitBtn}
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
