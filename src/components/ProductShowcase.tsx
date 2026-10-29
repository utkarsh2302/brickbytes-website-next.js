"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

type PlotStatus = "Available" | "Hold" | "Sold";

interface Plot {
  id: string;
  type: string;
  facing: string;
  size: string;
  road: string;
  price: string;
  status: PlotStatus;
  category: "corner" | "east" | "lakeside" | "north";
  x: number;
  y: number;
  w: number;
  h: number;
}

const initialPlots: Plot[] = [
  { id: "PLOT 01", type: "Corner plot", facing: "North", size: "265 sq yd", road: "40 ft road", price: "₹ 72 L", status: "Available", category: "corner", x: 24, y: 24, w: 90, h: 64 },
  { id: "PLOT 02", type: "Standard plot", facing: "East", size: "133 sq yd", road: "30 ft road", price: "₹ 36 L", status: "Sold", category: "east", x: 124, y: 24, w: 90, h: 64 },
  { id: "PLOT 03", type: "Lakeside plot", facing: "East", size: "333 sq yd", road: "60 ft avenue", price: "₹ 1.2 Cr", status: "Hold", category: "lakeside", x: 224, y: 24, w: 102, h: 64 },
  { id: "PLOT 04", type: "Corner plot", facing: "East", size: "265 sq yd", road: "40 ft road", price: "₹ 76 L", status: "Available", category: "corner", x: 24, y: 128, w: 90, h: 68 },
  { id: "PLOT 05", type: "Standard plot", facing: "North", size: "165 sq yd", road: "35 ft road", price: "₹ 45 L", status: "Available", category: "north", x: 124, y: 128, w: 90, h: 68 },
  { id: "PLOT 06", type: "Lakeside plot", facing: "North", size: "355 sq yd", road: "60 ft avenue", price: "₹ 1.3 Cr", status: "Available", category: "lakeside", x: 224, y: 128, w: 102, h: 68 },
];

const filters = [
  { label: "All plots", value: "all" },
  { label: "East facing", value: "east" },
  { label: "Corner plots", value: "corner" },
  { label: "Lakeside", value: "lakeside" },
];

// Brand status names and colours (Guidelines p. 17), used only in product mock-ups.
const statusStyles: Record<PlotStatus, { label: string; dot: string; fill: string; hex: string; chip: string }> = {
  Available: { label: "Available", dot: "bg-bb-available", fill: "#ffffff", hex: "#2e7a4e", chip: "border-bb-available/40 text-bb-available" },
  Hold: { label: "On hold", dot: "bg-bb-hold", fill: "#f3e8d4", hex: "#b7791f", chip: "border-bb-hold/40 text-bb-hold" },
  Sold: { label: "Booked", dot: "bg-bb-booked", fill: "#ece6dd", hex: "#9aa0a8", chip: "border-ink/15 text-bb-slate" },
};

const STATUSES: PlotStatus[] = ["Available", "Hold", "Sold"];

