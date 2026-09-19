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
- **At a glance and one-page summary:** fill in the `snapshot:` block (`problem`, `did`, and an optional headline `result` such as "40%" with `resultLabel`). It becomes the "At a glance" card and a printable summary at `/work/<name>/summary.html`. On that page, "Print or save as PDF" produces a clean, light one-pager. Empty fields are hidden.

## Anonymize by default

Write every case study as if a stranger will read it, because the GitHub repo is public.

- Describe the company instead of naming it: `org: "Series B education-technology company"`.
- Replace product names, feature names, customer names, and people's names with descriptors.
- Round or index numbers if exact figures are sensitive (for example "about 40%").
- Blur or redraw screenshots; check text inside images, browser tabs, URLs, and file names.
- Keep `confidential: true`; it adds "Some details are anonymized. More are available on request."

`hugo new content work/my-project/index.md` starts a new case study from an anonymized template.

## Unlisted case studies (shared by link)

For work you'd rather not broadcast, create a case study at a secret URL:

```bash
scripts/new-unlisted.sh "Title of the case study" "UX writing"
```

It prints a private link like `https://dumonjic.com/u/<20 random characters>/`. The page is published there but left out of the menu, the Work page, search, the RSS feed, the sitemap, and `robots.txt`, and it tells search engines not to index it. Set `draft: false` to publish it, then send the link to specific people. To revoke it, change the `url:` in its front matter (or delete the folder) and push.

**Unlisted is not secret.** Anyone who has the link can read it, links can be forwarded, and the source file lives in the public GitHub repo, where anyone can browse it. Only put anonymized material in an unlisted page. GitHub Pages needs a public repo on the free plan, so genuinely confidential material shouldn't go on this site at all.

## Settings

The rewrite showcase near the top of the homepage lives in `content/_index.md` under `craft:`. Replace it with a real project (anonymized) and set `illustrative: false` to remove the "Illustrative example" label.

Other settings live in `hugo.toml`: `buttondown` (subscribe forms). Put a resume PDF at `static/alen-dumonjic-resume.pdf` and the Resume page shows a download button.

## How it's put together

- `content/posts/` — essays and portfolio samples, one Markdown file each. URLs stay in the old WordPress format, `/YYYY/MM/DD/slug/`.
- `content/work/` — case studies. `content/*.md` — About, Contact, Resume, Writing, Memoirs, Search.
- `data/testimonials.yaml` — testimonials shown on the homepage and About page.
- `layouts/` and `assets/` — the theme: colors from velvetvowel.substack.com, DM Serif Display headings (self-hosted in `static/fonts/`).
- Search — Hugo writes `/search-index.json` at build time; `assets/js/search.js` searches it in the browser.
- Subscribe forms — set `buttondown = "your-username"` in `hugo.toml` to show them.
- RSS — `/index.xml`, and the same feed at `/feed/` so old subscribers keep working.
