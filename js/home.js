/* =========================================================
   მთავარი გვერდი — "როგორ მუშაობს" ეტაპების და
   დეპარტამენტების ბარათების აწყობა data.js-დან
   ========================================================= */

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

  function renderDepartments() {
    const grid = document.getElementById("nj-dept-grid");
    if (!grid) return;
    const lang = NJ.getLang();
    const openLabel = NJ.t("departments.openLabel");

    grid.innerHTML = departments
      .map(function (d) {
        return (
          '<a class="dept-card" href="jobs.html?dept=' + d.code + '">' +
          '<div class="dept-code">' + d.code + "</div>" +
          '<div class="dept-title">' + d.title + "</div>" +
          '<div class="dept-name">' + NJ.escapeHtml(d.name[lang]) + "</div>" +
          '<div class="dept-roles">' + NJ.escapeHtml(d.roles[lang]) + "</div>" +
          '<div class="dept-jobs text-mono">' + d.open + " " + openLabel + "</div>" +
          "</a>"
        );
      })
      .join("");
  }

  // თავიდან და ყოველი ენის შეცვლისას ხელახლა ვაწყობთ
  document.addEventListener("nj:langchange", function () {
    renderStages();
    renderDepartments();
  });
})();
