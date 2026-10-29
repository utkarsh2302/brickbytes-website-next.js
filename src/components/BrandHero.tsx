import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon from "./BrandIcon";
import SitePlan from "./SitePlan";
import { buttonPrimary, buttonSecondary } from "./ui/button";

const facts = [
  {
    icon: "pin",
    title: "A live map of your project",
    body: "Your layout plan becomes an interactive 3D map that buyers open in any browser.",
  },
  {
    icon: "layout",
    title: "Real-time availability",
    body: "Mark plots available, reserved or sold. Buyers and brokers see the change at once.",
  },
  {
    icon: "home",
    title: "A portal for your brokers",
    body: "Brokers share plots, log site visits and track their own leads in one place.",
  },
] as const;

const legend = [
  { label: "Available", swatch: "bg-white border border-ink/40" },
  { label: "Booked", swatch: "bg-bb-stone border border-ink/40" },
  { label: "Selected", swatch: "bg-bb-orange" },
];

// Homepage hero: the brand statement, then the product itself. The artwork is
// built from brand elements only: flat glass-system shapes cropped off the
// edge (Guidelines p. 20) behind a site plan in the illustration style (p. 22).
export default function BrandHero() {
  return (
    <section className="relative overflow-hidden bg-bb-paper pt-28 sm:pt-36">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[88px]">
            Every plot, <span className="block">in plain sight.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-bb-slate sm:text-xl sm:leading-relaxed">
            BrickBytes turns your layout plan into a live, interactive map of your project. Buyers and brokers see every
            plot&apos;s size, facing, price and availability, then book a site visit.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={`${buttonPrimary} py-4`}>
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="#live-map" className={`${buttonSecondary} py-4`}>
              Try the live map
            </a>
          </div>

          <p className="mt-7 text-sm text-bb-slate">
            For plotted-land developers and their brokers. Live in 10 to 14 business days.
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div aria-hidden className="pointer-events-none absolute -right-36 -top-20 w-[560px] max-w-none sm:-right-44 sm:w-[640px]">
            <div className="bg-grid-pattern absolute -inset-20 [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <Image src="/brand/glass-shapes.svg" alt="" width={600} height={600} priority className="relative w-full" />
          </div>

          <div className="relative pb-24 sm:pb-20 lg:pl-6">
            <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_32px_64px_-32px_rgb(28_26_23/0.25)] sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-[15px] font-semibold text-ink">Phase 2 layout</p>
                <ul className="flex gap-4 text-xs text-bb-slate">
                  {legend.map((item) => (
                    <li key={item.label} className="flex items-center gap-1.5">
                      <span aria-hidden className={`h-2.5 w-2.5 rounded-[2px] ${item.swatch}`} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <SitePlan className="w-full" />
            </div>

            <figure
              aria-label="Plot details card for plot C-47"
              className="absolute bottom-0 left-0 w-60 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_24px_48px_-20px_rgb(28_26_23/0.28)] sm:-left-6 sm:w-64"
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-bb-slate">Plot C-47</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink">1,800 sq ft · East</p>
              <p className="mt-2 font-mono text-sm text-ink">₹ 42,50,000</p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
                <span className="rounded-full border border-bb-available/40 px-2.5 py-1 text-bb-available">Available</span>
                <span className="rounded-full border border-ink/15 px-2.5 py-1 text-bb-slate">30 ft road</span>
              </div>
              <span aria-hidden className="mt-4 block rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-white">
                Book site visit
              </span>
            </figure>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 pb-20 sm:mt-20 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-8">
          {facts.map((fact) => (
            <li key={fact.title} className="flex flex-col gap-4">
              <BrandIcon name={fact.icon} className="h-10 w-10" />
              <h2 className="font-display text-xl font-semibold text-ink">{fact.title}</h2>
              <p className="max-w-xs text-base leading-relaxed text-bb-slate">{fact.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
