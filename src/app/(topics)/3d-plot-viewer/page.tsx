import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/3d-plot-viewer";
const description =
  "Let buyers explore your project in 3D, in any browser. They see every plot's size, facing, road width and live status, with drone views of the real site.";

export const metadata: Metadata = constructMetadata({
  title: "3D Plot Viewer for Real Estate Projects | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "3D plot viewer",
  path,
  title: "A 3D plot viewer for your project",
  lead: "Buyers open your project in any browser, turn it around in 3D and tap any plot to see its size, facing, road width, price and whether it's still available.",
  sections: [
    {
      title: "See the whole project in 3D",
      paragraphs: [
        "A flat layout plan asks buyers to imagine the site. The 3D view shows it: plots, roads, buildings and surroundings, so the layout makes sense before anyone books a site visit.",
        "Buyers switch between the 2D plan, the 3D view and drone views of the site, and zoom and pan across the whole layout.",
      ],
      points: [
        "Plots, roads and buildings in 3D",
        "2D, 3D and drone views of the same project",
        "Plot boundaries drawn from your approved plan",
        "Runs in the browser on any phone or computer",
      ],
    },
    {
      title: "Every plot's facts, one tap away",
      paragraphs: [
        "Tap a plot and its details open: plot number, size in square yards, facing, road width, dimensions, price and status. Corner plots are marked, so buyers who want one find them quickly.",
        "Filters narrow the layout down to the plots a buyer can actually choose from.",
      ],
      points: ["Size, facing and road width", "Price and live status", "Corner plots marked", "Filter by availability, facing and size"],
    },
    {
      title: "Drone views of the real site",
      paragraphs: [
        "Aerial and ground photos sit under the plan, with plot boundaries drawn on top. Buyers who live in another city can check the land and its surroundings without travelling, and arrive at the site visit already knowing which plot they want.",
      ],
    },
    {
      title: "Always the current availability",
      paragraphs: [
        "The viewer reads from the same live inventory your sales team and brokers use. When a plot is held or booked, its status changes for every buyer at once, so nobody picks a plot that has already gone.",
      ],
    },
    {
      title: "On your website and in WhatsApp",
      paragraphs: [
        "Put the viewer on your project website, or send it as a link. Brokers share plots with their clients straight from the map, so the conversation starts from the right plot.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do buyers need to install an app?",
      answer: "No. The 3D plot viewer runs in the web browser on any phone or computer.",
    },
    {
      question: "What do you need to build the 3D view?",
      answer:
        "Your layout plan as a CAD (.dwg) export or PDF. Drone footage and site photos help if you have them. Our team builds the view and you review it before launch.",
    },
    {
      question: "How long does it take?",
      answer: "Usually 10 to 14 business days from the day we receive your layout plan.",
    },
    {
      question: "Can buyers see which plots are available?",
      answer: "Yes. Each plot shows its live status: available, on hold or booked. Changes appear for every buyer at once.",
    },
    {
      question: "Does it work for villas and apartments too?",
      answer:
        "Yes. Villa communities show parks, walking paths and the clubhouse. Apartment projects are shown tower by tower, floor by floor.",
    },
  ],
  related: [
    { label: "Plot inventory management", href: "/plot-inventory-management-software" },
    { label: "Maps for plotted developments", href: "/plotted-developments" },
    { label: "Interactive map vs PDF layout", href: "/interactive-plot-map-vs-pdf" },
  ],
};

export default function ThreeDPlotViewerRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage content={content} schema={[serviceJsonLd({ name: "3D plot viewer", description, path })]} />
      </main>
    </div>
  );
}
