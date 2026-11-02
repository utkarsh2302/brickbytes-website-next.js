import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/real-estate-crm";
const description =
  "A real estate CRM built for developers: every enquiry, site visit and booking in one place, shared with your sales team and brokers on live inventory.";

export const metadata: Metadata = constructMetadata({
  title: "Real Estate CRM for Developers in India | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Real estate CRM",
  path,
  title: "A real estate CRM built for developers",
  lead: "Follow every enquiry from the first call to the site visit and the booking, in the same system that holds your live inventory, so your team and brokers never promise a plot that's gone.",
  sections: [
    {
      title: "Why a general CRM falls short for developers",
      paragraphs: [
        "A general CRM tracks people and deals. A developer's sale also depends on inventory: which plot or flat the buyer wants, whether it's still free, which broker brought them and what they have paid.",
        "When the CRM and the inventory live in different places, your team checks one, then the other, and the two drift apart. In BrickBytes, leads, inventory, bookings and payments are one system.",
      ],
    },
    {
      title: "Every enquiry in one place",
      paragraphs: [
        "Add every enquiry, whoever takes the call, and assign it to someone on your sales team or to a broker. Everyone can see who is following up and what happened last.",
      ],
      points: [
        "Leads assigned to staff or brokers",
        "Follow-ups on every lead",
        "Each lead tied to the plot or flat they want",
        "One view for your whole team",
      ],
    },
    {
      title: "Site visits you can trust",
      paragraphs: [
        "Brokers log each site visit from the plot with a GPS-verified check-in and a photo, so you know the visit happened and who brought the buyer.",
      ],
    },
    {
      title: "From lead to booking without retyping",
      paragraphs: [
        "When a buyer decides, the booking is created against the plot or flat they chose. Brokers can start it from a photo of the handwritten booking form, and the app fills in the buyer's details. The map, the inventory and the broker's records update at once.",
      ],
      link: { label: "Payment and instalment tracking", href: "/real-estate-payment-tracking" },
    },
    {
      title: "Brokers work their own leads",
      paragraphs: [
        "Each broker works from their own leads in the broker portal and on the mobile app. Your team sees every lead, visit and booking across all brokers, and decides what each broker can see.",
      ],
      link: { label: "Channel partner and commission software", href: "/channel-partner-management-software" },
    },
    {
      title: "Built around your sales process",
      paragraphs: [
        "Lead stages, assignments and reports are set up to match how your team already sells, as part of the software we build for each developer.",
      ],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
  ],
  faqs: [
    {
      question: "Can BrickBytes replace our current CRM?",
      answer:
        "For project sales, yes: leads, site visits, bookings and payments all live in BrickBytes. In the demo, show us what your current CRM does and we'll go through how it maps.",
    },
    {
      question: "How are site visits verified?",
      answer:
        "Brokers check in from the plot on the mobile app. The check-in is GPS-verified and includes a photo, so your team knows the visit happened.",
    },
    {
      question: "Does the app work in Hindi?",
      answer: "Yes. The mobile app switches between English and Hindi on any screen.",
    },
  ],
  related: [
    { label: "Custom real estate software", href: "/custom-real-estate-software" },
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Plot booking software", href: "/plot-booking-software" },
  ],
};

export default function RealEstateCrmRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Real estate CRM for developers", description, path })]}
        />
      </main>
    </div>
  );
}
