# Technical and Architectural Decisions

These records include dated historical choices. The current Netlify export
decision supersedes the earlier Cloudflare Worker/build decisions below; those
remain only as provenance. See [current progress](progress.md).

## GitHub CI plus native Netlify Git deployment — 2026-09-29

- **Context:** user requested CI/CD and selected repository-connected Netlify.
- **Selected approach:** read-only GitHub checks and independent lint/build/
  test/type checks in Netlify's build command.
- **Confirmed reason:** respect Git-based delivery without personal deployment
  tokens or a duplicate publishing workflow.
- **Alternatives:** GitHub-driven CLI deployment, Render or manual upload.
  CLI tokens add credential management; manual upload contradicts preference;
  Render remains optional, not a second configured destination.
- **Trade-offs:** CI and Netlify repeat checks; this costs build time but keeps
  publication guarded independently. Existing lint warnings are permitted.
- **Consequences:** account connection and remote verification remain required;
  branch protection is optional and not configured. No live deployment occurs
  from adding local files. See [CI/CD](ci-cd.md).

## Preserve keyboard focus through changing demo UI — 2026-09-29

- **Context:** local tests found focus on body after removing the last bag
  line and after disabling the final tracking button.
- **Selected approach:** shared Dialog observes mutations/focus entry and
  recovers to its Close control; final tracking moves focus to its new status
  heading only after the final user-triggered update.
- **Reason:** **Confirmed:** both behaviors were reproduced and re-tested.
  Keeping focus in a modal preserves its keyboard contract; a completed status
  is a meaningful destination when its action becomes disabled.
- **Alternatives:** close the bag when empty; leave body focused; leave the
  completed action enabled; always focus tracking on page load.
- **Trade-offs:** a small observer runs while a dialog is open and is removed
  on cleanup. The final tracking focus intentionally changes destination, but
  does not disrupt ordinary receipt hydration/navigation.
- **Consequences:** changing modal contents remain usable by keyboard. This
  is not evidence of actual screen-reader announcements; those remain untested.


## Static identity package and explicit sharing origin — 2026-09-29

- **Context:** the user requested a logo, device/browser sizes and social
  previews, while excluding hosting. No actual public origin is available.
- **Selected approach:** built-in generated T/Q concept, a flat vector
  reconstruction, static icon/card exports and shared page-metadata helper;
  optional build-time `SITE_URL` enables absolute social/canonical URLs.
- **Reason:** **Confirmed:** requested branding and no deployment. **Inferred:**
  deterministic vectors and static assets fit the export-only demo and remain
  crisp without a new animation/image/runtime service.
- **Alternatives:** use only the old T icon; bitmap-only logo; dynamic OG image
  server; invent a domain or infer it from a development request.
- **Trade-offs:** the SVG is an interpretation, not an exact raster trace;
  wordmark SVG text can vary with fonts; social imagery is one shared card,
  not an individual product campaign; absent SITE_URL means image previews
  remain intentionally inactive. The authoring script needs working Sharp,
  but application builds use existing exported assets.
- **Consequences:** no package/lock/runtime changes; future public URL changes
  require rebuilding. Local wallet/receipt state is not shared by URLs.
  Trademark clearance and live crawler previews are not verified. Icon
  manifest does not imply offline/PWA implementation.


## Complete concept galleries without replacing legacy receipt assets — 2026-09-26

- **Context:** Four styles/five colourways existed, but only Axis 01 Bone /
  Carbon had all six intended image views. Demo receipts snapshot image paths.
- **Selected approach:** generate concept angles from each existing side
  reference, add six labelled views to every colourway, preserve the previous
  rear angles as optional seventh views, and keep the former Espresso asset
  available for old receipt snapshots.
- **Reason:** **Confirmed:** the original prompt calls for side, front, rear,
  top, detail, and lifestyle views, and the user requested more variant images.
  **Inferred:** retaining old paths is the safest way to preserve local order
  history while improving the current catalog.
- **Alternatives:** reuse the same side view for every angle; replace or
  delete legacy files; wait for physical-product photography.
- **Trade-offs:** generated images can vary subtly in geometry/material
  placement and increase static asset size. They cannot verify a real product.
- **Consequences:** catalog galleries have the requested coverage without
  remote image loading or a new dependency. The imagery must remain described
  as concept material, and future real products would need actual photography.

## Use restrained, CSS-first motion without a full-screen loader — 2026-09-26

- **Context:** The user requested implementation of the animation plan for a
  static-export footwear demo whose account and order state hydrates locally.
