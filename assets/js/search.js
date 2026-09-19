// Client-side search over /search-index.json (built by Hugo from every post and page).
const input = document.getElementById("q");
const status = document.getElementById("search-status");
const results = document.getElementById("search-results");

// Lowercase and drop accents so "Dumonjic" finds "Dumonjić".
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let docs = null;
const load = fetch("/search-index.json")
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then((d) => { docs = d.map((x) => ({ ...x, t: fold(x.title), b: fold(x.body) })); });

function countOf(hay, needle) {
  let n = 0, i = hay.indexOf(needle);
  while (i !== -1) { n++; i = hay.indexOf(needle, i + needle.length); }
  return n;
}

function snippet(doc, terms) {
  // Fold keeps length for the characters we care about, so indexes line up with the original text.
  const at = terms.map((t) => doc.b.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (at === undefined) return doc.body.slice(0, 140) + (doc.body.length > 140 ? "…" : "");
  const start = Math.max(0, at - 60);
  const end = Math.min(doc.body.length, at + 100);
  return (start > 0 ? "…" : "") + doc.body.slice(start, end).trim() + (end < doc.body.length ? "…" : "");
}

function highlight(text, terms) {
  let html = esc(text);
  for (const t of terms) {
    // Match accented and unaccented forms by folding character-by-character.
    const re = new RegExp("(" + t.split("").map((c) => esc(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("") + ")", "gi");
    html = html.replace(re, "<mark>$1</mark>");
  }
  return html;
}

function render(q) {
  const terms = fold(q).split(/\s+/).filter(Boolean);
  if (!terms.length) { results.innerHTML = ""; status.textContent = ""; return; }
  const hits = docs
    .map((d) => {
      let score = 0;
      for (const t of terms) {
        const inTitle = countOf(d.t, t), inBody = countOf(d.b, t);
        if (!inTitle && !inBody) return null;      // every word must match somewhere
        score += inTitle * 10 + Math.min(inBody, 10);
      }
      return { d, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || (a.d.date < b.d.date ? 1 : -1));

  status.textContent = hits.length ? `${hits.length} result${hits.length === 1 ? "" : "s"}` : `No results for “${q}”.`;
  results.innerHTML = hits.slice(0, 30).map(({ d }) => `
    <li>
      <a class="post-title" href="${esc(d.url)}">${highlight(d.title, terms)}</a>
      ${d.date ? `<time datetime="${esc(d.date)}">${esc(d.dateLabel)}</time>` : ""}
      <p class="excerpt">${highlight(snippet(d, terms), terms)}</p>
    </li>`).join("");
}

let timer;
input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const q = input.value.trim();
    history.replaceState(null, "", q ? "?q=" + encodeURIComponent(q) : location.pathname);
    try { await load; render(q); } catch { status.textContent = "Search is unavailable right now."; }
  }, 120);
});

const initial = new URLSearchParams(location.search).get("q");
if (initial) { input.value = initial; input.dispatchEvent(new Event("input")); }
