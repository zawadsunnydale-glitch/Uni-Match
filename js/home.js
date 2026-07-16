/* Home page: rankings preview, career preview list, plain-English search redirect. */

function uniById(id){ return UNIVERSITIES.find(u => u.id === id); }

function renderRankList(sortKey){
  const list = document.getElementById("homeRankList");
  if (!list) return;
  const sorted = [...UNIVERSITIES].filter(u => u[sortKey]).sort((a,b) => a[sortKey]-b[sortKey]).slice(0,6);
  list.innerHTML = sorted.map((u,i) => `
    <li class="uni-result-card">
      <div>
        <div class="uni-result-name">${i+1}. ${u.name}</div>
        <div class="uni-result-meta">${u.city}, ${u.country}</div>
      </div>
      <span class="match-pct">#${u[sortKey]}</span>
    </li>`).join("");
}

function renderCareerList(careerId){
  const el = document.getElementById("homeCareerList");
  if (!el) return;
  const career = CAREERS.find(c => c.id === careerId) || CAREERS[0];
  el.innerHTML = career.topUnis.map((id,i) => {
    const u = uniById(id);
    if (!u) return "";
    const pct = 98 - i*2;
    return `<li class="uni-result-card">
      <div>
        <div class="uni-result-name">${u.name}</div>
        <div class="uni-result-meta">${u.country} · #${u.qs} in ${FIELD_LABELS[career.field] || career.field}</div>
      </div>
      <span class="match-pct">${pct}%</span>
    </li>`;
  }).join("");
}

function renderCareerGrid(){
  const grid = document.getElementById("homeCareerGrid");
  if (!grid) return;
  grid.innerHTML = CAREERS.slice(0,8).map(c => `
    <a href="tools.html#career" class="career-card" data-career="${c.id}">
      <div class="career-name">${c.label}</div>
      <div class="career-field">${FIELD_LABELS[c.field] || c.field}</div>
    </a>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRankList("qs");
  const rankSelect = document.getElementById("homeRankSelect");
  if (rankSelect){
    rankSelect.addEventListener("change", (e) => renderRankList(e.target.value));
  }

  const careerSelect = document.getElementById("homeCareerSelect");
  if (careerSelect){
    careerSelect.innerHTML = CAREERS.map(c => `<option value="${c.id}">${c.label}</option>`).join("");
    careerSelect.addEventListener("change", (e) => renderCareerList(e.target.value));
    renderCareerList(CAREERS[0].id);
  }

  renderCareerGrid();
  renderHeroTicket();

  const searchBtn = document.getElementById("homeSearchBtn");
  const searchInput = document.getElementById("homeSearchInput");
  const goSearch = () => {
    const q = searchInput.value.trim();
    window.location.href = "tools.html?q=" + encodeURIComponent(q) + "#search";
  };
  if (searchBtn) searchBtn.addEventListener("click", goSearch);
  if (searchInput) searchInput.addEventListener("keydown", e => { if (e.key === "Enter") goSearch(); });
});

function renderHeroTicket(){
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("unimatch_top_match") || "null"); } catch(e){}
  if (!saved) return; // leave the honest empty-state placeholder in place
  document.getElementById("heroTicketLabel").textContent = "Your top match";
  document.getElementById("heroTicketUni").textContent = saved.name;
  document.getElementById("heroTicketLoc").textContent = `${saved.city}, ${saved.country}`;
  document.getElementById("heroTicketScore").textContent = saved.score + "%";
  document.getElementById("heroTicketReasons").innerHTML = saved.reasons.map(r=>`<li>${r}</li>`).join("");
}
