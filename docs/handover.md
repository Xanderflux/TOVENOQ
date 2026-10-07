# TOVENOQ Footwear Project Handover

## CI/CD handover — 2026-09-29 (current)

GitHub Actions configuration and Netlify pre-publish verification are now
present. See [CI/CD](docs/ci-cd.md) for commands, activation and remote-check
boundaries. No secrets, new dependencies, commits, pushes or deployments
were added. This supersedes earlier statements that configuration/hosting
work was wholly excluded: local CI/CD configuration was explicitly requested;
live hosting is still not activated or verified.

## Available-tool QA handover — 2026-09-29 (current)

The feasible responsive/keyboard matrix is complete and recorded in
[local QA](docs/local-qa.md). Fixes cover last-item modal focus, actual colour
search and final tracking focus. The fresh export prerendered 14 routes;
13 tests, TypeScript and lint passed (0 errors/12 existing image warnings).
No dependency, configuration, backend, commit, push or deployment change was
made. Test-only funding and two orders were created in the local preview
browser; they are not real transactions and storage was not wiped.

Remaining manual checks: actual print/PDF, OS-enabled reduced motion, another
browser and spoken screen reader. These are tooling-limited verification,
not missing demo-commerce integrations. Hosting remains excluded. Use
[README](README.md), [progress](docs/progress.md), [plan](docs/plan.md),
[implementation log](docs/implementation-log.md), [decisions](docs/decisions.md),
[branding](docs/branding.md) and [original prompt](docs/original-prompt.md).
The sections below are earlier dated snapshots.

---

## Current local handover — 2026-09-29

The fictional storefront's core flows remain implemented; final QA is partial.
A clean isolated install and then-current build/9 tests/lint passed in the
preceding QA pass. Product pages were sampled at 320, 390 and 1440; gallery
framing now uses contain, not a shoe-cropping cover fit. Demo purchase and
tracking persistence and menu/search keyboard behavior were checked in one
Chromium browser. All-page/keyboard, actual reduced-motion, printed/PDF,
spoken screen-reader and second-browser testing are still open.

After branding, both metadata test modes passed the 14-route build and all
12 tests; TypeScript passed and lint had 0 errors/12 existing image warnings.
The final local export was rebuilt without the reserved-origin fixture.

New identity and sharing assets live in `public/brand/`; the header/footer use
`components/brand-mark.tsx`. The metadata helper is `lib/site-metadata.ts`.
`SITE_URL` is an optional, nonsecret public HTTPS origin used only at build
time for absolute sharing images and canonical/OG URLs. It has not been set.
`BRAND_SHARP_MODULE` is an optional authoring-only module-path override for
the asset-export script; no application environment variable is required to
run the local demo. No database, payment service or new dependency was added.

Use the setup/check commands in [README](README.md). Asset sizes, full prompt,
export commands and limitations are in [branding](docs/branding.md). Consult
[progress](docs/progress.md), [plan](docs/plan.md),
[implementation log](docs/implementation-log.md), [decisions](docs/decisions.md)
and [original prompt](docs/original-prompt.md). The following sections are dated
historical records. No public link, commit, push or deployment was created.

---

## Image-gallery update — 2026-09-26

The five current colourways each have six primary AI-generated concept views
in `public/images/`, selected by `lib/catalog.ts`: side, front, straight
rear, top, detail, and on-foot. Frame 02, Field 03, and Line 04 also keep a
seventh rear-angle view. These are not photographs of inventory, and small
cross-angle design differences may remain. `axis-01-espresso.webp` is no
longer in the current gallery, but must not be deleted without migrating old
browser-local receipt snapshots that may reference it. The gallery coverage
and file-presence test is in `tests/rendered-html.test.mjs`. No new colourways,
dependencies, payment services, or deployment changes were introduced.

After this update, the local static export prerendered 14 routes, all nine
tests and TypeScript passed, and lint exited with no errors/12 existing image
warnings. A sampled built-page browser check switched the Espresso and Frame
02 galleries successfully. Broader browser/viewport and print QA remain open.

For current verification and open QA, see [progress](docs/progress.md); for
the work record and rationale, see [implementation log](docs/implementation-log.md)
and [decisions](docs/decisions.md).

---

## Earlier handover — Netlify-ready local export, 2026-09-26

