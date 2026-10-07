import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { createPageMetadata, readSiteOrigin } from "../lib/site-metadata.ts";

test("sharing URLs require an explicitly supplied public origin", () => {
  const local = createPageMetadata("The Collection", "/shop", "Demo", "");
  assert.equal(local.metadataBase, undefined);
  assert.equal(local.alternates, undefined);
  assert.equal(local.openGraph.images, undefined);
  assert.equal(local.twitter.card, "summary");
  const configured = createPageMetadata("The Collection", "/shop", "Demo", "https://example.test");
  assert.equal(configured.alternates.canonical, "https://example.test/shop");
  assert.equal(configured.openGraph.url, "https://example.test/shop");
  assert.equal(configured.openGraph.title, "The Collection | TOVENOQ");
  assert.equal(configured.openGraph.images[0].url, "https://example.test/brand/social-card.png");
  assert.equal(configured.twitter.card, "summary_large_image");
  for (const bad of ["not a url", "http://example.test", "https://localhost", "https://example.test/path", "https://user:password@example.test", "https://example.test?x=1"]) {
    assert.throws(() => readSiteOrigin(bad), /SITE_URL must/);
  }
});

test("brand PNGs have the documented dimensions and manifest icons exist", async () => {
  const expected = [
    ["logo-mark-1024.png", 1024, 1024], ["logo-mark-light-1024.png", 1024, 1024],
    ["logo-lockup.png", 900, 180], ["social-card.png", 1200, 630],
    ["apple-touch-icon.png", 180, 180],
    ["icon-maskable-512.png", 512, 512],
    ...[16, 32, 48, 192, 512].map(size => [`icon-${size}.png`, size, size]),
  ];
  for (const [filename, width, height] of expected) {
    const png = await readFile(new URL(`../public/brand/${filename}`, import.meta.url));
    assert.equal(png.subarray(1, 4).toString(), "PNG", filename);
    assert.equal(png.readUInt32BE(16), width, filename);
    assert.equal(png.readUInt32BE(20), height, filename);
  }
  const ico = await readFile(new URL("../public/brand/favicon.ico", import.meta.url));
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  const manifest = JSON.parse(await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"));
  for (const icon of manifest.icons) {
    assert.ok((await stat(new URL(`../public${icon.src}`, import.meta.url))).size > 0);
  }
});

test("exported HTML includes branding and sharing text without fake live URLs", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  assert.match(html, /class="brand-mark"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.match(html, /\/site.webmanifest/);
  assert.match(html, /property="og:site_name" content="TOVENOQ Footwear Demo"/);
  if (!process.env.SITE_URL) {
    assert.doesNotMatch(html, /property="og:image"/);
    assert.doesNotMatch(html, /rel="canonical"/);
  } else {
    assert.ok(html.includes(new URL("/brand/social-card.png", process.env.SITE_URL).href));
  }
});
