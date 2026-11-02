import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/real-estate-app-development";
const description =
  "Real estate app development for builders: a custom Android app with your name for brokers and buyers, in English and Hindi, published on Google Play.";

export const metadata: Metadata = constructMetadata({
  title: "Real Estate App Development Company in India | BrickBytes",
  description,
  path,
});

// Features match the app we have published on Google Play. Don't promise an
// iPhone app until the founders confirm one.
const content: LandingPageContent = {
  name: "Real estate app development",
  path,
  title: "Custom real estate apps for builders and their brokers",
  lead: "We build the mobile app your brokers sell from and your buyers browse on: your company's name, your projects and your rules, connected to the same live inventory as the rest of your sales.",
  sections: [
    {
      title: "An app with your name on it",
      paragraphs: [
        "The app carries your company's name and logo and shows only your projects. We publish it on Google Play, so brokers and buyers install it like any other app.",
      ],
    },
    {
      title: "For brokers: sell from the site",
      paragraphs: [
        "Brokers see live availability and book a plot on the spot. Instead of retyping the handwritten booking form, they photograph it, and the app fills in the buyer's name, phone, address, plot number and payment details.",
        "At the site they check in with GPS and a photo, so every visit is on record.",
      ],
      points: [
        "Booking from a photo of the paper form",
        "GPS-verified site visits",
        "Each customer's booking and home-loan progress",
        "Commissions, team and leaderboard",
        "A notification when a plot in their project sells",
      ],
    },
    {
      title: "For buyers: explore before they visit",
      paragraphs: [
        "Buyers browse your projects, explore plots on the interactive map, take 360° tours and drone views of the site, work out EMI options and check their booking status with their phone number.",
      ],
    },
    {
      title: "English and Hindi",
      paragraphs: ["Every screen switches between English and Hindi, so brokers and buyers use the app in the language they work in."],
    },
    {
      title: "Connected to the rest of your sales",
      paragraphs: [
        "The app reads the same live inventory, bookings and commissions as your admin dashboard and the plot map on your website. A booking made on a broker's phone shows everywhere at once.",
      ],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
  ],
  faqs: [
    {
      question: "Can the app carry our own brand?",
      answer: "Yes. The app carries your company's name and logo and shows only your projects.",
    },
    {
      question: "Who publishes the app on Google Play?",
      answer: "We do. We prepare the Play Store listing and publish the app for you.",
    },
    {
      question: "Is the app connected to our website's plot map?",
      answer:
        "Yes. The app, the map on your website and your admin dashboard share one live inventory, so a plot booked in the app shows as booked everywhere.",
    },
  ],
  related: [
    { label: "Channel partner software", href: "/channel-partner-management-software" },
    { label: "Real estate CRM", href: "/real-estate-crm" },
    { label: "The broker portal", href: "/broker-portal" },
  ],
};

export default function RealEstateAppDevelopmentRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Real estate app development", description, path })]}
        />
      </main>
    </div>
  );
}
