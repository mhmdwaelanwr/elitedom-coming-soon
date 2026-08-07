# Elitedom — Coming Soon

A lightweight cinematic pre-launch landing page for `elitedom.store`.

## What is included

- Responsive single-page teaser with a dark Elitedom visual system.
- Hardware imagery reused from the main Elitedom storefront repository.
- Animated grid, particles, cursor glow, scan lines, parallax hardware, reveal effects and interactive cards.
- English / Arabic toggle with RTL support.
- Messaging grounded in the main platform: Egyptian technology retail, VAT-inclusive pricing, Egypt-wide delivery, live inventory/ERP direction, Paymob-first checkout and connected warranty/RMA support.
- Reduced-motion accessibility handling.
- No framework/runtime dependency: plain HTML, CSS and JavaScript for fast cold starts and easy deployment.

## Files

- `index.html` — page structure, SEO metadata and launch content.
- `styles.css` — visual system, responsive layout and animations.
- `script.js` — i18n, particles, reveal, parallax and interaction effects.
- `assets/logo-mark.svg` — lightweight Elitedom shield mark for the teaser.
- `vercel.json` — optional Vercel headers/configuration.

## Deployment

This repository is intentionally static. It can be deployed directly on Vercel, Cloudflare Pages, Netlify, GitHub Pages, Nginx or any static hosting service.

For Vercel: import this repository, use the repository root as the project root, leave the build command empty, and point the production domain to `elitedom.store`.

## Source of product imagery / launch messaging

The teaser references the canonical Elitedom commerce repository:

`mhmdwaelanwr/elitedom-erp-architecture-main`

The product silhouettes currently load from the public source repository so the coming-soon repository remains small and fast to update.
