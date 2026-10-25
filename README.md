# Sean's CTF Writeups

A static, dark-mode technical wiki for cybersecurity competitions, CTFs, labs, and challenges. Built with HTML, CSS, and vanilla JavaScript for GitHub Pages. There are no packages, build steps, servers, external fonts, analytics, or runtime dependencies.

**This initial version contains only the site framework and a clearly labeled template. There are no real challenge writeups yet.**

## Directory structure

```text
.
├── .gitignore
├── .nojekyll
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── screenshot-placeholder.svg
│   └── js/
│       ├── writeups.js
│       └── main.js
└── writeups/
    ├── cyberquest/
    │   ├── index.html
    │   └── 2026/
    │       └── example-writeup/
    │           └── index.html
    ├── ncl/
    │   └── index.html
    ├── faust/
    │   └── index.html
    └── misc/
        └── index.html
```

## How it works

- `index.html` is the home page. Each collection has its own `index.html` with an empty state or a list of entries grouped by year.
- `assets/js/writeups.js` is the manually maintained index. Its categories and writeups drive the sidebar, search, collection cards, category lists, and five most recent entries. Real writeups are ordered by ISO date, newest first; the undated template appears last. Collection counts exclude templates.
- `assets/js/main.js` renders the common sidebar and search header, marks the current page, creates the article contents list, and handles the mobile menu. Expand the category and year triangles to see nested entries.
- Search runs entirely in the browser. It matches title, event, category, year, description, and tags, without fetching article contents. All space-separated search terms must match; matching is case insensitive. Press `/` to focus search, use `↓` to enter results, and press Escape to dismiss. Tab and Enter also work. Clearing the field hides results.
- `assets/css/style.css` contains the colors, typography, layout, responsive rules, and print styles. Below 1100px, the sidebar becomes a menu so tablets and small laptops keep a full-width content area. Cards use one column below 600px, two columns at intermediate widths, and four from 1480px. The article table of contents appears from 1480px, when there is room beside the article. The main region grows to 1400px, or 1680px on ultrawide screens; paragraphs stay within 54rem while tables and code can use the wider article grid.
- Writeup content is ordinary HTML. It remains readable without JavaScript; each page includes fallback navigation. Search and the shared sidebar require JavaScript. Keep fallback HTML links up to date if you want new entries to be discoverable with JavaScript disabled.
- `.nojekyll` tells GitHub Pages to serve these static files without Jekyll processing. No build output folder or custom deployment workflow is needed.
- `.gitignore` excludes local agent metadata, credentials/tooling directories, environment files, editor settings, caches, dependencies, and temporary output. Website files remain trackable.

The template's tags include `grep`, `log analysis`, `windows`, `ncl`, `web`, and `forensics` solely to exercise search. These are demonstration metadata, not claims about a real solution. Replace them with accurate tags in real entries.

## Preview locally

From the repository root, with Python 3 installed:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open <http://localhost:8080/>. On Windows, `py -m http.server 8080 --bind 127.0.0.1` is an alternative. Stop the server with Ctrl+C. Python is only a convenient preview tool; GitHub Pages does not need Python.

Opening `index.html` directly also works with the relative assets and classic scripts, but an HTTP preview is a closer match to GitHub Pages. In a file preview, explicitly open nested `index.html` files rather than relying on directory URLs.

To check the repository subpath behavior, start the server from the directory **above** this repository:

```bash
cd ..
python3 -m http.server 8001 --bind 127.0.0.1
```

Then visit <http://localhost:8001/CyberWriteups/> (adjust capitalization and folder name to match your checkout). Check a deeply nested template, the sidebar, and search from there too.

## Create the first real writeup

Keep the reusable example at `writeups/cyberquest/2026/example-writeup/index.html`. Copy it to a new folder when real content is ready. For example, from the repository root:

```bash
mkdir -p writeups/cyberquest/2026/your-writeup-slug
cp writeups/cyberquest/2026/example-writeup/index.html \
   writeups/cyberquest/2026/your-writeup-slug/index.html
```

Use lowercase folder names with hyphens. The usual structure is `writeups/<collection>/<year>/<slug>/index.html`; you can use a year/event name for the grouping if that suits a competition better.

1. Edit the copied page's `<title>`, description meta tag, `<h1>`, short description, and metadata.
2. Replace the bracketed sections with your real content. Remove the template-only info box, image demonstration code, and template footer label. Keep useful notes, tables, code blocks, and lessons learned as needed.
3. Update the breadcrumbs and “Back to” link for the collection and year. The year breadcrumb points to `#year-2026` on the collection page; there is no separate year page. Use the exact grouping value from the entry's `year` field in that anchor.
4. Keep the section IDs unique and update any links if you rename them. Headings in the contents list come from `article h2[id]` automatically.
5. Check the asset paths if you changed directory depth (see below).
6. Add the entry to `assets/js/writeups.js` as described next. That one metadata edit updates the shared navigation, search, recent list, and category listing.
7. Preview the page on desktop and mobile, check search and links, then commit and push when ready.

