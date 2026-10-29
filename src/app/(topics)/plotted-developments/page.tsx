import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/plotted-developments";
const description =
  "Sell a plotted development from a live, interactive layout. Buyers see each plot's size in sq yd, facing, road width and status; brokers hold plots for clients.";

export const metadata: Metadata = constructMetadata({
  title: "Interactive Maps for Plotted Developments | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Plotted developments",
  path,
  title: "Interactive maps for plotted developments",
  lead: "Turn your approved layout into a live map of the whole subdivision. Buyers find the right plot by size, facing and road width, and your brokers hold it before someone else does.",
  sections: [
    {
      title: "Built for how plots are bought",
      paragraphs: [
        "Plot buyers compare things a brochure doesn't show well: the exact size, which way the plot faces, how wide the road in front of it is, and whether it's a corner plot.",
        "BrickBytes puts all of it on the plot itself, so buyers compare plots on the map instead of on the phone.",
      ],
      points: [
        "Plot-by-plot selection",
        "Size in square yards, facing and road width",
        "Corner plots marked",
        "Filter by availability, facing and size",
      ],
    },
    {
      title: "Boundaries from your approved plan",
      paragraphs: [
        "We place every plot boundary, road width and amenity to match your approved layout. Send it as a CAD (.dwg) export or a PDF; we also work from hand-drawn sketches.",
        "Drone and site photos go under the plan with the boundaries drawn on top, so buyers can check the real land from anywhere.",
      ],
    },
    {
      title: "Live availability, phase by phase",
      paragraphs: [
        "As plots are held and booked, the map updates for every buyer and broker at once. Hold timers keep reservations moving, and you release a plot in a click when a buyer walks away.",
        "When a new phase opens, upload its layout from the developer console and it joins the same live map.",
      ],
    },
    {
      title: "Brokers sell the project for you",
      paragraphs: [
        "Most plotted projects sell through brokers. In the broker portal they see live availability, hold plots for clients and schedule site visits, so they can close without calling your office.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can you work from our approved layout plan?",
      answer:
        "Yes. Send it as a CAD (.dwg) export or PDF; we also work from hand-drawn sketches. Every plot boundary, road width and amenity is placed to match it.",
    },
    {
      question: "Can buyers filter plots?",
      answer: "Yes, by availability, facing and size. Corner plots are marked on the map.",
    },
    {
      question: "Can we add a new phase later?",
      answer: "Yes. Upload the new phase's layout from the developer console when it opens.",
    },
    {
      question: "How long until our project is live?",
      answer: "Usually 10 to 14 business days from the day we receive your layout plan and price list.",
    },
  ],
  related: [
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Layout plan to interactive map", href: "/layout-plan-to-interactive-map" },
  ],
};

export default function PlottedDevelopmentsRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Interactive maps for plotted developments", description, path })]}
        />
      </main>
    </div>
  );
}
