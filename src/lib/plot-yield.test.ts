import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { acresToSqYd, estimatePlotYield } from "./plot-yield.ts";

describe("acresToSqYd", () => {
  it("converts one acre to 4,840 sq yd", () => {
    assert.equal(acresToSqYd(1), 4840);
  });

  it("converts fractional acres", () => {
    assert.equal(acresToSqYd(2.5), 12100);
  });
});

describe("estimatePlotYield", () => {
  it("counts 200 sq yd plots in one acre when 60% of the land is sold", () => {
    const result = estimatePlotYield({ landSqYd: 4840, saleablePercent: 60, plotSqYd: 200 });
    assert.deepEqual(result, { saleableSqYd: 2904, plotCount: 14 });
  });

  it("counts a plot that fits exactly, despite floating-point error", () => {
    // 0.18 acres is 871.2 sq yd, which floating point stores as 871.1999999999999
    const result = estimatePlotYield({ landSqYd: acresToSqYd(0.18), saleablePercent: 100, plotSqYd: 217.8 });
    assert.equal(result?.plotCount, 4);
  });

  it("returns zero plots when one plot is larger than the saleable land", () => {
    const result = estimatePlotYield({ landSqYd: 100, saleablePercent: 50, plotSqYd: 200 });
    assert.equal(result?.plotCount, 0);
  });

  it("returns null for land, plot size or share that can't be measured", () => {
    const invalidInputs = [
      { landSqYd: 0, saleablePercent: 60, plotSqYd: 200 },
      { landSqYd: -1, saleablePercent: 60, plotSqYd: 200 },
      { landSqYd: Number.NaN, saleablePercent: 60, plotSqYd: 200 },
      { landSqYd: 4840, saleablePercent: 60, plotSqYd: 0 },
      { landSqYd: 4840, saleablePercent: 0, plotSqYd: 200 },
      { landSqYd: 4840, saleablePercent: 101, plotSqYd: 200 },
      { landSqYd: Number.POSITIVE_INFINITY, saleablePercent: 60, plotSqYd: 200 },
    ];
    for (const input of invalidInputs) {
      assert.equal(estimatePlotYield(input), null, JSON.stringify(input));
    }
  });

  it("never counts more plots than fit, and always counts every plot that does", () => {
    // Deterministic pseudo-random inputs, so a failure can be reproduced
    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let run = 0; run < 2000; run++) {
      const input = {
        landSqYd: 1 + random() * 200000,
        saleablePercent: 1 + random() * 99,
        plotSqYd: 1 + random() * 1000,
      };
      const result = estimatePlotYield(input);
      assert.ok(result, JSON.stringify(input));
      const tolerance = 1e-6;
      assert.ok(result.plotCount * input.plotSqYd <= result.saleableSqYd + tolerance, JSON.stringify(input));
      assert.ok((result.plotCount + 1) * input.plotSqYd > result.saleableSqYd - tolerance, JSON.stringify(input));
    }
  });
});
