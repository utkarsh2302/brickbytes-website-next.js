"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { inputClass } from "./ui/input";
import { acresToSqYd, estimatePlotYield, SQ_FT_PER_SQ_YD } from "@/lib/plot-yield";

type LandUnit = "acres" | "sqyd";

const numbers = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

// The live estimate on /how-many-plots-in-one-acre. Inputs are kept as text so
// a visitor can clear a field while typing; until all three are usable the
// result shows what to enter instead of a number.
export default function PlotYieldCalculator() {
  const [land, setLand] = useState("1");
  const [landUnit, setLandUnit] = useState<LandUnit>("acres");
  const [plotSize, setPlotSize] = useState("200");
  const [saleablePercent, setSaleablePercent] = useState("60");

  const landSqYd = landUnit === "acres" ? acresToSqYd(Number(land)) : Number(land);
  const plotSqYd = Number(plotSize);
  const estimate = estimatePlotYield({ landSqYd, saleablePercent: Number(saleablePercent), plotSqYd });

  return (
    <section aria-labelledby="calculator-heading" className="relative bg-bb-paper pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-line bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="calculator-heading" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Estimate your plot count
            </h2>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="plot-yield-land" className="text-sm font-medium text-ink">
                  Land area
                </label>
                <div className="flex gap-3">
                  <input
                    id="plot-yield-land"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={land}
                    onChange={(event) => setLand(event.target.value)}
                    className={inputClass}
                  />
                  <div className="relative w-36 shrink-0">
                    <label htmlFor="plot-yield-land-unit" className="sr-only">
                      Unit of land area
                    </label>
                    <select
                      id="plot-yield-land-unit"
                      value={landUnit}
                      onChange={(event) => setLandUnit(event.target.value === "sqyd" ? "sqyd" : "acres")}
                      className={`${inputClass} cursor-pointer appearance-none pr-11`}
                    >
                      <option value="acres">acres</option>
                      <option value="sqyd">sq yd</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="plot-yield-plot-size" className="text-sm font-medium text-ink">
                    Plot size in sq yd (gaj)
                  </label>
                  <input
                    id="plot-yield-plot-size"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={plotSize}
                    onChange={(event) => setPlotSize(event.target.value)}
                    aria-describedby="plot-yield-plot-size-hint"
                    className={inputClass}
                  />
                  <p id="plot-yield-plot-size-hint" className="text-sm text-bb-slate">
                    {plotSqYd > 0 ? `${numbers.format(plotSqYd * SQ_FT_PER_SQ_YD)} sq ft` : "1 sq yd is 9 sq ft"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="plot-yield-saleable" className="text-sm font-medium text-ink">
                    Land sold as plots, in %
                  </label>
                  <input
                    id="plot-yield-saleable"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    max="100"
                    step="any"
                    value={saleablePercent}
                    onChange={(event) => setSaleablePercent(event.target.value)}
                    aria-describedby="plot-yield-saleable-hint"
                    className={inputClass}
                  />
                  <p id="plot-yield-saleable-hint" className="text-sm text-bb-slate">
                    The rest is roads, parks and common areas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div role="status" className="flex flex-col justify-center rounded-2xl bg-bb-stone p-6 sm:p-8 lg:col-span-5">
            {estimate ? (
              <>
                <p className="font-display text-6xl font-extrabold tracking-[-0.03em] text-ink">
                  {numbers.format(estimate.plotCount)}
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {estimate.plotCount === 1 ? "plot" : "plots"} of {numbers.format(plotSqYd)} sq yd
                </p>
                <p className="mt-4 text-base leading-relaxed text-bb-slate">
                  {numbers.format(estimate.saleableSqYd)} sq yd of the {numbers.format(landSqYd)} sq yd is sold as plots. This
                  is the most that fits by area; the drawn layout often holds a few less.
                </p>
              </>
            ) : (
              <p className="text-base leading-relaxed text-ink">
                Enter the land area, a plot size and the share of land sold as plots, between 1 and 100%.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