The user chose Git-connected Netlify hosting, not a manual upload. The site
remains a fictional, device-local storefront; no real money, backend account,
carrier, or database is connected. [netlify.toml](netlify.toml) sets Node.js
24, `npm run build`, and `dist/client` as the publish directory. Connect this
repository in Netlify's Git UI when ready. No Git remote, commit, push, Netlify
connection, or deployment was created by this cleanup.

Use `npm ci`, `npm run dev`, `npm test`, `npm run lint`, and
`npx --no-install tsc --noEmit` from the repository root. The existing
workspace's export prerendered every route (14 routes, none skipped), all eight
tests passed, lint had 0 errors/12 image warnings, and TypeScript passed.
An offline `npm ci --dry-run` validated the lockfile, but a completed fresh
install remains unverified. The static output lives in `dist/client`, not
the former Worker bundle. Netlify's actual build and deployed URLs have not
been tested.

`app/` holds routes, `components/` holds shared UI and the local-storage store,
`lib/catalog.ts` contains the four-style catalog, and `lib/demo-commerce.ts`
contains fictional integer-cent ledger logic. `public/images/` and
`public/favicon.svg` are local assets. `/shop` reads category query parameters
in the browser so it can be prerendered. In a local browser, the generated
static page filtered to two new styles. The full static-output journey also
funded $1,000, bought Axis 01 for $245, displayed the demo receipt, advanced
fictional tracking, and preserved a $755 balance and tracking state after
reload. The wordmark returned home after a native-anchor compatibility fix.

The current motion layer is CSS-first: `components/reveal.tsx` provides
progressively enhanced once-only editorial reveals; gallery, menu, dialog,
shop filter, and demo feedback have brief transitions. No React Bits package,
full-page loading screen, or artificial transaction delay was added. Filtered
shop routes briefly hide the grid until the browser applies the URL category,
with a 1.2-second fail-safe. Reduced-motion and print overrides are in
`app/globals.css`; visual reduced-motion and print QA remain open.

No application secrets are required. The only intentional external browser
asset is Google Fonts, with CSS fallback fonts. Browser-local funds and orders
can be edited or erased; they are not secure records or proof of purchase.
The ALTO-to-TOVENOQ bag/wishlist key fallback was retained so old local
selections are not silently lost. Clean-install, print/PDF, screen-reader,
cross-browser, and live Netlify checks remain open. See [progress](docs/progress.md),
[plan](docs/plan.md), [implementation log](docs/implementation-log.md),
[decisions](docs/decisions.md), and the unchanged
[original prompt](docs/original-prompt.md).

The sections below are dated history. References to ChatGPT sign-in,
Cloudflare Workers, D1, Drizzle, and old TypeScript failures describe removed
starter code, not the current application.

---

## Earlier handover — rechecked 2026-09-25

TOVENOQ is a local, fictional storefront demo. Use Node.js `>=22.13.0`,
install dependencies if needed, then run `npm run dev` and open its printed
URL (normally `http://localhost:3000/`). The dev command now skips
Cloudflare/Miniflare; no Cloudflare account, database, payment provider, or
secret is needed for the simulation. `npm test` builds and runs the rendered
route and ledger tests; `npm run lint` checks source.

Fresh verification in this workspace: dev startup succeeded, `/`, `/shop`,
`/account`, `/checkout`, and `/orders` returned HTTP 200, `npm test` passed,
and lint exited 0 with 12 image warnings. Whole-project TypeScript remains
nonzero only for three missing declarations in optional Cloudflare code.
A clean `npm ci` and recheck on the user's machine are not yet recorded.
Prior single-browser testing covered funding, purchase, receipt, tracking,
reload persistence, and sampled phone layouts, but print/PDF output,
screen-reader behavior, and cross-browser behavior are still unverified.

The wallet, orders, and receipts are device-local simulations that visitors
can edit or erase in browser storage. There is no real payment, shipment,
account, or deployed service. No commit, push, or deployment has occurred.
Next, retry the full journey on the user's machine; then complete clean-install
and broader accessibility/print/browser checks if needed. See the
[current progress](docs/progress.md), [retrospective plan](docs/plan.md),
[implementation log](docs/implementation-log.md),
[decisions](docs/decisions.md), and [verbatim original prompt](docs/original-prompt.md).

Sections below are dated history and may describe earlier preview-only or
build-blocked states; they are not the current scope.

---

## Local development startup fix — 2026-09-25 (earlier snapshot)

