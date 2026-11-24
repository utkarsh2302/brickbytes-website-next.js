import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import PlotYieldCalculator from "@/components/PlotYieldCalculator";
import { estimatePlotYield, SQ_FT_PER_SQ_YD, SQ_YD_PER_ACRE } from "@/lib/plot-yield";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/how-many-plots-in-one-acre";
const title = "How many plots fit in one acre";
const description =
  "How many plots or sites fit in 1 acre? One acre is 4,840 sq yd (gaj) or 43,560 sq ft. See counts for 30x40 and 40x60 sites and 100 to 500 gaj plots.";
const published = "2026-10-31";
// Update when the guide's content changes
const modified = "2026-11-24";

export const metadata: Metadata = constructMetadata({
  title: "How Many Plots or Sites in 1 Acre? Calculator | BrickBytes",
  description,
  path,
});

// Reference tables: plots per acre for common sizes, at a few shares of land
// sold as plots. North India sizes plots in sq yd (gaj); much of South India
// calls them sites and sizes them in feet (30x40 is 1,200 sq ft).
const tableSaleablePercents = [100, 70, 60, 50];

type TableRow = { label: string; detail: string; plotSqYd: number };

const sqYdRows: TableRow[] = [100, 150, 200, 250, 300, 500].map((plotSqYd) => ({
  label: `${plotSqYd} sq yd`,
  detail: `${(plotSqYd * SQ_FT_PER_SQ_YD).toLocaleString("en-IN")} sq ft`,
  plotSqYd,
}));

const feetRows: TableRow[] = [
  [20, 30],
  [30, 40],
  [30, 50],
  [40, 60],
  [50, 80],
].map(([width, depth]) => ({
  label: `${width}x${depth} ft`,
  detail: `${(width * depth).toLocaleString("en-IN")} sq ft`,
  plotSqYd: (width * depth) / SQ_FT_PER_SQ_YD,
}));

const plotCount = (plotSqYd: number, saleablePercent: number) =>
  estimatePlotYield({ landSqYd: SQ_YD_PER_ACRE, saleablePercent, plotSqYd })?.plotCount;

const sqYdOf = (widthFt: number, depthFt: number) => (widthFt * depthFt) / SQ_FT_PER_SQ_YD;

const content: LandingPageContent = {
  name: "Plots in one acre",
  path,
  title,
  lead: "One acre is 4,840 sq yd (gaj), or 43,560 sq ft. Enter your plot or site size and how much of the land you'll sell as plots, and the calculator estimates how many your layout can hold.",
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
      question: "How many 30x40 sites are in one acre?",
      answer: `${plotCount(sqYdOf(30, 40), 100)} by area alone, since one 30x40 site is 1,200 sq ft. After roads and parks, if 60% of the land is sold as sites, about ${plotCount(sqYdOf(30, 40), 60)}.`,
    },
    {
      question: "How many 40x60 (60x40) sites are in one acre?",
      answer: `${plotCount(sqYdOf(40, 60), 100)} by area alone (2,400 sq ft each), or about ${plotCount(sqYdOf(40, 60), 60)} if 60% of the land is sold as sites.`,
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

function PlotsPerAcreTable({ id, heading, rows }: { id: string; heading: string; rows: TableRow[] }) {
  return (
    <section aria-labelledby={id} className="relative bg-bb-paper pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id={id} className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          {heading}
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-base">
            <caption className="px-3 pt-5 sm:px-5 text-left text-sm text-bb-slate">
              Columns show the share of the acre sold as plots; the rest is roads, parks and common areas.
            </caption>
            <thead>
              <tr className="border-b border-line text-sm text-bb-slate">
                <th scope="col" className="px-3 py-4 sm:p-5 font-medium">
                  Size
                </th>
                {tableSaleablePercents.map((percent) => (
                  <th key={percent} scope="col" className="px-2 py-4 sm:p-5 text-right font-medium">
                    {percent}%
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-3 py-4 sm:p-5 whitespace-nowrap font-semibold text-ink">
                    {row.label}
                    <span className="block text-sm font-normal text-bb-slate">{row.detail}</span>
                  </th>
                  {tableSaleablePercents.map((percent) => (
                    <td key={percent} className="px-2 py-4 sm:p-5 text-right tabular-nums text-ink">
                      {plotCount(row.plotSqYd, percent)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

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
              dateModified: modified,
              inLanguage: "en-IN",
              author: { "@id": ORGANIZATION_ID },
              publisher: { "@id": ORGANIZATION_ID },
            },
          ]}
        >
          <PlotYieldCalculator />

          <PlotsPerAcreTable id="plots-per-acre-table" heading="Plots in one acre, by plot size" rows={sqYdRows} />
          <PlotsPerAcreTable id="sites-per-acre-table" heading="Sites in one acre, by size in feet" rows={feetRows} />
        </LandingPage>
      </main>
    </div>
  );
}
