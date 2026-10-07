import assert from "node:assert/strict";
import test from "node:test";
import {
  addDemoFunds,
  advanceDemoTracking,
  emptyDemoAccount,
  parseDemoAmount,
  placeDemoPurchase,
  readDemoAccount,
} from "../lib/demo-commerce.ts";

const createdAt = "2026-09-25T12:00:00.000Z";
const shoe = {
  productSlug: "axis-01",
  productName: "Axis 01",
  colourName: "Bone / Carbon",
  size: "42",
  quantity: 1,
  unitPriceCents: 24_500,
  imageSrc: "/images/axis-01-side.webp",
};

test("demo funding accepts exact cents, $10 and $100,000 but no invalid values", () => {
  assert.equal(parseDemoAmount("10"), 1000);
  assert.equal(parseDemoAmount("100,000"), 10_000_000);
  assert.equal(parseDemoAmount("0.01"), 1);
  for (const value of ["0", "100000.01", "-10", "10.001", "1e5", "NaN"]) {
    assert.equal(parseDemoAmount(value), null, value);
  }
});

test("funding, purchase, receipt snapshot and tracking are local ledger math", () => {
  const funded = addDemoFunds(emptyDemoAccount(), 100_000, "TOP-1", createdAt);
  assert.equal(funded.ok, true);
  if (!funded.ok) return;
  const bought = placeDemoPurchase(funded.value, [shoe], "TVQ-1", createdAt);
  assert.equal(bought.ok, true);
  if (!bought.ok) return;
  assert.equal(bought.value.account.balanceCents, 75_500);
  assert.equal(bought.value.order.totalCents, 24_500);
  assert.equal(bought.value.order.lines[0].productName, "Axis 01");
  assert.equal(bought.value.account.orders.length, 1);
  const advanced = advanceDemoTracking(bought.value.account, "TVQ-1");
  assert.equal(advanced.orders[0].trackingStep, 1);
  assert.equal(bought.value.account.orders[0].trackingStep, 0);
  let delivered = advanced;
  for (let step = 0; step < 5; step++) delivered = advanceDemoTracking(delivered, "TVQ-1");
  assert.equal(delivered.orders[0].trackingStep, 3);
  assert.deepEqual(readDemoAccount(JSON.parse(JSON.stringify(advanced))), advanced);
});

test("orders cannot overdraw or use an empty bag", () => {
  const account = emptyDemoAccount();
  assert.deepEqual(placeDemoPurchase(account, [shoe], "TVQ-1", createdAt), {
    ok: false,
    error: "Not enough demo funds. Add funds to continue.",
  });
  assert.equal(placeDemoPurchase(account, [], "TVQ-2", createdAt).ok, false);
  assert.equal(account.orders.length, 0);
  assert.equal(addDemoFunds(account, 10_000_001, "TOP-2", createdAt).ok, false);
});

test("malformed stored account data is ignored rather than displayed", () => {
  assert.deepEqual(readDemoAccount({ balanceCents: 100_000, funding: [], orders: [] }), emptyDemoAccount());
  assert.deepEqual(readDemoAccount({ funding: "bad", orders: [] }), emptyDemoAccount());
  const funded = addDemoFunds(emptyDemoAccount(), 1000, "TOP-1", createdAt);
  assert.equal(funded.ok, true);
  if (!funded.ok) return;
  assert.deepEqual(readDemoAccount({ ...funded.value, balanceCents: 9_999_999 }), funded.value);
});
