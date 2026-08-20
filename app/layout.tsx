import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alto-footwear.example"),
  title: {
    default: "ALTO — Form follows motion.",
    template: "%s — ALTO",
  },
  description: "ALTO makes considered footwear for the pace of the city.",
  openGraph: {
    title: "ALTO — Form follows motion.",
    description: "A considered running silhouette for the pace of the city.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALTO — Form follows motion.",
    description: "A considered running silhouette for the pace of the city.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
