import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/interactive-plot-map-vs-pdf";
const description =
  "A PDF layout plan is out of date the day it's sent. Compare a PDF layout with a live, interactive plot map: availability, plot details, updates and brokers.";

export const metadata: Metadata = constructMetadata({
  title: "Interactive Plot Map vs PDF Layout Plan | BrickBytes",
  description,
  path,
});

const comparison: { topic: string; pdf: string; map: string }[] = [
  {
    topic: "Plot availability",
    pdf: "Fixed on the day the PDF was made. Buyers call to check.",
    map: "Live. A hold or booking reaches every buyer and broker at once.",
  },
  {
    topic: "Plot details",
    pdf: "Plot number and size, if the drawing is legible.",
    map: "Size, facing, road width, dimensions, price and status on each plot.",
  },
  {
    topic: "Finding the right plot",
    pdf: "Buyers scan the drawing by eye.",
    map: "Filters by availability, facing and size. Corner plots marked.",
  },
  {
    topic: "Seeing the site",
    pdf: "A drawing only.",
    map: "2D, 3D and drone views, with plot boundaries drawn on the photos.",
  },
  {
    topic: "Updating prices or the layout",
    pdf: "Make a new file and send it to everyone again.",
    map: "Change it once in the developer console. Everyone sees it.",
  },
  {
    topic: "Brokers",
    pdf: "Work from whichever version they were sent.",
    map: "Work from live availability in their own portal.",
  },
  {
    topic: "On a phone",
    pdf: "Pinch and zoom a large drawing.",
    map: "Opens in any browser on a phone or computer.",
  },
];

const content: LandingPageContent = {
  name: "Interactive plot map vs PDF layout plan",
  path,
  title: "Interactive plot map vs PDF layout plan",
  lead: "Most projects still sell from a PDF layout, a price list and phone calls. Here is what changes when the same layout becomes a live, interactive map.",
  sections: [
    {
      title: "Where a PDF still makes sense",
      paragraphs: [
        "A PDF is easy to email and print, and approvals and paperwork need one anyway. It's a good record of the plan.",
        "It just isn't a good way to sell from, because it can't tell anyone which plots are still available, and every price change means a new file.",
      ],
    },
    {
      title: "What an interactive map adds",
      paragraphs: [
        "Each plot becomes something a buyer can tap: its size, facing, road width, price and live status are right there. Your team changes a status once and every buyer and broker sees it.",
        "Buyers answer their own questions at any hour, so the calls your team does take are from people who are ready to visit.",
      ],
    },
    {
      title: "Moving from PDF to a live map",
      paragraphs: [
        "You don't have to redraw anything. Send us the PDF or CAD layout you already have, with your price list, and we build the live map in 10 to 14 business days.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can we keep sending our PDF brochure?",
      answer: "Yes. Keep the PDF for printing and paperwork, and send buyers the map link when they want to choose a plot.",
    },
    {
      question: "Can you build the map from our existing PDF?",
      answer: "Yes. A PDF of the approved layout works, as does a CAD (.dwg) export or even a hand-drawn sketch.",
    },
    {
      question: "Do buyers need to install anything?",
      answer: "No. The map runs in the web browser on any phone or computer.",
    },
  ],
  related: [
    { label: "Layout plan to interactive map", href: "/layout-plan-to-interactive-map" },
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
    { label: "How onboarding works", href: "/how-it-works" },
  ],
};

export default function MapVsPdfRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Interactive plot maps", description, path })]}
        >
          <section aria-labelledby="comparison-table" className="relative bg-bb-paper pb-16 sm:pb-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 id="comparison-table" className="sr-only">
                Side-by-side comparison
              </h2>
              {/* Below sm each row stacks, with the column name shown inside the cell */}
              <div className="rounded-2xl border border-line bg-white">
                <table className="w-full text-left text-base">
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b border-line text-sm text-bb-slate">
                      <th scope="col" className="w-1/5 p-5 font-medium">
                        <span className="sr-only">Topic</span>
                      </th>
                      <th scope="col" className="p-5 font-medium">
                        PDF layout plan
                      </th>
                      <th scope="col" className="p-5 font-semibold text-ink">
                        Interactive plot map
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.topic} className="block border-b border-line py-3 last:border-b-0 sm:table-row sm:py-0">
                        <th scope="row" className="block px-5 py-2 align-top font-display font-semibold text-ink sm:table-cell sm:p-5">
                          {row.topic}
                        </th>
                        <td className="block px-5 py-2 align-top leading-relaxed text-bb-slate sm:table-cell sm:p-5">
                          <span className="block text-sm font-medium sm:hidden">PDF layout plan</span>
                          {row.pdf}
                        </td>
                        <td className="block px-5 py-2 align-top leading-relaxed text-ink sm:table-cell sm:p-5">
                          <span className="block text-sm font-semibold sm:hidden">Interactive plot map</span>
                          {row.map}
                        </td>
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
