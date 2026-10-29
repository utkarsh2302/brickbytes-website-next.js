import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { constructMetadata, SITE_DESCRIPTION, siteJsonLdNodes } from "@/lib/seo";

// Brand type (Guidelines p. 18): Plus Jakarta Sans for display, Inter for
// body, DM Mono for plot facts.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata({
  title: "Interactive Plot Maps for Real Estate Developers | BrickBytes",
  description: SITE_DESCRIPTION,
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${jakarta.variable} ${inter.variable} ${dmMono.variable} antialiased`}
      >
        <JsonLd nodes={siteJsonLdNodes} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
