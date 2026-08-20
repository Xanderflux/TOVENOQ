import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the ALTO storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ALTO — Form follows motion\.<\/title>/i);
  assert.match(html, /AUTUMN \/ WINTER 2026/);
  assert.match(html, /Form follows/);
  assert.match(html, /Axis 01/);
  assert.match(html, /Movement is/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview|react-loading-skeleton/i);
});

test("server-renders the premium product detail experience", async () => {
  const response = await render("/products/axis-01");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /FOUNDATIONAL SERIES \/ 01/);
  assert.match(html, /Axis 01/);
  assert.match(html, /Add to bag/);
  assert.match(html, /Materials/);
  assert.match(html, /Complimentary delivery/);
});

test("removes disposable starter UI and keeps the branded source wired", async () => {
  const [page, productPage, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/axis-01/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Form follows/);
  assert.match(page, /Quick view/);
  assert.match(page, /mobile-navigation/);
  assert.match(productPage, /gallery/);
  assert.match(productPage, /Size guide/);
  assert.match(layout, /ALTO — Form follows motion/);
  assert.match(css, /--cognac/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(`${page}${layout}${css}`, /SkeletonPreview|codex-preview|Your site is taking shape/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
