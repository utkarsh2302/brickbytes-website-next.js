// Orthographic site plan in the brand illustration style (Guidelines p. 22):
// 1px lines, roads as double lines, no 3D. One plot is orange and carries the
// pin. Lines use ink instead of Survey Navy, to keep navy to the logo.
const COLUMNS = [24, 96, 168, 280, 352, 424];
const ROWS = [24, 108, 216, 300];
const PLOT_W = 64;
const PLOT_H = 76;
const BOOKED = new Set(["24-24", "168-108", "280-216", "424-300", "96-300", "424-24"]);
const SELECTED = "352-108";

export default function SitePlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 400" className={className} role="img" aria-label="Site plan with one selected plot, C-47">
      <g stroke="#1c1a17" strokeOpacity="0.55" strokeWidth="1">
        <path d="M0 196H520M0 204H520" />
        <path d="M256 0V400M264 0V400" />
      </g>

      {ROWS.flatMap((y) =>
        COLUMNS.map((x) => {
          const key = `${x}-${y}`;
          const fill = key === SELECTED ? "#ff5a1f" : BOOKED.has(key) ? "#ece6dd" : "#ffffff";
          return (
            <rect
              key={key}
              x={x + 0.5}
              y={y + 0.5}
              width={PLOT_W}
              height={PLOT_H}
              fill={fill}
              stroke="#1c1a17"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          );
        }),
      )}

      {/* The pin drops onto the selected plot once on load (the brand idea, p. 7) */}
      <path
        d="M368 128a16 16 0 1 1 16 16h-16zm16-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
        fill="#1c1a17"
        fillRule="evenodd"
        className="animate-pin-drop"
      />
      <text x="384" y="172" textAnchor="middle" className="font-mono" fontSize="11" fill="#1c1a17" letterSpacing="0.06em">
        C-47
      </text>

      <text x="496" y="392" textAnchor="end" className="font-mono" fontSize="10" fill="#5a6272" letterSpacing="0.08em">
        N ↑ SCALE 1:500
      </text>
    </svg>
  );
}
