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

function allPosts(){
  let local = [];
  try { local = JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){}
  const base = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
  return [...local, ...base];
}

function loadAdminPosts(){
  try { return JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){ return []; }
}
function saveAdminPosts(arr){
  try { localStorage.setItem("unimatch_admin_posts", JSON.stringify(arr)); } catch(e){}
}

function renderBlogGrid(filterCategory){
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  const posts = allPosts().filter(p => !filterCategory || filterCategory === "All" || p.category === filterCategory)
                           .sort((a,b) => new Date(b.date) - new Date(a.date));
  grid.innerHTML = posts.map(p => `
    <a href="blog-post.html?post=${p.id}" class="blog-card">
      ${renderBlogCover(p)}
      <div class="blog-card-body">
        <div class="blog-card-title">${p.title}${p.local ? ' <span class="badge">Local</span>':''}</div>
        <div class="blog-card-meta">${p.category} · ${formatDate(p.date)}</div>
      </div>
    </a>
  `).join("");
}

function renderAdminPostList(){
  const box = document.getElementById("adminPostList");
  if (!box) return;
  const posts = loadAdminPosts();
  if (!posts.length){ box.innerHTML = `<p style="color:var(--cream-45);">No custom local-published posts yet.</p>`; return; }
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
  const filterWrap = document.getElementById("blogFilters");
  if (!filterWrap) return;
  const categories = ["All", ...new Set(allPosts().map(p => p.category))];
  filterWrap.innerHTML = categories.map((c,i) => `<button class="tool-tab ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("blogFilters")) {
    initBlogFilters();
    document.getElementById("blogFilters").addEventListener("click", e => {
      const btn = e.target.closest(".tool-tab"); if (!btn) return;
      document.querySelectorAll("#blogFilters .tool-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderBlogGrid(btn.dataset.cat);
    });
  }
  renderBlogGrid("All");
  renderAdminPostList();
});
