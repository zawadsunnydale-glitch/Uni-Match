function renderRankTable(key){
  const body = document.getElementById("rankTableBody");
  if (!body || typeof UNIVERSITIES === "undefined") return;
  const sorted = [...UNIVERSITIES].filter(u=>u[key]).sort((a,b)=>a[key]-b[key]);
  body.innerHTML = sorted.map(u => `
    <tr>
      <td class="rank-num">#${u[key]}</td>
      <td>${u.name}</td>
      <td>${u.country}</td>
      <td class="tuition">${u.tuition ? "$"+u.tuition.toLocaleString() : "—"}</td>
      <td class="tuition">${u.employer}/100</td>
    </tr>`).join("");
}

function renderEmployerChart(){
  const chart = document.getElementById("employerChart");
  if (!chart || typeof UNIVERSITIES === "undefined") return;
  const top = [...UNIVERSITIES].sort((a,b)=>b.employer-a.employer).slice(0,10);
  const max = top[0].employer;
  chart.innerHTML = top.map(u => `
    <div class="bar-row">
      <span class="bar-label">${u.name.length>16?u.name.slice(0,16)+"…":u.name}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(u.employer/max)*100}%"></div></div>
      <span class="bar-value">${u.employer}</span>
    </div>`).join("");
}

function renderBdTable(){
  const body = document.getElementById("bdTableBody");
  if (!body || typeof BD_UNIVERSITIES === "undefined") return;
  body.innerHTML = BD_UNIVERSITIES.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.type}</td>
      <td>${u.city}</td>
      <td class="tuition">৳${u.tuitionPerYearBDT.toLocaleString()}</td>
      <td class="tuition">${u.employer}/100</td>
      <td class="tuition">${u.admissionTest}</td>
    </tr>`).join("");

  const chart = document.getElementById("bdChart");
  if (chart) {
    const top = [...BD_UNIVERSITIES].sort((a,b)=>b.employer-a.employer).slice(0,10);
    const max = top[0].employer;
    chart.innerHTML = top.map(u => `
      <div class="bar-row">
        <span class="bar-label">${u.name.length>18?u.name.slice(0,18)+"…":u.name}</span>
        <div class="bar-track"><div class="bar-fill teal" style="width:${(u.employer/max)*100}%"></div></div>
        <span class="bar-value">${u.employer}</span>
      </div>`).join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRankTable("qs");
  renderEmployerChart();
  renderBdTable();
});