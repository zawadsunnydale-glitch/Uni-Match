function renderRankTable(key){
  const body = document.getElementById("rankTableBody");
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
  const top = [...UNIVERSITIES].sort((a,b)=>b.employer-a.employer).slice(0,10);
  const max = top[0].employer;
  document.getElementById("employerChart").innerHTML = top.map(u => `
    <div class="bar-row">
      <span class="bar-label">${u.name.length>16?u.name.slice(0,16)+"…":u.name}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(u.employer/max)*100}%"></div></div>
      <span class="bar-value">${u.employer}</span>
    </div>`).join("");
}

function renderBdTable(){
  const body = document.getElementById("bdTableBody");
  body.innerHTML = BD_UNIVERSITIES.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.type}</td>
      <td>${u.city}</td>
      <td class="tuition">৳${u.tuitionPerYearBDT.toLocaleString()}</td>
      <td class="tuition">${u.employer}/100</td>
      <td class="tuition">${u.admissionTest}</td>
    </tr>`).join("");

  const top = [...BD_UNIVERSITIES].sort((a,b)=>b.employer-a.employer).slice(0,10);
  const max = top[0].employer;
  document.getElementById("bdChart").innerHTML = top.map(u => `
    <div class="bar-row">
      <span class="bar-label">${u.name.length>18?u.name.slice(0,18)+"…":u.name}</span>
      <div class="bar-track"><div class="bar-fill teal" style="width:${(u.employer/max)*100}%"></div></div>
      <span class="bar-value">${u.employer}</span>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRankTable("qs");
  renderEmployerChart();
  renderBdTable();

  document.querySelectorAll("#rankTabs .tool-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#rankTabs .tool-tab").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      renderRankTable(btn.dataset.rank);
    });
  });
});