`npm run dev` now starts vinext without the Cloudflare Vite plugin or
Miniflare. The reported `Request.cf` fetch timeout and subsequent Miniflare
`EPIPE` occurred during the previously enabled Cloudflare development layer,
which the browser-local demo does not use. The Cloudflare plugin and optional
bindings remain configured for `npm run build`; this does not imply a deployed
or verified Cloudflare service. On this workspace, the new dev server started
and `/`, `/shop`, `/account`, `/checkout`, and `/orders` returned HTTP 200.
`npm test` passed a fresh build and both test files; lint had 0 errors and 12
raw-image warnings. Standalone TypeScript still reports the same three optional
Cloudflare declaration errors. To run locally, use `npm run dev` and open the
URL it prints (normally `http://localhost:3000/`).

---

## Simulated commerce demo — 2026-09-25 (earlier snapshot)

The active scope is a fictional, device-local shopping journey. Run `npm install` (or `npm ci` once registry access is reliable), then `npm run dev` for local preview. `npm test` builds and runs rendered-route and demo-ledger tests; `npm run lint` exits 0 with 12 raw-image warnings. A successful clean `npm ci` has **not** yet been observed. Standalone `tsc --noEmit` still reports three missing types in optional Cloudflare Worker/starter code; Cloudflare is deferred by the user and is not required for this demo.

Architecture: vinext/React pages in `app/`, shared UI and device-local state in `components/`, static catalog and images in `lib/catalog.ts` and `public/images/`, pure simulated-ledger logic in `lib/demo-commerce.ts`, and tests in `tests/`. `StoreProvider` uses local-storage keys `tovenoq-cart-v1`, `tovenoq-wishlist-v1`, and `tovenoq-demo-account-v1`; old ALTO bag/saved keys are read as migration fallbacks. No application secrets or environment variables are needed for the local shopping simulation. The optional Worker/D1 configuration is not connected to it.

Try the flow: add $10–$100,000 in fictional USD at `/account`, put a product in the bag, use `/checkout` to place a demo order when the balance is sufficient, then inspect `/orders` for history, the printable demo receipt, and the manual tracking timeline. Balances and orders persist only in the same browser; clearing site data erases them, and storage can be edited by the visitor. No payment/card/address collection, actual carrier tracking, fulfillment, email, or backend account exists. Receipts are clearly marked simulations and are not proof of purchase. The local browser QA created one sample order and funding history in its browser profile; it did not touch real money.

Known limitations and next actions: finish a clean-install check on a reliable registry connection; test another browser, a screen reader, and print/PDF output; review 12 raw-image performance warnings and the provisional brand before any public presentation. No commit, push, or deployment has been performed. See [current progress](docs/progress.md), [retrospective plan](docs/plan.md), [implementation log](docs/implementation-log.md), [decisions](docs/decisions.md), and the [verbatim original prompt](docs/original-prompt.md). Publication remains on hold until explicitly requested.

---

## Earlier verification note — 2026-09-25

The lockfile now includes four optional transitive `@emnapi` records that an isolated `npm ci` preflight found missing. The repeat isolated install passed lockfile validation but was stopped after about 17 minutes of slow registry downloads; do not treat clean setup as verified. The existing workspace still passes `npm test` (fresh build plus rendered tests) and `npm run lint` (0 errors, 11 raw-image warnings). Manual in-app browser checks now additionally cover search and bag keyboard focus behavior, plus sampled 320px and 768px layouts without overflow or broken loaded images. A real screen-reader and cross-browser audit are still open. Standalone TypeScript errors remain limited to three missing Cloudflare declarations in optional Worker/starter code; Wrangler type generation needs a configuration file not present here, so none was fabricated. No publication, commit, push, or commerce integration occurred. See [progress](docs/progress.md), [plan](docs/plan.md), [implementation log](docs/implementation-log.md), [decisions](docs/decisions.md), and the [verbatim original prompt](docs/original-prompt.md).

---

## Earlier local verification — 2026-09-25 (historical snapshot)

The demo now passes `npm test` (fresh local vinext build plus rendered-HTML tests) and `npm run lint` (0 errors, 11 raw-image warnings). The missing Rolldown GNU binding was downloaded at the exact lockfile version, SHA-512 verified, and placed in ignored local `node_modules`; it was not added as a new dependency. This does not prove a clean install in the current network-restricted environment. Core interactions were manually exercised at phone size, with the homepage also inspected at desktop size: filtering, search, quick view, product selection, multi-line bag and subtotal, local persistence, saved styles, checkout preview, and overlay Escape behavior. All four product pages loaded at phone width without broken loaded images or horizontal overflow. The initial local-state loading flash and mobile-menu Escape behavior were corrected and retested.