- **Selected approach:** Use short CSS transitions and keyframes, a small
  IntersectionObserver reveal helper, and inline loading states only for
  browser-local data. Gate filtered shop content briefly until its URL query
  is applied, with a timed fail-safe.
- **Reason:** **Confirmed:** the current site has no remote data/payment
  request requiring a blocking loader. **Inferred design choice:** restrained
  motion fits its editorial art direction and keeps the static build small.
- **Alternatives:** install React Bits/Motion/GSAP components wholesale; use
  full-page transitions; show a branded preloader on every visit; leave all
  content unanimated.
- **Trade-offs:** custom motion needs maintenance and reduced-motion checks;
  filtered shop content may be briefly blank while hydration catches up.
  Cross-document navigation does not animate between pages.
- **Consequences:** no new dependency or artificial delay was added. Content
  stays present without JavaScript, and reduced-motion/print styles disable
  non-essential effects. Broader accessibility/performance QA remains open.

## Export for Git-connected Netlify and remove dormant starter code — 2026-09-26

- **Context:** The user chose Netlify's Git connection, not manual upload,
  and asked to remove unnecessary starter/auth/data infrastructure after
  checking the replacement build. The demo has no server-backed commerce.
- **Selected approach:** Use vinext static export, publish `dist/client` via
  `netlify.toml`, move `/shop` filtering to a client component, and remove
  unused ChatGPT, Sites/Cloudflare, D1/Drizzle, and Tailwind scaffolding.
- **Reason:** **Confirmed:** every route prerendered after the filter change;
  the wallet and orders use browser local storage. **Inferred:** avoiding a
  Netlify server function is the simplest fit for this demo.
- **Alternatives:** vinext plus Nitro for server-rendered Netlify functions;
  retain the Worker build and use Cloudflare; or keep unused scaffolding.
- **Trade-offs:** The static `/shop` HTML contains the full catalog until client
  hydration applies query filters; a later motion pass briefly gates filtered
  views to avoid showing incorrect cards. No runtime server APIs are available; any
  future real accounts or commerce would require new infrastructure.
- **Consequences:** The old Worker test was replaced with exported-HTML tests;
  Node build and Netlify publish settings are explicit. Netlify itself has
  not been connected or verified. Old ALTO storage fallback remains to avoid
  dropping saved selections.

## Run local development without Cloudflare/Miniflare — 2026-09-25

- **Context:** `vinext dev` loaded Miniflare unconditionally and the user saw a
  `Request.cf` fetch timeout followed by `EPIPE`. The demo's storefront,
  wallet, and orders are browser-local; Cloudflare is deferred.
- **Selected approach:** Load the Cloudflare Vite plugin only for builds;
  keep plain vinext/Vite for development.
- **Reason:** **Confirmed:** the user does not need Cloudflare for the demo,
  and local routes render without Miniflare. **Inferred:** eliminating an
  unused dev dependency is the most direct way to avoid its startup failure.
- **Alternatives:** Diagnose Cloudflare connectivity/Miniflare internals, run a
  built production server for every preview, or remove the Worker integration
  entirely.
- **Trade-offs:** Local dev no longer emulates Worker bindings. Code that later
  requires Cloudflare APIs must be verified separately in a Worker runtime.
- **Consequences:** `npm run dev` is independent of Miniflare; `npm run build`
  retains the existing Cloudflare configuration. No deployment was performed.

## Fictional commerce on one device — 2026-09-25

- **Context:** The user expanded the earlier preview-only demo to include adding amounts such as $10/$100,000, buying footwear, viewing orders, checking tracking, and obtaining receipts, while deferring Cloudflare and ruling out real transactions.
- **Selected approach:** Store a versioned fictional account ledger, funding events, and item-snapshot orders in browser local storage. Checkout deducts integer-cent demo funds, clears the bag, and opens a local receipt. No real payment, address, account service, database, or carrier API is used.
- **Reason:** **Confirmed:** the user requested local-storage simulation and no real commerce. **Inferred:** one-device persistence gives a convincing end-to-end flow without collecting sensitive financial or shipping information.
- **Alternatives:** Keep checkout as an inert preview; use a remote mock server; integrate real payments/orders. None would match the requested local-only fictional flow as directly.
- **Trade-offs:** Visitors can modify or clear their own balance/orders; there is no synchronization, fraud resistance, inventory, identity, or actual fulfillment. Funding is limited to $100,000 per action and a $1,000,000 balance as an implementation guardrail, not a user-stated business rule.
- **Consequences:** Every money/order surface is labeled as a demo; receipts are not proof of purchase. A real store would require a new architecture and explicit user authorization.

