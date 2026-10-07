import type { Metadata } from "next";

export const siteTitle = "TOVENOQ | Form follows motion.";
export const siteDescription = "Explore a fictional footwear storefront: considered silhouettes, simulated funds and browser-local orders. No real purchases or shipping.";

export function readSiteOrigin(value?: string): URL | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password ||
        url.pathname !== "/" || url.search || url.hash ||
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
      throw new Error("invalid origin");
    }
    return url;
  } catch {
    throw new Error("SITE_URL must be a public HTTPS origin with no credentials, path, query or fragment.");
  }
}

export function createPageMetadata(
  title: string,
  pathname?: string,
  description = siteDescription,
  siteUrl = process.env.SITE_URL,
): Metadata {
  const origin = readSiteOrigin(siteUrl);
  const url = origin && pathname ? new URL(pathname, origin).href : undefined;
  const image = origin ? new URL("/brand/social-card.png", origin).href : undefined;
  const socialTitle = pathname && pathname !== "/" ? `${title} | TOVENOQ` : title;
  return {
    title: pathname === "/" ? { absolute: title } : title,
    description,
    ...(origin ? { metadataBase: origin } : {}),
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      siteName: "TOVENOQ Footwear Demo",
      locale: "en_US",
      ...(url ? { url } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, type: "image/png", alt: "TOVENOQ. Form follows motion. Fictional footwear storefront demo." }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      ...(image ? { images: [{ url: image, alt: "TOVENOQ footwear demo" }] } : {}),
    },
  };
}
