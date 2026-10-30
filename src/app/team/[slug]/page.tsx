import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FounderProfile from "@/components/FounderProfile";
import JsonLd from "@/components/JsonLd";
import { founderJsonLd, founderPath, founders, organizationFoundersJsonLd } from "@/lib/founders";
import { breadcrumbJsonLd, constructMetadata, SITE_URL } from "@/lib/seo";

// Only the founders listed in src/lib/founders.ts have pages; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return founders.map((founder) => ({ slug: founder.slug }));
}

function findFounder(slug: string) {
  return founders.find((founder) => founder.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const founder = findFounder((await params).slug);
  if (!founder) return {};
  return constructMetadata({
    title: `${founder.name} | ${founder.role}, BrickBytes`,
    description: `${founder.name} is a founder and director of BrickBytes, the Jaipur company turning real estate layout plans into live, interactive plot maps for developers.`,
    path: founderPath(founder),
  });
}

export default async function FounderRoute({ params }: { params: Promise<{ slug: string }> }) {
  const founder = findFounder((await params).slug);
  const coFounder = founders.find((other) => other.slug !== founder?.slug);
  if (!founder || !coFounder) notFound();

  const path = founderPath(founder);
  return (
    <div className="relative min-h-screen">
      <JsonLd
        nodes={[
          breadcrumbJsonLd(founder.name, path),
          // ProfilePage is the schema Google reads for pages about one person.
          {
            "@type": "ProfilePage",
            url: `${SITE_URL}${path}`,
            name: `${founder.name}, ${founder.role} of BrickBytes`,
            mainEntity: founderJsonLd(founder),
          },
          organizationFoundersJsonLd,
        ]}
      />
      <main>
        <FounderProfile founder={founder} coFounder={coFounder} />
      </main>
    </div>
  );
}
