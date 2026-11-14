"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SitePlan, { DEFAULT_PLOT_ID, samplePlots, type PlotStatus } from "./SitePlan";

// three.js is about 190 KB gzipped, so it never renders on the server and is
// only fetched after the visitor first interacts; the headline stays the LCP element.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const STATUS_CHIP: Record<PlotStatus, string> = {
  Available: "border-bb-available/40 text-bb-available",
  "On hold": "border-bb-hold/40 text-bb-hold",
  Booked: "border-ink/15 text-bb-slate",
};

const formatRupees = (amount: number) => `₹ ${amount.toLocaleString("en-IN")}`;

function supportsWebGL() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

// Waits for the visitor's first scroll, touch, pointer move or key press, so a
// page that is only loading never pays for three.js (it cost about 4.5 s of
// blocked main thread on a throttled phone when loaded during page load).
function onFirstIntent(callback: () => void) {
  const events = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown"] as const;
  const stop = () => events.forEach((name) => window.removeEventListener(name, fire));
  const fire = () => {
    stop();
    callback();
  };
  events.forEach((name) => window.addEventListener(name, fire, { passive: true }));
  return stop;
}

// Homepage hero visual. The flat site plan shows first (and stays, if the
// device has no WebGL); the 3D model of the same plan then fades in, starting
// from straight above and tilting into 3D: paper plan to live model.
export default function HeroVisual() {
  const [selectedId, setSelectedId] = useState(DEFAULT_PLOT_ID);
  const [loadScene, setLoadScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!supportsWebGL()) return;
    return onFirstIntent(() => setLoadScene(true));
  }, []);

  const index = samplePlots.findIndex((plot) => plot.id === selectedId);
  const plot = samplePlots[index] ?? samplePlots[0];
  const step = (by: number) => setSelectedId(samplePlots[(index + by + samplePlots.length) % samplePlots.length].id);

  return (
    <div className="relative">
      <div className="relative aspect-[5/4] w-full">
        <div
          className={`absolute inset-[6%] flex items-center transition-opacity duration-700 ${sceneReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <SitePlan className="h-auto w-full" selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        {loadScene && (
          <div className={`absolute inset-0 transition-opacity duration-700 ${sceneReady ? "opacity-100" : "opacity-0"}`}>
            <HeroScene
              selectedId={selectedId}
              onSelect={setSelectedId}
              reducedMotion={reducedMotion}
              onReady={() => setSceneReady(true)}
            />
          </div>
        )}
      </div>

      {/* The selected plot, as a buyer sees it. Also the keyboard route
          through the plots, since the 3D model itself is pointer-only. */}
      <div className="relative z-10 mx-auto -mt-6 flex w-full max-w-xs items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgb(28_26_23/0.06),0_24px_48px_-24px_rgb(28_26_23/0.3)] sm:absolute sm:bottom-6 sm:left-0 sm:mt-0 sm:w-64">
        <div aria-live="polite" className="min-w-0 flex-1">
          <p className="font-mono text-[11px] tracking-[0.08em] text-bb-slate">Plot {plot.id}</p>
          <p className="mt-0.5 font-display text-lg font-extrabold leading-tight text-ink">
            {plot.sizeSqYd} sq yd, {plot.facing}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-ink">
            {formatRupees(plot.price)}
            <span className={`rounded-full border px-1.5 py-0.5 text-[10px] ${STATUS_CHIP[plot.status]}`}>{plot.status}</span>
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:flex-col sm:gap-1.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous plot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next plot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-bb-slate sm:mt-2 sm:text-right">
        {sceneReady ? "Drag to turn the model. Tap a plot to see its details." : "Pick any plot to see its details."}
      </p>
    </div>
  );
}
