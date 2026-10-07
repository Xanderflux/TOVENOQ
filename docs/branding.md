# TOVENOQ logo and sharing package

Created locally on 2026-09-29 for the fictional storefront. No publication,
trademark clearance or public URL is implied.

## Identity

The built-in image-generation tool produced a transparent T/Q monogram concept
in `public/brand/logo-concept.png`. The final `logo-mark.svg` is a manually
reconstructed, flat geometric interpretation: a T crossbar and stem inside a
Q ring, with a diagonal tail. It is not an automatic/exact trace of the raster.
The vector removes raster texture and scales cleanly. The header/footer use
the same paths in `components/brand-mark.tsx` with `currentColor`; the adjacent
wordmark remains accessible text. The symbol is decorative to screen readers.

Charcoal `#1b1b19`, paper `#f7f5f0` and cognac `#9b5935` reuse the existing
site palette. This is a provisional concept identity, not evidence of exclusive
rights or that no similar mark exists.

## Asset inventory

All entries below are in `public/brand/` unless otherwise stated.

| Asset | Dimensions / format | Intended use |
| --- | --- | --- |
| `logo-concept.png` | Generated transparent raster | Design provenance, not loaded by the app |
| `logo-mark.svg`, `logo-mark-light.svg` | Scalable, 256-unit viewBox | Dark/light standalone symbol |
| `logo-mark-1024.png`, `logo-mark-light-1024.png` | 1024×1024, transparent PNG | General raster use |
| `logo-lockup.svg`, `logo-lockup.png` | 900×180, transparent | Symbol plus name; SVG text uses Arial/fallback |
| `icon.svg` | Scalable, paper background | Browser icon source |
| `icon-16.png`, `icon-32.png`, `icon-48.png` | Respective square dimensions | Browser/favicon sizes |
| `favicon.ico` | 16/32/48 PNG entries | Browser fallback; also copied to `public/favicon.ico` |
| `apple-touch-icon.png` | 180×180, opaque | Apple touch icon |
| `icon-192.png`, `icon-512.png` | Respective square dimensions | Manifest icons |
| `icon-maskable-512.png` | 512×512, opaque, extra safe-zone padding | Maskable manifest icon |
| `social-card.svg`, `social-card.png` | 1200×630 | Open Graph and Twitter/X card |

`public/favicon.svg` now matches the new symbol. `public/site.webmanifest`
lists the icon variants and uses `display: "browser"`. No service worker,
offline mode, native application or PWA-installation guarantee was added.

The export script is an optional authoring utility, not a build dependency:

```bash
node scripts/export-brand-assets.mjs
```

It uses Sharp from the current dependency tree. On this machine that local
native module terminated with exit 135; the bundled workspace Sharp succeeded.
`BRAND_SHARP_MODULE` can point to a working Sharp module if needed. No package
or lockfile change was made. Exported assets are checked in as ordinary files
when the user later chooses to commit; application builds do not need to run
this script. Editing the mark requires keeping the component and SVG paths in
sync. Raster wordmark appearance can depend on the exporting machine's fonts.

## Sharing metadata and the eventual URL

`lib/site-metadata.ts` supplies page-specific titles, descriptions, Open Graph
type/site name/locale, and Twitter/X card metadata. Public content pages use
it for route-specific URLs; browser-local account/order pages deliberately
have no per-order public canonical URL. The shared social card explicitly
labels this as a fictional demo rather than a real shop.

The optional build-time environment variable is `SITE_URL` (not a secret).
Once an actual public HTTPS origin is supplied, a fresh build emits absolute
image URLs, route-specific `og:url` and canonical links for public content
pages. No URL value has been supplied or persisted here. When it is absent,
image and canonical/OG URL tags are omitted, and the Twitter card uses
`summary`. This avoids shipping localhost or inventing a brand domain.
Invalid origins fail with a generic message that does not echo the value.

Local tests use `https://example.test` as a reserved fixture only; it is not
a site address. The final local export must be rebuilt without that fixture.
Actual WhatsApp, Facebook, LinkedIn and X previews still require publicly
reachable HTML/images and platform crawler checks after hosting is separately
authorized. A logo or OG card does not itself create a shareable link.

Orders, wallet balances and tracking remain local to each browser. Sharing an
order-page URL cannot share another browser's receipt or account state.

## Verification

Both configured-origin (reserved test fixture) and unconfigured-origin builds
prerendered 14 routes and passed 12 tests. The final build contains no test
origin. TypeScript passed and lint reported no errors/12 existing image
warnings. The card and lockup were inspected visually. A 320px local shop
screenshot showed the logo/header fitting; 320/1440 DOM measurements found
no horizontal overflow. Browser head inspection confirmed the icon links,
collection OG title and intentional omission of an unconfigured image URL.
Desktop screenshot capture was unavailable in that sample; its size/metadata
measurement is not a full visual audit. Actual social-platform previews,
OS home-screen icon rendering and trademark clearance are not verified.

References: [Open Graph protocol](https://ogp.me/),
[metadata and URL composition](https://nextjs.org/docs/app/api-reference/functions/generate-metadata),
[manifest icons](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons).

## Image-generation prompt (built-in mode)

```text
Use case: logo-brand
Asset type: transparent master symbol for TOVENOQ, a fictional editorial footwear demo, to be used as favicon and app icon.
Primary request: a single confident geometric monogram combining T and Q into one compact original mark; the Q's diagonal cut suggests a forward step. Match the site's restrained contemporary fashion identity.
Style: flat vector-like graphic, solid charcoal #1b1b19, thick clean geometry and open negative space that stays readable at 16px.
Composition: square canvas, one centered standalone mark filling about 70 percent of canvas, generous even clear space. Transparent background.
Constraints: no brand-name text, no additional symbols, no gradients, no shadows, no texture, no mockups, no border, no watermark; do not imitate an existing footwear logo.
```
