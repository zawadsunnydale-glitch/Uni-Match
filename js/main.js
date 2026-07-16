/* Shared chrome: header + footer injected so every page stays in sync,
   plus small progressive-enhancement behaviours. */

/* ---------- Google Sign-In ----------
   PHASE 2 NOTE: This uses Google Identity Services' client-side flow, which
   returns a signed ID token straight to the browser — no backend needed for
   the sign-in button itself. BUT the profile below is only ever stored in
   this browser's localStorage. There is no server session, so it won't
   sync across devices and can't gate real server-side content. Wiring up
   persistent accounts needs a backend to verify the ID token and issue a
   real session (e.g. a Netlify Function + a small database).
   To activate: create an OAuth Client ID in Google Cloud Console
   (APIs & Services → Credentials → OAuth Client ID → Web application),
   add your Netlify domain under "Authorized JavaScript origins", and paste
   the client ID below. Client IDs are meant to be public — unlike API
   keys/secrets, this one is safe to ship in frontend code. */
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";

function decodeJwt(token){
  try { return JSON.parse(atob(token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))); }
  catch(e){ return null; }
}

function getSavedUser(){
  try { return JSON.parse(localStorage.getItem("unimatch_user") || "null"); } catch(e){ return null; }
}

function handleGoogleCredential(response){
  const payload = decodeJwt(response.credential);
  if (!payload) return;
  const user = { name: payload.name, email: payload.email, picture: payload.picture };
  try { localStorage.setItem("unimatch_user", JSON.stringify(user)); } catch(e){}
  renderSignInState();
}

function signOut(){
  try { localStorage.removeItem("unimatch_user"); } catch(e){}
  renderSignInState();
}

function renderSignInState(){
  const slot = document.getElementById("signInSlot");
  if (!slot) return;
  const user = getSavedUser();
  const configured = GOOGLE_CLIENT_ID.indexOf("YOUR_GOOGLE_OAUTH_CLIENT_ID") === -1;

  if (user){
    slot.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="signOutBtn" style="gap:8px;">
        <img src="${user.picture}" alt="" style="width:20px;height:20px;border-radius:50%;">
        ${user.name.split(" ")[0]} · Sign out
      </button>`;
    const signOutBtn = document.getElementById("signOutBtn");
    if (signOutBtn) signOutBtn.addEventListener("click", signOut);
    return;
  }

  if (!configured){
    slot.innerHTML = `<button class="btn btn-ghost btn-sm" id="signInBtn">Sign In</button>`;
    const signInBtn = document.getElementById("signInBtn");
    if (signInBtn) {
      signInBtn.addEventListener("click", () => {
        alert("Google Sign-In isn't configured yet.\n\nTo turn this on: create an OAuth Client ID in Google Cloud Console (APIs & Services → Credentials → OAuth Client ID → Web application), add your Netlify domain under Authorized JavaScript origins, then paste the Client ID into GOOGLE_CLIENT_ID at the top of js/main.js.\n\nNote: this gives client-side sign-in only — persistent accounts still need a backend.");
      });
    }
    return;
  }

  slot.innerHTML = `<div id="googleBtnContainer"></div>`;
  if (window.google && window.google.accounts && window.google.accounts.id){
    window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleCredential });
    window.google.accounts.id.renderButton(document.getElementById("googleBtnContainer"), { theme: "outline", size: "medium", shape: "pill" });
  }
}

function loadGoogleIdentityScript(){
  if (GOOGLE_CLIENT_ID.indexOf("YOUR_GOOGLE_OAUTH_CLIENT_ID") !== -1) return;
  if (document.getElementById("google-identity-script")) return;
  const s = document.createElement("script");
  s.src = "https://accounts.google.com/gsi/client";
  s.async = true;
  s.defer = true;
  s.id = "google-identity-script";
  s.onload = renderSignInState;
  document.head.appendChild(s);
}

function renderHeader(active){
  const links = [
    { href:"index.html", label:"Home", key:"home" },
    { href:"tools.html", label:"Tools", key:"tools" },
    { href:"rankings.html", label:"Rankings", key:"rankings" },
    { href:"visa.html", label:"Visa Hub", key:"visa" },
    { href:"blog.html", label:"Blog", key:"blog" },
  ];
  const nav = links.map(l => `<a href="${l.href}" class="${l.key===active?'active':''}">${l.label}</a>`).join("");
  return `
  <header class="site-header">
    <div class="wrap">
      <a href="index.html" class="brand">
        <span class="brand-mark">UM</span>
        UniMatch
      </a>
      <nav class="main-nav" aria-label="Primary">
        ${nav}
      </nav>
      <div class="header-actions">
        <span id="signInSlot"></span>
        <a href="admissions.html" class="btn btn-primary btn-sm btn-shine">Get Started</a>
        <button class="nav-toggle" aria-label="Open menu" id="navToggle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <div id="mobileNav" style="display:none;border-top:1px solid var(--line);background:var(--parchment);">
      <div class="wrap" style="padding:18px 20px;display:flex;flex-direction:column;gap:16px;">
        ${links.map(l=>`<a href="${l.href}" style="font-weight:600;">${l.label}</a>`).join("")}
      </div>
    </div>
  </header>`;
}

function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand"><span class="brand-mark">UM</span>UniMatch</div>
          <p class="footer-desc">AI-assisted university matching for students everywhere — free, transparent, and built around local curriculums like HSC, Madrasha, and A-Levels.</p>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            <li><a href="tools.html#quiz">Quick Match Quiz</a></li>
            <li><a href="tools.html#cost">Cost Calculator</a></li>
            <li><a href="tools.html#eligibility">Eligibility Checker</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="rankings.html">Global Rankings</a></li>
            <li><a href="visa.html">Visa Information</a></li>
            <li><a href="tools.html#career">Career Mapping</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Curriculums</h4>
          <ul>
            <li><a href="tools.html#eligibility">National (HSC)</a></li>
            <li><a href="tools.html#eligibility">Madrasha Board</a></li>
            <li><a href="tools.html#eligibility">A-Levels</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 UniMatch. All tools 100% free.</span>
        <span>Built for HSC · Madrasha · A-Level students</span>
      </div>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = renderHeader(headerMount.dataset.active || "");
  if (footerMount) footerMount.outerHTML = renderFooter();

  renderSignInState();
  loadGoogleIdentityScript();

  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav){
    toggle.addEventListener("click", () => {
      mobileNav.style.display = mobileNav.style.display === "none" ? "block" : "none";
    });
  }

  // scroll reveal
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold:0.12 });
    items.forEach(i=>io.observe(i));
  } else {
    items.forEach(i=>i.classList.add("in"));
  }
});
