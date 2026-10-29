import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import GlassAccent from "./GlassAccent";
import SectionHeading from "./ui/SectionHeading";
import { buttonPrimary } from "./ui/button";

const steps: { icon: BrandIconName; title: string; desc: string }[] = [
  {
    icon: "layout",
    title: "Share your project details",
    desc: "Send your layout plan, plot sizes, price list and sales rules. CAD (.dwg) or PDF drawings both work.",
  },
  {
    icon: "pin",
    title: "We build your live map",
    desc: "Our team turns the layout into an interactive map, plot by plot, and adds drone and site views.",
  },
  {
    icon: "people",
    title: "Launch and start selling",
    desc: "Put the map on your website, invite your brokers and take bookings with live availability.",
  },
];

// A genuine three-step sequence, so the steps are numbered.
export default function HowItWorks() {
  return (
    <section id="process" className="relative overflow-hidden bg-bb-paper py-24 sm:py-32">
      <GlassAccent variant="circles" className="-top-56 right-0 hidden w-[460px] lg:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Live in three steps"
          lead="From your layout plan to a live map in 10 to 14 business days. Our team does the build; you review and launch."
          className="mb-14 sm:mb-20"
        />

        <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connects step 1 to step 3; ends where the third column begins */}
          <span aria-hidden className="absolute left-6 right-[calc((100%-4rem)/3)] top-6 hidden h-px bg-line md:block" />
          {steps.map((step, idx) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:gap-0">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-bb-paper font-display text-lg font-semibold text-ink">
                {idx + 1}
              </span>
              <div className="md:mt-8">
                <BrandIcon name={step.icon} className="h-10 w-10" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-bb-slate">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 sm:mt-20">
          <Link href="/contact" className={buttonPrimary}>
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
