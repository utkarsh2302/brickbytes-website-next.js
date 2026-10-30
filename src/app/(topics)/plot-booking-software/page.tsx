import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/plot-booking-software";
const description =
  "Hold, reserve and book plots on a live map. BrickBytes keeps each plot's status current for buyers, brokers and your sales team, from first hold to booking.";

export const metadata: Metadata = constructMetadata({
  title: "Plot Booking Software with Live Plot Holds | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Plot booking software",
  path,
  title: "Plot booking software built on a live map",
  lead: "Hold a plot for a buyer with a reservation timer, then turn the hold into a booking. Every change shows on the map at once, for your team, your brokers and your buyers.",
  sections: [
    {
      title: "From enquiry to booking, on one map",
      paragraphs: [
        "Most plot sales still move through phone calls, a shared spreadsheet and a WhatsApp group. By the time a buyer decides, the plot they wanted may already be promised to someone else.",
        "BrickBytes puts each step on the map itself. The buyer picks a plot, it goes on hold, and the hold becomes a booking. Everyone sees the same status throughout.",
      ],
      points: [
        "Pick a plot on the live map",
        "Hold it with a reservation timer",
        "Release it, or turn it into a booking",
        "Online reservations from the map",
      ],
    },
    {
      title: "Holds with reservation timers",
      paragraphs: [
        "Reservation timers keep holds moving. Your team and brokers can see how long each hold has left, and you release a plot in a click when a buyer walks away, so it goes straight back on sale.",
      ],
    },
    {
      title: "Your booking rules, set up for you",
      paragraphs: [
        "At onboarding you share your booking rules along with your layout plan and price list. We set up holds and bookings to match how your team already sells.",
      ],
    },
    {
      title: "Booking documents, generated for you",
      paragraphs: [
        "When a hold turns into a booking, BrickBytes generates the reservation documents from the plot's details, so the paperwork matches the map.",
      ],
    },
    {
      title: "Brokers book without calling the office",
      paragraphs: [
        "Brokers see live availability, hold plots for their clients and log site visits from their phone. Your office sees every hold and booking as it happens.",
      ],
    },
  ],
  faqs: [
    {
      question: "Who can change a plot's status?",
      answer:
        "Your team, from the developer console, where any plot's status can be changed by hand. You decide which brokers and staff can hold plots and what each of them can see.",
    },
    {
      question: "Do buyers see holds and bookings straight away?",
      answer: "Yes. When a plot is held or booked, its status changes on the map for every buyer and broker at once.",
    },
    {
      question: "How long does it take to start taking bookings?",
      answer:
        "Usually 10 to 14 business days. Send your layout plan, price list and booking rules, and our team does the build.",
    },
    {
      question: "Is our sales data shared with anyone?",
      answer:
        "No. Your inventory, pricing history and buyer details belong to you. We never sell your leads or pricing: we sell software, not data.",
    },
    {
      question: "Does it work for villas and apartments?",
      answer: "Yes. The same holds and bookings work for plotted developments, villa communities and apartment towers.",
    },
  ],
  related: [
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Plot inventory management", href: "/plot-inventory-management-software" },
    { label: "How to sell plots online", href: "/how-to-sell-plots-online" },
  ],
};

export default function PlotBookingSoftwareRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage content={content} schema={[serviceJsonLd({ name: "Plot booking software", description, path })]} />
      </main>
    </div>
  );
}
