/* ============================================================
   Tools page interactivity
============================================================ */

/* ---------- tab switching ---------- */
function initTabs(){
  const tabs = document.querySelectorAll(".tool-tab");
  const panels = document.querySelectorAll(".tool-panel");
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

/* ---------- AI-lite natural language search ---------- */
/* REGION_MAP, FIELD_KEYWORDS, parseQuery live in data.js as shared helpers. */

function runAiSearch(q){
  const box = document.getElementById("aiSearchResults");
  if (!q.trim()){
    box.innerHTML = `<div class="result-empty">Type a plain-English description above, then hit Search.</div>`;
    return;
  }
  const parsed = parseQuery(q);

  const matchesField = u => !parsed.field || u.fields.includes(parsed.field);
  const matchesBudget = u => !parsed.maxBudget || u.tuition <= parsed.maxBudget;

  const chipsRow = [
    parsed.countries.length ? `region: ${parsed.countries.join(", ")}` : null,
    parsed.field ? `field: ${FIELD_LABELS[parsed.field]}` : null,
    parsed.maxBudget ? `budget: under $${parsed.maxBudget.toLocaleString()}` : null,
  ].filter(Boolean);

  const cardHtml = u => `
      <div class="uni-result-card">
        <div>
          <div class="uni-result-name">${u.name}</div>
          <div class="uni-result-meta">${u.city}, ${u.country} · QS #${u.qs} · Employer rep ${u.employer}/100</div>
        </div>
        <span class="match-pct">$${u.tuition.toLocaleString()}/yr</span>
      </div>`;

  if (parsed.countries.length){
    // Multi-region mode: requested country/region first, then other top matches — never isolate to one country alone.
    const primary = UNIVERSITIES.filter(u => parsed.countries.includes(u.country) && matchesField(u) && matchesBudget(u))
      .sort((a,b)=>a.qs-b.qs);
    const others = UNIVERSITIES.filter(u => !parsed.countries.includes(u.country) && matchesField(u) && matchesBudget(u))
      .sort((a,b)=>a.qs-b.qs).slice(0,6);

    box.innerHTML = `
      ${chipsRow.length ? `<div class="subject-pill-list" style="margin-bottom:18px;">${chipsRow.map(c=>`<span class="subject-pill">${c}</span>`).join("")}</div>` : ""}
      <div class="field-label" style="color:var(--teal);">${parsed.countries.join(", ")} — top matches (${primary.length})</div>
      ${primary.length ? primary.map(cardHtml).join("") : `<p style="color:var(--cream-45);font-size:.88rem;margin:10px 0 20px;">No exact matches in ${parsed.countries.join(", ")} for that field/budget.</p>`}
      ${others.length ? `<div class="field-label" style="margin-top:24px;">You might also like — other top destinations</div>${others.map(cardHtml).join("")}` : ""}
    `;
    return;
  }

  // No region detected — straightforward field/budget filter across the whole database.
  let results = UNIVERSITIES.filter(u => matchesField(u) && matchesBudget(u)).sort((a,b)=>a.qs-b.qs).slice(0,10);
  box.innerHTML = `
    ${chipsRow.length ? `<div class="subject-pill-list" style="margin-bottom:18px;">${chipsRow.map(c=>`<span class="subject-pill">${c}</span>`).join("")}</div>` : ""}
    ${results.length ? results.map(cardHtml).join("") : `<p style="color:var(--cream-45);font-size:.88rem;">No matches for that combination — try loosening the budget or field.</p>`}
  `;
}

/* ---------- Quick Match Quiz ---------- */
const quizState = { destination:null, tier:null, field:null, budget:null, scholarship:null };
let quizStep = 1;
const QUIZ_STEPS = 5;

function initQuiz(){
  const destWrap = document.getElementById("quizDestination");
  if (destWrap) destWrap.innerHTML = COUNTRY_LIST.filter(c=>c!=="Bangladesh").map(c=>`<button class="chip" data-field="destination" data-value="${c}">${c}</button>`).join("");
  const fieldWrap = document.getElementById("quizField");
  if (fieldWrap) fieldWrap.innerHTML = Object.keys(FIELD_LABELS).map(f=>`<button class="chip" data-field="field" data-value="${f}">${FIELD_LABELS[f]}</button>`).join("");

  document.querySelectorAll("#panel-quiz .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const { field, value } = chip.dataset;
      quizState[field] = value;
      document.querySelectorAll(`#panel-quiz .chip[data-field="${field}"]`).forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
    });
  });

  document.getElementById("quizNext").addEventListener("click", () => {
    if (quizStep < QUIZ_STEPS){ quizStep++; renderQuizStep(); }
    else { computeQuizResults(); }
  });
  document.getElementById("quizBack").addEventListener("click", () => {
    if (quizStep > 1){ quizStep--; renderQuizStep(); }
  });
  renderQuizStep();
}

function renderQuizStep(){
  document.querySelectorAll(".quiz-step").forEach(s => s.classList.toggle("active", +s.dataset.step === quizStep));
  for (let i=1;i<=QUIZ_STEPS;i++){
    const bar = document.getElementById("qp"+i);
    if (bar) bar.style.width = i <= quizStep ? "100%" : "0%";
  }
  document.getElementById("quizBack").disabled = quizStep === 1;
  document.getElementById("quizNext").textContent = quizStep === QUIZ_STEPS ? "See my matches →" : "Next →";
}

