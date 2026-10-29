import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/plot-inventory-management-software";
const description =
  "Manage plot inventory on a live map: status, prices and holds in one place. Every change reaches buyers and brokers at once, with sales reports by phase.";

export const metadata: Metadata = constructMetadata({
  title: "Plot Inventory Management Software | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Plot inventory management software",
  path,
  title: "Plot inventory, managed on a live map",
  lead: "Keep every plot's status, price and hold in one place. Change it once, and your sales team, brokers and buyers all see the update straight away.",
  sections: [
    {
      title: "One list instead of five",
      paragraphs: [
        "Plot inventory usually lives in a spreadsheet on one laptop, a printed layout with pen marks and a few WhatsApp groups. They never quite agree.",
        "BrickBytes replaces them with one live record per plot, shown on the same map your buyers and brokers use.",
      ],
      points: [
        "Size, facing, road width and dimensions for every plot",
        "Prices kept in one place",
        "Status: available, on hold or booked",
        "Booked, held and open plots at a glance",
      ],
    },
    {
      title: "Change a status once",
      paragraphs: [
        "When a plot is held, booked or released, change it in the developer console. The map updates for every buyer and broker at once, so nobody quotes a plot that has gone.",
      ],
      points: ["Change any plot's status by hand", "Hold and release plots in a click", "Status changes reach everyone at once"],
    },
    {
      title: "A layout that keeps up with the project",
      paragraphs: [
        "Phases open, plots change, prices move. Upload revised layouts from the developer console as they happen, so the map and the inventory stay in step with the project on the ground.",
      ],
    },
    {
      title: "See what's selling",
      paragraphs: [
        "Sales analytics show how fast plots sell, which parts of the project draw interest and how each broker is performing. Reports break down by project and phase.",
      ],
    },
    {
      title: "You decide who sees what",
      paragraphs: [
        "Add brokers and sales staff, choose what each of them can see, and remove access at any time. Inventory, pricing history and buyer details belong to you.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can you load our existing plot list?",
      answer:
        "Yes. Send your price list and current availability with the layout plan at onboarding, and our team loads them into BrickBytes.",
    },
    {
      question: "What statuses can a plot have?",
      answer: "Available, on hold or booked. Plots on hold carry a reservation timer, so you can see how long each hold has left.",
    },
    {
      question: "Does it handle projects with several phases?",
      answer: "Yes. Upload each phase's layout as it opens, and sales reports break down by project and phase.",
    },
    {
      question: "Who owns the inventory data?",
      answer: "You do. Inventory, pricing history and buyer details belong to you, and we never sell your leads or pricing.",
    },
    {
      question: "How long until our inventory is on the map?",
      answer: "Usually 10 to 14 business days from the day we receive your layout plan and price list.",
    },
  ],
  related: [
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
    { label: "The full platform", href: "/technology" },
  ],
};

export default function PlotInventoryManagementRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Plot inventory management software", description, path })]}
        />
      </main>
    </div>
  );
}
