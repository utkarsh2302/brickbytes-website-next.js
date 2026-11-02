import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/flat-booking-software";
const description =
  "Flat booking software for apartment projects: live unit availability floor by floor, holds and bookings, payments and instalments, and brokers on the same data.";

export const metadata: Metadata = constructMetadata({
  title: "Flat Booking Software for Apartment Projects | BrickBytes",
  description,
  path,
});

// Booking and payments for flats. How towers and units are presented to buyers is on /apartment-projects.
const content: LandingPageContent = {
  name: "Flat booking software",
  path,
  title: "Flat booking software for apartment projects",
  lead: "Sell flats from one live inventory: buyers see which units are free floor by floor, your team holds and books units, and every payment and instalment is tracked against its flat.",
  sections: [
    {
      title: "Live unit availability",
      paragraphs: [
        "Every tower, floor and unit is on one live inventory. Buyers pick a floor, open a unit's layout and see straight away which units are still available.",
      ],
      link: { label: "Live unit availability for apartments", href: "/apartment-projects" },
    },
    {
      title: "Holds and bookings for flats",
      paragraphs: [
        "Hold a unit for a buyer, then turn the hold into a booking. Every change shows for your team, your brokers and your buyers at once, so a flat is never promised twice.",
      ],
    },
    {
      title: "Payments and instalments for every flat",
      paragraphs: [
        "Record the booking amount and each instalment against the flat, so your accounts team sees what has been paid and what is due, and buyers check their booking status with their phone number.",
      ],
      link: { label: "Payment and instalment tracking", href: "/real-estate-payment-tracking" },
    },
    {
      title: "Brokers and channel partners",
      paragraphs: [
        "Brokers see live unit availability and book from their phone, and their commissions follow your plan.",
      ],
      link: { label: "Channel partner and commission software", href: "/channel-partner-management-software" },
    },
    {
      title: "Set up for your project",
      paragraphs: [
        "Towers, unit types, price lists and booking rules are set up to match your project and the way your team sells.",
      ],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
  ],
  faqs: [
    {
      question: "What does a buyer see?",
      answer:
        "Buyers pick a tower and a floor, open a unit's layout and see whether it's still available, in any browser.",
    },
    {
      question: "Can brokers book flats from their phone?",
      answer: "Yes. Brokers see live unit availability and book from the mobile app.",
    },
    {
      question: "How are payments for each flat tracked?",
      answer:
        "Each payment and instalment is recorded against the flat and its booking, so your team sees what's paid and what's due.",
    },
  ],
  related: [
    { label: "Apartment projects", href: "/apartment-projects" },
    { label: "Payment tracking", href: "/real-estate-payment-tracking" },
    { label: "Channel partner software", href: "/channel-partner-management-software" },
  ],
};

export default function FlatBookingRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Flat booking software", description, path })]}
        />
      </main>
    </div>
  );
}