function computeQuizResults(){
  const box = document.getElementById("quizResults");
  const budget = quizState.budget ? parseInt(quizState.budget,10) : null;

  // Strict filter — every selected criterion must hold. No fallback that silently
  // drops the destination or budget constraint; an empty result is more honest
  // than a contradicting one.
  let pool = UNIVERSITIES.filter(u => {
    if (quizState.destination && u.country !== quizState.destination) return false;
    if (quizState.field && !u.fields.includes(quizState.field)) return false;
    if (budget && (u.tuition + u.living) > budget) return false;
    if (quizState.scholarship && quizState.scholarship !== "none" && !(u.scholarshipTypes || []).includes(quizState.scholarship)) return false;
    return true;
  }).sort((a,b)=>a.qs-b.qs).slice(0,6);

  if (!pool.length){
    box.innerHTML = `
      <div class="result-empty">
        No universities match every filter at once${quizState.destination ? ` (${quizState.destination}` : ""}${budget ? `, under $${budget.toLocaleString()}/yr` : ""}${quizState.destination ? ")" : ""}.<br><br>
        Try widening your destination or budget — we won't show results that contradict what you picked.
      </div>`;
    return;
  }

  box.innerHTML = `
    <div class="career-results-head"><h3>Your matches</h3></div>
    ${pool.map((u,i) => {
      const score = 96 - i*4;
      return `<div class="match-row">
        <span class="match-rank">${String(i+1).padStart(2,"0")}</span>
        <div>
          <div class="match-name">${u.name}</div>
          <div class="match-loc">${u.city}, ${u.country} · $${(u.tuition+u.living).toLocaleString()}/yr total</div>
        </div>
        <span class="match-pct">${score}%</span>
      </div>`;
    }).join("")}
  `;

  try {
    const top = pool[0];
    const reasons = [];
    if (quizState.field) reasons.push(`Offers ${FIELD_LABELS[quizState.field] || quizState.field}`);
    if (budget) reasons.push(`Within your $${budget.toLocaleString()}/yr budget`);
    if (quizState.destination) reasons.push(`In your chosen destination: ${quizState.destination}`);
    if (!reasons.length) reasons.push("Highest-ranked match for your answers");
    localStorage.setItem("unimatch_top_match", JSON.stringify({
      name: top.name, city: top.city, country: top.country, score: 96, reasons,
    }));
  } catch (e) { /* localStorage unavailable — homepage will just show the empty state */ }
}

/* ---------- Subject Planner ---------- */
function initPlanner(){
  const wrap = document.getElementById("plannerCareerChips");
  wrap.innerHTML = CAREERS.map(c => `<button class="chip" data-career="${c.id}">${c.label}</button>`).join("");
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    wrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    btn.classList.add("selected","gold");
    renderPlannerResult(btn.dataset.career);
  });
}
function renderPlannerResult(careerId){
  const career = CAREERS.find(c=>c.id===careerId);
  const req = SUBJECT_REQUIREMENTS[careerId] || (career && FIELD_SUBJECT_TEMPLATE[career.field]);
  const box = document.getElementById("plannerResults");
  if (!req){ box.innerHTML = `<div class="result-empty">No data for that career yet.</div>`; return; }
  box.innerHTML = `
    <h3 style="font-size:1.2rem;margin-bottom:6px;">${career.label}</h3>
    <p style="color:var(--cream-45);font-size:.85rem;margin-bottom:20px;">${career.blurb}</p>
    <div style="margin-bottom:16px;">
      <span class="field-label">National Curriculum (HSC)</span>
      <div class="subject-pill-list">${req.hsc.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
    <div style="margin-bottom:16px;">
      <span class="field-label">Madrasha Board</span>
      <div class="subject-pill-list">${req.madrasha.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
    <div>
      <span class="field-label">English Medium (A-Levels)</span>
      <div class="subject-pill-list">${req.alevels.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
  `;
}

/* ---------- Eligibility Checker (curriculum-aware) ---------- */
const STREAM_LABELS = {
  science: "Science", commerce: "Commerce", arts: "Arts",
  all: "All Subjects", humanities: "Humanities",
};
// Which streams each curriculum offers, and what the "effective" ELIGIBILITY_PROGRAMS
// stream key is for each (A-Levels checks against the closest matching stream group).
const CURRICULUM_STREAMS = {
  hsc: ["science","commerce","arts"],
  alevels: ["all"],
  madrasha: ["science","humanities"],
};
const eligState = { curriculum:"hsc", stream:"science", subjects:new Set() };

function initEligibility(){
  document.getElementById("eligCurriculum").addEventListener("click", e=>{
    const btn = e.target.closest(".chip"); if(!btn) return;
    document.querySelectorAll("#eligCurriculum .chip").forEach(c=>c.classList.remove("selected"));
    btn.classList.add("selected");
    eligState.curriculum = btn.dataset.value;
    eligState.stream = CURRICULUM_STREAMS[eligState.curriculum][0];
    eligState.subjects.clear();
    renderEligStreams();
    renderEligSubjects();
  });
  renderEligStreams();
  renderEligSubjects();
  document.getElementById("eligCheckBtn").addEventListener("click", checkEligibility);
}

function renderEligStreams(){
  const block = document.getElementById("eligStreamBlock");
  const streams = CURRICULUM_STREAMS[eligState.curriculum];
  if (streams.length <= 1){ block.style.display = "none"; return; }
  block.style.display = "";
  const wrap = document.getElementById("eligStream");
  wrap.innerHTML = streams.map((s,i) => `<button class="chip ${i===0?"selected gold":""}" data-value="${s}">${STREAM_LABELS[s]}</button>`).join("");
  wrap.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      wrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
      chip.classList.add("selected","gold");
      eligState.stream = chip.dataset.value;
      eligState.subjects.clear();
      renderEligSubjects();
    });
  });
}

function currentSubjectPool(){
  const curr = CURRICULUM_SUBJECTS[eligState.curriculum];
  return curr[eligState.stream] || curr.all || [];
}

function renderEligSubjects(){
  const wrap = document.getElementById("eligSubjects");
  const subjects = currentSubjectPool();
  wrap.innerHTML = subjects.map(s=>`<button class="chip" data-subject="${s}">${s}</button>`).join("");
  wrap.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      const s = chip.dataset.subject;
      if (eligState.subjects.has(s)){ eligState.subjects.delete(s); chip.classList.remove("selected"); }
      else { eligState.subjects.add(s); chip.classList.add("selected"); }
    });
  });
}

