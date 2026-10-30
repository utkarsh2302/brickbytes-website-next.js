import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { breadcrumbJsonLd, constructMetadata, SITE_URL } from "@/lib/seo";

const path = "/guides";

export const metadata: Metadata = constructMetadata({
  title: "Guides for Real Estate Developers | BrickBytes",
  description:
    "Practical guides for developers selling plotted projects, villas and apartments: selling plots online, stopping double bookings, choosing software and more.",
  path,
});

// Newest first. Add each new guide here, in the footer and in the sitemap.
const guides: { title: string; summary: string; href: string }[] = [
  {
    title: "How to choose plot booking software",
    summary: "The questions to ask in a demo, from live inventory to who owns your data.",
    href: "/choose-plot-booking-software",
  },
  {
    title: "How to market a plotted development",
    summary: "What plot buyers weigh, and how to turn enquiries into site visits.",
    href: "/plotted-development-marketing",
  },
  {
    title: "How to sell plots online",
    summary: "Put a whole layout online, so buyers see what's left, what it costs and how to reserve it.",
    href: "/how-to-sell-plots-online",
  },
  {
    title: "How to stop double booking plots across brokers",
    summary: "Why the same plot gets promised twice, and the five rules that stop it.",
    href: "/stop-double-booking-plots",
  },
  {
    title: "How to turn a layout plan into an interactive plot map",
    summary: "What to prepare, how plots are drawn and how to keep the map current.",
    href: "/layout-plan-to-interactive-map",
  },
  {
    title: "Interactive plot map vs PDF layout plan",
    summary: "What changes when your PDF layout becomes a live map.",
    href: "/interactive-plot-map-vs-pdf",
  },
];

const guideListJsonLd = {
  "@type": "ItemList",
  name: "BrickBytes guides",
  itemListElement: guides.map((guide, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: guide.title,
    url: `${SITE_URL}${guide.href}`,
  })),
};

export default function GuidesRoute() {
  return (
    <div className="relative min-h-screen">
      <JsonLd nodes={[breadcrumbJsonLd("Guides", path), guideListJsonLd]} />
      <main>
        <PageHero
          title="Guides for real estate developers"
          lead="Practical guides on selling plotted projects, villas and apartments: from putting your layout online to keeping brokers on the same live availability."
        />

        <section aria-labelledby="all-guides" className="relative bg-bb-paper pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="all-guides" className="sr-only">
              All guides
            </h2>
            <ul className="grid grid-cols-1 gap-4 border-t border-line pt-12 md:grid-cols-2">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-8"
                  >
                    <span className="font-display text-xl font-semibold text-ink">{guide.title}</span>
                    <span className="text-base leading-relaxed text-bb-slate">{guide.summary}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-ink">
                      Read the guide
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCTA />
      </main>
    </div>
  );
}
