import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FinalCTA from "./FinalCTA";
import PageHero from "./ui/PageHero";
import { buttonPrimary, buttonSecondary } from "./ui/button";
import { founderPath, type Founder } from "@/lib/founders";
import { FOUNDED } from "@/lib/seo";

const products: { label: string; href: string }[] = [
  { label: "Interactive 2D and 3D plot maps", href: "/3d-plot-viewer" },
  { label: "Plot booking with timed holds", href: "/plot-booking-software" },
  { label: "Live plot inventory", href: "/plot-inventory-management-software" },
  { label: "A broker portal on live availability", href: "/broker-portal" },
];

const cardLinkClass =
  "flex h-full items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 text-base font-semibold text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

// A founder's profile page (/team/<slug>). The bio only states facts about the
// company and its founding; add personal details here once they're confirmed.
export default function FounderProfile({ founder, coFounder }: { founder: Founder; coFounder: Founder }) {
  const firstName = founder.name.split(" ")[0];

  return (
    <>
      <PageHero
        title={founder.name}
        lead={`${founder.role} of BrickBytes, the Jaipur company that turns real estate layout plans into live, interactive plot maps.`}
        accent="circles"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonPrimary}>
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {founder.linkedIn && (
            <a href={founder.linkedIn} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
              {firstName} on LinkedIn
            </a>
          )}
        </div>
      </PageHero>

      <section aria-labelledby="bio-heading" className="relative bg-bb-paper pb-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
            {founder.photo && (
              <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-2xl bg-bb-stone sm:w-64 lg:col-span-4 lg:w-full">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of BrickBytes`}
                  fill
                  sizes="(min-width: 1024px) 352px, 256px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-5 lg:col-span-8">
              <h2 id="bio-heading" className="font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
                About {firstName}
              </h2>
              <p className="text-lg leading-relaxed text-bb-slate">
                {founder.name} is a founder and director of BrickBytes, a venture of BrickNova Technologies Private
                Limited in Jaipur. BrickBytes builds live, interactive maps of real estate projects for developers and
                their brokers.
              </p>
              <p className="text-lg leading-relaxed text-bb-slate">
                {founder.name} started BrickBytes with {coFounder.name} in {FOUNDED.monthYear}, because real estate
                projects were still sold with static PDFs, old photos and endless phone calls. Their answer is one live map that buyers, brokers and
                developers all work from, so every conversation starts from the same facts.
              </p>
              <p className="text-lg leading-relaxed text-bb-slate">
                BrickBytes takes developers of plotted developments, villa communities and apartment projects from layout
                plan to live map in 10 to 14 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="builds-heading" className="relative bg-bb-paper pb-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-line pt-12">
            <h2 id="builds-heading" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              What BrickBytes builds
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.href}>
                  <Link href={product.href} className={cardLinkClass}>
                    {product.label}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="cofounder-heading" className="relative bg-bb-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-line pt-12">
            <h2 id="cofounder-heading" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Co-founder
            </h2>
            <Link href={founderPath(coFounder)} className={`${cardLinkClass} mt-8 max-w-md`}>
              <span className="flex items-center gap-4">
                {coFounder.photo && (
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-bb-stone">
                    <Image src={coFounder.photo} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                )}
                <span className="flex flex-col">
                  {coFounder.name}
                  <span className="text-sm font-medium text-bb-slate">{coFounder.role}</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
