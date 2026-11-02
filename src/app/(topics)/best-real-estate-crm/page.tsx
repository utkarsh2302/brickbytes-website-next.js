import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/best-real-estate-crm";
const title = "How to choose the best real estate CRM";
const description =
  "There is no single best real estate CRM. What to check for a builder or developer: leads tied to inventory, brokers, site visits, bookings and payments.";
// Update when the guide's content changes
const published = "2026-11-02";

export const metadata: Metadata = constructMetadata({
  title: "Best Real Estate CRM in India: How to Choose | BrickBytes",
  description,
  path,
});

// An honest guide, not a ranking: it says when BrickBytes is the wrong fit.
const content: LandingPageContent = {
  name: "How to choose the best real estate CRM",
  path,
  title,
  lead: "There is no single best real estate CRM. The right one depends on whether you're a broker handling many owners' properties or a builder selling your own project. This guide covers what to check, and the questions to ask in a demo.",
  sections: [
    {
      title: "First: are you a broker or a builder?",
      paragraphs: [
        "A broker or agency works with many owners and many listings, so its CRM is built around listings and the enquiries they bring in.",
        "A builder or developer sells their own project: one layout, a fixed inventory of plots or flats, a network of brokers and buyers who pay over months. Its CRM has to know about all of that. A CRM built for one of these fits the other badly, so decide which you are before you compare tools.",
      ],
    },
    {
      title: "1. Leads tied to your inventory",
      paragraphs: [
        "Ask: can each lead be linked to the plot or flat the buyer wants? When that unit is booked, does the CRM know, or does someone have to update it by hand?",
        "If the CRM and the inventory are separate, your team ends up promising units that are already gone.",
      ],
    },
    {
      title: "2. Brokers and channel partners inside the CRM",
      paragraphs: [
        "Ask: can brokers add and work their own leads? When a broker brings a buyer, is that recorded against the booking, along with the commission due? If your brokers recruit other brokers, can the CRM follow that structure?",
      ],
    },
    {
      title: "3. Site visits you can check",
      paragraphs: [
        "Ask: how is a site visit recorded? A note typed later proves little. A check-in from the site, with location and a photo, shows the visit happened and who brought the buyer.",
      ],
    },
    {
      title: "4. Bookings and payments in the same record",
      paragraphs: [
        "Ask: when a lead books, does the booking, its instalments and the buyer's home-loan progress stay in the same record? Or does the sale move to a spreadsheet the moment it closes?",
      ],
    },
    {
      title: "5. An app your team will actually use",
      paragraphs: [
        "Your sales team and brokers work from their phones, often on site. Try the mobile app yourself. If adding a lead or booking a unit takes too many steps, people go back to WhatsApp and paper. If your brokers work in Hindi, check that the app does too.",
      ],
    },
    {
      title: "6. Ready-made or customised",
      paragraphs: [
        "A ready-made CRM is quicker to start and works well when your process is standard.",
        "A customised CRM is worth it when your commission plans, payment schedules or approval steps don't fit a standard tool, and your team would otherwise spend its day working around the software.",
      ],
    },
    {
      title: "7. Getting your data out",
      paragraphs: [
        "Your leads and buyer records are years of work. Ask how you'd export them, in what format, and what happens to them if you stop paying.",
      ],
    },
    {
      title: "Where BrickBytes fits, and where it doesn't",
      paragraphs: [
        "BrickBytes is built for builders and developers selling their own projects: plotted developments, villa communities and apartments. Leads, live inventory, brokers and their commissions, bookings and payments are one system, with mobile apps in English and Hindi, set up around your own rules.",
        "If you're a broker managing other owners' properties, a CRM built around listings will suit you better.",
      ],
      link: { label: "The BrickBytes real estate CRM", href: "/real-estate-crm" },
    },
  ],
  faqs: [
    {
      question: "What is the best real estate CRM in India?",
      answer:
        "The one that matches how you sell. Builders selling their own projects through brokers need a CRM tied to live inventory, bookings and payments. Brokers handling many owners' properties need one built around listings.",
    },
    {
      question: "Is a customised CRM worth it for a builder?",
      answer:
        "Yes, if your commission plans, payment schedules or approvals don't fit a standard tool. If your process is simple, a ready-made CRM is quicker to start.",
    },
    {
      question: "How do we test a CRM before we buy it?",
      answer:
        "Add a lead, link it to a unit, book that unit and record a payment. Then check that your team, the broker and the inventory all show the same thing. Any step that needs a second tool is one your team will repeat every day.",
    },
  ],
  related: [
    { label: "Real estate CRM", href: "/real-estate-crm" },
    { label: "How to choose plot booking software", href: "/choose-plot-booking-software" },
    { label: "Channel partner software", href: "/channel-partner-management-software" },
  ],
};

export default function BestRealEstateCrmGuideRoute() {
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