## Manual simulated tracking and browser-print receipt — 2026-09-25

- **Context:** The demo needs visible tracking and receipts, but there are no parcels or carrier events.
- **Selected approach:** Save one of four local tracking stages per order, advanceable by the visitor, and provide an order-snapshot receipt with browser print/save-to-PDF styling.
- **Reason:** **Confirmed:** the user wants tracking and receipts. **Inferred:** explicit manual progression demonstrates states honestly, while print avoids a PDF service/dependency.
- **Alternatives:** Time-based fake carrier updates, static unchanging status, generated PDF files, or real carrier integration.
- **Trade-offs:** Tracking is intentionally not automatic or carrier-backed. Browser print output can vary and still needs visual inspection.
- **Consequences:** The order page says no parcel exists and watermarks the receipt as a simulation; users can revisit both after reload on the same device.

---

## Minimal lockfile repair — 2026-09-25

- **Context:** An isolated `npm ci` rejected the existing lockfile because four optional `@emnapi` transitive package records were absent. Regenerating the lockfile in isolation added those records but also changed unrelated `peer` flags.
- **Selected approach:** Add only the four missing package records to `package-lock.json`; leave declared dependency versions and existing `peer` metadata unchanged.
- **Reason:** **Confirmed by command output:** those missing records caused npm's preflight rejection. **Inferred:** the smaller patch is easier to review and less likely to obscure unrelated dependency changes.
- **Alternatives:** Replace the entire file with npm's regenerated version; ignore the clean-install failure; change direct dependencies.
- **Trade-offs:** A successful clean installation still depends on registry access and has not yet been recorded. Minimal repair does not resolve optional Cloudflare typing or image warnings.
- **Consequences:** The next isolated `npm ci` passed lockfile validation but was stopped after about 17 minutes of slow registry downloads. A completed clean installation remains necessary before reproducible setup can be claimed.

## Defer optional Cloudflare runtime typing — 2026-09-25

- **Context:** Standalone TypeScript reports three missing Cloudflare declarations in optional Worker/starter code. The demo has no Wrangler configuration, and `wrangler types` exits because one is required.
- **Selected approach:** Leave the optional Worker typing unresolved for this demo rather than fabricate a configuration or ambient declarations.
- **Reason:** **Confirmed:** the user wants a local, non-transactional demo; no active database or deployment binding is configured. **Inferred:** generated runtime types should match a real Worker configuration when that infrastructure is used.
- **Alternatives:** Add a Wrangler config solely for type generation; install generic Cloudflare types; exclude the optional code from `tsc`; remove the optional scaffold.
- **Trade-offs:** `tsc --noEmit` remains red for the whole repository even though the storefront build and tests pass.
- **Consequences:** If the Worker becomes an active deployment target, define its real binding/configuration shape, generate official runtime types, and make standalone type checking a gate then.

---

## Demo-only scope clarification — 2026-09-24

- **Context:** Earlier status reports measured the project against a launch-ready e-commerce store. The user clarified that the goal is a functionally working demonstration without real-money connections.
- **Selected approach:** Treat storefront interactions and an honest checkout preview as the deliverable. Keep bag and saved styles device-local. Do not integrate payment, order submission, inventory, customer accounts, or email collection merely to make the demo appear complete.
- **Reason:** **Confirmed by the user:** this will not be a real store, although the visible interactions should work. **Inferred implementation rationale:** local state and a plainly labeled preview can demonstrate the shopping journey without collecting money or implying fulfillment.
- **Alternatives:** Build real commerce services; add a fully simulated order-confirmation flow; make the site a static, non-interactive mockup.
- **Trade-offs:** The demo can be explored but cannot place orders or synchronize state across devices. A simulated completion screen is optional rather than an existing feature or a requirement established by the user.
- **Consequences:** Completion is judged by a fresh build/test run and verified browser interactions, responsiveness, accessibility, and honest demo labeling—not by production integrations. Public branding checks and publication are separate, approval-dependent work.

---

## Provisional brand name — 2026-09-24

- **Context:** ALTO has existing commercial uses, and the user asked for a different name that could be changed again later.
- **Selected approach:** Use TOVENOQ provisionally across the active storefront; retain ALTO only in historical documentation and as a read-only fallback for prior device-local bag and wishlist data.
- **Reason:** **Confirmed:** the user explicitly approved TOVENOQ for now. **Inferred:** a consistent visible identity and preserved local selections make the transition less confusing.
- **Alternatives:** Keep ALTO, pause the site until a formally cleared name is chosen, or immediately rebuild the visual/product identity around the new name.
- **Trade-offs:** This is a fast naming change, not a full identity redesign or legal clearance. Existing product photographs and names remain as before.
- **Consequences:** Do not claim registration or exclusivity. Search relevant trademark registries for exact and similar marks, verify domain/handles, and decide target sales markets before public launch. The brand may still need to change.

