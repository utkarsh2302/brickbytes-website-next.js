// Plot-yield estimate for the "how many plots in one acre" calculator.
// Kept free of imports so `node --test` can run it without the app's bundler.

export const SQ_YD_PER_ACRE = 4840;
export const SQ_FT_PER_SQ_YD = 9;

export function acresToSqYd(acres: number) {
  return acres * SQ_YD_PER_ACRE;
}

export type PlotYieldInput = {
  landSqYd: number;
  // Share of the land sold as plots; roads, parks and common areas take the rest
  saleablePercent: number;
  plotSqYd: number;
};

export type PlotYield = { saleableSqYd: number; plotCount: number };

// An upper estimate by area alone: plot shapes, corners and the site boundary
// usually make the drawn layout hold a little less. Returns null when an input
// isn't a usable measurement (empty field, zero, negative, over 100%).
export function estimatePlotYield({ landSqYd, saleablePercent, plotSqYd }: PlotYieldInput): PlotYield | null {
  const isMeasurement = (value: number) => Number.isFinite(value) && value > 0;
  if (!isMeasurement(landSqYd) || !isMeasurement(plotSqYd) || !isMeasurement(saleablePercent)) return null;
  if (saleablePercent > 100) return null;

  const saleableSqYd = (landSqYd * saleablePercent) / 100;
  // The small allowance stops floating-point error (871.2 stored as 871.1999…)
  // from dropping a plot that fits exactly.
  const plotCount = Math.floor(saleableSqYd / plotSqYd + 1e-9);
  return { saleableSqYd, plotCount };
}
