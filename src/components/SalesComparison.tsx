"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, FileSpreadsheet, Phone, Scroll, TrendingDown, type LucideIcon } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SectionHeading from "./ui/SectionHeading";

type Step = {
  before: { icon: LucideIcon; title: string; desc: string };
  after: { icon: BrandIconName; title: string; desc: string };
};

// Each row pairs a step of the paper process with what replaces it.
const steps: Step[] = [
  {
    before: {
      icon: Scroll,
      title: "Printed layout plans",
      desc: "Buyers squint at PDFs and printouts that are hard to read and quickly out of date.",
    },
    after: {
      icon: "pin",
      title: "Explore the project online",
      desc: "Buyers move around the layout, filter plots and see each plot's boundaries on an interactive map.",
    },
  },
  {
    before: {
      icon: Phone,
      title: "The same questions, on every call",
      desc: "Your team answers the same availability, price and plot questions by phone, all day.",
    },
    after: {
      icon: "layout",
      title: "Real-time availability",
      desc: "Plot status updates everywhere at once, so nobody asks about a plot that is gone.",
    },
  },
  {
    before: {
      icon: FileSpreadsheet,
      title: "Scattered information",
      desc: "Prices and plot status travel by spreadsheet, email and group chats that never quite agree.",
    },
    after: {
      icon: "chart",
      title: "One source of truth",
      desc: "Prices, plot status, facing and documents stay in sync for your team, brokers and buyers.",
    },
  },
  {
    before: {
      icon: Clock,
      title: "Slow decisions",
      desc: "Buyers wait days for information or a site visit before they decide.",
    },
    after: {
      icon: "area",
      title: "Every plot's details, any hour",
      desc: "Size, facing, road width and status are on screen for each plot, whenever buyers look.",
    },
  },
  {
    before: {
      icon: TrendingDown,
      title: "Lost bookings",
      desc: "Double bookings and out-of-date inventory cost you buyers.",
    },
    after: {
      icon: "clock",
      title: "Faster, surer bookings",
      desc: "With clear information up front, buyers decide sooner and with more confidence.",
    },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// One card per step: the paper way on top, crossed out, and what replaces it
// below. When the card comes into view the line draws through the paper way
// and the answer settles in, once. Only opacity and transforms animate, so it
// behaves the same in every browser, and nothing is ever left half-done.
function StepCard({ step, still }: { step: Step; still: boolean }) {
  const Icon = step.before.icon;
  return (
    <motion.li
      initial={still ? "shown" : "waiting"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_20px_40px_-28px_rgb(28_26_23/0.2)] sm:p-6"
    >
      <div className="flex items-start gap-3 text-bb-slate">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
        <div className="min-w-0">
          <p className="relative inline text-sm sm:text-base">
            <span className="sr-only">On paper: </span>
            {step.before.title}
            <motion.span
              aria-hidden
              variants={{ waiting: { scaleX: 0 }, shown: { scaleX: 1 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0 top-1/2 h-[1.5px] origin-left bg-bb-slate/70"
            />
          </p>
          <p className="mt-1 hidden text-sm leading-relaxed text-bb-slate/80 sm:block">{step.before.desc}</p>
        </div>
      </div>

      {/* The answer moves into place but is never faded: text that only reaches
          full contrast after scrolling fails readers who haven't scrolled yet. */}
      <motion.div
        variants={{ waiting: { y: 8 }, shown: { y: 0 } }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
        className="mt-4 flex items-start gap-4 border-t border-dashed border-ink/15 pt-4"
      >
        <motion.span
          variants={{ waiting: { scale: 0.6 }, shown: { scale: 1 } }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="block shrink-0"
        >
          <BrandIcon name={step.after.icon} className="h-8 w-8" />
        </motion.span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            <span className="sr-only">With BrickBytes: </span>
            {step.after.title}
          </h3>
          <p className="mt-1 text-base leading-relaxed text-bb-slate">{step.after.desc}</p>
        </div>
      </motion.div>
    </motion.li>
  );
}

export default function SalesComparison() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section id="comparison" className="relative bg-bb-paper py-16 text-ink sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              title="Selling plots shouldn't depend on PDFs and endless calls."
              lead="Brochures, phone calls and spreadsheets leave buyers guessing and keep your team repeating the same answers. Here is what replaces each of them."
            />
            <div className="mt-10 hidden items-start gap-4 rounded-2xl bg-bb-stone p-6 lg:flex">
              <BrandIcon name="clock" className="h-9 w-9 shrink-0" />
              <p className="text-base leading-relaxed text-ink">
                Buyers check a plot&apos;s size, facing, price and status themselves, at any time of day, before they ever
                pick up the phone.
              </p>
            </div>
          </div>
        </div>

        <ul className="space-y-4 lg:col-span-7">
          {steps.map((step) => (
            <StepCard key={step.after.title} step={step} still={reducedMotion} />
          ))}
        </ul>
      </div>
    </section>
  );
}