---

## Subsequent local decisions — 2026-09-24

### Shared catalog and device-local shopping state

Context: the original prototype linked all cards to Axis 01 and had separate single-item carts. Selected: one shared catalog and a layout-level client store provider. Reason: consistent routes, pricing and multi-line bag semantics. Alternative: a server database-backed cart; not selected without a configured database/account design. Trade-off: local storage survives refresh on one device but does not sync, reserve stock or constitute an order. Consequence: a real store still needs backend inventory and order management.

### Gated commerce and newsletter

Context: no payment provider, shipping/return terms, business identity, consent infrastructure or D1 binding is configured. Selected: an explicit order-preview page and visible notice that newsletter collection is closed. Reason: avoid representing a non-existent transaction or subscription as successful. Alternative: accepting checkout/email through a newly configured service; deferred pending user/business choices. Trade-off: not a live store. Consequence: launch is blocked until these services and policies are implemented and verified.

### Local WebP imagery

Context: remote stock images made product cards inconsistent and dependent on third-party availability. Selected: generated local product/editorial images and WebP compression. Reason: self-contained, lighter catalog presentation. Alternative: retain remote stock photographs or commission a real campaign; the latter remains preferable for verified commercial launch. Trade-off: synthetic imagery may not faithfully represent manufacturable products. Consequence: imagery, material claims and product accuracy require owner review before publication.

---

These records were reconstructed on 2026-09-15. "Confirmed" reasoning comes from
source comments, README text, Git, or explicit conversation statements. "Inferred"
reasoning is labeled because the repository has no contemporaneous ADRs and only
one commit.

## D-001 — Use vinext, Vite, and a Cloudflare Worker foundation

- **Context:** The project needed a new web application that could run locally and
  fit the available Sites hosting workflow.
- **Selected approach:** React 19 app-router pages are built with vinext/Vite and
  served by a Cloudflare Worker entry point. OpenAI Sites and Cloudflare Vite
  plugins are configured.
- **Reason:** **Confirmed:** the earlier conversation says the Sites-oriented
  starter and site-building workflow were used. **Inferred:** this offered the
  shortest route to local preview and potential Sites deployment.
- **Alternatives:** Standard Next.js runtime, another React meta-framework, or a
  static HTML/CSS/JavaScript build.
- **Trade-offs:** The approach preserves Cloudflare/Sites integration but depends
  on beta vinext and platform-specific bindings/types.
- **Consequences:** Builds require the vinext/Rolldown toolchain; standalone type
  checking currently lacks Cloudflare declarations; deployment remains coupled to
  the Sites/Cloudflare configuration shape.

## D-002 — Implement the storefront as a frontend prototype with local state

- **Context:** The brief focused on brand presentation, interaction quality, and a
  premium shopping experience, while no backend contract or commerce provider was
  specified.
- **Selected approach:** Product data is hard-coded and cart, wishlist, menu,
  newsletter, gallery, and modal state live inside client components.
- **Reason:** **Inferred:** this maximized visible product fidelity within the
  initial build without inventing business systems that were not specified.
- **Alternatives:** Server components backed by a CMS/catalog, commerce SaaS,
  custom API/database, or shared persisted client store.
- **Trade-offs:** Fast and self-contained, but no persistence, inventory, pricing
  authority, checkout, multi-line cart, account, or newsletter delivery.
- **Consequences:** The interface is demonstrative and must not be represented as
  a production commerce implementation.

## D-003 — Centralize the editorial identity in one global stylesheet

- **Context:** The prompt strongly constrained art direction, typography, colour,
  whitespace, motion, and responsive behavior.
- **Selected approach:** `app/globals.css` holds design tokens and all homepage/PDP
  styling, using DM Serif Display, DM Sans, and DM Mono from Google Fonts.
- **Reason:** **Confirmed:** the earlier conversation explicitly selected warm
  ivory, charcoal, muted cognac, serif headlines, and restrained sans-serif UI.
  **Inferred:** one stylesheet made cross-page art-direction consistency simple at
  this project size.
- **Alternatives:** CSS Modules, Tailwind utility classes, CSS-in-JS, or a formal
  token/component package.
- **Trade-offs:** Easy to survey and tune globally, but increasingly coupled and
  harder to scale or isolate as routes/components grow.
