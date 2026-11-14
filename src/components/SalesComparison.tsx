"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

const faceBase = "flex items-start gap-4 rounded-2xl border p-5 sm:p-6 [grid-area:1/1] [backface-visibility:hidden]";

function BeforeFace({ step, className = "" }: { step: Step["before"]; className?: string }) {
  const Icon = step.icon;
  return (
    <div className={`${faceBase} border-dashed border-ink/20 bg-bb-paper ${className}`}>
      <Icon className="mt-1 h-6 w-6 shrink-0 text-bb-slate" strokeWidth={1.5} aria-hidden />
      <div>
        <p className="text-sm text-bb-slate">On paper</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">{step.title}</h3>
        <p className="mt-1 text-base leading-relaxed text-bb-slate">{step.desc}</p>
      </div>
    </div>
  );
}

function AfterFace({ step, className = "" }: { step: Step["after"]; className?: string }) {
  return (
    <div
      className={`${faceBase} border-line bg-white shadow-[0_1px_2px_rgb(28_26_23/0.04),0_20px_40px_-24px_rgb(28_26_23/0.2)] ${className}`}
    >
      <BrandIcon name={step.icon} className="mt-0.5 h-7 w-7 shrink-0" />
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-ink">
          <span aria-hidden className="h-2 w-2 rounded-[2px] bg-bb-orange" />
          With BrickBytes
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">{step.title}</h3>
        <p className="mt-1 text-base leading-relaxed text-bb-slate">{step.desc}</p>
      </div>
    </div>
  );
}

// One card per step that flips, like a departure board, from the paper way
// to the BrickBytes way as it crosses the middle of the screen. Both faces
// stay in the HTML, so search engines and screen readers get the full pair.
function FlipCard({ step }: { step: Step }) {
  const card = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: card, offset: ["start 80%", "start 40%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <li ref={card} className="[perspective:1400px]">
      <motion.div style={{ rotateX }} className="grid [transform-style:preserve-3d]">
        <BeforeFace step={step.before} />
        <AfterFace step={step.after} className="[transform:rotateX(180deg)]" />
      </motion.div>
    </li>
  );
}

// With reduced motion the pair sits side by side instead of flipping.
function StaticPair({ step }: { step: Step }) {
  return (
    <li className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="grid">
        <BeforeFace step={step.before} />
      </div>
      <div className="grid">
        <AfterFace step={step.after} />
      </div>
    </li>
  );
}

export default function SalesComparison() {
  const reducedMotion = useReducedMotion();

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
          {steps.map((step) =>
            reducedMotion ? <StaticPair key={step.after.title} step={step} /> : <FlipCard key={step.after.title} step={step} />,
          )}
        </ul>
      </div>
    </section>
  );
}
