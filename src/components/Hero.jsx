import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const ports = [
  { x: 30, y: 330, label: "DK" },
  { x: 160, y: 190, label: "EN" },
  { x: 300, y: 60, label: "GL" },
  { x: 380, y: 30, label: "BR" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <header className="nj-hero">
      <video
        className="nj-hero-video"
        autoPlay
        muted
        loop
        playsInline
        src="/hero-background.mp4"
      />
      <div className="nj-hero-overlay" />
      {/* <div className="nj-hero-grid" /> */}

      <div className="nj-hero-inner">
        <div className="nj-hero-panel">
          <div className="nj-eyebrow nj-mono">{t.hero.eyebrow}</div>
          <h1 className="nj-h1">
            {t.hero.titleLine1} <em>{t.hero.titleEm}</em>
            <br />
            {t.hero.titleLine2}
          </h1>
          <p className="nj-sub">{t.hero.sub}</p>
          <div className="nj-cta-row">
            <Link to="/register-seafarer" className="nj-btn-primary">
              {t.hero.ctaPrimary}
            </Link>
            <Link to="/post-job" className="nj-btn-secondary">
              {t.hero.ctaSecondary}
            </Link>
          </div>
          <div className="nj-stats">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="nj-stat-num">{stat.num}</div>
                <div className="nj-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Route chart signature graphic */}
        <div className="nj-chart-wrap">
          <svg viewBox="0 0 420 380" width="100%" height="100%">
            <path
              className="nj-route-path"
              d="M30,330 C110,300 90,220 160,190 C220,165 210,90 300,60 C330,48 350,40 380,30"
              fill="none"
              style={{ stroke: "var(--accent)" }}
              strokeWidth="1.5"
              strokeDasharray="6 5"
              opacity="0.8"
            />
            {ports.map((p, i) => (
              <g key={p.label}>
                <circle
                  className="nj-port-ring"
                  cx={p.x}
                  cy={p.y}
                  r="10"
                  fill="none"
                  style={{ stroke: "var(--foam)", animationDelay: `${i * 0.5}s` }}
                  strokeWidth="1"
                />
                <circle cx={p.x} cy={p.y} r="4" style={{ fill: "var(--foam)" }} />
                <text
                  x={p.x + 14}
                  y={p.y + 4}
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11"
                  style={{ fill: "var(--steel)" }}
                >
                  {p.label}
                </text>
              </g>
            ))}
            <g className="nj-ship" transform="translate(380,30)">
              <path d="M-7,-2 L7,-2 L4,5 L-4,5 Z" style={{ fill: "var(--ink)" }} />
              <line x1="0" y1="-2" x2="0" y2="-10" style={{ stroke: "var(--ink)" }} strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
}
