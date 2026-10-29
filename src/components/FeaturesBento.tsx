import BrandIcon, { type BrandIconName } from "./BrandIcon";
import SectionHeading from "./ui/SectionHeading";

type Feature = {
  id: string;
  icon: BrandIconName;
  title: string;
  desc: string;
  span: string;
};

const features: Feature[] = [
  {
    id: "plot-maps",
    icon: "pin",
    title: "Interactive plot maps",
    desc: "Buyers explore the master plan, filter plots by availability and check each plot's facing, size and road width.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "3d-view",
    icon: "home",
    title: "3D project view",
    desc: "Buyers see plots, buildings and surroundings in 3D, so the layout makes sense before a site visit.",
    span: "",
  },
  {
    id: "site-views",
    icon: "facing",
    title: "Drone and site views",
    desc: "Aerial and ground photos with plot boundaries drawn on top, so buyers can check real conditions from anywhere.",
    span: "",
  },
  {
    id: "broker-portal",
    icon: "people",
    title: "Broker portal",
    desc: "Brokers get their own space for leads, plot holds and site-visit scheduling.",
    span: "",
  },
  {
    id: "developer-console",
    icon: "layout",
    title: "Developer console",
    desc: "Upload revised layouts, approve broker commissions, track inventory and change any plot's status by hand, from one place.",
    span: "md:col-span-2",
  },
  {
    id: "inventory",
    icon: "lock",
    title: "Plot holds and status",
    desc: "Lock a plot, release a hold or generate booking documents. Every change updates the map at once.",
    span: "",
  },
  {
    id: "buyer-answers",
    icon: "clock",
    title: "Answers for buyers, any time",
    desc: "An assistant answers common buyer questions about plot size, facing, road width and project rules.",
    span: "",
  },
  {
    id: "analytics",
    icon: "chart",
    title: "Sales analytics",
    desc: "See how fast plots sell, which parts of the project draw interest and how each broker is performing.",
    span: "",
  },
];

// Plan illustration in the brand style (Guidelines p. 22): 1px lines, roads as
// double lines, booked plots in Stone, one plot in orange carrying the pin.
function PlotMapIllustration() {
  const columns = [16, 76, 136, 212, 272, 332];
  const rows = [14, 102];
  const booked = new Set(["16-14", "136-102", "332-14", "212-102"]);
  const selected = "272-14";

  return (
    <svg viewBox="0 0 408 176" className="h-auto w-full" aria-hidden>
      <g stroke="#1c1a17" strokeOpacity="0.55" strokeWidth="1">
        <path d="M0 84H408M0 92H408" />
        <path d="M196 0V176M204 0V176" />
      </g>
      {rows.flatMap((y) =>
        columns.map((x) => {
          const key = `${x}-${y}`;
          const fill = key === selected ? "#ff5a1f" : booked.has(key) ? "#ece6dd" : "#ffffff";
          return (
            <rect
              key={key}
              x={x + 0.5}
              y={y + 0.5}
              width="52"
              height="58"
              fill={fill}
              stroke="#1c1a17"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          );
        }),
      )}
      <path d="M286 34a12 12 0 1 1 12 12h-12zm12-4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" fill="#1c1a17" fillRule="evenodd" />
      <text x="298" y="64" textAnchor="middle" className="font-mono" fontSize="10" fill="#1c1a17">
        B-14
      </text>
      <text x="400" y="172" textAnchor="end" className="font-mono" fontSize="8" fill="#5a6272" letterSpacing="0.08em">
        N ↑ 30 FT ROAD
      </text>
    </svg>
  );
}

// Inventory summary as it appears in the developer console (sample figures).
function InventoryBar() {
  const segments = [
    { label: "Available", count: 58, className: "bg-bb-available" },
    { label: "On hold", count: 12, className: "bg-bb-hold" },
    { label: "Booked", count: 74, className: "bg-bb-booked" },
  ];
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="rounded-xl border border-line bg-bb-paper p-5" aria-hidden>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-ink">Phase 2 inventory</p>
        <p className="font-mono text-xs text-bb-slate">{total} PLOTS</p>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full">
        {segments.map((s) => (
          <span key={s.label} className={s.className} style={{ width: `${(s.count / total) * 100}%` }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-bb-slate">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${s.className}`} />
            {s.label} <span className="font-mono text-xs text-ink">{s.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesBento() {
  return (
    <section id="features" className="relative bg-bb-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="One platform for your map, inventory and brokers"
          lead="Buyers explore the project, brokers sell from it and your team runs it, all from the same live data."
          className="mb-14 sm:mb-16"
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.id}
              className={`flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8 ${feature.span} ${
                feature.id === "developer-console" ? "md:grid md:grid-cols-2 md:items-center md:gap-8" : ""
              }`}
            >
              <div>
                <BrandIcon name={feature.icon} className="h-10 w-10" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-bb-slate">{feature.desc}</p>
              </div>

              {feature.id === "plot-maps" && (
                <div className="mt-8 flex flex-1 items-center rounded-xl border border-line bg-bb-paper p-4 sm:p-6">
                  <PlotMapIllustration />
                </div>
              )}
              {feature.id === "developer-console" && (
                <div className="mt-6 md:mt-0">
                  <InventoryBar />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
