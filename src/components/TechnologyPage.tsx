import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SitePlan from "./SitePlan";
import FinalCTA from "./FinalCTA";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import { buttonPrimary, buttonSecondary } from "./ui/button";

const mockCard =
  "rounded-3xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_24px_48px_-24px_rgb(28_26_23/0.18)] sm:p-6";

/* Product mock-ups: sample data in the brand's plan and plot-fact style */

function ExplorerMock() {
  const filters = [
    { label: "Available", active: false },
    { label: "East facing", active: true },
    { label: "30 ft road", active: false },
  ];
  return (
    <figure aria-label="Example project map with plot filters" className={mockCard}>
      <div className="mb-4 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
        {filters.map((filter) => (
          <span
            key={filter.label}
            className={`rounded-full border px-2.5 py-1 ${
              filter.active ? "border-ink bg-ink text-white" : "border-ink/15 text-ink"
            }`}
          >
            {filter.label}
          </span>
        ))}
      </div>
      <SitePlan className="w-full" />
    </figure>
  );
}

const statusDot = {
  available: "bg-bb-available",
  hold: "bg-bb-hold",
  booked: "bg-bb-booked",
} as const;

function InventoryMock() {
  const rows = [
    { plot: "C-45", facts: "180 sq yd · North", status: "Available", tone: "available" },
    { plot: "C-46", facts: "200 sq yd · East", status: "On hold", tone: "hold" },
    { plot: "C-48", facts: "220 sq yd · East", status: "Booked", tone: "booked" },
  ] as const;
  const split = [
    { label: "Booked", count: 34, tone: "booked" },
    { label: "On hold", count: 7, tone: "hold" },
    { label: "Available", count: 19, tone: "available" },
  ] as const;
  return (
    <figure aria-label="Example live inventory view" className={mockCard}>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-[15px] font-semibold text-ink">Phase 2 inventory</p>
        <p className="font-mono text-xs text-bb-slate">60 PLOTS</p>
      </div>
      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full" aria-hidden>
        {split.map((part) => (
          <span key={part.label} className={statusDot[part.tone]} style={{ width: `${(part.count / 60) * 100}%` }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-bb-slate">
        {split.map((part) => (
          <li key={part.label} className="flex items-center gap-1.5">
            <span aria-hidden className={`h-2 w-2 rounded-full ${statusDot[part.tone]}`} />
            {part.label} <span className="font-mono text-xs text-ink">{part.count}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <li key={row.plot} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-bb-slate">Plot {row.plot}</p>
              <p className="font-mono text-sm text-ink">{row.facts}</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-ink/15 px-2.5 py-1 text-sm text-ink">
              <span aria-hidden className={`h-2 w-2 rounded-full ${statusDot[row.tone]}`} />
              {row.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-ink">Hold C-46 for a site visit</p>
        <span aria-hidden className="flex h-6 w-11 items-center rounded-full bg-ink p-0.5">
          <span className="ml-auto h-5 w-5 rounded-full bg-white" />
        </span>
      </div>
    </figure>
  );
}

function AssistantMock() {
  const messages: { from: "buyer" | "assistant"; text: React.ReactNode }[] = [
    { from: "buyer", text: "Which way does plot C-47 face?" },
    {
      from: "assistant",
      text: (
        <>
          East. It&apos;s <span className="font-mono text-sm">200 sq yd</span> on a{" "}
          <span className="font-mono text-sm">30 ft</span> road.
        </>
      ),
    },
    { from: "buyer", text: "What does it cost?" },
    {
      from: "assistant",
      text: (
        <>
          <span className="font-mono text-sm">₹ 42,50,000</span>. It&apos;s available, so you can book a site visit.
        </>
      ),
    },
  ];
  return (
    <figure aria-label="Example buyer conversation with the assistant" className={mockCard}>
      <p className="font-display text-[15px] font-semibold text-ink">Questions about Phase 2</p>
      <ul className="mt-4 flex flex-col gap-3">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
              message.from === "buyer"
                ? "self-end rounded-br-md bg-bb-stone text-ink"
                : "self-start rounded-bl-md border border-line bg-white text-ink"
            }`}
          >
            {message.text}
          </li>
        ))}
      </ul>
    </figure>
  );
}

function ControlMock() {
  const tiles = [
    { label: "Booked", value: "34" },
    { label: "On hold", value: "7" },
    { label: "Available", value: "19" },
  ];
  const months = [
    { month: "MAY", bookings: 30 },
    { month: "JUN", bookings: 45 },
    { month: "JUL", bookings: 40 },
    { month: "AUG", bookings: 62 },
    { month: "SEP", bookings: 70 },
    { month: "OCT", bookings: 88 },
  ];
  return (
    <figure aria-label="Example developer dashboard" className={mockCard}>
      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-2xl bg-bb-paper p-4">
            <p className="text-sm text-bb-slate">{tile.label}</p>
            <p className="mt-1 font-mono text-2xl text-ink">{tile.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-line p-4">
        <p className="text-sm text-bb-slate">Bookings per month</p>
        <div className="mt-4 flex h-28 items-end gap-3" aria-hidden>
          {months.map((item, index) => (
            <div key={item.month} className="flex h-full flex-1 flex-col justify-end gap-2">
              <span
                className={index === months.length - 1 ? "bg-bb-orange" : "bg-bb-sand"}
                style={{ height: `${item.bookings}%` }}
              />
              <span className="text-center font-mono text-[11px] text-bb-slate">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

const capabilities: {
  id: string;
  icon: BrandIconName;
  title: string;
  lead: string;
  features: string[];
  mock: React.ReactNode;
  // The page that covers this part in depth
  more?: { label: string; href: string };
}[] = [
  {
    id: "explore",
    icon: "pin",
    title: "An interactive map for buyers",
    lead: "Buyers move around your layout, filter plots and open any plot to see its size, facing, road width and status.",
    features: [
      "Zoom and pan across the whole layout",
      "Filter plots by availability, facing and size",
      "Plot boundaries drawn from your approved plan",
      "Drone and ground photos of the site",
    ],
    mock: <ExplorerMock />,
    more: { label: "More on the 3D plot viewer", href: "/3d-plot-viewer" },
  },
  {
    id: "inventory",
    icon: "layout",
    title: "Live plot inventory",
    lead: "Change a plot's status once and everyone sees it straight away. Hold plots, release them and keep prices in one place.",
    features: [
      "Status changes reach every buyer and broker at once",
      "One list of prices and availability",
      "Hold and release plots in a click",
      "Reservation documents generated for you",
    ],
    mock: <InventoryMock />,
    more: { label: "More on plot inventory management", href: "/plot-inventory-management-software" },
  },
  {
    id: "assistant",
    icon: "facing",
    title: "Instant answers for buyers",
    lead: "An AI assistant answers buyer questions about any plot from your own project data, such as facing, road width, size and price.",
    features: [
      "Answers plot questions at any hour",
      "Draws on your current layout, prices and plot status",
      "Points buyers to the right plot on the map",
      "Your project data stays private to you",
    ],
    mock: <AssistantMock />,
  },
  {
    id: "control",
    icon: "chart",
    title: "A control center for your team",
    lead: "Manage the master plan, allocate plots, oversee your brokers and follow sales, all from one screen.",
    features: [
      "Inventory tools for your sales team",
      "Broker and team oversight",
      "Sales reports by project and phase",
      "A clear view of booked, held and open plots",
    ],
    mock: <ControlMock />,
    more: { label: "More on the broker portal", href: "/broker-portal" },
  },
];

const benefits: { icon: BrandIconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Faster buyer decisions",
    body: "Buyers see a plot's size, facing and status at once, so fewer questions stand between them and a booking.",
  },
  {
    icon: "home",
    title: "A clearer presentation",
    body: "Show your layout on an interactive map instead of paper brochures and spreadsheets.",
  },
  {
    icon: "people",
    title: "Brokers who can sell on their own",
    body: "Brokers see live availability and visit schedules, so they can close bookings without calling your office.",
  },
  {
    icon: "lock",
    title: "One source of truth",
    body: "Prices, plot status and layouts stay in sync in one place, so nobody works from an old list.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        accent="circles"
        title="Plot layout software for your whole project"
        lead="BrickBytes gives you four connected tools: an interactive map for buyers, live plot inventory, instant answers to buyer questions and a control center for your team and brokers."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonPrimary}>
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a href="#explore" className={buttonSecondary}>
            See the four parts
          </a>
        </div>
      </PageHero>

      {capabilities.map((capability, index) => {
        const onStone = index % 2 === 0;
        return (
          <section
            key={capability.id}
            id={capability.id}
            className={`relative scroll-mt-18 py-24 sm:py-32 ${onStone ? "bg-bb-stone" : "bg-bb-paper"}`}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={index % 2 === 1 ? "lg:order-last" : ""}>
                <BrandIcon name={capability.icon} className="mb-6 h-10 w-10" />
                <SectionHeading title={capability.title} lead={capability.lead} />
                <ul className="mt-8 flex flex-col gap-3">
                  {capability.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-base leading-relaxed text-ink">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bb-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {capability.more && (
                  <Link
                    href={capability.more.href}
                    className="mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    {capability.more.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </div>
              <div>{capability.mock}</div>
            </div>
          </section>
        );
      })}

      <section className="relative bg-bb-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-line pt-24 sm:pt-32">
            <SectionHeading
              title="Built around how developers actually sell"
              lead="What changes for your buyers, your brokers and your sales team."
            />
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                  <BrandIcon name={benefit.icon} className="h-10 w-10" />
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-bb-slate">{benefit.body}</p>
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
