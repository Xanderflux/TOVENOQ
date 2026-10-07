// Demo references are not credentials. getRandomValues works on LAN HTTP pages,
// where randomUUID may be unavailable because the context is not secure.
let fallbackCounter = 0;

export function createDemoId(): string {
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const bytes = new Uint8Array(8);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  // A last-resort, non-security fallback keeps fictional purchases usable in
  // browsers without Web Crypto; the counter avoids same-millisecond repeats.
  fallbackCounter = (fallbackCounter + 1) % 0x10000;
  return `${Date.now().toString(16).padStart(12, "0")}${fallbackCounter.toString(16).padStart(4, "0")}${Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, "0")}`.toUpperCase();
}
