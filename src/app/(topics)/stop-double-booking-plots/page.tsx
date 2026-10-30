import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/stop-double-booking-plots";
const title = "How to stop double booking plots across brokers";
const description =
  "Why the same plot gets promised to two buyers, and how one live inventory, timed holds and a broker portal stop double bookings across your channel partners.";
// Update when the guide's content changes
const published = "2026-10-30";

export const metadata: Metadata = constructMetadata({
  title: "How to Stop Double Booking Plots with Brokers | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Stop double booking plots",
  path,
  title,
  lead: "A plot gets promised to two buyers when brokers, your sales team and the office each work from their own copy of availability. The fix is one live inventory that everyone sells from.",
  sections: [
    {
      title: "Why double bookings happen",
      paragraphs: [
        "In most plotted projects, availability lives in several places at once: a spreadsheet at the office, a PDF on each broker's phone and messages in a WhatsApp group. Each copy is a little behind the others.",
        "Two brokers find buyers for the same plot on the same afternoon. Whoever reaches the office second has to go back to their client, and the dispute over who brought the buyer starts there.",
      ],
    },
    {
      title: "Rule 1: One source of truth for plot status",
      paragraphs: [
        "Keep a single live inventory, and make every status change there: available, on hold or booked. No separate lists for brokers, no price list that's updated by hand.",
        "When the inventory drives the layout map, a hold or booking changes the map for every buyer and broker at once, so nobody sells from an old copy.",
      ],
    },
    {
      title: "Rule 2: Every hold has an owner and an expiry",
      paragraphs: [
        "Most double bookings start with an informal hold: a plot promised over the phone that nobody writes down or releases. Make every hold visible, attached to the person who placed it, and timed.",
        "A reservation timer shows how long each hold has left. When a buyer walks away, release the plot in a click and it goes straight back on sale.",
      ],
      points: [
        "Holds visible to your whole team",
        "A reservation timer on every hold",
        "Release in a click, straight back on sale",
      ],
    },
    {
      title: "Rule 3: Brokers check availability themselves",
      paragraphs: [
        "If a broker has to call the office to ask whether a plot is free, the answer can be out of date by the time they reach their client. Give brokers live availability in their own portal, and let them hold a plot for a client from their phone.",
      ],
    },
    {
      title: "Rule 4: Your team decides who can do what",
      paragraphs: [
        "Choose which brokers and staff can hold plots and what each of them can see, and remove access when a channel partner leaves. Your team can still change any plot's status by hand from the developer console.",
      ],
    },
    {
      title: "Rule 5: Keep a record of who brought which buyer",
      paragraphs: [
        "Each broker tracks their own leads, and their holds and site visits show up for your team as they happen. When a commission is due, your team approves it in the developer console.",
      ],
    },
    {
      title: "Doing it yourself, or with BrickBytes",
      paragraphs: [
        "For a small project with a few brokers, one shared spreadsheet with a single owner can work. It breaks down once several channel partners sell at the same time, because updates lag and holds never expire on their own.",
        "BrickBytes sets up the live inventory, timed holds and the broker portal from your layout plan, price list and booking rules, and invites your brokers when the project goes live, usually 10 to 14 business days after we receive your files.",
      ],
    },
  ],
  faqs: [
    {
      question: "What happens when two brokers want the same plot?",
      answer:
        "Once one of them puts it on hold, the plot shows as held for every broker at once, so the second sees it's taken before promising it to a client.",
    },
    {
      question: "Is a shared spreadsheet enough to prevent double bookings?",
      answer:
        "For a handful of brokers, sometimes. Once several channel partners sell at once, a spreadsheet falls behind and holds don't expire on their own.",
    },
    {
      question: "Can we release a hold when a buyer walks away?",
      answer: "Yes. Release it in a click and the plot goes straight back on sale for every buyer and broker.",
    },
  ],
  related: [
    { label: "The broker portal", href: "/broker-portal" },
    { label: "How to sell plots online", href: "/how-to-sell-plots-online" },
    { label: "Plot inventory management", href: "/plot-inventory-management-software" },
  ],
};

export default function StopDoubleBookingGuideRoute() {
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
