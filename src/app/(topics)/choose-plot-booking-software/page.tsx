import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/choose-plot-booking-software";
const title = "How to choose plot booking software";
const description =
  "A checklist for developers comparing plot booking software: live inventory, timed holds, a broker portal, map accuracy, setup time and who owns your data.";
// Update when the guide's content changes
const published = "2026-10-31";

export const metadata: Metadata = constructMetadata({
  title: "How to Choose Plot Booking Software: A Checklist | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "How to choose plot booking software",
  path,
  title,
  lead: "Most plot booking tools look alike in a demo. This checklist covers what decides whether one still works once your team, your brokers and your buyers use it every day.",
  sections: [
    {
      title: "Start from how you sell today",
      paragraphs: [
        "Before you compare tools, write down who changes a plot's status today: the office, your sales team, your brokers. Note how many brokers you work with, how holds work and how your project opens in phases.",
        "Good software fits your booking rules. If a tool makes you change how your team sells, that cost shows up after the contract is signed.",
      ],
    },
    {
      title: "1. One live inventory, shared by everyone",
      paragraphs: [
        "Ask the vendor: when a plot is booked, does its status change for buyers, brokers and your team at the same moment? Or is there an export, an upload or someone updating a second list?",
        "Any step between the booking and what brokers see is where double bookings come from.",
      ],
    },
    {
      title: "2. Holds that expire on their own",
      paragraphs: [
        "Ask: can a hold carry a reservation timer? Who can place a hold, who can release one, and what happens when the time runs out? Holds that never expire leave plots off the market for weeks.",
      ],
    },
    {
      title: "3. A map buyers can actually use",
      paragraphs: [
        "Ask: is the map traced from your approved layout, plot by plot, or is it a picture with pins on it? Can a buyer tap a plot and see its size in square yards, facing, road width and price?",
        "Open it on your own phone. If it needs an app or is hard to read on a small screen, buyers won't use it.",
      ],
    },
    {
      title: "4. A broker portal with limits you control",
      paragraphs: [
        "Ask: can brokers check live availability and hold a plot for a client themselves? Can you choose what each broker sees, and remove access when a channel partner leaves?",
      ],
    },
    {
      title: "5. Paperwork that matches the plot",
      paragraphs: [
        "Ask: when a hold becomes a booking, are the reservation documents generated from that plot's own details? Retyping plot numbers and sizes into a document is where mistakes creep in.",
      ],
    },
    {
      title: "6. Setup time, and who does the work",
      paragraphs: [
        "Ask: who draws the map, you or the vendor? What files do they need, and how long until you're live? A tool your team has to set up in its spare time can take months to go live.",
      ],
    },
    {
      title: "7. Who owns your data",
      paragraphs: [
        "Your inventory, pricing history and buyer details are business-critical. Ask who owns them, whether the vendor can use or sell them, and how you'd get them out if you left.",
      ],
    },
    {
      title: "Where BrickBytes fits",
      paragraphs: [
        "BrickBytes is built around these points: one live map for buyers, brokers and your team, holds with reservation timers, a broker portal with access you control, and reservation documents generated from each plot's details.",
        "We build the map from your layout plan, price list and booking rules and take you live in 10 to 14 business days. Your data stays yours: we sell software, not data.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do we need a real estate CRM or plot booking software?",
      answer:
        "They do different jobs. A CRM tracks leads and follow-ups; plot booking software tracks the plots themselves: which are free, held or booked. Many developers use both. What matters is that plot status lives in one place.",
    },
    {
      question: "What should we test in a software demo?",
      answer:
        "Book a plot on one device and watch it change on another, then let a hold run out. Those two tests show whether the inventory is really live.",
    },
    {
      question: "Can we switch from our spreadsheet without pausing sales?",
      answer:
        "Yes. You keep selling as usual while we build the map from your current price list and availability, then switch over on launch day.",
    },
  ],
  related: [
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "Stopping double bookings", href: "/stop-double-booking-plots" },
    { label: "The broker portal", href: "/broker-portal" },
  ],
};

export default function ChooseBookingSoftwareGuideRoute() {
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
