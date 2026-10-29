import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/layout-plan-to-interactive-map";
const title = "How to turn a layout plan into an interactive plot map";
const description =
  "A step-by-step guide to turning a CAD or PDF layout plan into an interactive plot map: what to prepare, how plots are drawn and how to keep the map current.";
// Update when the guide's content changes
const published = "2026-10-30";

export const metadata: Metadata = constructMetadata({
  title: "Turn a Layout Plan PDF into an Interactive Map | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Layout plan to interactive map",
  path,
  title,
  lead: "A practical guide for developers: what to gather, how a layout becomes a map buyers can tap, and how to keep it accurate once plots start selling.",
  sections: [
    {
      title: "Step 1: Gather the right files",
      paragraphs: [
        "Start with the most accurate version of the layout you have. A CAD export (.dwg) is best, because the plot boundaries are already precise lines. A PDF of the approved layout works too, and a clean hand-drawn sketch can be traced.",
      ],
      points: [
        "The approved layout plan (CAD .dwg or PDF)",
        "Plot numbers and dimensions",
        "The price list and current availability",
        "Your booking rules",
        "Drone footage and site photos, if you have them",
      ],
    },
    {
      title: "Step 2: Check the plot list against the plan",
      paragraphs: [
        "Before anything is drawn, make sure the plot numbers on the layout match your price list and availability sheet. Mismatches here cause the most confusing errors later, such as a plot that's booked in the spreadsheet but shown as free on the plan.",
      ],
    },
    {
      title: "Step 3: Draw each plot as its own shape",
      paragraphs: [
        "On an interactive map, each plot is a separate shape a buyer can tap, not part of one flat image. Every boundary is traced from the layout, then given its facts: size in square yards, facing, road width, dimensions and price.",
      ],
    },
    {
      title: "Step 4: Add the context buyers ask about",
      paragraphs: [
        "Mark the roads with their widths, the parks, the clubhouse and other amenities, and the corner plots. Drone and site photos with the boundaries drawn on top let buyers check the real site from anywhere.",
      ],
    },
    {
      title: "Step 5: Connect it to live availability",
      paragraphs: [
        "A plot map is only as useful as its status colours. Connect each plot to a live inventory, so a hold or booking changes the map for everyone at once. Without that, the map goes out of date as fast as the PDF did.",
      ],
    },
    {
      title: "Step 6: Share it and keep it current",
      paragraphs: [
        "Put the map on your project website, send it as a link, and give your brokers their own access. When a phase opens or the layout is revised, update the same map rather than making a new file.",
      ],
    },
    {
      title: "Doing it yourself, or with BrickBytes",
      paragraphs: [
        "You can make a basic clickable map yourself with an image-map tool. Most of the work comes after that: live inventory, holds with reservation timers, a broker portal and keeping it all in sync.",
        "BrickBytes does the whole build from your files and takes you live in 10 to 14 business days.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which file format works best?",
      answer: "A CAD (.dwg) export, because the boundaries are already precise. A PDF of the approved layout also works.",
    },
    {
      question: "Can a scanned or hand-drawn layout be used?",
      answer: "Yes, as long as the plot numbers and dimensions are readable. Each boundary is traced and checked against your plot list.",
    },
    {
      question: "How long does the conversion take with BrickBytes?",
      answer: "Usually 10 to 14 business days from the day we receive your files.",
    },
  ],
  related: [
    { label: "Interactive map vs PDF layout", href: "/interactive-plot-map-vs-pdf" },
    { label: "How onboarding works", href: "/how-it-works" },
    { label: "Maps for plotted developments", href: "/plotted-developments" },
  ],
};

export default function LayoutPlanGuideRoute() {
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
        />
      </main>
    </div>
  );
}
