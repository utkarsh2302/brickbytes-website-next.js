import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/broker-portal";
const description =
  "Give your brokers live plot availability, plot holds, site-visit scheduling and their own leads, on their phone. You approve commissions and control access.";

export const metadata: Metadata = constructMetadata({
  title: "Broker Portal for Real Estate Developers | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Broker portal",
  path,
  title: "A broker portal that runs on live availability",
  lead: "Brokers check which plots are free, hold one for a client, schedule site visits and track their own leads, from their phone. You see all of it from one place.",
  sections: [
    {
      title: "Brokers stop calling the office",
      paragraphs: [
        "In most projects, a broker who wants to know whether a plot is free has to call your office, and your team answers the same question all day.",
        "With BrickBytes, brokers see live availability themselves, so they can answer a client on the spot and close bookings without waiting on a call back.",
      ],
      points: [
        "Live availability on the project map",
        "Each plot's size, facing, road width and price",
        "Plots shared with clients straight from the map",
      ],
    },
    {
      title: "Holds and site visits, from a phone",
      paragraphs: [
        "A broker can hold a plot for a client and keep an eye on its reservation timer, then schedule and log the site visit. Everything they do shows up for your team at once.",
      ],
      points: ["Plot holds with reservation timers", "Site-visit scheduling and logging", "Their own leads, in one list"],
    },
    {
      title: "You stay in control",
      paragraphs: [
        "Add brokers and sales staff, choose what each of them can see, and remove access at any time. Broker commissions are approved by your team in the developer console.",
      ],
    },
    {
      title: "See which brokers are selling",
      paragraphs: [
        "Sales analytics show how each broker is performing, alongside how fast plots sell and which parts of the project draw the most interest.",
      ],
    },
    {
      title: "Brokers set up on launch day",
      paragraphs: [
        "When your map goes live, we set up your brokers and send their invitations, so your network starts selling from live data on day one.",
      ],
    },
  ],
  faqs: [
    {
      question: "What can brokers see?",
      answer: "What you allow. You choose what each broker and staff member can see, and you can remove access at any time.",
    },
    {
      question: "Can brokers hold plots for their clients?",
      answer: "Yes. Each hold carries a reservation timer that your team can see, and you can release a hold in a click.",
    },
    {
      question: "How do brokers get access?",
      answer: "We set up your brokers when your project goes live and send their invitations. You can add or remove brokers later.",
    },
    {
      question: "Can we approve broker commissions in BrickBytes?",
      answer: "Yes. Your team approves broker commissions in the developer console.",
    },
    {
      question: "Do brokers see buyer details from other brokers?",
      answer: "Each broker works from their own leads. You decide what else each broker can see.",
    },
  ],
  related: [
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "Plot inventory management", href: "/plot-inventory-management-software" },
    { label: "Maps for plotted developments", href: "/plotted-developments" },
  ],
};

export default function BrokerPortalRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Broker portal for real estate developers", description, path })]}
        />
      </main>
    </div>
  );
}
