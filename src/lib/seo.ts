import { Metadata } from "next";
import { LINKEDIN_URL, OFFICE_ADDRESS, SALES_PHONE } from "./contact";

export const SITE_URL = "https://brickbytes.in";

export const SITE_DESCRIPTION =
  "BrickBytes turns your layout plan into an interactive plot map. Buyers and brokers see every plot's size, facing, price and live status in any browser.";

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

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export type JsonLdNode = Record<string, unknown>;

// Site-wide entities. The WebSite references the Organization by @id, and
// page-level nodes (breadcrumbs, services, people) do the same.
// Details mirror the office address and contact info on /contact.
// sameAs lists only social profiles confirmed as ours.
export const siteJsonLdNodes: JsonLdNode[] = [
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
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
      streetAddress: OFFICE_ADDRESS.street,
      addressLocality: OFFICE_ADDRESS.city,
      addressRegion: OFFICE_ADDRESS.region,
      postalCode: OFFICE_ADDRESS.postalCode,
      addressCountry: OFFICE_ADDRESS.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "business@brickbytes.in",
      telephone: SALES_PHONE,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [LINKEDIN_URL],
  },
  {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "BrickBytes",
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  },
];

// Home > page. The site is flat, so every inner page sits one level down.
export function breadcrumbJsonLd(name: string, path: string): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

// A product or solution page, described as a service BrickBytes provides
// (we build each project's map, then run it as software).
export function serviceJsonLd({
  name,
  description,
  path,
  areaServed = { "@type": "Country", name: "India" },
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: JsonLdNode;
}): JsonLdNode {
  return {
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed,
  };
}
