import { ORGANIZATION_ID, SITE_URL, type JsonLdNode } from "./seo";

export type Founder = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  photo?: string;
  linkedIn?: string;
};

// Shown on /about and on each founder's profile page (/team/<slug>).
// Add `photo: "/team/<name>.webp"` (portrait, at least 800×1000) to show a
// photo instead of the brand monogram.
export const founders: Founder[] = [
  {
    slug: "utkarsh-sharma",
    name: "Utkarsh Sharma",
    initials: "US",
    role: "Founder & Director",
    photo: "/team/utkarsh-sharma.webp",
    linkedIn: "https://www.linkedin.com/in/utkarsh-sharma232002",
  },
  {
    slug: "rashika-verma",
    name: "Rashika Verma",
    initials: "RV",
    role: "Founder & Director",
    photo: "/team/rashika-verma.webp",
    linkedIn: "https://www.linkedin.com/in/rashika-verma-313468270",
  },
];

export function founderPath(founder: Founder) {
  return `/team/${founder.slug}`;
}

// Both names are common, so search engines and AI answers need every page
// to describe the same person: one @id per founder, set on their profile URL.
function founderId(founder: Founder) {
  return `${SITE_URL}${founderPath(founder)}#person`;
}

export function founderJsonLd(founder: Founder): JsonLdNode {
  const url = `${SITE_URL}${founderPath(founder)}`;
  return {
    "@type": "Person",
    "@id": founderId(founder),
    name: founder.name,
    jobTitle: founder.role,
    url,
    ...(founder.photo && { image: `${SITE_URL}${founder.photo}` }),
    ...(founder.linkedIn && { sameAs: [founder.linkedIn] }),
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

// Adds `founder` to the site-wide Organization node (merged by @id).
export const organizationFoundersJsonLd: JsonLdNode = {
  "@id": ORGANIZATION_ID,
  founder: founders.map((founder) => ({ "@id": founderId(founder) })),
};
