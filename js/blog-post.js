document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("post");
  let localPosts = [];
  try { localPosts = JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){}
  const combined = [...localPosts, ...BLOG_POSTS];
  const post = combined.find(p => p.id === id) || combined[0];

  document.getElementById("postTitleTag").textContent = post.title + " — UniMatch Blog";
  document.getElementById("postMetaDesc").setAttribute("content", post.excerpt);

  const bodyHtml = post.body.map(block => block.h ? `<h3>${block.h}</h3>` : `<p>${block.p}</p>`).join("");

  document.getElementById("postContent").innerHTML = `
    <div class="blog-post-hero reveal">
      <div class="blog-post-cover ${'blog-cover'} theme-${post.cover.theme}" style="display:flex;align-items:flex-end;padding:30px;">
        <span class="blog-cover-category">${post.category}</span>
      </div>
      <div class="blog-post-meta-row">
        <span class="eyebrow">${post.category}</span>
        <span class="mono-num" style="color:var(--cream-45);font-size:.8rem;">${new Date(post.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})} · ${post.readTime}</span>
      </div>
      <h1 class="blog-post-title">${post.title}</h1>
    </div>
    <div class="blog-post-body reveal">${bodyHtml}</div>
  `;

  const related = combined.filter(p => p.id !== post.id && p.category === post.category).slice(0,3);
  const fallback = related.length ? related : combined.filter(p => p.id !== post.id).slice(0,3);
  document.getElementById("relatedGrid").innerHTML = fallback.map(p => `
    <a href="blog-post.html?post=${p.id}" class="blog-card">
      <div class="blog-cover theme-${p.cover.theme}">
        <span class="blog-cover-category">${p.category}</span>
        ${p.cover.kind === "number"
          ? `<div class="blog-cover-num">${p.cover.big}</div><div class="blog-cover-label">${p.cover.label}</div>`
          : `<div class="blog-cover-big">${p.cover.big} <span class="blog-cover-highlight">${p.cover.highlight}</span></div>`}
      </div>
      <div class="blog-card-body">
        <div class="blog-card-title">${p.title}</div>
        <div class="blog-card-meta"><span>${p.readTime}</span></div>
      </div>
    </a>`).join("");

  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
});