// Maps a curriculum+stream selection to which ELIGIBILITY_PROGRAMS.stream groups apply.
function matchingProgramStreams(){
  if (eligState.curriculum === "madrasha") return eligState.stream === "science" ? ["madrasha-science"] : ["madrasha-humanities"];
  if (eligState.curriculum === "alevels") return ["science","commerce","arts","madrasha-science"]; // A-Level subject pool overlaps most tracks
  return [eligState.stream]; // hsc: science / commerce / arts
}

// Renders a small CSS conic-gradient progress ring — no chart library needed.
function progressRing(pct, size){
  size = size || 64;
  const color = pct >= 90 ? "var(--teal)" : pct >= 50 ? "var(--orange)" : "var(--terracotta)";
  const inner = size - 14;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:conic-gradient(${color} ${pct*3.6}deg, var(--panel) 0deg);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
    <div style="width:${inner}px;height:${inner}px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:.7rem;font-weight:600;color:var(--cream);">${Math.round(pct)}%</div>
  </div>`;
}

function pivotSuggestion(program, scored){
  const alt = scored.find(p => p.program !== program.program && p.pct === 100);
  if (!alt) return "";
  return `<div style="font-size:.8rem;color:var(--orange);margin-top:6px;">→ You already qualify for <strong>${alt.program}</strong> — a related path needing no extra subjects.</div>`;
}

function checkEligibility(){
  const box = document.getElementById("eligResults");
  const chosen = eligState.subjects;
  const streams = matchingProgramStreams();
  const pool = ELIGIBILITY_PROGRAMS.filter(p => streams.includes(p.stream));

  const scored = pool.map(p => {
    const total = p.needs.length || 1;
    const met = p.needs.filter(n=>chosen.has(n)).length;
    const pct = p.needs.length ? (met/total)*100 : 100;
    const missing = p.needs.filter(n=>!chosen.has(n));
    return Object.assign({}, p, { pct, missing });
  }).sort((a,b)=>b.pct-a.pct);

  const qualified = scored.filter(p=>p.pct===100);
  const deficits = scored.filter(p=>p.pct<100 && p.pct>0).slice(0,6);

  box.innerHTML = `
    <div style="margin-bottom:26px;">
      <span class="field-label" style="color:var(--teal);">You qualify for (${qualified.length})</span>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:16px;margin-top:14px;">
        ${qualified.length ? qualified.map(p=>`
          <div style="text-align:center;">
            ${progressRing(p.pct,64)}
            <div style="font-size:.78rem;margin-top:8px;color:var(--cream-dim);line-height:1.3;">${p.program}</div>
          </div>`).join("") : `<p style="color:var(--cream-45);font-size:.88rem;">None at 100% yet — check the deficit suggestions below, or select more subjects.</p>`}
      </div>
    </div>
    ${deficits.length ? `
    <div>
      <span class="field-label">Close, but missing something</span>
      ${deficits.map(p=>`
        <div class="uni-result-card" style="align-items:flex-start;gap:16px;">
          ${progressRing(p.pct,50)}
          <div style="flex:1;">
            <div class="uni-result-name">${p.program}</div>
            <div class="uni-result-meta">Missing: ${p.missing.join(", ")}</div>
            ${pivotSuggestion(p, scored)}
          </div>
        </div>`).join("")}
    </div>` : ""}
  `;
}

/* ---------- Career Map ---------- */
function initCareerMap(){
  const grid = document.getElementById("careerMapGrid");
  grid.innerHTML = CAREERS.map(c => `<button class="career-card" data-career="${c.id}"><div class="career-name">${c.label}</div><div class="career-field">${FIELD_LABELS[c.field] || c.field}</div></button>`).join("");
  grid.addEventListener("click", e => {
    const btn = e.target.closest(".career-card"); if (!btn) return;
    grid.querySelectorAll(".career-card").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");
    renderCareerMapResults(btn.dataset.career);
  });
  renderCareerMapResults(CAREERS[0].id);
  grid.querySelector(".career-card").classList.add("active");
}
function renderCareerMapResults(careerId){
  const career = CAREERS.find(c=>c.id===careerId);
  const box = document.getElementById("careerMapResults");
  box.innerHTML = `
    <div class="career-results-head">
      <div>
        <h3>${career.label}</h3>
        <p>${career.blurb}</p>
      </div>
    </div>
    ${career.topUnis.map((id,i) => {
      const u = UNIVERSITIES.find(x=>x.id===id); if(!u) return "";
      return `<div class="match-row">
        <span class="match-rank">${String(i+1).padStart(2,"0")}</span>
        <div><div class="match-name">${u.name}</div><div class="match-loc">${u.country} · QS #${u.qs}</div></div>
        <span class="match-pct">${98-i*3}%</span>
      </div>`;
    }).join("")}
  `;
}

/* ---------- ECA Advisor ---------- */
function initEca(){
  const uniSelect = document.getElementById("ecaUniSelect");
  const allOptions = [
    ...UNIVERSITIES.map(u => ({ value: u.id, label: `${u.name} — ${u.country}` })),
    ...BD_UNIVERSITIES.map(u => ({ value: "bd:"+u.name, label: `${u.name} — Bangladesh` })),
  ].sort((a,b)=>a.label.localeCompare(b.label));
  uniSelect.innerHTML = allOptions.map(o=>`<option value="${o.value}">${o.label}</option>`).join("");

  const wrap = document.getElementById("ecaFieldChips");
  wrap.innerHTML = Object.keys(ECA_LIBRARY.competitive).map(f=>`<button class="chip" data-field="ecaField" data-value="${f}">${FIELD_LABELS[f]||f}</button>`).join("");
  wrap.querySelectorAll(".chip")[0]?.classList.add("selected","gold");
  wrap.addEventListener("click", (e)=>{
    const chip = e.target.closest(".chip"); if (!chip) return;
    wrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
  });
  document.getElementById("ecaGenerateBtn").addEventListener("click", generateEca);
}

/* Maps a university id (or "bd:Name" for local schools) to a bespoke
   ECA_PROFILES entry when one exists, e.g. via a small alias table for
   universities whose data-layer id differs from the profile key. */
const ECA_PROFILE_ALIASES = { buet: "buet" };

function generateEca(){
  const uniValue = document.getElementById("ecaUniSelect").value;
  const fieldChip = document.querySelector('#panel-eca .chip[data-field="ecaField"].selected');
  const field = fieldChip ? fieldChip.dataset.value : "computer-science";
  const competitive = ECA_LIBRARY.competitive[field] || ECA_LIBRARY.competitive["computer-science"];

  let uniName, profile, tierLabel;
  if (uniValue.startsWith("bd:")){
    uniName = uniValue.slice(3);
    const bdKey = uniName.toLowerCase().includes("brac") ? "brac" : (uniName.toLowerCase().includes("buet") ? "buet" : null);
    profile = bdKey ? ECA_PROFILES[bdKey] : null;
    if (!profile){
      const bdUni = BD_UNIVERSITIES.find(b=>b.name===uniName);
      const tier = bdUni && bdUni.type === "Public" && bdUni.employer >= 90 ? "reach" : (bdUni && bdUni.employer >= 80 ? "match" : "safety");
      profile = ECA_TIER_TEMPLATES[tier];
      tierLabel = profile.type;
    }
  } else {
    const u = UNIVERSITIES.find(x=>x.id===uniValue);
    uniName = u ? u.name : uniValue;
    profile = ECA_PROFILES[uniValue];
    if (!profile){
      const tier = getUniTier(u ? u.qs : null);
      profile = ECA_TIER_TEMPLATES[tier];
      tierLabel = profile.type;
    }
  }

  const specific = profile.specific || competitive;
  const notes = profile.notes || `${profile.notesSuffix} Field-specific ECAs shown below are drawn from our ${FIELD_LABELS[field]||field} library since ${uniName} doesn't have a bespoke profile yet.`;

  document.getElementById("ecaResults").innerHTML = `
    <p style="font-family:var(--font-mono);font-size:.72rem;color:var(--orange);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;">${uniName}${profile.type ? " · " + profile.type : ""}</p>
    <div class="eca-tier">
      <h4>Broad ECAs for this type of university</h4>
      <ul>${profile.broad.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="eca-tier">
      <h4>Specific ECAs — ${FIELD_LABELS[field]||field}</h4>
      <ul>${specific.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <p style="font-family:var(--font-mono);font-size:.78rem;color:var(--cream-45);line-height:1.6;">${notes}</p>
  `;
}
/* ---------- Financial Planner ---------- */
let plannerCurrency = "USD";

