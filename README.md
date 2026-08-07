# Elitedom — Coming Soon

Cinematic pre-launch experience for `elitedom.store`.

This repository is intentionally separate from the production commerce platform. Its only job is to keep the public domain fast, branded, mysterious, and useful while the full Elitedom storefront is still behind the curtain.

## Experience

- Dark Elitedom launch identity with the supplied shield mark.
- Pure-CSS hardware teaser scene — no runtime dependency on external product-image hosts.
- Cursor-controlled spotlight that reveals only small portions of the hardware scene.
- Scan lines, particles, grid/noise layers, cursor glow, 3D tilt cards, magnetic CTA, reveal-on-scroll and terminal effects.
- Mystery-first copy: no Paymob/Odoo/ERP implementation details are exposed on the public teaser.
- English / Arabic toggle with RTL handling.
- Mobile-specific animated reveal behavior.
- Reduced-motion accessibility fallback.
- Social sharing artwork at `assets/og-elitedom.svg`.
- Static HTML/CSS/JS only: fast cold starts and easy deployment.

## Files

- `index.html` — teaser structure, SEO/OpenGraph metadata and launch copy.
- `styles.css` — original visual-system layer.
- `teaser.css` — cinematic teaser overrides and pure-CSS hardware scene.
- `teaser.js` — language toggle, spotlight tracking, particles, reveal and interaction logic.
- `assets/logo-mark.png` — local Elitedom shield asset.
- `assets/og-elitedom.svg` — 1200×630 social sharing artwork.
- `assets/logo-mark.svg` — lightweight legacy mark kept for compatibility.
- `vercel.json` — static deployment/security headers.

## Deploy

### Vercel

1. Import `mhmdwaelanwr/elitedom-coming-soon`.
2. Framework preset: **Other**.
3. Root directory: repository root.
4. Build command: leave empty.
5. Output directory: leave empty.
6. Production branch: **main** with automatic Git deployments enabled.
7. Add `elitedom.store` and `www.elitedom.store` to the project domains.
8. Point the domain DNS to the values Vercel displays.

The repository is also compatible with Cloudflare Pages, Netlify, GitHub Pages, Nginx, or any static host.

## Canonical product source

The full platform lives in:

`mhmdwaelanwr/elitedom-erp-architecture-main`

The teaser intentionally borrows the production storefront's dark/cyan design language and product direction without exposing launch implementation details.
