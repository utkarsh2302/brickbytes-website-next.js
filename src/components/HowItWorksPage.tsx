import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrandIcon, { type BrandIconName } from "./BrandIcon";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import { buttonPrimary, buttonSecondary } from "./ui/button";

const steps: {
  title: string;
  body: string;
  items: { icon: BrandIconName; label: string; detail: string }[];
}[] = [
  {
    title: "Send us your project details",
    body: "Send whatever you have. We work from CAD exports, PDF layouts and even hand-drawn sketches.",
    items: [
      { icon: "layout", label: "Layout plans", detail: "CAD (DWG) or PDF" },
      { icon: "area", label: "Plot dimensions", detail: "Sizes, facing and road widths" },
      { icon: "chart", label: "Price list and availability", detail: "Your current inventory" },
      { icon: "lock", label: "Booking rules", detail: "Terms and restrictions" },
      { icon: "pin", label: "Drone footage and site photos", detail: "If you have them" },
    ],
  },
  {
    title: "We build your live map",
    body: "Our team turns your documents into an interactive map. Every plot boundary, road width and amenity is placed to match your approved layout.",
    items: [
      { icon: "plot", label: "Interactive map", detail: "Built from your CAD or PDF layout" },
      { icon: "pin", label: "Every plot placed", detail: "Matched to your layout plan" },
      { icon: "facing", label: "Drone and site views", detail: "Aerial and ground photos, if provided" },
      { icon: "layout", label: "Live availability", detail: "Each plot shows its current status" },
      { icon: "people", label: "Broker portal", detail: "Accounts set up for your brokers" },
    ],
  },
  {
    title: "Go live and start selling",
    body: "Your map goes live. Buyers explore plots, brokers track their leads and your team runs everything from one place.",
    items: [
      { icon: "home", label: "On your website", detail: "Added with one line of code" },
      { icon: "people", label: "Broker invitations", detail: "Each broker gets portal access" },
      { icon: "plot", label: "Online reservations", detail: "Buyers reserve plots online" },
      { icon: "clock", label: "Live status updates", detail: "Every change shows at once" },
      { icon: "facing", label: "Buyer questions answered", detail: "An AI assistant replies instantly" },
    ],
  },
];

const outcomes: { icon: BrandIconName; title: string; body: string }[] = [
  { icon: "clock", title: "Faster buyer decisions", body: "Buyers see a plot's size, facing and status at once." },
  { icon: "layout", title: "A clearer picture for buyers", body: "An interactive map replaces static PDFs and brochures." },
  { icon: "lock", title: "One source of truth", body: "Prices, plot status and documents stay in sync." },
  { icon: "people", title: "Brokers sell with live data", body: "Brokers work from live availability and their own leads." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        accent="pin"
        title="From layout plan to live map"
        lead="Send us your layout plan and price list. We build an interactive map of your project, set up your brokers and take you live, usually within 10 to 14 business days."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonPrimary}>
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a href="#steps" className={buttonSecondary}>
            See each step
          </a>
        </div>
      </PageHero>

      <HowItWorks showAccent={false} />

      <section id="steps" className="relative scroll-mt-18 bg-bb-stone py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What happens at each step"
            lead="What we need from you, what we build and what you get on launch day."
          />

          <ol className="mt-16 flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-1 gap-8 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-4">
                  <p className="font-display text-sm font-semibold text-bb-slate">Step {index + 1}</p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold leading-[1.1] text-ink">{step.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-bb-slate">{step.body}</p>
                </div>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                  {step.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
                      <BrandIcon name={item.icon} className="h-8 w-8 shrink-0" />
                      <div>
                        <p className="font-display text-base font-semibold text-ink">{item.label}</p>
                        <p className="mt-1 text-sm text-bb-slate">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-b border-line bg-bb-paper py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What changes after launch" />
          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <li key={outcome.title} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <BrandIcon name={outcome.icon} className="h-10 w-10" />
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{outcome.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-bb-slate">{outcome.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ />

      <FinalCTA />
    </>
  );
}
