import { Metadata } from "next";

export const SITE_URL = "https://brickbytes.in";

export const SITE_DESCRIPTION =
  "BrickBytes turns your layout plan into an interactive 3D master plan. Buyers and brokers see every plot's size, facing, price and live status in any browser.";

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  // Generated from src/app/opengraph-image.tsx
  image = "/opengraph-image",
}: MetadataProps): Metadata {
  const fullUrl = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "BrickBytes",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// One graph so the WebSite entity can reference the Organization by @id.
// Details mirror the Registered Office and contact info on /contact.
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "BrickBytes",
      legalName: "BrickNova Technologies Private Limited",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: SITE_DESCRIPTION,
      email: "business@brickbytes.in",
      taxID: "08AAOCB6672J1Z2",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Khushi Sansar, Lakshmi Nikunj, Rampura Road, Mohanpura",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302020",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "business@brickbytes.in",
        telephone: "+91-95073-21260",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      sameAs: [
        "https://x.com/brickbytes",
        "https://linkedin.com/company/brickbytes",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "BrickBytes",
      url: SITE_URL,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