function countryToCurrency(country){
  const map = { "United States":"USD","United Kingdom":"GBP","Germany":"EUR","Canada":"CAD","Australia":"AUD","Singapore":"SGD","Hong Kong":"HKD","Japan":"JPY","Bangladesh":"BDT" };
  return map[country] || "USD";
}
function convert(usdAmount, currency){
  return usdAmount * (CURRENCY_RATES_PER_USD[currency] || 1);
}
function fmtCurrency(usdAmount, currency){
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  const val = convert(usdAmount, currency);
  const decimals = currency === "JPY" ? 0 : 0;
  return symbol + Math.round(val).toLocaleString(undefined,{maximumFractionDigits:decimals});
}

function initCost(){
  const select = document.getElementById("costUniSelect");
  select.innerHTML = UNIVERSITIES.sort((a,b)=>a.name.localeCompare(b.name)).map(u=>`<option value="${u.id}">${u.name} — ${u.country}</option>`).join("");
  select.addEventListener("change", () => { syncCurrencyToUni(); renderCost(); });
  document.getElementById("costScholarship").addEventListener("input", renderCost);
  document.getElementById("ancillaryToggle").addEventListener("change", renderCost);

  const currencyWrap = document.getElementById("currencyChips");
  currencyWrap.innerHTML = Object.keys(CURRENCY_RATES_PER_USD).map(c=>`<button class="chip ${c==='USD'?'selected':''}" data-currency="${c}">${c}</button>`).join("");
  currencyWrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    plannerCurrency = chip.dataset.currency;
    currencyWrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected"));
    chip.classList.add("selected");
    renderCost();
  });

  syncCurrencyToUni();
  renderCost();

  document.getElementById("workHours").addEventListener("input", renderWorkOffset);
  document.getElementById("workWage").addEventListener("input", renderWorkOffset);
  renderWorkOffset();

  document.getElementById("breakevenBtn").addEventListener("click", renderBreakeven);
}

function syncCurrencyToUni(){
  const uniId = document.getElementById("costUniSelect").value || UNIVERSITIES[0].id;
  const u = UNIVERSITIES.find(x=>x.id===uniId) || UNIVERSITIES[0];
  plannerCurrency = countryToCurrency(u.country);
  document.querySelectorAll("#currencyChips .chip").forEach(c=>c.classList.toggle("selected", c.dataset.currency===plannerCurrency));
}

