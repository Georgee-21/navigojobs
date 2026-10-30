(function () {
  "use strict";

  const FORM_ENDPOINT = "https://formspree.io/f/xyeeddzr";

  const form = document.querySelector("[data-nj-form]");
  const success = document.querySelector("[data-success]");
  if (!form || !success) return;

  const errorEl = form.querySelector("[data-form-error]");
  const submitBtn = form.querySelector('[type="submit"]');

  function showError(key) {
    errorEl.dataset.i18n = "ui." + key;
    errorEl.textContent = NJ.t("ui." + key);
    errorEl.hidden = false;
  }

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.focus();
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    errorEl.hidden = true;
    if (!FORM_ENDPOINT) {
      showError("formNotConfigured");
      return;
    }

    const data = new FormData(form);
    data.append("formType", document.body.dataset.page);
    if (job) data.append("job", job.id);

    const label = submitBtn.dataset.i18n;
    submitBtn.disabled = true;
    submitBtn.removeAttribute("data-i18n");
    submitBtn.textContent = NJ.t("ui.formSending");

    fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        showSuccess();
      })
      .catch(function () {
        showError("formError");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.dataset.i18n = label;
        submitBtn.textContent = NJ.t(label);
      });
  });

  const deptSelect = document.getElementById("pj-department");

  function renderDeptOptions() {
    if (!deptSelect) return;
    const lang = NJ.getLang();
    const selected = deptSelect.value;
    deptSelect.innerHTML =
      '<option value="" disabled>' + NJ.t("ui.selectPlaceholder") + "</option>" +
      departments
        .map(function (d) {
          return '<option value="' + NJ.escapeHtml(d.code) + '">' + NJ.escapeHtml(d.name[lang]) + "</option>";
        })
        .join("");
    deptSelect.value = selected;
  }

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
