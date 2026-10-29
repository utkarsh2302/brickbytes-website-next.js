import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import GlassAccent from "./GlassAccent";
import SectionHeading from "./ui/SectionHeading";

const benefits: { icon: BrandIconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Buyers decide sooner",
    body: "Buyers see each plot's size, facing and surroundings on the map, so fewer questions hold up a decision.",
  },
  {
    icon: "layout",
    title: "Your project, presented well",
    body: "Show the layout on a clear, interactive map instead of paper brochures and spreadsheets.",
  },
  {
    icon: "people",
    title: "Brokers sell on their own",
    body: "Brokers see live availability and site visit schedules, so they can close bookings without calling your office.",
  },
  {
    icon: "pin",
    title: "One source of truth",
    body: "Prices, plot status and layouts live in one place, so your team, brokers and buyers see the same information.",
  },
];

// The page's one Sand band: a calm statement of outcomes. Secondary text is
// ink at 80% because Slate falls just under 4.5:1 on Sand.
export default function WhyBrickBytes() {
  return (
    <section id="why-brickbytes" className="relative overflow-hidden bg-bb-sand py-24 text-ink sm:py-32">
      {/* Circles, not pin: on Sand the Sand sheets vanish, leaving the orange
          disc and its Kiln overlap */}
      <GlassAccent variant="circles" className="-right-44 -top-40 hidden w-[520px] md:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Built around how developers actually sell." />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          What changes when your sales team, brokers and buyers all work from the same live map.
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:p-7">
              <BrandIcon name={benefit.icon} className="h-10 w-10" />
              <h3 className="font-display text-xl font-semibold text-ink">{benefit.title}</h3>
              <p className="text-base leading-relaxed text-bb-slate">{benefit.body}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-2 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          See it on your own layout plan
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
