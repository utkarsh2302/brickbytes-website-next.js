import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/custom-real-estate-software";
const description =
  "Custom software for real estate developers in India: bookings and instalments, broker networks and commissions, CRM, live inventory and plot maps.";

export const metadata: Metadata = constructMetadata({
  title: "Custom Real Estate Software for Developers | BrickBytes",
  description,
  path,
});

// The full scope of what BrickBytes builds, as confirmed by the founders on
// 2026-10-31. Name a client here only with their written permission.
const content: LandingPageContent = {
  name: "Custom real estate software",
  path,
  title: "Custom software for real estate developers",
  lead: "BrickBytes builds the software your project sales run on: bookings and instalments, broker networks and commissions, leads, live inventory and interactive plot maps, shaped around the way you already sell.",
  sections: [
    {
      title: "Everything a project sale needs, in one system",
      paragraphs: [
        "Sales often run across a spreadsheet for inventory, a register for payments, a WhatsApp group for brokers and a PDF layout for buyers. Each copy drifts from the others, and your team spends its day keeping them in step.",
        "BrickBytes puts it all in one system, so a booking, a payment or a commission updates everywhere at once.",
      ],
      points: [
        "Booking management, with payment and instalment tracking",
        "Broker and channel-partner management, with commissions across levels",
        "CRM and lead tracking for your sales team",
        "Live inventory for plots, villas and flats",
        "Interactive 2D and 3D plot maps",
        "Admin dashboards for your team",
        "A portal for your customers",
        "Mobile apps for brokers and buyers",
      ],
    },
    {
      title: "Built around how you sell",
      paragraphs: [
        "Every developer sells differently. Some work with a few brokers on a fixed commission, others with large broker networks paid across several levels. Some take full payment at booking, others collect it in instalments.",
        "We build your rules into the software: your commission structure, your payment plans, your approval steps and the reports your team relies on. You don't have to change how you sell to fit the software.",
      ],
    },
    {
      title: "Bookings, payments and instalments",
      paragraphs: [
        "Every booking is tied to its plot or flat, its buyer and the broker who brought them. Record the booking amount and each instalment against it, so your accounts team sees what has been paid and what is still due.",
      ],
    },
    {
      title: "Broker networks and commissions",
      paragraphs: [
        "Brokers get their own portal with live availability, their leads, their bookings and their commissions. Where brokers bring in other brokers, each one sees their own team.",
        "Commission rules follow your structure level by level, and your team approves each payout from the admin dashboard.",
      ],
    },
    {
      title: "Leads and follow-ups",
      paragraphs: [
        "Keep every enquiry in one place, assign it to someone on your team or to a broker, and follow it from the first call to the site visit and the booking.",
      ],
    },
    {
      title: "Plots, villas and flats on a live map",
      paragraphs: [
        "Your inventory drives an interactive 2D and 3D map of the project. Buyers explore it in any browser and see what's still available, and every booking updates the map at once.",
        "Plot maps go live 10 to 14 business days after we receive your layout plan.",
      ],
    },
    {
      title: "A Jaipur team, working across India",
      paragraphs: [
        "BrickBytes is built by BrickNova Technologies in Mansarovar, Jaipur. We work with developers of plotted developments, villa communities and apartment projects anywhere in India.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is BrickBytes ready-made software or built for us?",
      answer:
        "Both. Plot maps, bookings, inventory and the broker portal are ready to set up, and we build the rest around your rules: commission structures, payment plans, approvals and reports.",
    },
    {
      question: "Can it handle multi-level broker commissions?",
      answer:
        "Yes. Commission rules follow your broker structure level by level, each broker sees their own team, and your team approves every payout.",
    },
    {
      question: "Does it work for flats and villas as well as plots?",
      answer: "Yes. Inventory, bookings and payments work the same way for flats, villas and plots.",
    },
    {
      question: "Do you work with developers outside Jaipur?",
      answer: "Yes. Our office is in Jaipur, and we work with developers anywhere in India.",
    },
  ],
  related: [
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Plot inventory management", href: "/plot-inventory-management-software" },
  ],
};

export default function CustomSoftwareRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Custom real estate software", description, path })]}
        />
      </main>
    </div>
  );
}