function renderCost(){
  const uniId = document.getElementById("costUniSelect").value || UNIVERSITIES[0].id;
  const u = UNIVERSITIES.find(x=>x.id===uniId) || UNIVERSITIES[0];
  const scholarship = +document.getElementById("costScholarship").value;
  document.getElementById("costScholarshipLabel").textContent = scholarship + "% covered";
  const showAncillary = document.getElementById("ancillaryToggle").checked;

  const baseline = LIVING_COST_BASELINE[u.country] || LIVING_COST_BASELINE["United States"];
  const rentYr = baseline.rent*12, foodYr = baseline.food*12, transportYr = baseline.transport*12,
        utilYr = baseline.utilities*12, clothesYr = baseline.clothes*12, miscYr = baseline.misc*12;
  const tuitionAfter = u.tuition * (1 - scholarship/100);
  const livingTotal = rentYr+foodYr+transportYr+utilYr+clothesYr+miscYr;
  const ancillaryTotal = showAncillary ? Object.values(ANCILLARY_COSTS).reduce((a,b)=>a+b,0) : 0;
  const total = tuitionAfter + livingTotal + ancillaryTotal;
  const c = plannerCurrency;

  const ancillaryRows = showAncillary ? `
    <div class="cost-breakdown-row"><span>Health insurance (mandatory)</span><span class="mono-num">${fmtCurrency(ANCILLARY_COSTS.healthInsurance,c)}</span></div>
    <div class="cost-breakdown-row"><span>Registration / SEVIS-type fee</span><span class="mono-num">${fmtCurrency(ANCILLARY_COSTS.sevisOrRegistrationFee,c)}</span></div>
    <div class="cost-breakdown-row"><span>Textbooks &amp; supplies</span><span class="mono-num">${fmtCurrency(ANCILLARY_COSTS.textbooksAndSupplies,c)}</span></div>
    <div class="cost-breakdown-row"><span>Emergency return-flight buffer</span><span class="mono-num">${fmtCurrency(ANCILLARY_COSTS.emergencyFlightBuffer,c)}</span></div>` : "";

  document.getElementById("costResults").innerHTML = `
    <div class="cost-breakdown-row"><span>Tuition (after scholarship)</span><span class="mono-num">${fmtCurrency(tuitionAfter,c)}</span></div>
    <div class="cost-breakdown-row"><span>Rent / housing</span><span class="mono-num">${fmtCurrency(rentYr,c)}</span></div>
    <div class="cost-breakdown-row"><span>Food</span><span class="mono-num">${fmtCurrency(foodYr,c)}</span></div>
    <div class="cost-breakdown-row"><span>Transport</span><span class="mono-num">${fmtCurrency(transportYr,c)}</span></div>
    <div class="cost-breakdown-row"><span>Utilities</span><span class="mono-num">${fmtCurrency(utilYr,c)}</span></div>
    <div class="cost-breakdown-row"><span>Clothes</span><span class="mono-num">${fmtCurrency(clothesYr,c)}</span></div>
    <div class="cost-breakdown-row"><span>Miscellaneous</span><span class="mono-num">${fmtCurrency(miscYr,c)}</span></div>
    ${ancillaryRows}
    <div class="cost-total"><span>Total / year</span><span>${fmtCurrency(total,c)}</span></div>
    <p style="font-family:var(--font-mono);font-size:.72rem;color:var(--cream-45);margin-top:10px;">Currency conversion uses a static illustrative rate — check a live rate before wiring family finances around it.</p>
  `;

  const maxVal = Math.max(tuitionAfter, rentYr, foodYr, livingTotal);
  const rows = [
    ["Tuition", tuitionAfter, ""],
    ["Rent", rentYr, "teal"],
    ["Food", foodYr, "teal"],
    ["Transport", transportYr, "teal"],
    ["Living total", livingTotal, "teal"],
  ];
  document.getElementById("costChart").innerHTML = rows.map(([label,val,cls]) => `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${Math.max(4,(val/maxVal)*100)}%"></div></div>
      <span class="bar-value">${fmtCurrency(val,plannerCurrency)}</span>
    </div>`).join("");
}

/* ---------- Part-time work offset simulator ---------- */
function renderWorkOffset(){
  const uniId = document.getElementById("costUniSelect").value || UNIVERSITIES[0].id;
  const u = UNIVERSITIES.find(x=>x.id===uniId) || UNIVERSITIES[0];
  const rules = PART_TIME_WORK_RULES[u.country];
  const legalCap = rules && typeof rules.hoursPerWeekTerm === "number" ? rules.hoursPerWeekTerm : 20;

  const hoursSlider = document.getElementById("workHours");
  hoursSlider.max = legalCap;
  const hours = Math.min(+hoursSlider.value, legalCap);
  hoursSlider.value = hours;
  document.getElementById("workHoursLabel").textContent = `${hours} hrs/week (legal cap for ${u.country}: ${rules ? rules.hoursPerWeekTerm : "~20"} hrs/week)`;

  const wageLocal = +document.getElementById("workWage").value || 0;
  const currency = countryToCurrency(u.country);
  const wageUsd = wageLocal / (CURRENCY_RATES_PER_USD[currency] || 1);
  const annualEarningsUsd = wageUsd * hours * 44; // ~44 working weeks/year after exams & breaks

  const baseline = LIVING_COST_BASELINE[u.country] || LIVING_COST_BASELINE["United States"];
  const livingTotal = (baseline.rent+baseline.food+baseline.transport+baseline.utilities+baseline.clothes+baseline.misc)*12;
  const offsetPct = Math.min(100, (annualEarningsUsd / livingTotal) * 100);

  document.getElementById("workOffsetResult").innerHTML = `
    <div class="cost-breakdown-row"><span>Estimated annual earnings</span><span class="mono-num">${fmtCurrency(annualEarningsUsd, currency)}</span></div>
    <div class="cost-breakdown-row"><span>Annual living costs</span><span class="mono-num">${fmtCurrency(livingTotal, currency)}</span></div>
    <div class="cost-total"><span>Self-funded share</span><span>${Math.round(offsetPct)}%</span></div>
    <div class="bar-track" style="margin-top:14px;"><div class="bar-fill teal" style="width:${offsetPct}%"></div></div>
    <p style="font-size:.85rem;color:var(--cream-dim);line-height:1.6;margin-top:16px;">${rules ? rules.note : ""} The remaining ${Math.max(0,100-Math.round(offsetPct))}% needs to come from family sponsorship or savings — factor that into your bank-sponsor planning on the Visa Hub.</p>
  `;
}

