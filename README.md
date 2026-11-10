# The Intentional Edit

Static HTML build of the Home page from the Figma file *The Intentional Edit*.

- `public/` — the site (`index.html` + `assets/`). Open `public/index.html` in a browser to view it locally.
- `wrangler.jsonc` — Cloudflare Workers config that serves `public/` as static assets.

Deploys to Cloudflare automatically on every push to `main` (deploy command: `npx wrangler deploy`, no build command).
