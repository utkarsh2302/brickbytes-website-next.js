import SectionHeading from "./ui/SectionHeading";

// Illustrations follow the brand plan style (Guidelines p. 22): 1px ink lines,
// flat Paper/Stone/Sand fills, no 3D.
const INK = "#1c1a17";

// Top-left corners of the plots drawn on the layout sheet
const sheetPlots = [
  [64, 24],
  [100, 24],
  [136, 24],
  [64, 68],
  [100, 68],
  [136, 68],
];

const problems = [
  {
    title: "Flat drawings",
    description: "Buyers struggle to read a project from flat drawings and brochures. Nothing on the page says which plots are still free.",
    illustration: (
      <svg viewBox="0 0 240 140" className="h-36 w-full" aria-hidden>
        <path d="M54 14H170L186 30V126H54Z" fill="#ffffff" stroke={INK} strokeOpacity="0.35" />
        <path d="M170 14V30H186" fill="none" stroke={INK} strokeOpacity="0.35" />
        {sheetPlots.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x + 0.5} y={y + 0.5} width="32" height="32" fill="none" stroke={INK} strokeOpacity="0.35" />
        ))}
        <path d="M58 60.5H182M58 63.5H182" stroke={INK} strokeOpacity="0.35" />
        <text x="64" y="118" fontSize="9" fontWeight="600" fill="#5a6272">
          layout_final_v3.pdf
        </text>
      </svg>
    ),
  },
  {
    title: "The same questions, again",
    description: "Your sales team answers the same availability, price and plot questions on every call.",
    illustration: (
      <svg viewBox="0 0 240 140" className="h-36 w-full" aria-hidden>
        {[0, 1, 2].map((row) => (
          <g key={row} opacity={1 - row * 0.28} transform={`translate(${36 + row * 14} ${18 + row * 38})`}>
            {/* Speech bubble in the plot shape: square corners left, one round end */}
            <path d="M0 0H136A15 15 0 0 1 136 30H0Z" fill={row === 0 ? "#e6d3bc" : "#ece6dd"} />
            <text x="14" y="19" fontSize="10" fill={INK}>
              Is plot 14 still available?
            </text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "Scattered information",
    description: "Prices, availability and updates sit in spreadsheets, emails and group chats that never quite agree.",
    illustration: (
      <svg viewBox="0 0 240 140" className="h-36 w-full" aria-hidden>
        <path d="M78 46L100 82M162 46L140 82" stroke={INK} strokeOpacity="0.3" strokeDasharray="3 4" />
        <circle cx="89" cy="64" r="3" fill="#ff5a1f" />
        <circle cx="151" cy="64" r="3" fill="#ff5a1f" />
        {[
          { x: 30, y: 14, label: "Sheet" },
          { x: 150, y: 14, label: "Email" },
          { x: 90, y: 86, label: "Chat" },
        ].map((tile) => (
          <g key={tile.label}>
            <rect x={tile.x + 0.5} y={tile.y + 0.5} width="60" height="36" rx="6" fill="#ffffff" stroke={INK} strokeOpacity="0.35" />
            <text x={tile.x + 30.5} y={tile.y + 23} fontSize="10" fontWeight="600" fill="#5a6272" textAnchor="middle">
              {tile.label}
            </text>
          </g>
        ))}
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative bg-bb-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Selling plots shouldn't depend on PDFs and endless calls."
          lead="Brochures, phone calls and spreadsheets leave buyers guessing and keep your team busy repeating the same answers."
          className="mb-14 sm:mb-16"
        />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((item) => (
            <li key={item.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="mb-8 rounded-xl border border-line bg-bb-paper p-3">{item.illustration}</div>
              <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-bb-slate">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
