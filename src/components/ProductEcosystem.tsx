import { Check } from "lucide-react";
import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SectionHeading from "./ui/SectionHeading";

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
  features: string[];
  mockup: React.ReactNode;
}[] = [
  {
    icon: "home",
    title: "For buyers",
    desc: "Buyers explore the layout with live availability, plot details and aerial site views.",
    features: ["Interactive project map", "Details for every plot", "Live availability", "Project information"],
    mockup: (
      <svg viewBox="0 0 240 150" className="h-40 w-full" aria-hidden>
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
    features: ["Lead tracking", "Site visit scheduling", "Booking coordination", "Performance overview"],
    mockup: (
      <svg viewBox="0 0 240 150" className="h-40 w-full" aria-hidden>
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
    desc: "Manage the layout, allocate plots, oversee brokers and review sales from one control center.",
    features: ["Inventory management", "Team and broker oversight", "Sales analytics", "Business volume at a glance"],
    mockup: (
      <svg viewBox="0 0 240 150" className="h-40 w-full" aria-hidden>
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

export default function ProductEcosystem() {
  return (
    <section id="platform" className="relative bg-bb-stone py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="One platform for buyers, brokers and developers."
          lead="Each side gets its own view of the same live project, so everyone works from the same plot status."
          className="mb-14 sm:mb-16"
        />

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {platformCards.map((card) => (
            <li key={card.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="mb-8 rounded-xl border border-line bg-bb-paper p-3">{card.mockup}</div>
              <div className="flex items-center gap-3">
                <BrandIcon name={card.icon} className="h-8 w-8 shrink-0" />
                <h3 className="font-display text-xl font-semibold text-ink">{card.title}</h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-bb-slate">{card.desc}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-bb-orange" strokeWidth={2} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
