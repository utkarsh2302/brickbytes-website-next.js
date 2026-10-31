import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import PlotYieldCalculator from "@/components/PlotYieldCalculator";
import { estimatePlotYield, SQ_FT_PER_SQ_YD, SQ_YD_PER_ACRE } from "@/lib/plot-yield";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/how-many-plots-in-one-acre";
const title = "How many plots fit in one acre";
const description =
  "How many plots fit in 1 acre? One acre is 4,840 sq yd (gaj). Enter your plot size and the share of land sold as plots to estimate your layout's plot count.";
// Update when the guide's content changes
const published = "2026-10-31";

export const metadata: Metadata = constructMetadata({
  title: "How Many Plots in 1 Acre? Plot Calculator | BrickBytes",
  description,
  path,
});

// The reference table: plots per acre for common sizes, at a few shares of land sold as plots
const tablePlotSizes = [100, 150, 200, 250, 300, 500];
const tableSaleablePercents = [100, 70, 60, 50];

const content: LandingPageContent = {
  name: "Plots in one acre",
  path,
  title,
  lead: "One acre is 4,840 sq yd (gaj), or 43,560 sq ft. Enter your plot size and how much of the land you'll sell as plots, and the calculator estimates how many plots your layout can hold.",
  sections: [
    {
      title: "The formula",
      paragraphs: [
        "Plots = land in sq yd × share sold as plots ÷ plot size, rounded down. One acre is 4,840 sq yd, so if every square yard became a plot, one acre would hold 24 plots of 200 sq yd.",
        "A real layout can't do that. Roads, parks and other common areas take part of the land, and only the rest is sold as plots. If 60% of the acre is sold as plots, that's 2,904 sq yd, or 14 plots of 200 sq yd.",
      ],
    },
    {
      title: "What decides the share sold as plots",
      paragraphs: [
        "The share comes from your layout: how wide the roads are, how much open space and how many facilities the project includes, and how neatly the plots line up along each road.",
        "Local development rules set minimums for road width and open space, and they differ by state and authority. Check them with your architect or the approving authority before you fix the plot count.",
      ],
      points: ["Road widths", "Parks and open space", "Common facilities", "The shape of the land"],
    },
    {
      title: "Why the drawn layout can hold fewer plots",
      paragraphs: [
        "The calculator divides area, so it gives the most plots that could fit. Plots are rectangles that have to face a road, so an irregular boundary, curved roads and corners leave pieces too small for a full plot.",
        "Treat the estimate as a starting point for your architect's layout, not the final count.",
      ],
    },
    {
      title: "Mixing plot sizes",
      paragraphs: [
        "Many layouts offer more than one plot size. Decide how much of the saleable land goes to each size, run the calculator once for each size with that land, and add the counts.",
      ],
    },
    {
      title: "From layout plan to a map buyers can browse",
      paragraphs: [
        "Once the layout is approved, BrickBytes turns it into a live, interactive plot map. Buyers tap any plot to see its size in square yards, facing, road width, price and whether it's still available, and your team and brokers sell from the same live inventory.",
        "Projects go live 10 to 14 business days after we receive your files.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many square yards (gaj) are in one acre?",
      answer: "One acre is 4,840 sq yd, which is 4,840 gaj, 43,560 sq ft or about 4,047 square metres.",
    },
    {
      question: "How many 100 gaj plots are in one acre?",
      answer: "48 if every square yard became a plot. If 60% of the land is sold as plots after roads and parks, about 29.",
    },
    {
      question: "How many 200 sq yd plots fit in one acre?",
      answer: "24 by area alone, or about 14 if 60% of the land is sold as plots.",
    },
    {
      question: "Can I use the calculator for land measured in bigha?",
      answer:
        "Yes, after converting it. A bigha's size changes from state to state, and sometimes between districts, so convert your land to square yards using the local value, choose sq yd and enter that.",
    },
  ],
  related: [
    { label: "Layout plan to interactive map", href: "/layout-plan-to-interactive-map" },
    { label: "Maps for plotted developments", href: "/plotted-developments" },
    { label: "Marketing plotted projects", href: "/plotted-development-marketing" },
  ],
};

const plotCount = (plotSqYd: number, saleablePercent: number) =>
  estimatePlotYield({ landSqYd: SQ_YD_PER_ACRE, saleablePercent, plotSqYd })?.plotCount;

export default function PlotsInOneAcreRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[
            {
              "@type": "Article",
              headline: title,
              description,
              url: `${SITE_URL}${path}`,
              datePublished: published,
              dateModified: published,
              inLanguage: "en-IN",
              author: { "@id": ORGANIZATION_ID },
              publisher: { "@id": ORGANIZATION_ID },
            },
          ]}
        >
          <PlotYieldCalculator />

          <section aria-labelledby="plots-per-acre-table" className="relative bg-bb-paper pb-16 sm:pb-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 id="plots-per-acre-table" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                Plots in one acre, by plot size
              </h2>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
                <table className="w-full text-left text-base">
                  <caption className="px-3 pt-5 sm:px-5 text-left text-sm text-bb-slate">
                    Columns show the share of the acre sold as plots; the rest is roads, parks and common areas.
                  </caption>
                  <thead>
                    <tr className="border-b border-line text-sm text-bb-slate">
                      <th scope="col" className="px-3 py-4 sm:p-5 font-medium">
                        Plot size
                      </th>
                      {tableSaleablePercents.map((percent) => (
                        <th key={percent} scope="col" className="px-3 py-4 sm:p-5 text-right font-medium">
                          {percent}%
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tablePlotSizes.map((plotSqYd) => (
                      <tr key={plotSqYd} className="border-b border-line last:border-b-0">
                        <th scope="row" className="px-3 py-4 sm:p-5 whitespace-nowrap font-semibold text-ink">
                          {plotSqYd} sq yd
                          <span className="block text-sm font-normal text-bb-slate">
                            {(plotSqYd * SQ_FT_PER_SQ_YD).toLocaleString("en-IN")} sq ft
                          </span>
                        </th>
                        {tableSaleablePercents.map((percent) => (
                          <td key={percent} className="px-3 py-4 sm:p-5 text-right tabular-nums text-ink">
                            {plotCount(plotSqYd, percent)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </LandingPage>
      </main>
    </div>
  );
}
