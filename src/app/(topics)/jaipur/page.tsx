import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { OFFICE_ADDRESS_LINE } from "@/lib/contact";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/jaipur";
const description =
  "BrickBytes is a real estate software company in Jaipur. We build custom software and live plot maps for developers in Jaipur, Rajasthan and across India.";

export const metadata: Metadata = constructMetadata({
  title: "Real Estate Software Company in Jaipur | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Jaipur",
  path,
  title: "Real estate software, built in Jaipur",
  lead: "BrickBytes is made by BrickNova Technologies in Mansarovar, Jaipur. We build custom software and live plot maps for real estate developers in Jaipur, across Rajasthan and the rest of India.",
  sections: [
    {
      title: "Software for the way your project sells",
      paragraphs: [
        "We build the system your sales run on, around your own rules: bookings and instalments, broker networks and commissions, leads, live inventory and an interactive map of the project.",
      ],
      points: ["Bookings and instalments", "Broker commissions across levels", "CRM and lead tracking", "Live plot maps"],
    },
    {
      title: "A team in your own city",
      paragraphs: [
        "Our office is in Mansarovar, Jaipur, so Jaipur developers deal with a team in their own city. Message us on WhatsApp and we typically reply within minutes; email gets a reply within one business day.",
      ],
    },
    {
      title: "Plot facts the way Jaipur buyers compare them",
      paragraphs: [
        "Plot buyers in Jaipur compare size in square yards, which way a plot faces and how wide the road in front of it is. BrickBytes shows exactly that for every plot, along with its price and live status, and marks the corner plots.",
      ],
      points: ["Size in square yards", "Facing and road width", "Corner plots marked", "Price and live status"],
    },
    {
      title: "From your approved layout to a live map",
      paragraphs: [
        "Send the approved layout plan for your project, whether it was approved by the JDA or another authority, as a CAD (.dwg) export or PDF. We place every plot, road and amenity to match it, and take you live in 10 to 14 business days.",
      ],
    },
    {
      title: "Buyers who can't visit yet can still see the land",
      paragraphs: [
        "Drone and site photos show the real site with plot boundaries drawn on top, in any browser. Buyers outside the city can shortlist a plot before they travel for a site visit.",
      ],
    },
    {
      title: "Brokers across the city on live data",
      paragraphs: [
        "Brokers check live availability, hold plots for clients and schedule site visits in the broker portal, so they stop calling your office to ask what is still free.",
      ],
    },
  ],
  faqs: [
    {
      question: "Where is your office?",
      answer: OFFICE_ADDRESS_LINE,
    },
    {
      question: "Do you only work with Jaipur projects?",
      answer: "No. We build the map from your files and it runs in any browser, so your project can be anywhere in India.",
    },
    {
      question: "Can you work from a JDA-approved layout?",
      answer: "Yes. Send the approved layout as a CAD (.dwg) export or PDF, and every plot boundary, road width and amenity is placed to match it.",
    },
    {
      question: "How long does a Jaipur project take to go live?",
      answer: "Usually 10 to 14 business days from the day we receive your layout plan and price list.",
    },
  ],
  related: [
    { label: "Maps for plotted developments", href: "/plotted-developments" },
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Custom real estate software", href: "/custom-real-estate-software" },
  ],
};

export default function JaipurRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[
            serviceJsonLd({
              name: "Real estate software for Jaipur developers",
              description,
              path,
              areaServed: { "@type": "City", name: "Jaipur" },
            }),
          ]}
        />
      </main>
    </div>
  );
}