/* ---------- Tuition vs. opportunity cost breakeven ---------- */
function renderBreakeven(){
  const salaryAbroad = +document.getElementById("salaryAbroad").value || 0;
  const salaryHome = +document.getElementById("salaryHome").value || 0;
  const uniId = document.getElementById("costUniSelect").value || UNIVERSITIES[0].id;
  const u = UNIVERSITIES.find(x=>x.id===uniId) || UNIVERSITIES[0];
  const baseline = LIVING_COST_BASELINE[u.country] || LIVING_COST_BASELINE["United States"];
  const livingYr = (baseline.rent+baseline.food+baseline.transport+baseline.utilities+baseline.clothes+baseline.misc)*12;
  const abroadTotal4yr = (u.tuition + livingYr) * 4;
  const localTotal = +document.getElementById("localDegreeCost").value || 0;

  let breakEvenYear = null;
  let cumAbroad = abroadTotal4yr, cumHome = localTotal;
  for (let year = 1; year <= 15; year++){
    cumAbroad += salaryAbroad === 0 ? 0 : (year > 4 ? -salaryAbroad : 0); // earning starts after year 4 (graduation)
    cumHome += (year > 4 ? -salaryHome : 0); // assume home path also takes ~4 yrs before working, for a fair comparison
    if (cumAbroad <= cumHome && breakEvenYear === null && year > 4){ breakEvenYear = year; break; }
  }

  document.getElementById("breakevenResult").innerHTML = `
    <div class="cost-breakdown-row"><span>4-yr total cost abroad</span><span class="mono-num">$${Math.round(abroadTotal4yr).toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>4-yr total cost staying home</span><span class="mono-num">$${Math.round(localTotal).toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Annual salary gap (abroad − home)</span><span class="mono-num">$${Math.round(salaryAbroad-salaryHome).toLocaleString()}/yr</span></div>
    <div class="cost-total"><span>Break-even year</span><span>${breakEvenYear ? "Year " + breakEvenYear : "15+ years / not within horizon"}</span></div>
    <p style="font-size:.85rem;color:var(--cream-dim);line-height:1.6;margin-top:16px;">Simplified model: assumes both paths take ~4 years before earning starts, ignores inflation, taxes, and career growth curves — treat this as a directional estimate, not a financial projection.</p>
  `;
}

/* ---------- English proficiency self-assessment ---------- */
const ENG_SKILLS = [
  { key:"listening", label:"Listening" },
  { key:"reading", label:"Reading" },
  { key:"writing", label:"Writing" },
  { key:"speaking", label:"Speaking" },
];
const ENG_LEVELS = [
  { value:1, label:"Beginner" },
  { value:2, label:"Intermediate" },
  { value:3, label:"Advanced" },
  { value:4, label:"Near-native" },
];
const engQuizState = {};

function initEnglishQuiz(){
  const wrap = document.getElementById("engQuizChips");
  if (!wrap) return;
  wrap.innerHTML = ENG_SKILLS.map(s => `
    <div class="field-block">
      <span class="field-label">${s.label}</span>
      <div class="chip-row">${ENG_LEVELS.map(l=>`<button class="chip" data-skill="${s.key}" data-value="${l.value}">${l.label}</button>`).join("")}</div>
    </div>`).join("");
  wrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    const { skill, value } = chip.dataset;
    engQuizState[skill] = +value;
    wrap.querySelectorAll(`.chip[data-skill="${skill}"]`).forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
  });
  document.getElementById("engQuizBtn").addEventListener("click", computeEnglishEstimate);
}

function computeEnglishEstimate(){
  const box = document.getElementById("engQuizResult");
  const answered = ENG_SKILLS.filter(s => engQuizState[s.key]);
  if (answered.length < ENG_SKILLS.length){
    box.innerHTML = `<div class="result-empty">Please rate all four skills first.</div>`;
    return;
  }
  const avg = ENG_SKILLS.reduce((sum,s)=>sum+engQuizState[s.key],0) / ENG_SKILLS.length;
  // Rough mapping — self-reported, not a real proficiency test.
  const ieltsEstimate = (4.5 + avg * 1.1).toFixed(1);
  const duoEstimate = Math.round(70 + avg * 15);
  const acceptsDuolingo = avg >= 2.5;

  box.innerHTML = `
    <div class="cost-breakdown-row"><span>Estimated IELTS band</span><span class="mono-num">~${ieltsEstimate}</span></div>
    <div class="cost-breakdown-row"><span>Estimated Duolingo score</span><span class="mono-num">~${duoEstimate}</span></div>
    <p style="font-size:.85rem;color:var(--cream-dim);line-height:1.6;margin-top:16px;">
      This is a rough self-reported estimate, not a real test result — treat it as a starting point for deciding how much prep time you need, not a guarantee of your actual score.
      ${acceptsDuolingo
        ? "At this level, Duolingo English Test is worth considering: it's cheaper and faster to schedule, and most US, UK, and Canadian universities now accept it — though the most selective schools (Oxford, Cambridge, Ivy-tier) may still require IELTS or TOEFL Academic specifically, so always check your target university's own admissions page."
        : "At this level, focus prep time on Listening and Reading first — they improve fastest with daily practice — before booking either IELTS or Duolingo, since a low first attempt still costs the registration fee."}
    </p>
  `;
}

