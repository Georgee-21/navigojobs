import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LoginModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const m = t.loginModal;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="nj-modal-overlay" onClick={onClose}>
      <div
        className="nj-modal"
        role="dialog"
        aria-modal="true"
        aria-label={m.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="nj-modal-close" onClick={onClose} aria-label={m.closeLabel}>
          ×
        </button>

        {submitted ? (
          <div className="nj-form-success">
            <div className="nj-form-success-icon">⚓</div>
            <div className="nj-form-success-title">{m.successTitle}</div>
            <p className="nj-p">{m.successMsg}</p>
          </div>
        ) : (
          <>
            <div className="nj-kicker">{m.kicker}</div>
            <h2 className="nj-h2 nj-modal-title">{m.title}</h2>

            <form className="nj-form" onSubmit={handleSubmit}>
              <div className="nj-form-field">
                <label className="nj-form-label">{m.fields.email}</label>
                <input
                  className="nj-form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="nj-form-field">
                <label className="nj-form-label">{m.fields.password}</label>
                <input
                  className="nj-form-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="nj-form-actions">
                <button className="nj-btn-primary nj-modal-submit" type="submit">
                  {m.submitBtn}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