For a fresh machine, use Node.js `>=22.13.0`, run `npm ci` with npm registry access, then `npm test`, `npm run lint`, and `npm run dev` for browser QA. Standalone `tsc --noEmit` still reports three missing Cloudflare declarations in optional starter/worker code; no full screen-reader or cross-browser audit is recorded. The 11 image warnings and AI concept imagery merit review, but no real-commerce services are required for this demo. No publication, commit, or push occurred.

---

## Earlier deliverable definition — functional demo (scope clarified 2026-09-24)

TOVENOQ is a **non-transactional footwear storefront demo**, not a real store. The desired result is working navigation, catalog/search/filtering, product selection, device-local bag and saved styles, and an honest checkout preview. There must be no real-money payment, order submission, card collection, stock reservation, or email signup. The current checkout is an order preview, not an order-confirmation flow. Live commerce, customer accounts, database-backed state, fulfillment, and production legal operations are out of scope, not unfinished prerequisites for this deliverable.

At the 2026-09-24 scope clarification, the four-style catalog and routes, shared shopping UI, local WebP imagery, and informational pages existed in source. The then-missing binding and unrecorded browser QA were subsequently addressed locally as described in the latest update above. Standalone TypeScript and broader accessibility/cross-browser QA remain open.

Setup and verification: use Node.js `>=22.13.0`, run `npm ci` on a machine with registry access, then `npm test` and `npm run lint`; run `npm run dev` for browser QA. No application environment variables, database migration, payment account, or external commerce service is required for the demo. The database and Sites/auth scaffolding described in the historical sections below is optional and unused.

The provisional TOVENOQ name has not been formally cleared, and the AI-generated images are concept visuals. Check naming rights, domain/handles, imagery, and claims before any public presentation under this identity. No source publication has been verified; deployment is optional and still requires explicit authorization. The original prompt is preserved verbatim in [docs/original-prompt.md](docs/original-prompt.md). See the [current progress](docs/progress.md), [retrospective plan](docs/plan.md), [implementation log](docs/implementation-log.md), and [decisions](docs/decisions.md). The dated material below is historical and may describe a production-store target that no longer applies.

---

## Provisional name update — 2026-09-24

The current storefront name is TOVENOQ, adopted at the user's request as a reversible working name. Header/footer wordmarks, visible copy, metadata, package identity, favicon, and render-test expectations were updated. Local bag and saved-style data can migrate from the former ALTO keys on the same browser. `docs/original-prompt.md` and historical ALTO references below are retained as provenance, not current branding. Lint passes with 11 existing image warnings, but the fresh build/test remains blocked by the missing Rolldown Linux native binding; browser QA is outstanding. TOVENOQ has not been formally trademark-cleared, and domain/social-handle availability has not been verified. There is no verified deployment or real checkout. Before public use, check exact and similar marks in intended markets, secure an appropriate domain/handles, and complete the commerce/business requirements below.

---

## Earlier local update — 2026-09-24

The site now has a shared catalog in lib/catalog.ts, components under components/, and routes for /, /shop, /products/{slug} for all four styles, /about, /help, /saved, /checkout, and /policies. StoreProvider keeps a multi-line bag and saved styles in browser local storage. Checkout is explicitly an order preview: no payments, stock control, order submission, accounts or email signup are active. The 13 new product/editorial images in public/images/ are WebP; the original hero PNG is retained.

Run npm ci, npm run lint, and npm test on a machine with npm registry access. Here, focused storefront TypeScript and npm run lint pass (lint has 11 raw-image warnings), but full build/test is blocked by the missing exact Rolldown 1.0.1 native binding. The attempted fetch timed out; a mismatched local binding was removed. Full TypeScript reports the three previously known Cloudflare declarations. Browser visual QA remains pending.

No environment secret, database binding, deployment or Git remote was added. The user previously asked to hold off publication, and no commit or push was made. The live-launch prerequisites originally recorded here are not requirements for the demo-only deliverable; they would matter only if the scope later changes to real commerce.

The sections below preserve the 2026-09-15 retrospective snapshot for provenance; their one-page/one-product description is historical.

---

Handover date: 2026-09-15

## Status at handover

ALTO is a polished, responsive frontend prototype with a homepage and one product
detail route. It is not a production commerce application: catalog data and user
interactions are local, no active database schema or checkout exists, and no
deployment can be verified.

