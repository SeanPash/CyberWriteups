(() => {
  "use strict";

  // main.js lives in assets/js/. Its URL supplies the correct root at any hosting path.
  const root = new URL("../../", document.currentScript.src);
  const { categories, writeups } = window.SITE_DATA;
  const siteURL = (path) => new URL(path, root).href;
  const currentPath = location.pathname.replace(/index\.html$/, "");
  const isCurrent = (path) => new URL(siteURL(path)).pathname === currentPath;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const link = (path, title, className = "") => `<a class="${className}" href="${siteURL(path)}"${isCurrent(path) ? ' aria-current="page"' : ""}>${escapeHTML(title)}</a>`;
  const byDate = (items) => [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  function categoryNavigation(category) {
    const items = writeups.filter((entry) => entry.collection === category.id);
    const years = [...new Set(items.map((entry) => entry.year))].sort().reverse();
    const active = currentPath.startsWith(new URL(siteURL(category.url)).pathname);
    return `<details class="nav-group"${active ? " open" : ""}>
      <summary>${escapeHTML(category.navTitle || category.title)}</summary>
      <div class="nav-children">
        ${link(category.url, "All " + category.title)}
        ${years.map((year) => `<details class="nav-year"${items.some((entry) => entry.year === year && isCurrent(entry.url)) ? " open" : ""}>
          <summary>${escapeHTML(year)}</summary>
          ${items.filter((entry) => entry.year === year).map((entry) => link(entry.url, entry.title)).join("")}
        </details>`).join("")}
        ${items.length ? "" : '<span class="nav-empty">Coming soon</span>'}
      </div>
    </details>`;
  }

  document.getElementById("site-shell").innerHTML = `
    <aside class="sidebar" id="sidebar" aria-label="Site navigation">
      <a class="brand" href="${siteURL("")}">Sean's CTF Writeups</a>
      <nav class="site-nav" aria-label="Main">${link("", "Home", "home-link")}${categories.map(categoryNavigation).join("")}</nav>
    </aside>
    <button class="menu-backdrop" type="button" aria-label="Close navigation" tabindex="-1" hidden></button>
    <header class="topbar">
      <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="sidebar">☰ <span>Menu</span></button>
      <div class="search-area">
        <form role="search" class="search-form">
          <label class="sr-only" for="site-search">Search writeups</label>
          <span class="search-icon" aria-hidden="true"></span>
          <input id="site-search" type="search" placeholder="Search writeups…" autocomplete="off" aria-controls="search-results" aria-describedby="search-status">
          <kbd class="search-shortcut" aria-hidden="true">/</kbd>
        </form>
        <section class="search-results" id="search-results" aria-label="Search results" hidden>
          <p class="search-status" id="search-status" role="status" aria-live="polite"></p>
          <ul class="search-list"></ul>
        </section>
      </div>
    </header>`;

  function entryList(items) {
    return `<ul class="entry-list">${byDate(items).map((entry) => `<li>
      <div>${link(entry.url, entry.title, "entry-title")}<p>${escapeHTML(entry.description)}</p>
        <div class="entry-meta">${escapeHTML(entry.event)} <span aria-hidden="true">/</span> ${escapeHTML(entry.year)} <span aria-hidden="true">/</span> ${escapeHTML(entry.category)}</div>
      </div>
      <div class="entry-status">${entry.template ? '<span class="badge">Template</span>' : `<time datetime="${escapeHTML(entry.date || "")}">${escapeHTML(entry.date || "Undated")}</time>`}<span class="entry-arrow" aria-hidden="true">↗</span></div>
    </li>`).join("")}</ul>`;
  }

  const cards = document.getElementById("category-cards");
  if (cards) {
    cards.innerHTML = categories.map((category) => {
      const count = writeups.filter((entry) => entry.collection === category.id && !entry.template).length;
      return `<a class="category-card" href="${siteURL(category.url)}">
        <h3>${escapeHTML(category.title)} <span aria-hidden="true">↗</span></h3>
        <p>${escapeHTML(category.description)}</p><span class="card-meta">${count ? `${count} writeup${count === 1 ? "" : "s"}` : "Coming soon"}</span>
      </a>`;
    }).join("");
  }
  const recent = document.getElementById("recent-writeups");
  if (recent) recent.innerHTML = entryList(byDate(writeups).slice(0, 5));

  const collection = document.querySelector("[data-collection]");
  if (collection) {
    const items = writeups.filter((entry) => entry.collection === collection.dataset.collection);
    const years = [...new Set(items.map((entry) => entry.year))].sort().reverse();
    collection.innerHTML = years.map((year) => `<section aria-labelledby="year-${escapeHTML(year)}"><h2 id="year-${escapeHTML(year)}">${escapeHTML(year)}</h2>${entryList(items.filter((entry) => entry.year === year))}</section>`).join("") || '<div class="empty-state"><h2>Coming soon</h2></div>';
  }

  const toc = document.getElementById("page-toc");
  if (toc) {
    toc.innerHTML = '<span class="sidebar-label">On this page</span>' + [...document.querySelectorAll("article h2[id]")].map((heading) => `<a href="#${heading.id}">${escapeHTML(heading.textContent)}</a>`).join("");
  }

  const menuButton = document.querySelector(".menu-toggle");
  const backdrop = document.querySelector(".menu-backdrop");
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const searchArea = document.querySelector(".search-area");
  function setMenu(open, restoreFocus = false) {
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
    main.inert = open;
    searchArea.inert = open;
    if (matchMedia("(max-width: 1099px)").matches) sidebar.inert = !open;
    if (open) sidebar.querySelector("a").focus();
    else if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  backdrop.addEventListener("click", () => setMenu(false, true));
  const mobile = matchMedia("(max-width: 1099px)");
  const resetMenu = () => {
    setMenu(false);
    sidebar.inert = mobile.matches;
  };
  mobile.addEventListener("change", resetMenu);
  resetMenu();

  const search = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  const status = document.getElementById("search-status");
  const resultList = document.querySelector(".search-list");
  function showSearch() {
    const tokens = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    results.hidden = tokens.length === 0;
    resultList.replaceChildren();
    if (!tokens.length) {
      status.textContent = "";
      return;
    }
    const matches = writeups.filter((entry) => {
      const text = [entry.title, entry.event, entry.category, entry.year, entry.description, ...entry.tags].join(" ").toLowerCase();
      return tokens.every((token) => text.includes(token));
    });
    status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "No writeups found. Try a different keyword.";
    resultList.innerHTML = matches.map((entry) => `<li><a href="${siteURL(entry.url)}"><strong>${escapeHTML(entry.title)}${entry.template ? ' <span class="badge">Template</span>' : ""}</strong><span>${escapeHTML(entry.event)} · ${escapeHTML(entry.category)} · ${escapeHTML(entry.year)}</span></a></li>`).join("");
  }
  document.querySelector(".search-form").addEventListener("submit", (event) => { event.preventDefault(); showSearch(); });
  search.addEventListener("input", showSearch);
  search.addEventListener("focus", showSearch);
  search.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" && !results.hidden) {
      const first = resultList.querySelector("a");
      if (first) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-area")) results.hidden = true;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!results.hidden) { search.focus(); results.hidden = true; }
      if (document.body.classList.contains("menu-open")) setMenu(false, true);
    }
    if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !event.target.closest("input, textarea, select, [contenteditable]")) {
      event.preventDefault();
      setMenu(false);
      search.focus();
    }
    // Keep keyboard navigation inside the open mobile drawer and its close button.
    if (event.key === "Tab" && document.body.classList.contains("menu-open")) {
      const targets = [...sidebar.querySelectorAll("a, summary"), menuButton].filter((element) => element.getClientRects().length);
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
