# CI/CD

## Repository configuration — 2026-09-29

CI is configured in `.github/workflows/ci.yml` for GitHub pushes, pull
requests and manual runs. It uses Ubuntu, Node.js 24, locked `npm ci`, npm
cache, read-only repository permission, no persisted checkout credentials,
a 15-minute timeout and cancellation of superseded runs on the same ref.
The job runs lint, `npm test` (static build plus tests), then TypeScript.
Existing lint warnings are not errors. No personal secrets are required.
This assumes the repository is hosted on GitHub; other Git providers do
not execute GitHub Actions workflows.

CD uses the user's selected Netlify Git integration, not a second token-based
deploy workflow. `netlify.toml` runs the same verification commands before
publishing `dist/client`. A failing command fails the build rather than
publishing that build. This also guards deploys independently of GitHub CI;
Netlify does not need to wait for the separate GitHub job. `npm test` already
builds the site, so no redundant build command is needed.

## Activation still required

Local verification passed: lint (0 errors, 12 existing warnings), a fresh
14-route static export, all 13 tests and TypeScript. Workflow YAML parsed and
its triggers, permissions and command sequence were checked. The first build
was blocked by sandbox localhost socket permissions; the permitted retry
passed. This is not a GitHub or Netlify execution result.

1. Review, commit and push the current application and configuration files
   when authorized. They are currently local; no remote CI run is recorded.
2. Enable GitHub Actions if disabled. Optionally require the `Verify demo`
   check in branch protection before merging; protection is not configured here.
3. Connect the repository in Netlify, selecting the production branch. If
   this app is nested in the remote repository, set the base directory to
   the folder containing `package.json` and `netlify.toml`.
4. Confirm Node.js 24 and publish directory `dist/client`. The configured
   build command is `npm run lint && npm test && npx --no-install tsc --noEmit`.
5. Optionally set nonsecret `SITE_URL` to the actual public HTTPS origin for
   sharing metadata. Never put credentials into repository files.
6. Check the first hosted build, direct product/shop URLs and refreshes,
   assets, fictional funding/checkout, receipt persistence and tracking.
   No successful remote build or live deployment is claimed.

Render remains an alternative, not an activated second deployment target.
Use a Static Site with the same verification command, Node.js 24 and
`dist/client`; verify clean URL routing and add appropriate per-route rewrites
if needed. No Render account, service or Blueprint has been configured.

All commerce remains browser-local and fictional. CI/CD adds no server,
payment processing or shared account storage. No dependency was added.

## References

- [GitHub Node.js CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
- [Netlify Git-connected deployment](https://docs.netlify.com/start/quickstarts/deploy-from-repository/)
- [Render static sites](https://render.com/docs/static-sites)
