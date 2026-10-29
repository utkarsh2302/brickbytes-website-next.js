import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQ, { type Faq } from "./FAQ";
import FinalCTA from "./FinalCTA";
import JsonLd from "./JsonLd";
import PageHero from "./ui/PageHero";
import { buttonPrimary, buttonSecondary } from "./ui/button";
import { breadcrumbJsonLd, type JsonLdNode } from "@/lib/seo";

export type LandingSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type LandingPageContent = {
  // Short page name, used in the breadcrumb trail
  name: string;
  path: string;
  title: string;
  lead: string;
  sections: LandingSection[];
  faqs: Faq[];
  related: { label: string; href: string }[];
};

// Template for the topic pages (products, project types, Jaipur, guides): a
// hero, plain text sections, questions about this page's topic, related pages
// and the closing call to action. Each route supplies its own copy and schema;
// `children` (e.g. a comparison table) sits between the hero and the sections.
export default function LandingPage({
  content,
  schema,
  children,
}: {
  content: LandingPageContent;
  schema: JsonLdNode[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <JsonLd nodes={[breadcrumbJsonLd(content.name, content.path), ...schema]} />

      <PageHero title={content.title} lead={content.lead}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonPrimary}>
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/#live-map" className={buttonSecondary}>
            Try the live map
          </Link>
        </div>
      </PageHero>

      {children}

      <section className="relative bg-bb-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {content.sections.map((section) => (
            <div
              key={section.title}
              className="grid grid-cols-1 gap-6 border-t border-line py-16 sm:py-20 lg:grid-cols-12 lg:gap-16"
            >
              <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl lg:col-span-5">
                {section.title}
              </h2>
              <div className="space-y-5 lg:col-span-7">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-bb-slate">
                    {paragraph}
                  </p>
                ))}
                {section.points && (
                  <ul className="flex flex-col gap-3 pt-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-ink">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bb-orange" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ items={content.faqs} />

      <section aria-labelledby="read-next" className="relative bg-bb-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-line pt-12">
            <h2 id="read-next" className="font-display text-xl font-semibold text-ink">
              Read next
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {content.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex h-full items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 text-base font-semibold text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
