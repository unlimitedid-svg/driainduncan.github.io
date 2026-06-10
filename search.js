/* Site search — instant client-side search across all pages */
(function() {
  // Inject HTML for the search button and overlay
  const html = `
    <button id="search-btn" aria-label="Search site" title="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
    </button>
    <div id="search-overlay" aria-hidden="true">
      <div class="search-box">
        <div class="search-input-wrap">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
          <input type="text" id="search-input" placeholder="Search the site…" autocomplete="off">
          <button id="search-close" aria-label="Close search">✕</button>
        </div>
        <div id="search-results"></div>
        <div class="search-hint">Press <kbd>Esc</kbd> to close</div>
      </div>
    </div>
  `;
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  // Place button in the nav
  const nav = document.querySelector('nav');
  const btn = document.getElementById('search-btn');
  const navBtn = nav.querySelector('.btn-nav');
  if (nav && navBtn) {
    nav.insertBefore(btn, navBtn);
  }

  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const closeBtn = document.getElementById('search-close');

  function open() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    input.value = '';
    results.innerHTML = '';
  }

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    // Cmd/Ctrl+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open();
    }
  });

  // Highlight matches in snippet
  function highlight(text, terms) {
    let result = text;
    terms.forEach(t => {
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    });
    return result;
  }

  // Find best snippet (sentence containing first match)
  function snippet(body, terms) {
    if (!body) return '';
    const lower = body.toLowerCase();
    let pos = -1;
    for (const t of terms) {
      const p = lower.indexOf(t);
      if (p >= 0 && (pos < 0 || p < pos)) pos = p;
    }
    if (pos < 0) return body.substring(0, 160) + '…';
    const start = Math.max(0, pos - 60);
    const end = Math.min(body.length, pos + 140);
    let s = body.substring(start, end);
    if (start > 0) s = '…' + s;
    if (end < body.length) s = s + '…';
    return s;
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) {
      results.innerHTML = '<div class="search-empty">Start typing to search across the site.</div>';
      return;
    }
    const terms = q.split(/\s+/).filter(Boolean);
    const index = window.SEARCH_INDEX || [];
    const scored = [];

    index.forEach(page => {
      const title = (page.title || '').toLowerCase();
      const h1 = (page.h1 || '').toLowerCase();
      const lede = (page.lede || '').toLowerCase();
      const body = (page.body || '').toLowerCase();
      let score = 0;
      terms.forEach(t => {
        if (title.includes(t)) score += 10;
        if (h1.includes(t)) score += 8;
        if (lede.includes(t)) score += 4;
        // count body occurrences
        let count = 0;
        let p = 0;
        while ((p = body.indexOf(t, p)) >= 0) { count++; p += t.length; if (count > 8) break; }
        score += count;
      });
      if (score > 0) scored.push({ page, score });
    });

    scored.sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      results.innerHTML = '<div class="search-empty">No results for "<strong>' + query + '</strong>".</div>';
      return;
    }

    results.innerHTML = scored.slice(0, 12).map(({ page }) => {
      const sn = snippet(page.body, terms);
      return `
        <a href="${page.url}" class="search-result">
          <div class="search-result-title">${highlight(page.title, terms)}</div>
          <div class="search-result-snippet">${highlight(sn, terms)}</div>
          <div class="search-result-url">${page.url}</div>
        </a>`;
    }).join('');
  }

  let timer;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => search(e.target.value), 80);
  });
})();
