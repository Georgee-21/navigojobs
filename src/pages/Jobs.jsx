import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Jobs.css";
import { jobs, departments } from "../data.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const jobCardImages = ["/container-ship.jpg", "/comand-tanker.jpg", "/dry-cargo.jpg", "/container-ship.jpg", "/chemicer-tanker.jpg", "/passenger-liner.jpg", "/passenger-liner.jpg", "/passenger-liner-2.jpg", "/container-ship.jpg", "/dry-cargo.jpg", "/comand-tanker.jpg"];

const jobImageById = Object.fromEntries(
  jobs.map((job, i) => [job.id, jobCardImages[i]])
);

export default function Jobs() {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const activeDept = searchParams.get("dept") || "ALL";

  const setActiveDept = (code) => {
    if (code === "ALL") {
      searchParams.delete("dept");
    } else {
      searchParams.set("dept", code);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (activeDept !== "ALL" && job.dept !== activeDept) return false;
      if (!q) return true;
      const haystack = [
        job.rank[lang],
        job.vessel[lang],
        job.zone[lang],
        job.agency[lang],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeDept, lang]);

  return (
    <>
      <header className="nj-jobs-hero">
        <div
          className="nj-jobs-hero-bg"
          style={{ backgroundImage: "url(/captain-view.jpg)" }}
        />
        <div className="nj-jobs-hero-overlay" />
        <div className="nj-jobs-hero-inner">
          <Link to="/" className="nj-jobs-back nj-mono">
            {t.jobsPage.backHome}
          </Link>
          <div className="nj-jobs-hero-panel">
            <div className="nj-kicker">{t.jobsPage.kicker}</div>
            <h1 className="nj-h2 nj-jobs-hero-title">{t.jobsPage.title}</h1>
            <p className="nj-p">{t.jobsPage.sub}</p>
          </div>
        </div>
      </header>

      <section className="nj-section nj-jobs">
      <div className="nj-jobs-toolbar">
        <input
          type="text"
          className="nj-jobs-search"
          placeholder={t.jobsPage.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="nj-jobs-filters nj-mono">
          <button
            className={`nj-jobs-chip${activeDept === "ALL" ? " nj-jobs-chip-active" : ""}`}
            onClick={() => setActiveDept("ALL")}
          >
            {t.jobsPage.allDepartments}
          </button>
          {departments.map((d) => (
            <button
              key={d.code}
              className={`nj-jobs-chip${activeDept === d.code ? " nj-jobs-chip-active" : ""}`}
              onClick={() => setActiveDept(d.code)}
            >
              {d.code}
            </button>
          ))}
        </div>
      </div>

      <div className="nj-jobs-count nj-mono">
        {t.jobsPage.resultsCount(filtered.length)}
      </div>

      {filtered.length === 0 ? (
        <div className="nj-jobs-empty nj-p">{t.jobsPage.noResults}</div>
      ) : (
        <div className="nj-jobs-grid">
          {filtered.map((job) => {
            const cardImage = jobImageById[job.id];
            return (
            <div className="nj-job-card" key={job.id}>
              <div
                className={`nj-job-top${cardImage ? " nj-job-top-photo" : ""}`}
                style={cardImage ? { backgroundImage: `url(${cardImage})` } : undefined}
              >
                <div className="nj-dept-code nj-mono">{job.dept}</div>
                {job.urgent && (
                  <div className="nj-job-urgent nj-mono">
                    {t.jobsPage.urgentBadge}
                  </div>
                )}
              </div>
              <div className="nj-job-rank">{job.rank[lang]}</div>
              <div className="nj-job-vessel">{job.vessel[lang]}</div>
              <div className="nj-job-agency">{job.agency[lang]}</div>

              <div className="nj-job-meta">
                <div>
                  <span className="nj-job-meta-label">{t.jobsPage.zoneLabel}</span>
                  <span>{job.zone[lang]}</span>
                </div>
                <div>
                  <span className="nj-job-meta-label">{t.jobsPage.contractLabel}</span>
                  <span>{job.contract[lang]}</span>
                </div>
                <div>
                  <span className="nj-job-meta-label">{t.jobsPage.salaryLabel}</span>
                  <span className="nj-mono">{job.salary}</span>
                </div>
              </div>

              <div className="nj-job-bottom">
                <div className="nj-job-posted nj-mono">
                  {job.postedDaysAgo === 0
                    ? t.jobsPage.postedToday
                    : t.jobsPage.postedDaysAgo(job.postedDaysAgo)}
                </div>
                <button className="nj-btn-primary nj-job-apply">
                  {t.jobsPage.applyBtn}
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
      </section>
    </>
  );
}
