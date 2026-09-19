# dumonjic.com

Source for [dumonjic.com](https://dumonjic.com), built with [Hugo](https://gohugo.io) and hosted on GitHub Pages.

## Write a new essay

```bash
hugo new content posts/my-new-essay.md   # then edit the file and set draft: false
hugo server                              # preview at http://localhost:1313
```

Give the post `categories: ["memoirs"]` to include it in *Memoirs Beyond the Womb*. Push to `main` and the site rebuilds automatically.

## Add a case study

Case studies live in `content/work/<name>/index.md`. Copy any existing folder, edit the front matter (role, team, timeline, tools, summary, discipline), and write the story under the headings. Drop images next to `index.md`; a file named `cover.jpg` becomes the card image.

- New case studies start with `draft: true`, so they stay off the live site. Set `draft: false` (and delete `placeholder: true`) to publish.
- `featured: true` puts it on the homepage; `weight` sets the order (lower first).
- Preview drafts locally with `hugo server -D`.
- Shortcodes for case-study pages:
  - `{{< compare before="Old copy" after="New copy" >}}` for a before/after comparison (or `before_img="a.png" after_img="b.png"`).
  - `{{< metrics >}}{{< metric value="40%" label="fewer support tickets" >}}{{< /metrics >}}` for results.
- Downloads: list files in the `downloads:` front matter (see the commented example).

Other settings live in `hugo.toml`: `buttondown` (subscribe forms) and `contact_email` (Contact page). Put a resume PDF at `static/alen-dumonjic-resume.pdf` and the Resume page shows a download button.

## How it's put together

- `content/posts/` — essays and portfolio samples, one Markdown file each. URLs stay in the old WordPress format, `/YYYY/MM/DD/slug/`.
- `content/work/` — case studies. `content/*.md` — About, Contact, Resume, Writing, Memoirs, Search.
- `data/testimonials.yaml` — testimonials shown on the homepage and About page.
- `layouts/` and `assets/` — the theme: colors from velvetvowel.substack.com, DM Serif Display headings (self-hosted in `static/fonts/`).
- Search — Hugo writes `/search-index.json` at build time; `assets/js/search.js` searches it in the browser.
- Subscribe forms — set `buttondown = "your-username"` in `hugo.toml` to show them.
- RSS — `/index.xml`, and the same feed at `/feed/` so old subscribers keep working.
