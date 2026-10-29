// Orthographic site plan in the brand illustration style (Guidelines p. 22):
// 1px lines, roads as double lines, no 3D. The selected plot is orange and
// carries the pin. Lines use ink instead of Survey Navy, to keep navy to the
// logo. Pass onSelect to make plots clickable; pass viewBox to crop.
const COLUMNS = [24, 96, 168, 280, 352, 424];
const ROWS = [24, 108, 216, 300];
const PLOT_W = 64;
const PLOT_H = 76;
const SIZES_SQ_YD = [167, 180, 200, 200, 200, 222];
const RATE_PER_SQ_YD = 21_250;
const BOOKED = new Set([0, 8, 14, 23, 19, 5]);
const ON_HOLD = new Set([12, 21]);

export type PlotStatus = "Available" | "On hold" | "Booked";

export interface SamplePlot {
  id: string;
  x: number;
  y: number;
  sizeSqYd: number;
  facing: string;
  roadWidth: string;
  price: number;
  status: PlotStatus;
}

// Facts follow the drawing: plots face the road they front, and plots beside
// the central road are corners with a small premium.
export const samplePlots: SamplePlot[] = ROWS.flatMap((y, row) =>
  COLUMNS.map((x, col) => {
    const index = row * COLUMNS.length + col;
    const onMainRoad = row === 1 || row === 2;
    const isCorner = onMainRoad && (col === 2 || col === 3);
    const sizeSqYd = SIZES_SQ_YD[col];
    return {
      id: `C-${37 + index}`,
      x,
      y,
      sizeSqYd,
      facing: (row % 2 === 0 ? "North" : "South") + (isCorner ? " corner" : ""),
      roadWidth: onMainRoad ? "30 ft road" : "24 ft road",
      price: Math.round(sizeSqYd * RATE_PER_SQ_YD * (isCorner ? 1.1 : 1)),
      status: BOOKED.has(index) ? "Booked" : ON_HOLD.has(index) ? "On hold" : "Available",
    };
  }),
);

export const DEFAULT_PLOT_ID = "C-47";

const FILL: Record<PlotStatus, string> = { Available: "#ffffff", "On hold": "#f3e9dc", Booked: "#ece6dd" };

export default function SitePlan({
  className,
  selectedId = DEFAULT_PLOT_ID,
  onSelect,
  viewBox = "0 0 520 400",
}: {
  className?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
  viewBox?: string;
}) {
  const selected = samplePlots.find((plot) => plot.id === selectedId);

  return (
    <svg viewBox={viewBox} className={className} role="group" aria-label={`Site plan, plot ${selectedId} selected`}>
      <g stroke="#1c1a17" strokeOpacity="0.55" strokeWidth="1">
        <path d="M0 196H520M0 204H520" />
        <path d="M256 0V400M264 0V400" />
      </g>

      {samplePlots.map((plot) => {
        const isSelected = plot.id === selectedId;
        const interactive = Boolean(onSelect);
        return (
          <rect
            key={plot.id}
            x={plot.x + 0.5}
            y={plot.y + 0.5}
            width={PLOT_W}
            height={PLOT_H}
            fill={isSelected ? "#ff5a1f" : FILL[plot.status]}
            stroke="#1c1a17"
            strokeOpacity="0.55"
            strokeWidth="1"
            className={interactive ? "cursor-pointer outline-none transition-[fill] hover:fill-[#f3e9dc] focus-visible:stroke-[#ff5a1f] focus-visible:[stroke-width:3]" : undefined}
            {...(interactive && {
              role: "button",
              tabIndex: 0,
              "aria-label": `Plot ${plot.id}, ${plot.sizeSqYd} sq yd, ${plot.facing} facing, ${plot.status.toLowerCase()}`,
              "aria-pressed": isSelected,
              onClick: () => onSelect?.(plot.id),
              onKeyDown: (event: React.KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect?.(plot.id);
                }
              },
            })}
            style={isSelected ? { fill: "#ff5a1f" } : undefined}
          />
        );
      })}

      {selected && (
        <g key={selected.id} className="pointer-events-none">
          {/* The pin drops onto the selected plot (the brand idea, p. 7) */}
          <path
            d={`M${selected.x + 16} ${selected.y + 20}a16 16 0 1 1 16 16h-16zm16-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z`}
            fill="#1c1a17"
            fillRule="evenodd"
            className="animate-pin-drop"
          />
          <text
            x={selected.x + 32}
            y={selected.y + 64}
            textAnchor="middle"
            className="font-mono"
            fontSize="11"
            fill="#1c1a17"
            letterSpacing="0.06em"
          >
            {selected.id}
          </text>
        </g>
      )}

      <text x="496" y="392" textAnchor="end" className="font-mono" fontSize="10" fill="#5a6272" letterSpacing="0.08em">
        N ↑ SCALE 1:500
      </text>
    </svg>
  );
}
