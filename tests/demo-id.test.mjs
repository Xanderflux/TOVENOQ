import assert from "node:assert/strict";
import test from "node:test";
import { createDemoId } from "../lib/demo-id.ts";

test("demo IDs use getRandomValues and do not depend on randomUUID", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  try {
    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: {
        getRandomValues(bytes) {
          bytes.fill(0xab);
          return bytes;
        },
      },
    });
    assert.equal(createDemoId(), "ABABABABABABABAB");
  } finally {
    if (original) Object.defineProperty(globalThis, "crypto", original);
    else Reflect.deleteProperty(globalThis, "crypto");
  }
});

test("demo IDs remain usable without Web Crypto", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  try {
    Object.defineProperty(globalThis, "crypto", { configurable: true, value: undefined });
    const first = createDemoId();
    const second = createDemoId();
    assert.match(first, /^[A-F0-9]{24,}$/);
    assert.notEqual(first, second);
  } finally {
    if (original) Object.defineProperty(globalThis, "crypto", original);
    else Reflect.deleteProperty(globalThis, "crypto");
  }
});
