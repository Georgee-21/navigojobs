(function () {
  "use strict";

  function renderStages() {
    const list = document.getElementById("nj-stages");
    if (!list) return;
    const lang = NJ.getLang();
    const label = NJ.t("howItWorks.stageLabel");

    list.innerHTML = stages
      .map(function (s) {
        return (
          '<li class="step">' +
          '<div class="step-number text-mono">' + label + " " + s.leg + "</div>" +
          '<h3 class="step-title">' + NJ.escapeHtml(s.title[lang]) + "</h3>" +
          '<p class="text">' + NJ.escapeHtml(s.desc[lang]) + "</p>" +
          "</li>"
        );
      })
      .join("");
  }

  function loadHeroVideo() {
    const video = document.querySelector("[data-video-src]");
    if (!video) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData || !matchMedia("(min-width: 768px)").matches) return;
    const source = document.createElement("source");
    source.src = video.dataset.videoSrc;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }

  function renderDepartments() {
    const grid = document.getElementById("nj-dept-grid");
    if (!grid) return;
    const lang = NJ.getLang();
    const openLabel = NJ.t("departments.openLabel");

    grid.innerHTML = departments
      .map(function (d) {
        const open = jobs.filter(function (j) { return j.dept === d.code; }).length;
        const esc = NJ.escapeHtml;
        return (
          '<a class="dept-card" href="jobs.html?dept=' + encodeURIComponent(d.code) + '">' +
          '<div class="dept-code">' + esc(d.code) + "</div>" +
          '<div class="dept-title">' + esc(d.title) + "</div>" +
          '<div class="dept-name">' + esc(d.name[lang]) + "</div>" +
          '<div class="dept-roles">' + esc(d.roles[lang]) + "</div>" +
          '<div class="dept-jobs text-mono">' + open + " " + esc(openLabel) + "</div>" +
          "</a>"
        );
      })
      .join("");
  }

  loadHeroVideo();

  document.addEventListener("nj:langchange", function () {
    renderStages();
    renderDepartments();
  });
})();
