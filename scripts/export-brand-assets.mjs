// Optional asset-authoring command; not part of the application build.
// Uses sharp already present in the current vinext dependency tree.
import { readFile, writeFile } from "node:fs/promises";
const { default: sharp } = await import(process.env.BRAND_SHARP_MODULE || "sharp");

const dir = new URL("../public/brand/", import.meta.url);
const mark = await readFile(new URL("logo-mark.svg", dir), "utf8");
const whiteMark = mark.replaceAll('#1b1b19', '#f7f5f0');
await writeFile(new URL("logo-mark-light.svg", dir), whiteMark);
await sharp(Buffer.from(mark)).resize(1024, 1024).png().toFile(new URL("logo-mark-1024.png", dir).pathname);
await sharp(Buffer.from(whiteMark)).resize(1024, 1024).png().toFile(new URL("logo-mark-light-1024.png", dir).pathname);

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="#f7f5f0"/>${mark.replace(/<title>.*?<\/title>/, '').replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</svg>`;
await writeFile(new URL("icon.svg", dir), iconSvg);
for (const size of [16, 32, 48, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
  await sharp(Buffer.from(iconSvg)).resize(size, size).png().toFile(new URL(name, dir).pathname);
}
// ICO with PNG entries: 16, 32 and 48px; modern browsers also receive PNG/SVG links.
const entries = await Promise.all([16, 32, 48].map(size => readFile(new URL(`icon-${size}.png`, dir))));
const icoHeader = Buffer.alloc(6 + 16 * entries.length);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(entries.length, 4);
let offset = icoHeader.length;
entries.forEach((entry, i) => {
  const base = 6 + i * 16;
  icoHeader[base] = icoHeader[base + 1] = [16, 32, 48][i];
  icoHeader.writeUInt16LE(1, base + 4);
  icoHeader.writeUInt16LE(32, base + 6);
  icoHeader.writeUInt32LE(entry.length, base + 8);
  icoHeader.writeUInt32LE(offset, base + 12);
  offset += entry.length;
});
await writeFile(new URL("favicon.ico", dir), Buffer.concat([icoHeader, ...entries]));
await writeFile(new URL("../favicon.ico", dir), Buffer.concat([icoHeader, ...entries]));
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="#f7f5f0"/><g transform="translate(44.8 44.8) scale(.65)">${mark.replace(/<title>.*?<\/title>/, '').replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g></svg>`;
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile(new URL("icon-maskable-512.png", dir).pathname);

const symbol = mark.replace(/<title>.*?<\/title>/, '').replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>');
const lockup = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="180" viewBox="0 0 900 180"><g transform="translate(10 10) scale(.625)">${symbol}</g><text x="188" y="116" font-family="Arial, sans-serif" font-weight="700" font-size="94" letter-spacing="-5" fill="#1b1b19">TOVENOQ</text></svg>`;
await writeFile(new URL("logo-lockup.svg", dir), lockup);
await sharp(Buffer.from(lockup)).png().toFile(new URL("logo-lockup.png", dir).pathname);

const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f5f0"/><path d="M72 80h1056M72 550h1056" stroke="#d6d1c7"/><text x="76" y="125" font-family="monospace" font-size="16" letter-spacing="3" fill="#56534d">FOOTWEAR / INTERACTIVE DEMO</text><g transform="translate(800 190) scale(1.1)">${symbol}</g><text x="72" y="283" font-family="Arial, sans-serif" font-weight="700" font-size="102" letter-spacing="-5" fill="#1b1b19">TOVENOQ</text><text x="76" y="355" font-family="Georgia, serif" font-size="42" fill="#1b1b19">Form follows motion.</text><text x="76" y="485" font-family="Arial, sans-serif" font-size="19" fill="#56534d">Concept footwear. Fictional funds. Nothing charged.</text><rect x="76" y="389" width="52" height="5" fill="#9b5935"/></svg>`;
await writeFile(new URL("social-card.svg", dir), social);
await sharp(Buffer.from(social)).png().toFile(new URL("social-card.png", dir).pathname);
console.log("Exported transparent logos, six icon sizes, ICO and 1200×630 social card.");
