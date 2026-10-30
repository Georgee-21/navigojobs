/* =========================================================
   ფორმის გვერდები — მეზღვაურის რეგისტრაცია, ვაკანსიის
   განთავსება, კომპანიის რეგისტრაცია.
   სერვერი ჯერ არ არის, ამიტომ წარდგენისას ფორმა იმალება და
   ჩანს მადლობის შეტყობინება (როგორც React ვერსიაში).
   ========================================================= */

(function () {
  "use strict";

  const form = document.querySelector("[data-nj-form]");
  const success = document.querySelector("[data-success]");
  if (!form || !success) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // required/type="email" ველებს ბრაუზერი თავად ამოწმებს — აქ მხოლოდ ვალიდური ფორმა მოდის
    form.hidden = true;
    success.hidden = false;
    success.focus();
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- დეპარტამენტის ჩამოსაშლელი სია (ვაკანსიის განთავსება) ---------- */
  const deptSelect = document.getElementById("pj-department");

  function renderDeptOptions() {
    if (!deptSelect) return;
    const lang = NJ.getLang();
    const selected = deptSelect.value;
    deptSelect.innerHTML =
      '<option value="" disabled>' + NJ.t("ui.selectPlaceholder") + "</option>" +
      departments
        .map(function (d) {
          return '<option value="' + d.code + '">' + NJ.escapeHtml(d.name[lang]) + "</option>";
        })
        .join("");
    deptSelect.value = selected; // ენის შეცვლისას არჩეული მნიშვნელობა რჩება
  }

  /* ---------- "განაცხადის გაგზავნა" ვაკანსიიდან ----------
     register-seafarer.html?job=dk-101 → რანგის და გემის ველები ივსება */
  const jobId = new URLSearchParams(location.search).get("job");
  const job = jobId ? jobs.find(function (j) { return j.id === jobId; }) : null;
  let prefilled = false;

  function prefillFromJob() {
    if (!job || prefilled) return;
    const lang = NJ.getLang();
    const rank = document.getElementById("sf-rank");
    const vessel = document.getElementById("sf-vessel");
    if (rank && !rank.value) rank.value = job.rank[lang];
    if (vessel && !vessel.value) vessel.value = job.vessel[lang];
    prefilled = true;
  }

  document.addEventListener("nj:langchange", function () {
    renderDeptOptions();
    prefillFromJob();
  });
})();
