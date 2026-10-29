import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/villa-communities";
const description =
  "Show your gated villa community as a live, interactive site plan: villa plots, parks, walking paths and the clubhouse, with live availability for every unit.";

export const metadata: Metadata = constructMetadata({
  title: "Interactive Site Plans for Villa Communities | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Villa communities",
  path,
  title: "Interactive site plans for villa communities",
  lead: "Buyers of a villa are choosing the community as much as the home. BrickBytes shows both: every villa plot with live availability, next to the parks, paths and clubhouse around it.",
  sections: [
    {
      title: "The whole community on one map",
      paragraphs: [
        "Place villa plots next to parks, walking paths and the clubhouse, so buyers see what surrounds the home they're choosing, not just its boundary.",
      ],
      points: ["Full community layout", "Clubhouse and garden views", "Walking paths", "Live unit availability"],
    },
    {
      title: "In 3D and from the air",
      paragraphs: [
        "The 3D view shows plots, buildings and surroundings, so the community makes sense before a site visit. Drone and site photos, with boundaries drawn on top, let buyers check the real site from anywhere.",
      ],
    },
    {
      title: "Every unit's details",
      paragraphs: [
        "Tap a villa plot to see its size, facing, road width, price and live status. Filters narrow the community down to the units a buyer can choose from.",
      ],
    },
    {
      title: "Answers for buyers at any hour",
      paragraphs: [
        "An assistant answers common buyer questions about size, facing, road width and project rules from your own project data, so a buyer browsing at night doesn't wait until morning for a call back.",
      ],
    },
    {
      title: "One record for your team and brokers",
      paragraphs: [
        "Holds and bookings update the map for every buyer and broker at once. Brokers hold units for their clients and schedule site visits in the broker portal, and your team follows it all from the developer console.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can we show amenities like the clubhouse and parks?",
      answer: "Yes. The map has layers for plot boundaries, road widths and amenities such as parks, walking paths and the clubhouse.",
    },
    {
      question: "Can buyers explore the community remotely?",
      answer: "Yes. The map runs in any browser on a phone or computer, with 3D and drone views of the site.",
    },
    {
      question: "Do brokers get their own access?",
      answer: "Yes. In the broker portal, brokers see live availability, hold units for clients and schedule site visits.",
    },
    {
      question: "How long until our villa community is live?",
      answer: "Usually 10 to 14 business days from the day we receive your layout plan and price list.",
    },
  ],
  related: [
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
    { label: "Apartment projects", href: "/apartment-projects" },
    { label: "Plotted developments", href: "/plotted-developments" },
  ],
};

export default function VillaCommunitiesRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Interactive site plans for villa communities", description, path })]}
        />
      </main>
    </div>
  );
}
