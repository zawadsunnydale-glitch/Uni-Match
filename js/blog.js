function renderBlogCover(post){
  const c = post.cover;
  const inner = c.kind === "number"
    ? `<div class="blog-cover-num">${c.big}</div><div class="blog-cover-label">${c.label}</div>${c.sub ? `<div class="blog-cover-sub">${c.sub}</div>`:""}`
    : `<div class="blog-cover-big">${c.big} <span class="blog-cover-highlight">${c.highlight}</span></div>${c.sub ? `<div class="blog-cover-sub">${c.sub}</div>`:""}`;
  return `<div class="blog-cover theme-${c.theme}">
      <span class="blog-cover-category">${post.category}</span>
      ${inner}
    </div>`;
}

function formatDate(iso){
  return new Date(iso).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
}

function renderBlogGrid(filterCategory){
  const grid = document.getElementById("blogGrid");
  const posts = allPosts().filter(p => !filterCategory || filterCategory === "All" || p.category === filterCategory)
                           .sort((a,b) => new Date(b.date) - new Date(a.date));
  grid.innerHTML = posts.map(p => `
    <a href="blog-post.html?post=${p.id}" class="blog-card">
      ${renderBlogCover(p)}
      <div class="blog-card-body">
        <div class="blog-card-title">${p.title}${p.local ? ' <span class="badge-soon">local</span>' : ''}</div>
        <div class="blog-card-excerpt">${p.excerpt}</div>
        <div class="blog-card-meta"><span>${formatDate(p.date)}</span><span>${p.readTime}</span></div>
      </div>
    </a>`).join("");
}

/* ---------- Admin publishing (local-only demo — see feature-note in blog.html) ---------- */
const ADMIN_PASSCODE = "unimatch-admin";

function loadAdminPosts(){
  try { return JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){ return []; }
}
function saveAdminPosts(posts){
  try { localStorage.setItem("unimatch_admin_posts", JSON.stringify(posts)); } catch(e){}
}
function allPosts(){
  return [...loadAdminPosts(), ...BLOG_POSTS];
}

function estimateReadTime(bodyText){
  const words = bodyText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)) + " min read";
}

function parseBodyText(text){
  return text.split(/\n+/).map(line => line.trim()).filter(Boolean).map(line =>
    line.startsWith("## ") ? { h: line.slice(3) } : { p: line }
  );
}

function initAdminPanel(){
  const toggleBtn = document.getElementById("adminToggleBtn");
  const panel = document.getElementById("adminPanel");
  const gate = document.getElementById("adminGate");
  const editor = document.getElementById("adminEditor");

  toggleBtn.addEventListener("click", () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    if (panel.style.display === "block") panel.scrollIntoView({ behavior:"smooth", block:"center" });
  });

  const unlocked = sessionStorage.getItem("unimatch_admin_unlocked") === "1";
  if (unlocked){ gate.style.display = "none"; editor.style.display = "block"; }

  document.getElementById("adminGateBtn").addEventListener("click", () => {
    const val = document.getElementById("adminPasscodeInput").value;
    if (val === ADMIN_PASSCODE){
      sessionStorage.setItem("unimatch_admin_unlocked", "1");
      gate.style.display = "none";
      editor.style.display = "block";
    } else {
      alert("Incorrect passcode.");
    }
  });

  document.getElementById("postThemeChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    document.querySelectorAll("#postThemeChips .chip").forEach(c=>c.classList.remove("selected","gold"));
    chip.classList.add("selected","gold");
  });

  document.getElementById("publishPostBtn").addEventListener("click", () => {
    const title = document.getElementById("postTitle").value.trim();
    const category = document.getElementById("postCategory").value.trim() || "Guides";
    const excerpt = document.getElementById("postExcerpt").value.trim();
    const bodyText = document.getElementById("postBody").value;
    const coverBig = document.getElementById("postCoverBig").value.trim() || title.slice(0,24);
    const themeChip = document.querySelector("#postThemeChips .chip.selected");
    const theme = themeChip ? themeChip.dataset.theme : "orange";

    if (!title || !excerpt || !bodyText.trim()){
      alert("Please fill in at least a title, excerpt, and body.");
      return;
    }

    const post = {
      id: "local-" + Date.now(),
      title, category, excerpt,
      date: new Date().toISOString().slice(0,10),
      readTime: estimateReadTime(bodyText),
      cover: { kind:"text", big: coverBig, highlight: category, theme },
      body: parseBodyText(bodyText),
      local: true,
    };

    const posts = loadAdminPosts();
    posts.unshift(post);
    saveAdminPosts(posts);

    ["postTitle","postCategory","postExcerpt","postCoverBig","postBody"].forEach(id => document.getElementById(id).value = "");
    renderAdminPostList();
    initBlogFilters();
    renderBlogGrid("All");
  });

  renderAdminPostList();
}

function renderAdminPostList(){
  const posts = loadAdminPosts();
  const box = document.getElementById("adminPostList");
  if (!posts.length){ box.innerHTML = `<p style="font-size:.85rem;color:var(--cream-45);">No locally-published posts yet.</p>`; return; }
  box.innerHTML = `
    <span class="field-label">Your locally-published posts (${posts.length})</span>
    ${posts.map(p => `
      <div class="uni-result-card">
        <div><div class="uni-result-name">${p.title}</div><div class="uni-result-meta">${p.category} · ${formatDate(p.date)}</div></div>
        <button class="btn btn-ghost btn-sm" data-delete="${p.id}">Delete</button>
      </div>`).join("")}
  `;
  box.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => {
      const remaining = loadAdminPosts().filter(p => p.id !== btn.dataset.delete);
      saveAdminPosts(remaining);
      renderAdminPostList();
      initBlogFilters();
      renderBlogGrid("All");
    });
  });
}

function initBlogFilters(){
  const categories = ["All", ...new Set(allPosts().map(p => p.category))];
  const filterWrap = document.getElementById("blogFilters");
  filterWrap.innerHTML = categories.map((c,i) => `<button class="tool-tab ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initBlogFilters();
  document.getElementById("blogFilters").addEventListener("click", e => {
    const btn = e.target.closest(".tool-tab"); if (!btn) return;
    document.querySelectorAll("#blogFilters .tool-tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderBlogGrid(btn.dataset.cat);
  });
  renderBlogGrid("All");
  initAdminPanel();
});