/* ---------- GPA Normalizer ---------- */
function initGpaNormalizer(){
  const select = document.getElementById("gpaSystemSelect");
  select.innerHTML = Object.keys(GPA_CONVERTERS).map(k=>`<option value="${k}">${GPA_CONVERTERS[k].label}</option>`).join("");
  select.addEventListener("change", renderGpaInputs);
  renderGpaInputs();
  document.getElementById("gpaConvertBtn").addEventListener("click", computeGpaConversion);
}

function renderGpaInputs(){
  const key = document.getElementById("gpaSystemSelect").value;
  const conv = GPA_CONVERTERS[key];
  const block = document.getElementById("gpaInputBlock");
  if (conv.points){
    const count = key === "alevel" ? 3 : 5;
    const options = Object.keys(conv.points).map(g=>`<option value="${g}">${g}</option>`).join("");
    block.innerHTML = `<span class="field-label">Enter your ${count} grades</span>
      <div class="chip-row" style="gap:10px;">
        ${Array.from({length:count}).map((_,i)=>`<select class="input-line" style="width:auto;" id="gpaGrade${i}">${options}</select>`).join("")}
      </div>`;
  } else {
    block.innerHTML = `<span class="field-label">Enter your score</span><input type="number" class="input-line" id="gpaNumericInput" step="0.01">`;
  }
}

function computeGpaConversion(){
  const key = document.getElementById("gpaSystemSelect").value;
  const conv = GPA_CONVERTERS[key];
  const box = document.getElementById("gpaResult");
  let gpa4;
  if (conv.points){
    const count = key === "alevel" ? 3 : 5;
    const grades = Array.from({length:count}).map((_,i)=>document.getElementById("gpaGrade"+i).value);
    const avgPoints = grades.reduce((sum,g)=>sum+conv.points[g],0) / count;
    gpa4 = avgPoints;
  } else {
    const raw = +document.getElementById("gpaNumericInput").value;
    if (isNaN(raw)){ box.innerHTML = `<div class="result-empty">Enter a valid number first.</div>`; return; }
    gpa4 = conv.toFour(raw);
  }
  gpa4 = Math.max(0, Math.min(4, gpa4));

  box.innerHTML = `
    <div style="text-align:center;padding:10px 0;">
      ${progressRing((gpa4/4)*100, 90)}
      <div style="font-family:var(--font-display);font-size:1.8rem;margin-top:14px;">${gpa4.toFixed(2)} / 4.0</div>
      <p style="font-size:.85rem;color:var(--cream-45);margin-top:10px;line-height:1.6;">This is an estimated conversion for comparison purposes — admissions offices often use their own official conversion table, so always check what your target university actually accepts.</p>
    </div>
  `;
}

/* ---------- Admissions Strategy Suite ---------- */
function initAdmissionsStrategy(){
  const ecWrap = document.getElementById("ecTierChips");
  ecWrap.addEventListener("click",(e)=>{
    const chip = e.target.closest(".chip"); if (!chip) return;
    ecWrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
  });
  document.getElementById("chanceMeBtn").addEventListener("click", computeChanceMe);

  const weightWrap = document.getElementById("weightingCountryChips");
  weightWrap.innerHTML = Object.keys(ADMISSIONS_WEIGHTING).map((c,i)=>`<button class="chip ${i===0?'selected gold':''}" data-country="${c}">${c}</button>`).join("");
  weightWrap.addEventListener("click",(e)=>{
    const chip = e.target.closest(".chip"); if (!chip) return;
    weightWrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
    renderWeighting(chip.dataset.country);
  });
  renderWeighting(Object.keys(ADMISSIONS_WEIGHTING)[0]);

  const roundWrap = document.getElementById("roundChips");
  roundWrap.innerHTML = Object.keys(APPLICATION_ROUNDS).map((r,i)=>`<button class="chip ${i===2?'selected gold':''}" data-round="${r}">${APPLICATION_ROUNDS[r].label}</button>`).join("");
  roundWrap.addEventListener("click",(e)=>{
    const chip = e.target.closest(".chip"); if (!chip) return;
    roundWrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
    renderRoundInfo(chip.dataset.round);
  });
  renderRoundInfo("RD");
}

