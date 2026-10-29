"use client";

import { useState } from "react";
import Image from "next/image";
import SitePlan, { DEFAULT_PLOT_ID, samplePlots, type PlotStatus } from "./SitePlan";

const STATUS_CHIP: Record<PlotStatus, string> = {
  Available: "border-bb-available/40 text-bb-available",
  "On hold": "border-bb-hold/40 text-bb-hold",
  Booked: "border-ink/15 text-bb-slate",
};

const legend = [
  { label: "Available", swatch: "bg-white border border-ink/40" },
  { label: "On hold", swatch: "bg-[#f3e9dc] border border-ink/40" },
  { label: "Booked", swatch: "bg-bb-stone border border-ink/40" },
  { label: "Selected", swatch: "bg-bb-orange" },
];

const formatRupees = (amount: number) => `₹ ${amount.toLocaleString("en-IN")}`;

// Hero product shot (Guidelines p. 26): the live map in a browser window and
// the selected plot on a phone. Picking a plot updates the phone.
export default function HeroProductShot() {
  const [selectedId, setSelectedId] = useState(DEFAULT_PLOT_ID);
  const plot = samplePlots.find((item) => item.id === selectedId) ?? samplePlots[0];
  // Phone shows a zoomed crop around the selected plot
  const crop = `${plot.x - 48} ${plot.y - 30} 160 136`;

  return (
    <div className="relative sm:pb-16 lg:-mr-10 xl:-mr-20">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(28_26_23/0.04),0_40px_80px_-40px_rgb(28_26_23/0.3)] sm:mr-32">
        <div className="flex items-center gap-3 border-b border-line bg-bb-paper/60 px-4 py-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs text-bb-slate">
            <Image src="/icon.svg" alt="" width={12} height={12} className="h-3 w-3" />
            brickbytes.in/phase-2
          </span>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-display text-[15px] font-semibold text-ink">Phase 2 layout</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-bb-slate sm:text-xs">
              {legend.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-[2px] ${item.swatch}`} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <SitePlan className="w-full" selectedId={selectedId} onSelect={setSelectedId} />
          <p className="mt-2 text-xs text-bb-slate">Pick any plot to see its details.</p>
        </div>
      </div>

      <figure
        aria-label={`Phone showing plot ${plot.id}`}
        className="relative z-10 -mt-20 ml-auto mr-2 w-[184px] rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-[0_32px_64px_-24px_rgb(28_26_23/0.45)] sm:absolute sm:-right-4 sm:bottom-0 sm:mr-0 sm:mt-0 sm:w-[232px]"
      >
        <div className="overflow-hidden rounded-[1.8rem] bg-bb-paper">
          <div aria-hidden className="relative">
            <span className="absolute left-1/2 top-0 z-10 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-ink" />
            <SitePlan className="block h-[104px] w-full bg-bb-paper sm:h-[128px]" selectedId={plot.id} viewBox={crop} />
          </div>
          <div aria-live="polite" className="rounded-t-2xl border-t border-line bg-white px-4 pb-5 pt-3">
            <span aria-hidden className="mx-auto mb-3 block h-1 w-8 rounded-full bg-ink/15" />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-bb-slate">Plot {plot.id}</p>
            <p className="mt-1 font-display text-lg font-extrabold leading-tight text-ink sm:text-xl">
              {plot.sizeSqYd} sq yd · {plot.facing}
            </p>
            <p className="mt-1.5 font-mono text-xs text-ink sm:text-sm">{formatRupees(plot.price)}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em]">
              <span className={`rounded-full border px-2 py-0.5 ${STATUS_CHIP[plot.status]}`}>{plot.status}</span>
              <span className="rounded-full border border-ink/15 px-2 py-0.5 text-bb-slate">{plot.roadWidth}</span>
            </div>
            <span
              aria-hidden
              className={`mt-3.5 block rounded-full py-2 text-center text-xs font-semibold sm:text-sm ${
                plot.status === "Available" ? "bg-ink text-white" : "bg-bb-stone text-bb-slate"
              }`}
            >
              {plot.status === "Available" ? "Book site visit" : "Not available"}
            </span>
          </div>
        </div>
      </figure>
    </div>
  );
}
