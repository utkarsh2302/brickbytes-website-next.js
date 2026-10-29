import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

// Plan illustrations in the brand style (Guidelines p. 22): orthographic, 1px
// ink lines, roads as double lines, Stone for booked, one orange plot with the pin.
const LINE = { stroke: "#1c1a17", strokeOpacity: 0.55, strokeWidth: 1 } as const;

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 8} ${y}a8 8 0 1 1 8 8h-8zm8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z`}
      fill="#1c1a17"
      fillRule="evenodd"
    />
  );
}

function PlottedIllustration() {
  const top = [16, 70, 124, 178];
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
      <path d="M0 72H240M0 80H240" {...LINE} />
      {top.map((x, i) => (
        <rect key={`t${x}`} x={x + 0.5} y="14.5" width="46" height="48" fill={i === 1 ? "#ff5a1f" : i === 3 ? "#ece6dd" : "#ffffff"} {...LINE} />
      ))}
      {top.map((x, i) => (
        <rect key={`b${x}`} x={x + 0.5} y="90.5" width="46" height="48" fill={i === 0 ? "#ece6dd" : "#ffffff"} {...LINE} />
      ))}
      <Pin x={93} y={32} />
      <text x="236" y="78.3" textAnchor="end" className="font-mono" fontSize="6.5" fill="#5a6272" letterSpacing="0.08em">
        40 FT ROAD
      </text>
    </svg>
  );
}

function VillaIllustration() {
  const villas = [18, 66, 114, 162];
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
      <rect x="16.5" y="14.5" width="206" height="54" fill="#e6d3bc" fillOpacity="0.45" {...LINE} />
      <path d="M28 52c30-22 58 10 92-6s58-14 90-2" fill="none" stroke="#1c1a17" strokeOpacity="0.45" strokeDasharray="3 3" />
      <rect x="150.5" y="22.5" width="40" height="22" fill="#ffffff" {...LINE} />
      <text x="170.5" y="36.5" textAnchor="middle" className="font-mono" fontSize="8" fill="#1c1a17">
        CLUB
      </text>
      <path d="M0 80H240M0 88H240" {...LINE} />
      {villas.map((x, i) => (
        <rect key={x} x={x + 0.5} y="98.5" width="40" height="40" fill={i === 2 ? "#ff5a1f" : i === 0 ? "#ece6dd" : "#ffffff"} {...LINE} />
      ))}
      <Pin x={134.5} y={112} />
      <text x="24" y="30" className="font-mono" fontSize="8" fill="#5a6272" letterSpacing="0.08em">
        PARK
      </text>
    </svg>
  );
}

function TowerIllustration() {
  const floors = Array.from({ length: 8 }, (_, i) => 16 + i * 15);
  const selectedFloor = 3;
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" aria-hidden>
      <path d="M0 140H240" {...LINE} />
      {floors.map((y, i) => (
        <g key={y}>
          {[60, 100, 140].map((x, u) => (
            <rect
              key={x}
              x={x + 0.5}
              y={y + 0.5}
              width="40"
              height="15"
              fill={i === selectedFloor && u === 1 ? "#ff5a1f" : (i + u) % 4 === 0 ? "#ece6dd" : "#ffffff"}
              {...LINE}
            />
          ))}
        </g>
      ))}
      <Pin x={120.5} y={51} />
      <text x="188" y="72" className="font-mono" fontSize="8.5" fill="#5a6272" letterSpacing="0.06em">
        FLOOR 05
      </text>
    </svg>
  );
}

const useCases = [
  {
    title: "Plotted developments",
    desc: "Show every plot of a subdivision on a live map, with size, road width, corner plots and booking status.",
    features: ["Plot-by-plot selection", "Hold timers for reservations", "Road widths and boundaries", "Corner plots marked"],
    illustration: <PlottedIllustration />,
  },
  {
    title: "Villa communities",
    desc: "Place villa plots next to parks, walking paths and the clubhouse, so buyers see the whole community.",
    features: ["Full community layout", "Clubhouse and garden views", "Walking paths", "Live unit availability"],
    illustration: <VillaIllustration />,
  },
  {
    title: "Apartment towers",
    desc: "Present towers floor by floor. Buyers pick a floor, check unit layouts and see which units are free.",
    features: ["Floor selector", "Unit availability filters", "Unit layout views", "Multi-tower site maps"],
    illustration: <TowerIllustration />,
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative scroll-mt-18 bg-bb-stone py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Built for plots, villas and apartments"
          lead="One platform, whether you sell plotted land, a gated villa community or apartment towers."
          className="mb-14 sm:mb-16"
        />

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <li key={useCase.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="rounded-xl border border-line bg-bb-paper p-4">{useCase.illustration}</div>
              <h3 className="mt-8 font-display text-xl font-semibold text-ink">{useCase.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-bb-slate">{useCase.desc}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {useCase.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base text-ink">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bb-orange" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm pt-8 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Talk to us about your project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
