/* =========================================================
   ვაკანსიების გვერდი — ძებნა, დეპარტამენტის ფილტრი,
   ბარათების აწყობა. ფილტრი ინახება URL-ში (?dept=DK), ასე რომ
   მთავარი გვერდის დეპარტამენტის ბარათიდან პირდაპირ გაფილტრული სია იხსნება.
   ========================================================= */

(function () {
  "use strict";

  const searchInput = document.getElementById("nj-jobs-search");
  const filtersEl = document.getElementById("nj-jobs-filters");
  const countEl = document.getElementById("nj-jobs-count");
  const gridEl = document.getElementById("nj-jobs-grid");
  const emptyEl = document.getElementById("nj-jobs-empty");

  const validCodes = departments.map(function (d) { return d.code; });
  const params = new URLSearchParams(location.search);
  let activeDept = validCodes.indexOf(params.get("dept")) !== -1 ? params.get("dept") : "ALL";
  let query = "";

  /* ---------- ფილტრის ღილაკები ---------- */
  function renderFilters() {
    const chips = [{ code: "ALL", label: NJ.t("jobsPage.allDepartments") }].concat(
      departments.map(function (d) { return { code: d.code, label: d.code }; })
    );

    filtersEl.innerHTML = chips
      .map(function (c) {
        return (
          '<button type="button" class="filter-btn" data-dept="' + c.code + '" aria-pressed="' +
          (c.code === activeDept) + '">' + NJ.escapeHtml(c.label) + "</button>"
        );
      })
      .join("");
  }

  function setActiveDept(code) {
    activeDept = code;
    const url = new URL(location.href);
    if (code === "ALL") url.searchParams.delete("dept");
    else url.searchParams.set("dept", code);
    history.replaceState(null, "", url);

    filtersEl.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.dept === activeDept));
    });
    renderJobs();
  }

  /* ---------- ფილტრაცია ---------- */
  function getFilteredJobs() {
    const lang = NJ.getLang();
    const q = query.trim().toLowerCase();

    return jobs.filter(function (job) {
      if (activeDept !== "ALL" && job.dept !== activeDept) return false;
      if (!q) return true;
      const haystack = [job.rank[lang], job.vessel[lang], job.zone[lang], job.agency[lang]]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
  }

  /* ---------- ერთი ვაკანსიის ბარათი ---------- */
  function jobCard(job) {
    const lang = NJ.getLang();
    const p = translations[lang].jobsPage;
    const esc = NJ.escapeHtml;
    const posted = job.postedDaysAgo === 0 ? p.postedToday : p.postedDaysAgo(job.postedDaysAgo);

    return (
      '<li class="job-card">' +
      '<div class="job-image" style="background-image:url(\'' + job.image + '\')">' +
      '<span class="dept-code">' + job.dept + "</span>" +
      (job.urgent ? '<span class="job-urgent text-mono">' + p.urgentBadge + "</span>" : "") +
      "</div>" +
      '<h3 class="job-title">' + esc(job.rank[lang]) + "</h3>" +
      '<div class="job-ship">' + esc(job.vessel[lang]) + "</div>" +
      '<div class="job-company">' + esc(job.agency[lang]) + "</div>" +
      '<dl class="job-details">' +
      "<div><dt>" + p.zoneLabel + "</dt><dd>" + esc(job.zone[lang]) + "</dd></div>" +
      "<div><dt>" + p.contractLabel + "</dt><dd>" + esc(job.contract[lang]) + "</dd></div>" +
      "<div><dt>" + p.salaryLabel + '</dt><dd class="text-mono">' + job.salary + p.perMonth + "</dd></div>" +
      "</dl>" +
      '<div class="job-footer">' +
      '<span class="job-date text-mono">' + posted + "</span>" +
      '<a class="btn-primary job-apply" href="register-seafarer.html?job=' + job.id + '">' +
      p.applyBtn + "</a>" +
      "</div>" +
      "</li>"
    );
  }

  function renderJobs() {
    const list = getFilteredJobs();
    countEl.textContent = translations[NJ.getLang()].jobsPage.resultsCount(list.length);
    gridEl.innerHTML = list.map(jobCard).join("");
    gridEl.hidden = list.length === 0;
    emptyEl.hidden = list.length !== 0;
  }

  /* ---------- მოვლენები ---------- */
  searchInput.addEventListener("input", function () {
    query = searchInput.value;
    renderJobs();
  });

  filtersEl.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (btn) setActiveDept(btn.dataset.dept);
  });

  document.addEventListener("nj:langchange", function () {
    renderFilters();
    renderJobs();
  });
})();