export default function ProductShowcase() {
  const [plots, setPlots] = useState<Plot[]>(initialPlots);
  const [selectedId, setSelectedId] = useState<string | null>("PLOT 01");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number; color: string } | null>(null);

  const selectedPlot = plots.find((p) => p.id === selectedId) || null;

  const counts = STATUSES.map((status) => ({
    status,
    count: plots.filter((p) => p.status === status).length,
  }));

  const handleSelectPlot = (id: string, isFilteredOut: boolean) => {
    if (isFilteredOut) return;
    setSelectedId(id);
  };

  const handleUpdateStatus = (id: string, newStatus: PlotStatus) => {
    setPlots((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));

    const plot = plots.find((p) => p.id === id);
    if (plot) {
      setRipple({ x: plot.x + plot.w / 2, y: plot.y + plot.h / 2, color: statusStyles[newStatus].hex });
      setTimeout(() => setRipple(null), 1200);
    }

    triggerToast(`${id} is now ${statusStyles[newStatus].label.toLowerCase()}. Every buyer and broker screen shows the change.`);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2500);
  };

  return (
    <section id="showcase" className="relative bg-bb-stone py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Manage availability on a live master plan"
          lead="Pick a plot to see its details, filter by type, then change its status the way your sales team would. Every view updates at once."
          className="mb-12"
        />

        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter plots">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  activeFilter === f.value
                    ? "bg-ink text-white"
                    : "border border-ink/15 bg-white text-ink hover:border-ink/35"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 whitespace-nowrap text-sm text-bb-slate" aria-live="polite">
            <div className="flex items-center gap-2">
              <dt>Total</dt>
              <dd className="font-mono text-base text-ink">{plots.length}</dd>
            </div>
            {counts.map(({ status, count }) => (
              <div key={status} className="flex items-center gap-2">
                <dt className="flex items-center gap-1.5">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${statusStyles[status].dot}`} />
                  {statusStyles[status].label}
                </dt>
                <dd className="font-mono text-base text-ink">{count}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_32px_64px_-32px_rgb(28_26_23/0.2)] sm:p-8 lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-[15px] font-semibold text-ink">Sector A master plan</p>
              <ul className="flex gap-4 text-sm text-bb-slate">
                {STATUSES.map((status) => (
                  <li key={status} className="flex items-center gap-1.5">
                    <span aria-hidden className={`h-2 w-2 rounded-full ${statusStyles[status].dot}`} />
                    {statusStyles[status].label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-1 items-center">
            <svg className="h-auto w-full overflow-visible" viewBox="0 0 350 220" fill="none" role="group" aria-label="Sector A master plan. Select a plot to see its details.">
              <g stroke="#1c1a17" strokeOpacity="0.55" strokeWidth="1" aria-hidden>
                <path d="M0 103H350M0 113H350" />
              </g>
              <text x="342" y="110.5" textAnchor="end" className="font-mono" fontSize="6" fill="#5a6272" letterSpacing="0.08em" aria-hidden>
                CENTRAL AVENUE · 60 FT
              </text>

              {plots.map((plot) => {
                const isFilteredOut = activeFilter !== "all" && plot.category !== activeFilter;
                const isSelected = plot.id === selectedId;
                const style = statusStyles[plot.status];
                const cx = plot.x + plot.w / 2;

                return (
                  <g
                    key={plot.id}
                    role="button"
                    tabIndex={isFilteredOut ? -1 : 0}
                    aria-label={`${plot.id}, ${plot.size}, ${plot.type}, ${style.label}`}
                    aria-pressed={isSelected}
                    onClick={() => handleSelectPlot(plot.id, isFilteredOut)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectPlot(plot.id, isFilteredOut);
                      }
                    }}
                    className={`cursor-pointer select-none outline-none transition-opacity duration-300 focus-visible:[&>rect]:stroke-ink focus-visible:[&>rect]:[stroke-width:2.5] ${
                      isFilteredOut ? "pointer-events-none opacity-20" : "opacity-100"
                    }`}
                  >
                    <rect
                      x={plot.x + 0.5}
                      y={plot.y + 0.5}
                      width={plot.w}
                      height={plot.h}
                      fill={isSelected ? "#ff5a1f" : style.fill}
                      stroke="#1c1a17"
                      strokeOpacity={isSelected ? 1 : 0.55}
                      strokeWidth="1"
                      className="transition-colors duration-300"
                    />
                    <circle cx={plot.x + plot.w - 8} cy={plot.y + 8} r="3" fill={style.hex} stroke="#ffffff" strokeWidth="1" />
                    {isSelected && (
                      <path
                        d={`M${cx - 9} ${plot.y + 18}a9 9 0 1 1 9 9h-9zm9-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z`}
                        fill="#1c1a17"
                        fillRule="evenodd"
                      />
                    )}
                    <text x={cx} y={plot.y + plot.h - 20} fontSize="7.5" fill="#1c1a17" className="font-mono" textAnchor="middle">
                      {plot.id}
                    </text>
                    {/* Keeps the two labels apart in the text the button's name is checked against */}
                    {" "}
                    <text x={cx} y={plot.y + plot.h - 9} fontSize="6" fill={isSelected ? "#1c1a17" : "#5a6272"} className="font-mono" textAnchor="middle">
                      {plot.size}
                    </text>
                  </g>
                );
              })}

              <AnimatePresence>
                {ripple && (
                  <motion.circle
                    key={`ripple-${ripple.x}-${ripple.y}`}
                    initial={{ r: 10, opacity: 0.6 }}
                    animate={{ r: 70, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    cx={ripple.x}
                    cy={ripple.y}
                    fill="none"
                    stroke={ripple.color}
                    strokeWidth="2"
                    aria-hidden
                  />
                )}
              </AnimatePresence>
            </svg>
            </div>

            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute bottom-5 left-5 right-5 z-30 flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-sm text-white"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bb-available">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-5">
            {selectedPlot ? (
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-bb-slate">{selectedPlot.id}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                      {selectedPlot.size} · {selectedPlot.facing}
                    </p>
                    <p className="mt-1 text-base text-bb-slate">{selectedPlot.type}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${statusStyles[selectedPlot.status].chip}`}
                  >
                    {statusStyles[selectedPlot.status].label}
                  </span>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                  <div>
                    <dt className="text-sm text-bb-slate">Facing</dt>
                    <dd className="mt-1 font-mono text-base text-ink">{selectedPlot.facing}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-bb-slate">Area</dt>
                    <dd className="mt-1 font-mono text-base text-ink">{selectedPlot.size}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-bb-slate">Road</dt>
                    <dd className="mt-1 font-mono text-base text-ink">{selectedPlot.road}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-bb-slate">Price</dt>
                    <dd className="mt-1 font-mono text-base text-ink">{selectedPlot.price}</dd>
                  </div>
                </dl>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-sm font-medium text-ink">Change status</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleUpdateStatus(selectedPlot.id, status)}
                        disabled={selectedPlot.status === status}
                        className="rounded-full border border-ink/15 bg-white px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bb-paper disabled:text-bb-slate"
                      >
                        {statusStyles[status].label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-auto pt-8 text-sm leading-relaxed text-bb-slate">
                  This demo shows how one status change reaches every developer and broker screen.
                </p>
              </div>
            ) : (
              <p className="m-auto py-12 text-center text-base text-bb-slate">Select a plot on the master plan to see its details.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
