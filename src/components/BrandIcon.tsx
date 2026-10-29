// Brand icon set (Guidelines p. 22): built only from the symbol's own shapes,
// in Sand, Byte Orange and Kiln.
// The first six are the guideline set; the rest extend it with the same shapes
// and colours.
export type BrandIconName =
  | "plot"
  | "pin"
  | "home"
  | "layout"
  | "area"
  | "facing"
  | "people"
  | "chart"
  | "clock"
  | "lock";

const SAND = "#e6d3bc";
const ORANGE = "#ff5a1f";
const KILN = "#e2531c";

const glyphs: Record<BrandIconName, React.ReactNode> = {
  plot: <path d="M4 14h20a6 6 0 0 1 0 12H4z" fill={SAND} />,
  pin: (
    <path
      d="M8 20a12 12 0 1 1 12 12H8zm12-4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
      fill={ORANGE}
      fillRule="evenodd"
    />
  ),
  home: (
    <>
      <path d="M6 16h22a6 6 0 0 1 0 12H6z" fill={SAND} />
      <path d="M6 18l8-8 8 8v10H6z" fill={KILN} />
    </>
  ),
  layout: (
    <>
      <rect x="6" y="6" width="13" height="13" fill={SAND} />
      <rect x="21" y="6" width="13" height="13" fill={SAND} />
      <rect x="6" y="21" width="13" height="13" fill={ORANGE} />
      <rect x="21" y="21" width="13" height="13" fill={SAND} />
    </>
  ),
  area: (
    <>
      <rect x="10" y="6" width="24" height="24" fill={SAND} />
      <rect x="6" y="26" width="10" height="10" fill={KILN} />
    </>
  ),
  facing: (
    <>
      <circle cx="20" cy="20" r="14" fill={SAND} />
      <path d="M20 7l6 13H14z" fill={KILN} />
    </>
  ),
  people: (
    <>
      <circle cx="14" cy="12" r="5" fill={SAND} />
      <path d="M5 34v-6a9 9 0 0 1 18 0v6z" fill={SAND} />
      <circle cx="26" cy="14" r="5" fill={ORANGE} />
      <path d="M17 34v-4a9 9 0 0 1 18 0v4z" fill={ORANGE} />
    </>
  ),
  chart: (
    <>
      <rect x="6" y="22" width="8" height="12" fill={SAND} />
      <rect x="16" y="15" width="8" height="19" fill={SAND} />
      <rect x="26" y="7" width="8" height="27" fill={ORANGE} />
    </>
  ),
  clock: (
    <>
      <circle cx="20" cy="20" r="14" fill={SAND} />
      <path d="M20 20V6a14 14 0 0 1 14 14z" fill={KILN} />
    </>
  ),
  lock: (
    <>
      <path d="M14 18v-5a6 6 0 0 1 12 0v5" fill="none" stroke={KILN} strokeWidth="3" />
      <rect x="8" y="18" width="24" height="16" fill={SAND} />
      <circle cx="20" cy="26" r="3" fill={ORANGE} />
    </>
  ),
};

export default function BrandIcon({ name, className }: { name: BrandIconName; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {glyphs[name]}
    </svg>
  );
}