- **Consequences:** New work must avoid selector collisions and should decide when
  to split styles before expanding the catalog.

## D-004 — Mix a local hero asset with remote Unsplash imagery

- **Context:** The brief required immersive, photorealistic, consistent campaign
  and product imagery.
- **Selected approach:** Commit one 1672×941 hero PNG and reference several remote
  Unsplash images for cards, editorial content, and the product gallery.
- **Reason:** **Conversation-confirmed:** an image-generation workflow was chosen
  for campaign art direction. **Inferred:** remote stock images filled the breadth
  of views quickly without adding many large assets.
- **Alternatives:** Commission/generate a complete local product set, use a DAM/CDN
  with owned assets, or use framework-managed optimized images.
- **Trade-offs:** Smaller repository and rapid variety, but weaker visual
  consistency, external availability/privacy risk, unverified licensing context,
  and raw-image performance warnings.
- **Consequences:** Production release requires an owned, consistent, optimized
  image set and explicit rights verification.

## D-005 — Use native anchors behind a tiny local `Link` wrapper

- **Context:** Both client pages need internal navigation while running through
  vinext.
- **Selected approach:** A local `Link` function renders `<a href>` and is
  duplicated in both page files.
- **Reason:** **Conversation-confirmed action:** the implementation replaced the
  prior link approach while resolving local build issues. **Inferred reason:**
  native anchors minimized framework compatibility concerns.
- **Alternatives:** `next/link`, a shared navigation component, or router APIs.
- **Trade-offs:** Simple and dependable HTML, but full document navigation, no
  prefetching, and duplicated code.
- **Consequences:** Revisit this choice if route count or client-side navigation
  requirements grow.

## D-006 — Keep database and authentication capabilities dormant

- **Context:** The starter included optional D1/Drizzle and ChatGPT identity
  helpers, but the brand brief did not specify user accounts or persistent data.
- **Selected approach:** Leave `db/schema.ts` empty, D1/R2 bindings null, the notes
  code under `examples/`, and auth helpers unused.
- **Reason:** **Confirmed from source comments and README:** these capabilities are
  opt-in and should be enabled only when needed.
- **Alternatives:** Remove unused scaffolding or implement product/user/cart/order
  schemas and protected routes immediately.
- **Trade-offs:** Preserves a ready extension path but increases surface area and
  can mislead readers into assuming data/auth features are active.
- **Consequences:** Handover must state clearly that no application database or
  authentication flow is currently in use.

## D-007 — Add baseline accessibility and responsive safeguards during polish

- **Context:** Interactive overlays, mobile navigation, and motion can become
  inaccessible without keyboard and reduced-motion handling.
- **Selected approach:** Add semantic labels, `aria-expanded`/`aria-pressed`,
  Escape dismissal, backdrop buttons, scroll locks, focus-visible styles,
  focus-within visibility, reduced-motion CSS, and responsive breakpoints.
- **Reason:** **Conversation-confirmed:** these changes were introduced during the
  implementation review and refinement pass.
- **Alternatives:** Ship purely pointer-oriented interactions or adopt a tested
  dialog/menu component library.
- **Trade-offs:** Improves the baseline without adding dependencies, but bespoke
  dialogs still lack verified focus trapping, restoration, and screen-reader QA.
- **Consequences:** Accessibility remains partial and needs dedicated testing
  before release.

## D-008 — Test built HTML and critical source markers

- **Context:** The starter test suite targeted disposable loading UI and no longer
  matched the branded application.
- **Selected approach:** Replace it with Node tests that import the built worker,
  render two routes, and assert representative content plus source invariants.
- **Reason:** **Confirmed by conversation and test content:** tests were rewritten
  to validate the ALTO storefront and starter removal.
- **Alternatives:** Component tests, Playwright/Cypress browser tests, visual
  regression, or only build/type checks.
- **Trade-offs:** Fast and dependency-light, but shallow: it does not exercise
  hydration, interaction sequences, visual layout, accessibility, or remote assets.
- **Consequences:** The suite is a smoke test, not comprehensive release evidence.

## D-009 — Stop before publication

- **Context:** A Sites project record was created, but uploading source was an
  external action requiring explicit approval.
- **Selected approach:** Keep the project local and do not publish.
- **Reason:** **Confirmed:** the user explicitly said, "nah just hold off on that".
- **Alternatives:** Publish immediately or configure a Git remote/CI pipeline.
- **Trade-offs:** Avoids unauthorized external changes, but leaves no shareable or
  production deployment to verify.
- **Consequences:** Deployment status remains unverified until the user explicitly
  authorizes a publication step.
