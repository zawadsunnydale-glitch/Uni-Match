function initTabs(){
  const tabs = document.querySelectorAll(".tool-tab");
  const panels = document.querySelectorAll(".tool-panel");
  if (!tabs.length || !panels.length) return;
  function activate(name){
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
  }
  tabs.forEach(t => t.addEventListener("click", () => {
    activate(t.dataset.tab);
    history.replaceState(null, "", "#" + t.dataset.tab);
  }));
  const hash = window.location.hash.replace("#","");
  if (hash && document.getElementById("panel-" + hash)) activate(hash);
}

function runAiSearch(q){
  const box = document.getElementById("aiSearchResults");
  if (!box) return;
  if (!q.trim()){
    box.innerHTML = `<div class="result-empty">Type a plain-English description above, then hit Search.</div>`;
    return;
  }
  if (typeof parseQuery === "undefined" || typeof UNIVERSITIES === "undefined") return;
  const parsed = parseQuery(q);

  const matchesField = u => !parsed.field || u.fields.includes(parsed.field);
  const matchesBudget = u => !parsed.maxBudget || u.tuition <= parsed.maxBudget;

  const chipsRow = [
    parsed.countries.length ? `region: ${parsed.countries.join(", ")}` : "",
    parsed.field ? `field: ${parsed.field}` : "",
    parsed.maxBudget ? `max budget: $${parsed.maxBudget.toLocaleString()}` : ""
  ].filter(Boolean).map(c => `<span class="badge">${c}</span>`).join("");

  const filtered = UNIVERSITIES.filter(u => {
    if(!matchesField(u) || !matchesBudget(u)) return false;
    if(!parsed.countries.length) return true;
    return parsed.countries.some(c => u.country.toLowerCase().includes(c.toLowerCase()));
  });

  if(!filtered.length) {
    box.innerHTML = `
      <div class="result-meta-row">${chipsRow}</div>
      <div class="result-empty">No direct matching institutions. Try adjusting requirements.</div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="result-meta-row">
      <span>Found ${filtered.length} matching institutions</span>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${chipsRow}</div>
    </div>
    ${filtered.map(u => `
      <div class="uni-result-card">
        <div>
          <div class="uni-result-name">${u.name}</div>
          <div class="uni-result-meta">${u.city}, ${u.country} · Tuition: $${u.tuition.toLocaleString()}/yr · Living: $${u.living.toLocaleString()}/yr</div>
          <div style="display:flex;gap:6px;margin-top:8px;">${u.tags.map(t=>`<span class="badge" style="background:rgba(201,154,107,0.1);color:var(--tan); border:0;">${t}</span>`).join("")}</div>
        </div>
        <span class="match-pct">QS #${u.qs}</span>
      </div>
    `).join("")}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();

  const searchBtn = document.getElementById("aiSearchBtn");
  const searchInput = document.getElementById("aiSearchInput");
  if (searchBtn && searchInput) {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQ = urlParams.get("q");
    searchBtn.addEventListener("click", () => runAiSearch(searchInput.value));
    searchInput.addEventListener("keydown", e => { if (e.key==="Enter") runAiSearch(e.target.value); });
    if (initialQ){
      searchInput.value = initialQ;
      runAiSearch(initialQ);
    }
  }

  if (typeof initQuiz === "function" && document.getElementById("quizFieldSelect")) initQuiz();
  if (typeof initPlanner === "function" && document.getElementById("plannerStreamSelect")) initPlanner();
  if (typeof initEligibility === "function" && document.getElementById("eligibilityBoardSelect")) initEligibility();
});
