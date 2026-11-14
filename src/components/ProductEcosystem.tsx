"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SectionHeading from "./ui/SectionHeading";
import { swipeItem, swipeRow } from "./ui/swipe";

// Product mock-ups: flat white UI on Paper, 1px lines, plot data in DM Mono,
// status colours only here (Guidelines p. 17).
const INK = "#1c1a17";
const SLATE = "#5a6272";
const LINE = "#e3ddd3";
const AVAILABLE = "#2e7a4e";
const HOLD = "#b7791f";

const platformCards: {
  icon: BrandIconName;
  title: string;
  desc: string;
  features: { title: string; desc: string }[];
  link: { label: string; href: string };
  mockup: React.ReactNode;
}[] = [
  {
    icon: "home",
    title: "For buyers",
    desc: "Buyers explore the layout with live availability, plot details and aerial site views.",
    features: [
      { title: "Interactive plot maps", desc: "Filter plots by availability and check each one's facing, size and road width." },
      { title: "3D project view", desc: "Plots, buildings and surroundings in 3D, so the layout makes sense before a visit." },
      { title: "Drone and site views", desc: "Aerial and ground photos with plot boundaries drawn on top." },
      { title: "Answers at any hour", desc: "An assistant answers common questions about plots and project rules." },
    ],
    link: { label: "Interactive plot maps", href: "/3d-plot-viewer" },
    mockup: (
      <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
        <rect x="12.5" y="10.5" width="215" height="129" rx="10" fill="#ffffff" stroke={LINE} />
        <text x="26" y="36" fontSize="11" fontWeight="700" fill={INK}>
          Plot 14
        </text>
        <rect x="160.5" y="24.5" width="54" height="16" rx="8" fill="#ffffff" stroke={AVAILABLE} strokeOpacity="0.5" />
        <text x="187.5" y="35.5" fontSize="7" fill={AVAILABLE} textAnchor="middle" className="font-mono" letterSpacing="0.06em">
          AVAILABLE
        </text>
        <path d="M26 52.5H214M26 76.5H214" stroke={LINE} />
        <text x="26" y="68" fontSize="8" fill={SLATE}>
          Area
        </text>
        <text x="214" y="68" fontSize="8" fill={INK} textAnchor="end" className="font-mono">
          660 sq yd
        </text>
        <text x="26" y="92" fontSize="8" fill={SLATE}>
          Facing
        </text>
        <text x="214" y="92" fontSize="8" fill={INK} textAnchor="end" className="font-mono">
          Park front
        </text>
        <rect x="26" y="106" width="90" height="22" rx="11" fill={INK} />
        <text x="71" y="120" fontSize="8" fontWeight="600" fill="#ffffff" textAnchor="middle">
          Drone view
        </text>
        <rect x="124.5" y="106.5" width="90" height="21" rx="10.5" fill="#ffffff" stroke={LINE} />
        <text x="169.5" y="120" fontSize="8" fontWeight="600" fill={INK} textAnchor="middle">
          Add to compare
        </text>
      </svg>
    ),
  },
  {
    icon: "people",
    title: "For brokers",
    desc: "Brokers track their leads, schedule site visits and coordinate bookings from their phone.",
    features: [
      { title: "Broker portal", desc: "Each broker gets their own space for leads, plot holds and site visits." },
      { title: "Lead tracking", desc: "Every buyer, the plot they want and where the deal stands." },
      { title: "Site visit scheduling", desc: "Book and confirm visits without calling your office." },
      { title: "Commission tracking", desc: "Brokers see what they've earned on each booking." },
    ],
    link: { label: "Channel partner software", href: "/channel-partner-management-software" },
    mockup: (
      <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
        <rect x="12.5" y="10.5" width="215" height="129" rx="10" fill="#ffffff" stroke={LINE} />
        {[
          { y: 22, name: "Rajesh M.", status: "Visit scheduled", color: SLATE, plot: "PLOT 14" },
          { y: 62, name: "Priya V.", status: "On hold", color: HOLD, plot: "PLOT 05" },
          { y: 102, name: "Amit S.", status: "Booked", color: AVAILABLE, plot: "PLOT 09" },
        ].map((lead, index) => (
          <g key={lead.name}>
            {index > 0 && <path d={`M24 ${lead.y - 6.5}H216`} stroke={LINE} />}
            <text x="26" y={lead.y + 11} fontSize="9" fontWeight="600" fill={INK}>
              {lead.name}
            </text>
            <text x="26" y={lead.y + 24} fontSize="8" fill={lead.color}>
              {lead.status}
            </text>
            <rect x="160.5" y={lead.y + 4.5} width="54" height="16" rx="8" fill="#f7f4ef" stroke={LINE} />
            <text x="187.5" y={lead.y + 15.5} fontSize="7" fill={INK} textAnchor="middle" className="font-mono" letterSpacing="0.06em">
              {lead.plot}
            </text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    icon: "chart",
    title: "For developers",
    desc: "Manage the layout, allocate plots, follow leads, oversee brokers and review sales from one control center.",
    features: [
      { title: "Developer console", desc: "Upload revised layouts, approve broker commissions and change any plot's status." },
      { title: "Plot holds and status", desc: "Lock a plot, release a hold or generate booking documents; the map updates at once." },
      { title: "Sales analytics", desc: "How fast plots sell, which parts of the project draw interest, how each broker performs." },
      { title: "Team and broker access", desc: "Choose what each salesperson and broker can see, and remove access any time." },
    ],
    link: { label: "Real estate CRM", href: "/real-estate-crm" },
    mockup: (
      <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
        <rect x="12.5" y="10.5" width="215" height="129" rx="10" fill="#ffffff" stroke={LINE} />
        {[
          { x: 24, label: "Total value", value: "₹95 Cr" },
          { x: 93, label: "Sold", value: "56%" },
          { x: 162, label: "Reserved", value: "12%" },
        ].map((metric) => (
          <g key={metric.label}>
            <rect x={metric.x + 0.5} y="22.5" width="54" height="36" rx="6" fill="#f7f4ef" stroke={LINE} />
            <text x={metric.x + 8} y="36" fontSize="7" fill={SLATE}>
              {metric.label}
            </text>
            <text x={metric.x + 8} y="51" fontSize="10" fill={INK} className="font-mono">
              {metric.value}
            </text>
          </g>
        ))}
        <path d="M24 128.5H216" stroke={LINE} />
        <path d="M30 122L64 108L98 113L132 96L166 85L206 78" fill="none" stroke="#ff5a1f" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="206" cy="78" r="3" fill="#ff5a1f" />
        <text x="24" y="76" fontSize="7" fill={SLATE}>
          Sales by month
        </text>
      </svg>
    ),
  },
];

type PlatformCard = (typeof platformCards)[number];

// Each card pins near the top of the screen and the next one slides over it;
// the covered card eases back a little, so the three read as a stack.
function StackedCard({ card, index }: { card: PlatformCard; index: number }) {
  const element = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: element, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 0.92]);

  return (
    <li ref={element} className={`${swipeItem} lg:sticky`} style={{ top: `${7 + index * 1.5}rem` }}>
      <motion.article
        style={{ scale }}
        className="grid h-full origin-top grid-cols-1 gap-6 rounded-3xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_32px_64px_-32px_rgb(28_26_23/0.25)] sm:p-10 lg:grid-cols-2 lg:gap-12"
      >
        <div>
          <div className="flex items-center gap-3">
            <BrandIcon name={card.icon} className="h-9 w-9 shrink-0" />
            <h3 className="font-display text-2xl font-extrabold text-ink">{card.title}</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-bb-slate sm:text-lg">{card.desc}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 sm:mt-6 sm:gap-x-6 sm:gap-y-4 sm:pt-6">
            {card.features.map((feature) => (
              <div key={feature.title}>
                <dt className="font-display text-sm font-semibold text-ink sm:text-base">{feature.title}</dt>
                <dd className="mt-1 hidden text-sm leading-relaxed text-bb-slate sm:block">{feature.desc}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={card.link.href}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {card.link.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="flex items-center rounded-2xl border border-line bg-bb-paper p-3 sm:p-6">{card.mockup}</div>
      </motion.article>
    </li>
  );
}

export default function ProductEcosystem() {
  return (
    <section id="platform" className="relative bg-bb-stone py-16 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="One platform for buyers, brokers and developers."
          lead="Buyers explore the project, brokers sell from it and your team runs it, all from the same live plot status."
          className="mb-10 sm:mb-16"
        />

        <ul aria-label="BrickBytes for buyers, brokers and developers" className={swipeRow("md:grid-cols-1 md:gap-10 lg:gap-16")}>
          {platformCards.map((card, index) => (
            <StackedCard key={card.title} card={card} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
