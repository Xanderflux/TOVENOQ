import assert from "node:assert/strict";
import test from "node:test";
import { searchProducts } from "../lib/catalog.ts";

test("search matches model names and every colourway, ignoring case and whitespace", () => {
  assert.equal(searchProducts("  ").length, 4);
  assert.deepEqual(searchProducts(" espresso ").map(p => p.slug), ["axis-01"]);
  assert.deepEqual(searchProducts("BONE").map(p => p.slug), ["axis-01"]);
  assert.deepEqual(searchProducts("Stone / Ink").map(p => p.slug), ["frame-02"]);
  assert.deepEqual(searchProducts("Umber").map(p => p.slug), ["field-03"]);
  assert.deepEqual(searchProducts("Black / Clay").map(p => p.slug), ["line-04"]);
  assert.deepEqual(searchProducts("Frame 02").map(p => p.slug), ["frame-02"]);
  assert.deepEqual(searchProducts("not-a-style"), []);
});