function renderWeighting(country){
  const w = ADMISSIONS_WEIGHTING[country];
  document.getElementById("weightingResult").innerHTML = `
    <h3 style="font-size:1.1rem;margin-bottom:14px;">${country}</h3>
    ${[["Academics",w.academics],["Extracurriculars",w.ecs],["Essays",w.essays],["Recommendation letters",w.lors]].map(([label,pct])=>`
      <div class="bar-row" style="grid-template-columns:140px 1fr auto;">
        <span class="bar-label">${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <span class="bar-value">${pct}%</span>
      </div>`).join("")}
    <p style="font-size:.85rem;color:var(--cream-dim);line-height:1.6;margin-top:16px;">${w.note}</p>
    <p style="font-family:var(--font-mono);font-size:.72rem;color:var(--cream-45);margin-top:10px;">Illustrative composite weighting, not any single university's real rubric — actual weight varies school to school.</p>
  `;
}

function renderRoundInfo(round){
  const r = APPLICATION_ROUNDS[round];
  document.getElementById("roundResult").innerHTML = `
    <h3 style="font-size:1.1rem;margin-bottom:6px;">${r.label}</h3>
    <p style="font-family:var(--font-mono);font-size:.85rem;color:var(--teal);margin-bottom:12px;">Typical acceptance-rate boost: ${r.boost}</p>
    <p style="font-size:.9rem;color:var(--cream-dim);line-height:1.6;">${r.note}</p>
  `;
}

function computeChanceMe(){
  const gpa = +document.getElementById("chanceGpa").value || 0;
  const testPct = +document.getElementById("chanceTestPct").value || 0;
  const ecChip = document.querySelector("#ecTierChips .chip.selected");
  const ecTier = ecChip ? +ecChip.dataset.value : 2;

  // Simple weighted index out of 100 — illustrative, not predictive of any real outcome.
  const index = Math.min(100, (gpa/4)*45 + (testPct/100)*30 + (ecTier/4)*25);

  const results = UNIVERSITIES.map(u => {
    // Selectivity proxy from QS rank: lower rank number = harder to get into.
    const selectivity = u.qs <= 15 ? 90 : u.qs <= 50 ? 72 : u.qs <= 150 ? 50 : 30;
    const gap = index - selectivity;
    const bucket = gap >= 15 ? "safety" : gap >= -10 ? "target" : "reach";
    return Object.assign({}, u, { bucket });
  });

  const reach = results.filter(u=>u.bucket==="reach").sort((a,b)=>a.qs-b.qs).slice(0,4);
  const target = results.filter(u=>u.bucket==="target").sort((a,b)=>a.qs-b.qs).slice(0,4);
  const safety = results.filter(u=>u.bucket==="safety").sort((a,b)=>a.qs-b.qs).slice(0,4);

  const listBlock = (label, list, color) => `
    <div style="margin-bottom:20px;">
      <span class="field-label" style="color:${color};">${label} (${list.length})</span>
      ${list.length ? list.map(u=>`<div class="uni-result-card"><div class="uni-result-name">${u.name}</div><div class="uni-result-meta">${u.country} · QS #${u.qs}</div></div>`).join("") : `<p style="color:var(--cream-45);font-size:.85rem;">None in this bucket from the current database.</p>`}
    </div>`;

  document.getElementById("chanceMeResult").innerHTML = `
    <div style="text-align:center;margin-bottom:24px;">
      ${progressRing(index, 90)}
      <div style="font-family:var(--font-mono);font-size:.8rem;color:var(--cream-45);margin-top:10px;">Admission Index</div>
    </div>
    ${listBlock("Reach", reach, "var(--terracotta)")}
    ${listBlock("Target", target, "var(--orange)")}
    ${listBlock("Safety", safety, "var(--teal)")}
    <p style="font-family:var(--font-mono);font-size:.72rem;color:var(--cream-45);line-height:1.6;">A rule-based approximation from GPA, test percentile, and EC tier only — real committees weigh essays, context, and institutional priorities we can't model here. Use this to sanity-check list balance, not as a prediction.</p>
  `;
}

/* ---------- Document Readiness Matrix ---------- */
const READINESS_ITEMS = [
  { key:"transcript", label:"Attested academic transcripts" },
  { key:"lor1", label:"Recommendation Letter #1" },
  { key:"lor2", label:"Recommendation Letter #2" },
  { key:"sop", label:"Statement of Purpose / essay drafted" },
  { key:"testscore", label:"SAT/IELTS/TOEFL score received" },
  { key:"passport", label:"Valid passport (6+ months before travel)" },
  { key:"bankletter", label:"Bank sponsor / solvency letter" },
  { key:"police", label:"Police clearance certificate" },
  { key:"medical", label:"Medical exam / vaccination records" },
  { key:"applicationform", label:"University application form submitted" },
];

function loadReadinessState(){
  try { return JSON.parse(localStorage.getItem("unimatch_readiness") || "{}"); } catch(e){ return {}; }
}
function saveReadinessState(state){
  try { localStorage.setItem("unimatch_readiness", JSON.stringify(state)); } catch(e){}
}

function initReadiness(){
  const state = loadReadinessState();
  const list = document.getElementById("readinessChecklist");
  list.innerHTML = READINESS_ITEMS.map(item => `
    <label style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px dashed var(--line);cursor:pointer;font-size:.92rem;color:var(--cream-dim);">
      <input type="checkbox" data-key="${item.key}" ${state[item.key] ? "checked" : ""} style="width:18px;height:18px;accent-color:var(--teal);flex-shrink:0;">
      ${item.label}
    </label>`).join("");

  list.addEventListener("change", (e) => {
    const cb = e.target.closest("input[type=checkbox]"); if (!cb) return;
    const s = loadReadinessState();
    s[cb.dataset.key] = cb.checked;
    saveReadinessState(s);
    renderReadinessRing();
  });

  renderReadinessRing();

  document.getElementById("exportProfileBtn").addEventListener("click", exportProfileJson);
}

function renderReadinessRing(){
  const state = loadReadinessState();
  const done = READINESS_ITEMS.filter(i=>state[i.key]).length;
  const pct = (done / READINESS_ITEMS.length) * 100;
  document.getElementById("readinessRingWrap").innerHTML = `
    ${progressRing(pct, 120)}
    <div style="font-family:var(--font-mono);font-size:.85rem;color:var(--cream-dim);margin-top:14px;">${done} / ${READINESS_ITEMS.length} documents ready</div>
  `;
}

/* ---------- Export profile as JSON ---------- */
function exportProfileJson(){
  let quizMatch = null;
  try { quizMatch = JSON.parse(localStorage.getItem("unimatch_top_match") || "null"); } catch(e){}
  const profile = {
    exportedAt: new Date().toISOString(),
    quizTopMatch: quizMatch,
    documentReadiness: loadReadinessState(),
    note: "Exported from UniMatch — a personal snapshot of your saved progress on this browser.",
  };
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "unimatch-profile.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();

  const urlParams = new URLSearchParams(window.location.search);
  const initialQ = urlParams.get("q");
  document.getElementById("aiSearchBtn").addEventListener("click", () => runAiSearch(document.getElementById("aiSearchInput").value));
  document.getElementById("aiSearchInput").addEventListener("keydown", e => { if (e.key==="Enter") runAiSearch(e.target.value); });
  if (initialQ){
    document.getElementById("aiSearchInput").value = initialQ;
    runAiSearch(initialQ);
  }

  initQuiz();
  initPlanner();
  initEligibility();
  initCareerMap();
  initEca();
  initCost();
  initEnglishQuiz();
  initGpaNormalizer();
  initAdmissionsStrategy();
  initReadiness();
});
