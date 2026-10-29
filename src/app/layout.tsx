import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { constructMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata({
  title: "BrickBytes | Turn Layout Plans into Digital Sales Experiences",
  description: "Luxury interactive subdivision and plot visualization for real-estate developers and builders.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#ff5e13",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrickBytes",
    "url": "https://brickbytes.in",
    "logo": "https://brickbytes.in/icon-512.png",
    "description": "Luxury interactive subdivision and plot visualization for real-estate developers and builders.",
    "sameAs": [
      "https://x.com/brickbytes",
      "https://linkedin.com/company/brickbytes"
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