The repository has one commit from 2026-08-20. No Git remote is configured. At the
start of this audit, 22 tracked files appeared modified because of line-ending
conversion; `git diff --ignore-cr-at-eol --exit-code` found no semantic difference.
`docs/original-prompt.md` was already untracked. This audit adds only Markdown
documentation and README links; it does not commit or push.

## Documentation map

- [Original prompt](docs/original-prompt.md) — verbatim, user-confirmed brief and
  provenance.
- [Retrospective plan](docs/plan.md) — reconstructed phases, statuses, and exit
  criteria.
- [Current progress](docs/progress.md) — completed work, blockers, risks,
  deployment state, and exact next actions.
- [Implementation log](docs/implementation-log.md) — dated Git/conversation
  evidence and implementation detail.
- [Decision record](docs/decisions.md) — major approaches, alternatives,
  trade-offs, and consequences.

## Architecture

The application uses React 19 client components through vinext's Next app-router
compatibility layer. Vite performs development/build orchestration. A Cloudflare
Worker entry point delegates application requests to vinext and contains an image
optimization endpoint for Cloudflare bindings.

```text
Browser
  ├─ /                         -> app/page.tsx (client-side storefront state)
  └─ /products/axis-01        -> app/products/axis-01/page.tsx (client-side PDP state)
                 │
                 v
          app/layout.tsx + app/globals.css
                 │
                 v
     vinext / Vite / Cloudflare Worker

Optional, currently unused:
  app/chatgpt-auth.ts          -> injected identity headers
  db/index.ts + db/schema.ts   -> Drizzle/D1 (active schema is empty)
  examples/d1/                 -> reference notes API only
```

There is no shared component layer, API-backed catalog, global state store,
database-backed application route, or commerce provider integration.

## Project structure

| Path                             | Purpose and state                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                   | Homepage, static product data, quick view, mobile menu, newsletter state, and single-product cart drawer. |
| `app/products/axis-01/page.tsx`  | Axis 01 gallery and local purchase-option/cart interactions.                                              |
| `app/layout.tsx`                 | Root layout and ALTO metadata; `metadataBase` is a placeholder domain.                                    |
| `app/globals.css`                | Global design tokens, page/component styles, breakpoints, focus, and reduced-motion rules.                |
| `app/chatgpt-auth.ts`            | Optional Sites identity helpers; not imported by application routes.                                      |
| `public/images/axis-01-hero.png` | Only local photographic asset; 1672×941 RGB PNG.                                                          |
| `worker/index.ts`                | vinext Worker entry and Cloudflare image optimization handling.                                           |
| `db/schema.ts`                   | Intentionally empty active schema.                                                                        |
| `db/index.ts`                    | Optional Drizzle D1 accessor; unused by active routes.                                                    |
| `examples/d1/`                   | Isolated notes schema/API example; not active application code.                                           |
| `drizzle/`                       | Migration journal with zero entries; no SQL migrations.                                                   |
| `tests/rendered-html.test.mjs`   | Built-route and source smoke checks.                                                                      |
| `.openai/hosting.json`           | Sites project reference; D1 and R2 are unset.                                                             |
| `vite.config.ts`                 | vinext/Sites, build-only Cloudflare integration and optional bindings, and sandbox polling configuration. |

Generated/installed directories (`node_modules`, `dist`, `.next`, `.vinext`, and
`.wrangler`) are ignored and must not be treated as source of truth.

## Prerequisites and setup

- Node.js `>=22.13.0` (the audit environment used Node.js 24.18.0).
- npm (the audit environment used npm 11.16.0).
- Network access is needed to install packages and, at runtime, to load Google
  Fonts and remote Unsplash images.

Recommended clean setup:

```bash
npm ci
npm run dev
```

Available commands:

```bash
npm run dev          # local vinext development server
npm run build        # production build
npm start            # serve the built application
npm run lint         # ESLint
npm test             # fresh build, then rendered HTML/source smoke tests
npm run db:generate  # generate migrations after a real schema change
```

Do not run `npm run db:generate` merely to test the current project; the active
schema is empty, and generated migration changes should be intentional.

## Environment names and platform bindings

No `.env` or `.env.example` file exists. `.gitignore` ignores `.env*`. No secret
values were inspected or copied during this audit.

Environment-variable names referenced by source:

