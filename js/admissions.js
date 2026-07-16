document.addEventListener("DOMContentLoaded", () => {
  const bdSection = document.getElementById("bd");
  const abroadSection = document.getElementById("abroad");
  const btnBd = document.getElementById("btnBd");
  const btnAbroad = document.getElementById("btnAbroad");

  function show(which){
    bdSection.style.display = which === "bd" ? "block" : "none";
    abroadSection.style.display = which === "abroad" ? "block" : "none";
  }
  btnBd.addEventListener("click", () => { show("bd"); bdSection.scrollIntoView({behavior:"smooth"}); });
  btnAbroad.addEventListener("click", () => { show("abroad"); abroadSection.scrollIntoView({behavior:"smooth"}); });

  const hash = window.location.hash.replace("#","");
  show(hash === "bd" ? "bd" : "abroad");

  const select = document.getElementById("bdUniResourceSelect");
  const result = document.getElementById("bdResourceResult");
  if (select && typeof BD_UNIVERSITIES !== "undefined"){
    select.innerHTML = BD_UNIVERSITIES.map(u => `<option value="${u.name}">${u.name}</option>`).join("");
    function renderResources(){
      const u = BD_UNIVERSITIES.find(x => x.name === select.value) || BD_UNIVERSITIES[0];
      result.innerHTML = `
        <h3 style="font-size:1.15rem;margin-bottom:10px;">${u.name} Preparation Resources</h3>
        ${(u.resources||[]).map(r => `
          <div class="uni-result-card">
            <div>
              <div class="uni-result-name"><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></div>
              <div class="uni-result-meta">${r.note}</div>
            </div>
            <span class="visa-badge">${r.type}</span>
          </div>`).join("")}
        <p style="font-size:.88rem;color:var(--cream-dim);line-height:1.6;margin-top:16px;">${u.process || ""}</p>
      `;
    }
    select.addEventListener("change", renderResources);
    renderResources();
  }
});
