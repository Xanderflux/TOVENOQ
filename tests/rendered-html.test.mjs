import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const route = new URL(pathname, "http://localhost").pathname;
  const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const html = await readFile(new URL(`../dist/client/${filename}`, import.meta.url), "utf8");
  return new Response(html, { headers: { "content-type": "text/html" } });
}

test("static export contains the TOVENOQ storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>TOVENOQ \| Form follows motion\.<\/title>/i);
  assert.doesNotMatch(html, /\u2014/);
  assert.match(html, /aria-label="TOVENOQ home"/);
  assert.match(html, /<a class="wordmark" href="\/" aria-label="TOVENOQ home">/);
  assert.doesNotMatch(html, /ALTO|®/);
  assert.match(html, /AUTUMN \/ WINTER 2026/);
  assert.match(html, /Form follows/);
  assert.match(html, /Axis 01/);
  assert.match(html, /Movement is/);
  assert.match(html, /class="motion-reveal/);
  assert.match(html, /\/products\/frame-02/);
  assert.doesNotMatch(
    html,
    /Your site is taking shape|Building your site|codex-preview|react-loading-skeleton/i,
  );
});

test("static export contains four distinct product pages", async () => {
  for (const [slug, name] of [
    ["axis-01", "Axis 01"],
    ["frame-02", "Frame 02"],
    ["field-03", "Field 03"],
    ["line-04", "Line 04"],
  ]) {
    const response = await render("/products/" + slug);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, new RegExp(name));
    assert.match(html, /Add to bag/);
    assert.match(html, /Materials/);
    assert.match(html, /Size guide/);
  }
});

test("static export contains collection, information and demo commerce routes", async () => {
  for (const path of ["/shop", "/about", "/help", "/saved", "/checkout", "/account", "/orders"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
  const filtered = await render("/shop?category=new");
  assert.equal(filtered.status, 200);
  const html = await filtered.text();
  assert.match(html, /Axis 01/);
  assert.match(html, /Field 03/);
  assert.match(html, /\/shop\?category=new/);
  assert.match(html, /data-shop-filter-pending/);
  assert.match(html, /1200/);
  const checkout = await render("/checkout");
  const checkoutHtml = await checkout.text();
  assert.match(checkoutHtml, /Loading your bag/);
  assert.match(checkoutHtml, /Demo checkout/);
  assert.match(checkoutHtml, /NO REAL PAYMENT/);
  assert.doesNotMatch(checkoutHtml, /Your bag is empty/);
  const account = await render("/account");
  assert.match(await account.text(), /Loading your demo account/);
  const orders = await render("/orders");
  assert.match(await orders.text(), /Loading your demo orders/);
  const saved = await render("/saved");
  const savedHtml = await saved.text();
  assert.match(savedHtml, /Loading saved styles/);
  assert.doesNotMatch(savedHtml, /Nothing saved yet/);
});

test("source keeps local imagery and honest commerce boundaries", async () => {
  const [page, detail, catalog, layout, css, packageJson, checkout] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(
        new URL("../components/product-detail.tsx", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../app/checkout/page.tsx", import.meta.url), "utf8"),
    ]);
  assert.match(page, /Form follows/);
  assert.match(detail, /gallery/);
  assert.match(detail, /Size guide/);
  assert.match(catalog, /frame-02/);
  assert.match(layout, /TOVENOQ \| Form follows motion/);
  assert.doesNotMatch(`${page}\n${detail}\n${catalog}\n${layout}`, /\u2014/);
  assert.match(layout, /favicon\.svg/);
  assert.match(css, /--cognac/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /motion-reveal--pending/);
  assert.match(css, /@media print/);
  assert.match(checkout, /Place demo order/);
  assert.match(checkout, /No payment details/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + detail + catalog, /images\.unsplash\.com/);
  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
});

test("all five colourways have complete, locally present galleries", async () => {
  const catalog = await readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8");
  const images = [...catalog.matchAll(/src: "(\/images\/[^"]+\.webp)"/g)].map((match) => match[1]);
  assert.equal(images.length, 33);
  assert.equal(new Set(images).size, images.length);
  for (const label of ["Side profile", "Front view", "Rear view", "Top view", "Material detail", "In motion"]) {
    assert.equal([...catalog.matchAll(new RegExp(`label: "${label}"`, "g"))].length, 5, label);
  }
  await Promise.all(images.map(async (src) => {
    const image = await stat(new URL(`../public${src}`, import.meta.url));
    assert.ok(image.isFile() && image.size > 0, src);
  }));
});
