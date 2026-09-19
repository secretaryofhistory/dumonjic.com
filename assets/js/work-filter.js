// Filters the work grid by discipline. Without JavaScript, every project simply stays visible.
const wrap = document.querySelector("[data-filters]");
const cards = [...document.querySelectorAll("#work-grid .card")];
if (wrap) {
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    const want = btn.dataset.filter;
    wrap.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    cards.forEach((c) => { c.hidden = want !== "" && c.dataset.discipline !== want; });
  });
}
