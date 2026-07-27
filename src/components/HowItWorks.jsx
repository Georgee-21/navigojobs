import React from "react";
import "./HowItWorks.css";
import { stages } from "../data.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function HowItWorks() {
  const { lang, t } = useLanguage();

  return (
    <section className="nj-section" id="how-it-works">
      <div className="nj-section-head">
        <div className="nj-kicker">{t.howItWorks.kicker}</div>
        <h2 className="nj-h2">{t.howItWorks.title}</h2>
        <p className="nj-p">{t.howItWorks.sub}</p>
      </div>
      <div className="nj-stages">
        {stages.map((s) => (
          <div className="nj-stage" key={s.leg}>
            <div className="nj-stage-leg nj-mono">
              {t.howItWorks.stageLabel} {s.leg}
            </div>
            <div className="nj-stage-title">{s.title[lang]}</div>
            <p className="nj-p">{s.desc[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
