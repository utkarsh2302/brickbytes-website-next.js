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
  // Phone shows a square, zoomed crop centred on the selected plot
  const crop = `${plot.x - 56} ${plot.y - 50} 176 176`;

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
          <p className="mt-2 max-w-[45%] text-xs text-bb-slate sm:max-w-none">Pick any plot to see its details.</p>
        </div>
      </div>

      {/* Phone in real proportions (about 9:19): status bar, app bar, map, plot sheet */}
      <figure
        aria-label={`Phone showing plot ${plot.id}`}
        className="relative z-10 -mt-28 ml-auto mr-3 w-[180px] rounded-[2.4rem] bg-ink p-[5px] shadow-[0_2px_4px_rgb(28_26_23/0.1),0_40px_72px_-28px_rgb(28_26_23/0.5)] sm:absolute sm:-right-2 sm:bottom-0 sm:mr-0 sm:mt-0 sm:w-[212px]"
      >
        <div className="overflow-hidden rounded-[2.05rem] bg-white">
          <div aria-hidden className="relative flex h-8 items-center justify-between px-5 text-[10px] font-semibold text-ink">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-[18px] w-[60px] -translate-x-1/2 rounded-full bg-ink" />
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                <span className="h-1 w-[3px] rounded-[1px] bg-ink" />
                <span className="h-1.5 w-[3px] rounded-[1px] bg-ink" />
                <span className="h-2 w-[3px] rounded-[1px] bg-ink" />
              </span>
              <span className="h-2.5 w-5 rounded-[3px] border border-ink/70 p-[1.5px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
              </span>
            </span>
          </div>

          <div aria-hidden className="flex items-center gap-1.5 px-4 pb-2 pt-0.5">
            <Image src="/icon.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
            <span className="font-display text-[11px] font-semibold text-ink">Phase 2 layout</span>
          </div>

          <div aria-hidden className="aspect-square border-y border-line bg-bb-paper">
            <SitePlan className="block h-full w-full" selectedId={plot.id} viewBox={crop} />
          </div>

          <div aria-live="polite" className="px-4 pb-3 pt-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bb-slate">Plot {plot.id}</p>
            <p className="mt-1 font-display text-base font-extrabold leading-tight text-ink sm:text-lg">
              {plot.sizeSqYd} sq yd · {plot.facing}
            </p>
            <p className="mt-1 font-mono text-xs text-ink">{formatRupees(plot.price)}</p>
            <div className="mt-2 flex flex-wrap gap-1 font-mono text-[9px] uppercase tracking-[0.06em]">
              <span className={`rounded-full border px-1.5 py-0.5 ${STATUS_CHIP[plot.status]}`}>{plot.status}</span>
              <span className="rounded-full border border-ink/15 px-1.5 py-0.5 text-bb-slate">{plot.roadWidth}</span>
            </div>
            <span
              aria-hidden
              className={`mt-3 block rounded-full py-2 text-center text-xs font-semibold ${
                plot.status === "Available" ? "bg-ink text-white" : "bg-bb-stone text-bb-slate"
              }`}
            >
              {plot.status === "Available" ? "Book site visit" : "Not available"}
            </span>
            <span aria-hidden className="mx-auto mt-3 block h-1 w-14 rounded-full bg-ink/80" />
          </div>
        </div>
      </figure>
    </div>
  );
}