The template demonstrates overview, challenge, investigation, commands, output, findings, lessons learned, lists, inline code, a table, an image, and info/note/warning callouts. Optional `.tag` labels use compact blue styling; apply `.difficulty-easy`, `.difficulty-medium`, or `.difficulty-hard` to difficulty text only for semantic green, yellow, or red. Write literal `<` and `&` in code examples as `&lt;` and `&amp;` so the browser displays them correctly.

## Add a search/navigation entry

Add an object to the `writeups` array in `assets/js/writeups.js`. Put a comma between objects. Replace these placeholder values with the real metadata:

```javascript
{
  title: "Writeup Title",
  event: "[Event]",
  collection: "cyberquest",
  year: "2026",
  category: "[Challenge category]",
  date: "2026-01-01", // Replace with the real date in YYYY-MM-DD form.
  tags: ["replace-with-actual-tags"],
  url: "writeups/cyberquest/2026/your-writeup-slug/",
  description: "[Short description]",
  template: false
}
```

`collection` must match a category ID: `cyberquest`, `ncl`, `faust`, or `misc`. `category` is the challenge topic, such as forensics, and is separate from the navigation collection. `year` supplies the sidebar and category-page grouping. Set `template: true` only for demonstration entries. Use a real ISO date on published entries; the reusable template intentionally has `date: null`.

No separate sidebar entry is necessary. To add a whole new collection, add a category object to the same file, copy an existing category page, and change its title, description, breadcrumbs, and `data-collection` value. Update the home fallback links and other pages' `<noscript>` navigation if you add a collection.

You can remove the template object from the `writeups` array once you no longer want it listed; keep the HTML file available for copying. The template is ordinary public HTML and is not a draft/private storage area.

## Screenshots and images

Keep screenshots with the writeup they belong to:

```text
writeups/cyberquest/2026/your-writeup-slug/
├── index.html
└── images/
    ├── screenshot.png
    └── diagram.svg
```

Use paths such as `images/screenshot.png` within that writeup. Include descriptive `alt` text and a caption explaining the evidence. The stylesheet scales images to the content width. Put shared images in `assets/images/`. The only initial image is a generic, locally stored SVG placeholder.

## Relative links and GitHub Pages base paths

There is **no hardcoded domain, repository name, or `<base>` element** in the site. Avoid leading slashes such as `/assets/css/style.css`: those resolve from the domain root and lose the repository prefix on a project site.

There are two conventions:

1. **HTML uses paths relative to the current page.** At the home page, use `assets/css/style.css`. A category page is two folders deep, so use `../../assets/css/style.css`. A writeup under `writeups/cyberquest/2026/slug/` is four folders deep, so use `../../../../assets/css/style.css`. Apply the same prefix to both script tags and other shared assets. If adding an extra event folder, add another `../` to root-bound links.
2. **Metadata uses paths relative to the site root, without a leading slash.** For example, `writeups/ncl/2026/slug/`. `main.js` derives the site root by resolving `../../` from its own `assets/js/main.js` URL, then resolves every generated URL against it. This preserves a project prefix without configuration. Keep the shared script at that location.

Within a four-level writeup, `../../../../index.html` goes home, `../../` goes to its collection, and `../../../ncl/` goes to the NCL collection. Local section links use `#investigation`. Use directory URLs with a trailing slash for metadata entries; each directory must contain `index.html`. Filenames and paths are case sensitive on GitHub Pages.

GitHub's two default site URL forms are:

| Site type | Repository name | Default address |
| --- | --- | --- |
| User site | `username.github.io` | `https://username.github.io/` |
| Project site | Any other repository, such as `CyberWriteups` | `https://username.github.io/CyberWriteups/` |

The account and repository names above are examples. This repository does not assume a custom domain or configure one. Both URL forms work with this relative-path approach. See [GitHub's explanation of site types](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## Enable GitHub Pages

After committing and pushing the website to `main`:

1. Open the repository on GitHub and select **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **main** and the folder to **/ (root)**.
4. Click **Save**. Leave **Custom domain** blank unless you deliberately configure one later.
5. Wait for the Pages deployment to finish. Use the site URL shown in Settings → Pages to check the home page, a collection, and the nested template.

Do not select `/docs` or point Pages at `writeups/`: `index.html`, `.nojekyll`, and `assets/` live at the repository root. No custom GitHub Actions YAML, installation command, or build command is required. GitHub handles the Pages deployment internally. See [GitHub's publishing source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Commit and push when ready

No commit or push is performed automatically. Review the intended files first:

```bash
git status --short
git diff -- README.md
git add .gitignore .nojekyll README.md index.html assets/ writeups/
git diff --cached --stat
git diff --cached
git commit -m "Add static CTF writeup wiki framework"
git push origin main
```

Future writeups follow the same simple workflow: create the HTML page, add its metadata, commit, push, and let GitHub Pages update.

Local repository preferences are saved in the ignored `AGENTS.md`: never commit or push without your explicit consent, and never add Codex coauthor attribution. That file and the ignored tooling directories are development-only and are not part of the website. `.gitignore` does not untrack previously committed files; always review the staged diff before committing.
