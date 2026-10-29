import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/apartment-projects";
const description =
  "Present apartment towers floor by floor. Buyers pick a tower and floor, check unit layouts and see which units are free, updated live for your brokers.";

export const metadata: Metadata = constructMetadata({
  title: "Live Unit Availability for Apartment Projects | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Apartment projects",
  path,
  title: "Live unit availability for apartment projects",
  lead: "Present your towers floor by floor. Buyers pick a floor, open a unit's layout and see straight away which units are still available.",
  sections: [
    {
      title: "Floor by floor, tower by tower",
      paragraphs: [
        "A site map shows every tower in the project. Buyers choose a tower, then a floor, and see each unit on it with its status.",
      ],
      points: ["Multi-tower site maps", "Floor selector", "Each unit's status on the floor"],
    },
    {
      title: "Unit layouts and filters",
      paragraphs: [
        "Buyers open a unit's layout before they ask for a visit, and availability filters hide the units that are already taken.",
      ],
      points: ["Unit layout views", "Unit availability filters"],
    },
    {
      title: "The towers in 3D, with the site around them",
      paragraphs: [
        "The 3D view shows the buildings and their surroundings, so buyers understand where a tower sits on the site before they visit. Drone and site photos show the real site, in any browser.",
      ],
    },
    {
      title: "Status that stays current",
      paragraphs: [
        "When a unit is held or booked, it changes for every buyer and broker at once. Prices, status and layouts stay in one place, so nobody works from an old list.",
      ],
    },
    {
      title: "Your sales team and brokers on the same data",
      paragraphs: [
        "Brokers check live availability, hold units for clients and schedule site visits in the broker portal. Your team manages inventory and follows sales from the developer console.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does BrickBytes work for apartments, or only plots?",
      answer: "Both. BrickBytes works for plotted developments, gated villa communities and apartment towers.",
    },
    {
      question: "Can we show more than one tower?",
      answer: "Yes. A site map shows every tower in the project, and buyers move from tower to floor to unit.",
    },
    {
      question: "Can buyers filter units?",
      answer: "Yes. Availability filters show buyers only the units they can still choose from.",
    },
    {
      question: "How long until our apartment project is live?",
      answer: "Usually 10 to 14 business days from the day we receive your plans and price list.",
    },
  ],
  related: [
    { label: "Villa communities", href: "/villa-communities" },
    { label: "Inventory management", href: "/plot-inventory-management-software" },
    { label: "The broker portal", href: "/broker-portal" },
  ],
};

export default function ApartmentProjectsRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Live unit availability for apartment projects", description, path })]}
        />
      </main>
    </div>
  );
}