| Name                      | Purpose                                                       | Required for storefront?     |
| ------------------------- | ------------------------------------------------------------- | ---------------------------- |
| `CODEX_SANDBOX`           | Enables polling-based file watching when equal to `seatbelt`. | No                           |
| `WRANGLER_WRITE_LOGS`     | Defaults Wrangler logging off in local configuration.         | No; set internally if absent |
| `WRANGLER_LOG_PATH`       | Defaults Wrangler logs to `.wrangler/logs`.                   | No; set internally if absent |
| `MINIFLARE_REGISTRY_PATH` | Defaults the Miniflare registry to `.wrangler/registry`.      | No; set internally if absent |

Cloudflare binding names declared by types or optional configuration:

| Binding  | Purpose                                          | Current state                     |
| -------- | ------------------------------------------------ | --------------------------------- |
| `ASSETS` | Static asset fetcher used by image optimization. | Expected by the Worker/runtime    |
| `IMAGES` | Cloudflare image transformation service.         | Expected by the optimization path |
| `DB`     | D1 database consumed by `getDb()`.               | Not configured; `d1` is null      |

Sites may inject `oai-authenticated-user-id`,
`oai-authenticated-user-email`, `oai-authenticated-user-full-name`, and
`oai-authenticated-user-full-name-encoding` request headers. The helper supports
them, but no active route calls it.

## Database state

- Dialect/configuration: SQLite via Drizzle, intended for Cloudflare D1.
- Active schema: empty (`db/schema.ts` exports nothing).
- Migration state: `drizzle/meta/_journal.json` has zero entries; no SQL files.
- Hosting binding: no D1 binding (`d1: null`).
- Example only: `examples/d1` defines a `notes` table and GET/POST handlers. It
  would need to be deliberately copied/integrated and migrated before use.
- No evidence of a created, migrated, seeded, or populated application database
  exists.

## Deployment state

- A Sites `project_id` is configured, and the earlier conversation confirms that
  a site record was created.
- Source publication did not proceed; the user explicitly asked to hold off.
- No Git remote, CI/CD configuration, production URL record, or deployment receipt
  exists in the repository.
- D1 and R2 are not configured.

Therefore, treat deployment as **not published and unverified**. Do not publish,
create a remote, or change hosting without explicit user authorization.

## Verification at handover

On 2026-09-15:

- `npm run lint` exited 0 with nine raw-`<img>` warnings.
- `npm test` failed before the build because the installed `node_modules` lacked
  Rolldown's Linux x64 GNU native binding. The lockfile does include that optional
  package, so a clean `npm ci` is the first verification step when dependency
  refresh is authorized.
- `node --test tests/rendered-html.test.mjs` exited 0 against the existing
  `dist/server/index.js`, but that artifact was built on 2026-08-20 and is not a
  fresh-build result.
- `npx --no-install tsc --noEmit` reported missing Cloudflare worker
  module/global types.
- No browser, visual-regression, Lighthouse, accessibility-tool, or CI result is
  available.

The earlier implementation conversation reported a clean build and passing render
tests on 2026-08-20; preserve that only as historical conversation evidence.

## Known limitations

- Only Axis 01 has a route; all four homepage products link to it.
- Product records are hard-coded and do not share a data source with the PDP.
- Cart, wishlist, newsletter, and option states are in-memory only.
- The homepage cart holds one displayed product and can accumulate quantity across
  quick views in a way that does not model real cart lines.
- Search, account, secure checkout, country/currency, and many footer/category
  destinations are inert buttons or placeholder anchors.
- No payments, tax, shipping calculation, inventory, orders, email, CMS, analytics,
  consent, or privacy implementation exists.
- Remote images and fonts require third-party network access; imagery consistency,
  rights, and production reliability are unverified.
- Raw `<img>` elements trigger nine performance warnings.
- Bespoke dialogs lack verified focus traps and focus restoration.
- No error/loading states exist for remote images or commerce actions.
- `metadataBase` points to `https://alto-footwear.example`.
- The package name and top-level README retain starter naming.

## Recommended next actions

1. With approval to refresh installed packages, run `npm ci`, then `npm test` and
   `npm run lint`; retain the full results.
2. Fix or formally scope the Cloudflare type-check gap and add a repeatable
   type-check script if it is a release requirement.
3. Perform keyboard, screen-reader, responsive, visual, and performance QA.
4. Confirm whether the target is a visual prototype or production commerce. For
   production, write explicit requirements for catalog, cart, checkout, inventory,
   identity, orders, email, analytics, privacy, and operations before coding.
5. Replace remote/placeholder imagery and destinations with owned production
   assets and real routes/services.
6. Publish only after explicit authorization, then record the deployed revision,
   URL, environment, and rollback procedure.
