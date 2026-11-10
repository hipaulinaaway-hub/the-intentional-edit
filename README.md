# The Intentional Edit

Home page for The Intentional Edit, built from the Figma design.

## How it's organised

- `content/home.json` — all editable text and images. Edited through **Pages CMS** (config in `.pages.yml`).
- `src/index.html` — the page template (layout and styles), with `{{placeholders}}` for the content.
- `build.js` — fills the template with the content and writes `public/index.html`. No dependencies.
- `public/assets/` — images. New uploads from Pages CMS land here.
- `wrangler.jsonc` — Cloudflare Workers config. Runs `node build.js`, then serves `public/`.

`public/index.html` is generated, so it isn't committed.

## Editing

Edit content at [app.pagescms.org](https://app.pagescms.org). Each save is a commit to `main`, and Cloudflare redeploys automatically.

## Local preview

```
node build.js
npx serve public
```
