# dumonjic.com

Source for [dumonjic.com](https://dumonjic.com), built with [Hugo](https://gohugo.io) and hosted on GitHub Pages.

## Write a new essay

```bash
hugo new content posts/my-new-essay.md   # then edit the file and set draft: false
hugo server                              # preview at http://localhost:1313
```

Give the post `categories: ["memoirs"]` to include it in *Memoirs Beyond the Womb*. Push to `main` and the site rebuilds automatically.

## How it's put together

- `content/posts/` — essays and portfolio samples, one Markdown file each. URLs stay in the old WordPress format, `/YYYY/MM/DD/slug/`.
- `content/*.md` — Professional Writing, Creative Writing, Memoirs, Search.
- `layouts/` and `assets/` — the theme: colors from velvetvowel.substack.com, DM Serif Display headings (self-hosted in `static/fonts/`).
- Search — Hugo writes `/search-index.json` at build time; `assets/js/search.js` searches it in the browser.
- Subscribe forms — set `buttondown = "your-username"` in `hugo.toml` to show them.
- RSS — `/index.xml`, and the same feed at `/feed/` so old subscribers keep working.
