import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { OFFICE_ADDRESS_LINE } from "@/lib/contact";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/jaipur";
const description =
  "BrickBytes is a real estate software and CRM company in Jaipur, building custom software, CRM, mobile apps and plot maps for builders across Rajasthan.";

export const metadata: Metadata = constructMetadata({
  title: "Real Estate Software & CRM Company in Jaipur | BrickBytes",
  description,
  path,
});

// Our priority page: Jaipur is where our office and Google Business Profile are.
const content: LandingPageContent = {
  name: "Jaipur",
  path,
  title: "Real estate software and CRM, built in Jaipur",
  lead: "BrickBytes is made by BrickNova Technologies in Mansarovar, Jaipur. We build custom real estate software, CRM and mobile apps for builders and developers in Jaipur, across Rajasthan and the rest of India.",
  sections: [
    {
      title: "Software for the way your project sells",
      paragraphs: [
        "We build the system your sales run on, around your own rules: bookings and instalments, broker networks and commissions, leads, live inventory and an interactive map of the project.",
      ],
      points: [
        "Bookings and instalments",
        "Broker commissions across levels",
        "CRM and lead tracking",
        "Mobile apps in English and Hindi",
        "Live plot maps",
      ],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
    {
      title: "A real estate CRM for Jaipur builders",
      paragraphs: [
        "Every enquiry, site visit and booking sits in one place, shared by your sales team and your brokers. Each lead is tied to the plot or flat the buyer wants, so nobody promises a plot that has already gone.",
      ],
      link: { label: "Real estate CRM", href: "/real-estate-crm" },
    },
    {
      title: "Apps for your brokers and buyers",
      paragraphs: [
        "A mobile app with your company's name, in English and Hindi. Brokers book plots and log site visits from the field; buyers explore plots, work out EMIs and check their booking status.",
      ],
      link: { label: "Real estate app development", href: "/real-estate-app-development" },
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
      link: { label: "Channel partner and commission software", href: "/channel-partner-management-software" },
    },
    {
      title: "Across Rajasthan",
      paragraphs: [
        "We work with builders and developers across Rajasthan, not only in Jaipur. Send the approved layout from your local authority and we build from it the same way.",
        "Your team, brokers and buyers use the software in a browser or on their phones, so your project doesn't need to be near our office.",
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
      answer:
        "No. We work with builders across Rajasthan and the rest of India. We build from your files, and everything runs in a browser or on a phone, so your project can be anywhere.",
    },
    {
      question: "Do you build CRMs and apps, or only plot maps?",
      answer:
        "All of it: custom software, a real estate CRM, mobile apps for brokers and buyers, and plot maps, built by our team in Jaipur.",
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
              name: "Real estate software and CRM in Jaipur",
              description,
              path,
              areaServed: [
                { "@type": "City", name: "Jaipur" },
                { "@type": "State", name: "Rajasthan" },
              ],
            }),
          ]}
        />
      </main>
    </div>
  );
}
