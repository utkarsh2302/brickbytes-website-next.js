import { ArrowRight, Clock, FileSpreadsheet, Phone, Scroll, TrendingDown, type LucideIcon } from "lucide-react";
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
      desc: "Buyers rely on PDFs and printouts that are hard to read and quickly out of date.",
    },
    after: {
      icon: "pin",
      title: "Explore the project online",
      desc: "Buyers move around the layout, filter plots and see boundaries on an interactive map.",
    },
  },
  {
    before: {
      icon: Phone,
      title: "Calls and follow-ups",
      desc: "Your team answers the same availability, price and plot questions by phone.",
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
      title: "Spreadsheet updates",
      desc: "Inventory changes travel by spreadsheet, email and group chat.",
    },
    after: {
      icon: "people",
      title: "Answers at any hour",
      desc: "Buyers get accurate project details whenever they look, without waiting for a call back.",
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
      title: "Every plot's details",
      desc: "Size, facing, road width, dimensions and status are on screen for each plot.",
    },
  },
  {
    before: {
      icon: TrendingDown,
      title: "Lost bookings",
      desc: "Mix-ups and out-of-date inventory cost you buyers.",
    },
    after: {
      icon: "chart",
      title: "Faster decisions",
      desc: "With clear information up front, buyers decide sooner and with more confidence.",
    },
  },
];

function BeforeCard({ step }: { step: Step["before"] }) {
  const Icon = step.icon;
  return (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-line p-5 sm:p-6">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-bb-slate" strokeWidth={1.5} aria-hidden />
      <div>
        <h4 className="font-display text-lg font-semibold text-ink">{step.title}</h4>
        <p className="mt-1 text-base leading-relaxed text-bb-slate">{step.desc}</p>
      </div>
    </div>
  );
}

function AfterCard({ step }: { step: Step["after"] }) {
  return (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-colors group-hover:border-bb-orange/50 sm:p-6">
      <BrandIcon name={step.icon} className="h-7 w-7 shrink-0" />
      <div>
        <h4 className="font-display text-lg font-semibold text-ink">{step.title}</h4>
        <p className="mt-1 text-base leading-relaxed text-bb-slate">{step.desc}</p>
      </div>
    </div>
  );
}

export default function SalesComparison() {
  return (
    <section id="comparison" className="relative bg-bb-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How the sales process changes, step by step."
          lead="Each part of the paper process, next to what replaces it when your project runs on BrickBytes."
          className="mb-14 sm:mb-16"
        />

        {/* Desktop: paired rows */}
        <div className="hidden lg:block">
          <div className="mb-5 grid grid-cols-[1fr_3rem_1fr] text-sm font-medium text-bb-slate">
            <p>Selling on paper</p>
            <span />
            <p>With BrickBytes</p>
          </div>
          <ul className="space-y-4">
            {steps.map((step) => (
              <li key={step.after.title} className="group grid grid-cols-[1fr_3rem_1fr] items-stretch">
                <BeforeCard step={step.before} />
                <div className="flex items-center justify-center">
                  <ArrowRight
                    className="h-5 w-5 text-bb-slate transition-colors group-hover:text-bb-orange"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <AfterCard step={step.after} />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile and tablet: two lists */}
        <div className="space-y-12 lg:hidden">
          <div>
            <h3 className="mb-5 font-display text-xl font-semibold text-ink">Selling on paper</h3>
            <ul className="space-y-3">
              {steps.map((step) => (
                <li key={step.before.title}>
                  <BeforeCard step={step.before} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 font-display text-xl font-semibold text-ink">With BrickBytes</h3>
            <ul className="space-y-3">
              {steps.map((step) => (
                <li key={step.after.title}>
                  <AfterCard step={step.after} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 rounded-2xl bg-bb-stone p-6 sm:flex-row sm:items-center sm:p-8">
          <BrandIcon name="clock" className="h-10 w-10 shrink-0" />
          <p className="text-lg leading-relaxed text-ink">
            Buyers check a plot&apos;s size, facing, price and status themselves, at any time of day, before they ever pick
            up the phone.
          </p>
        </div>
      </div>
    </section>
  );
}
