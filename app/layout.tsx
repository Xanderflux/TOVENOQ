import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "../components/store-provider";
import { createPageMetadata, siteTitle } from "../lib/site-metadata";

export const metadata: Metadata = {
  ...createPageMetadata(siteTitle),
  applicationName: "TOVENOQ Footwear Demo",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/brand/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/brand/favicon.ico",
    apple: { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  title: {
    default: "TOVENOQ | Form follows motion.",
    template: "%s | TOVENOQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
