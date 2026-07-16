const SPONSOR_DETAIL = {
  USA: { amountLabel: "$25,000+", seasoningMonths: 2, note: "US consular officers rarely require 'seasoned' funds, but a sudden large deposit right before interview raises questions — 2 months of stability looks strongest." },
  UK: { amountLabel: "£12,000–£16,650+", seasoningMonths: 1, note: "UK requires funds held for a consecutive 28-day period ending no more than 31 days before you apply." },
  Canada: { amountLabel: "CA$20,635+", seasoningMonths: 4, note: "GIC funds should be arranged well ahead — banks typically take 2–4 weeks to issue the certificate, so start 4 months out." },
  Germany: { amountLabel: "€11,904", seasoningMonths: 3, note: "The blocked account must be opened and funded before your visa appointment; allow time for the transfer and account setup." },
  Australia: { amountLabel: "AU$29,710+", seasoningMonths: 3, note: "Funds should be genuinely available (GTE requirement) — sudden unexplained deposits can trigger extra scrutiny." },
  Singapore: { amountLabel: "Varies by course", seasoningMonths: 1, note: "Requirements are set per-institution; check your offer letter for the exact figure." },
  "Hong Kong": { amountLabel: "HK$180,000+", seasoningMonths: 3, note: "Immigration Department expects clear, explainable fund sources — avoid last-minute lump sums." },
  Japan: { amountLabel: "¥2,000,000+", seasoningMonths: 6, note: "Requires substantial history showing steady funding source over half a year." }
};

const WORK_VISA_RUNWAY = {
  USA: "24-Month STEM OPT Extension available for technical graduates, plus 12 months standard OPT.",
  UK: "Graduate Route Visa allows up to 2 years of work status post-completion without sponsorship.",
  Canada: "Post-Graduation Work Permit (PGWP) matches your degree duration up to a maximum of 3 years.",
  Germany: "18-Month Job Seeking visa granted automatically to absolute degree holders from local universities.",
  Australia: "Temporary Graduate Visa (Subclass 485) grants 2 to 4 years based on stream and target regional codes."
};

const VISA_INTERVIEW_QUESTIONS = [
  { q: "Why did you choose this specific university?", intent: "Checks if you read the curriculum syllabus or just bought an offer letter.", flag: "Avoid answering: 'Because it's highly ranked and beautiful'." },
  { q: "Who is sponsoring your education and what do they do?", intent: "Validates legitimate financial capability to sustain tuition obligations.", flag: "Flagged if sponsor income doesn't mathematically align with regular wire transfers." },
  { q: "What are your plans after graduation?", intent: "Assesses strong non-immigrant intent to return to Bangladesh.", flag: "Saying 'I want to live, look for jobs, and settle down there permanent' is an instant refusal." }
];

let interviewIndex = 0;

function renderVisaCards(){
  const grid = document.getElementById("visaGrid");
  if (!grid) return;
  const VISA_DESTINATIONS = [
    { country: "United States", note: "F-1 Student Visa. Requires an I-20 document issued by your university showing full-year financial coverage before you can schedule your embassy appointment." },
    { country: "United Kingdom", note: "Student Visa (formerly Tier 4). Points-based path requiring a CAS statement, meeting strict English requirements, and verified fund seasoning parameters." },
    { country: "Canada", note: "Study Permit. Strong focus on a clean study plan, an upfront Guaranteed Investment Certificate (GIC) purchase, and clear evidence of ties back home." },
    { country: "Germany", note: "National Visa for Studies. Demands a blocked bank account funded upfront to cover basic annual living expenditures, alongside local degree recognition checks." }
  ];
  grid.innerHTML = VISA_DESTINATIONS.map(v => `
    <div class="visa-card reveal">
      <h3>${v.country}</h3>
      <p>${v.note}</p>
    </div>
  `).join("");
}

function renderSponsorCalc(){
  const select = document.getElementById("sponsorCountrySelect");
  const result = document.getElementById("sponsorResult");
  if (!select || !result) return;
  const details = SPONSOR_DETAIL[select.value];
  if (!details) return;
  result.innerHTML = `
    <h3>Sponsor Requirement Summary</h3>
    <p><strong>Required Proof Target:</strong> ${details.amountLabel}</p>
    <p><strong>Minimum Account Seasoning:</strong> ${details.seasoningMonths} Months</p>
    <p style="font-size: 0.88rem; color: var(--cream-dim); margin-top: 10px;">${details.note}</p>
  `;
}

function renderRunway(){
  const select = document.getElementById("runwayCountrySelect");
  const result = document.getElementById("runwayResult");
  if (!select || !result) return;
  const runway = WORK_VISA_RUNWAY[select.value];
  if (!runway) return;
  result.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6;">${runway}</p>`;
}

function renderInterviewCard(){
  const box = document.getElementById("interviewCard");
  if (!box) return;
  const q = VISA_INTERVIEW_QUESTIONS[interviewIndex];
  box.innerHTML = `
    <div>
      <span class="eyebrow">Question Framework</span>
      <h3>"${q.q}"</h3>
      <p style="margin-top: 14px; font-weight: 500; color: var(--tan);"><strong>Intent:</strong> ${q.intent}</p>
      <p style="font-size: .92rem; color: var(--cream-dim); line-height: 1.6; margin-top: 8px;">${q.flag}</p>
    </div>
  `;
  const counter = document.getElementById("interviewCounter");
  const prevBtn = document.getElementById("interviewPrevBtn");
  const nextBtn = document.getElementById("interviewNextBtn");
  if (counter) counter.textContent = `${interviewIndex+1} / ${VISA_INTERVIEW_QUESTIONS.length}`;
  if (prevBtn) prevBtn.disabled = interviewIndex === 0;
  if (nextBtn) nextBtn.textContent = interviewIndex === VISA_INTERVIEW_QUESTIONS.length-1 ? "Restart ↻" : "Next →";
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisaCards();
  const select = document.getElementById("sponsorCountrySelect");
  if (select) {
    select.innerHTML = Object.keys(SPONSOR_DETAIL).map(c=>`<option value="${c}">${c}</option>`).join("");
    select.addEventListener("change", renderSponsorCalc);
    const sDate = document.getElementById("sponsorDate");
    if (sDate) sDate.addEventListener("change", renderSponsorCalc);
    renderSponsorCalc();
  }

  const runwaySelect = document.getElementById("runwayCountrySelect");
  if (runwaySelect) {
    runwaySelect.innerHTML = Object.keys(WORK_VISA_RUNWAY).map(c=>`<option value="${c}">${c}</option>`).join("");
    runwaySelect.addEventListener("change", renderRunway);
    renderRunway();
  }

  if (document.getElementById("interviewCard")) {
    renderInterviewCard();
    const prevBtn = document.getElementById("interviewPrevBtn");
    const nextBtn = document.getElementById("interviewNextBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => { if (interviewIndex>0){ interviewIndex--; renderInterviewCard(); } });
    if (nextBtn) nextBtn.addEventListener("click", () => {
      interviewIndex = (interviewIndex+1) % VISA_INTERVIEW_QUESTIONS.length;
      renderInterviewCard();
    });
  }
});
