import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import GlassAccent from "./GlassAccent";
import SectionHeading from "./ui/SectionHeading";
import { swipeItem, swipeRow } from "./ui/swipe";

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

// Promises about the developer's data (formerly their own section).
const promises: { icon: BrandIconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Kept secure",
    body: "Layout files, prices and buyer details are shared only with the people you approve.",
  },
  {
    icon: "home",
    title: "Owned by you",
    body: "Inventory, pricing history and buyer details belong to you. We sell software, not data.",
  },
  {
    icon: "people",
    title: "You decide who sees what",
    body: "Choose what each salesperson and broker can see, and remove access at any time.",
  },
];

// The page's one Sand band: a calm statement of outcomes. Secondary text is
// ink at 80% because Slate falls just under 4.5:1 on Sand.
export default function WhyBrickBytes() {
  return (
    <section id="why-brickbytes" className="relative overflow-hidden bg-bb-sand py-16 text-ink sm:py-32">
      {/* Circles, not pin: on Sand the Sand sheets vanish, leaving the orange
          disc and its Kiln overlap */}
      <GlassAccent variant="circles" className="-right-44 -top-40 hidden w-[520px] md:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Built around how developers actually sell." />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          What changes when your sales team, brokers and buyers all work from the same live map.
        </p>

        <ul
          tabIndex={0}
          aria-label="Why developers choose BrickBytes"
          className={`mt-10 sm:mt-16 ${swipeRow("md:grid-cols-2 md:gap-5 lg:grid-cols-4")}`}
        >
          {benefits.map((benefit) => (
            <li key={benefit.title} className={`${swipeItem} flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:p-7`}>
              <BrandIcon name={benefit.icon} className="h-10 w-10" />
              <h3 className="font-display text-xl font-semibold text-ink">{benefit.title}</h3>
              <p className="text-base leading-relaxed text-bb-slate">{benefit.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-2xl font-extrabold text-ink">Your project data stays yours.</h3>
            <ul className="mt-6 space-y-5">
              {promises.map((promise) => (
                <li key={promise.title} className="flex items-start gap-4">
                  <BrandIcon name={promise.icon} className="h-8 w-8 shrink-0" />
                  <p className="text-base leading-relaxed text-bb-slate">
                    <span className="font-semibold text-ink">{promise.title}.</span> {promise.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl bg-ink p-6 text-white sm:p-8 lg:col-span-5">
            <p className="font-display text-2xl font-semibold leading-snug">
              Make every plot visible, truthful and bookable, so land sells on clarity, not pressure.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              BrickBytes is made by BrickNova Technologies in Jaipur. We build custom software for real estate developers
              and their brokers.
            </p>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-6 sm:pt-8">
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                About BrickBytes
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                See it on your own layout plan
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
