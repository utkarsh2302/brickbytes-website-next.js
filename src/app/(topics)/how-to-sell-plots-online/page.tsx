import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/how-to-sell-plots-online";
const title = "How to sell plots online: a guide for developers";
const description =
  "How developers sell a plotted project online: every plot on a live map, clear prices, quick answers, online holds and brokers on the same live availability.";
// Update when the guide's content changes
const published = "2026-10-30";

export const metadata: Metadata = constructMetadata({
  title: "How to Sell Plots Online: A Guide for Developers | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "How to sell plots online",
  path,
  title,
  lead: "Selling one plot online means posting a listing. Selling a whole layout means buyers can see which plots are left, what each one costs and how to reserve it, before they call your office.",
  sections: [
    {
      title: "Why listings alone don't sell a layout",
      paragraphs: [
        "Property portals and classifieds are built for one property at a time. A plotted project has dozens or hundreds of plots, each with its own size, facing and price, and their status changes every week.",
        "A listing can bring an enquiry, but the buyer still has to call to find out what's available. Selling a layout online means putting the whole project in front of buyers, not just an advert for it.",
      ],
    },
    {
      title: "Step 1: Put the whole layout online, plot by plot",
      paragraphs: [
        "Start from your approved layout plan and give every plot its own set of facts: size in square yards, facing, road width, dimensions and price. Buyers compare plots by these, so they need them before they enquire.",
        "Mark what buyers ask about most: corner plots, road widths, parks, the clubhouse and other amenities.",
      ],
      points: [
        "Size in sq yd, dimensions and facing",
        "Road width and price",
        "Corner plots and amenities marked on the layout",
      ],
    },
    {
      title: "Step 2: Show what's still available, live",
      paragraphs: [
        "The question buyers ask first is whether a plot is still available. Show each plot's status on the layout itself (available, on hold or booked) and change it in one place, so every buyer and broker sees the same answer.",
        "A PDF or price list sent last month can't do this. It's out of date the day a plot is booked.",
      ],
    },
    {
      title: "Step 3: Let buyers see the site from home",
      paragraphs: [
        "Many buyers shortlist plots long before they visit. A 3D view of the project, with drone and site photos and the plot boundaries drawn on top, lets them understand the site and where each plot sits from any phone or computer.",
      ],
    },
    {
      title: "Step 4: Answer the same questions instantly",
      paragraphs: [
        "Most buyer questions repeat: which way a plot faces, how wide the road is, what it costs. Put those answers on each plot, and use an assistant that answers questions from your own project data at any hour.",
        "Your sales team then spends its time on buyers who are ready to visit.",
      ],
    },
    {
      title: "Step 5: Let buyers reserve online",
      paragraphs: [
        "When a buyer has chosen, let them reserve the plot from the map. The plot goes on hold with a reservation timer, so it can't be promised to anyone else while your team follows up, and the hold either becomes a booking or goes back on sale.",
      ],
    },
    {
      title: "Step 6: Give brokers the same live view",
      paragraphs: [
        "Most plotted projects sell through brokers as well as their own team, and brokers need the same live availability your buyers see. In their own portal they can share plots with clients, hold a plot for a client and schedule site visits without calling the office.",
      ],
    },
    {
      title: "Step 7: Share one link everywhere",
      paragraphs: [
        "Point your website, portal listings, ads and WhatsApp messages to the same live map. When a price changes or a phase opens, you update the map once and every link already shows it.",
      ],
    },
    {
      title: "Doing it yourself, or with BrickBytes",
      paragraphs: [
        "You can start with a clear layout image, a price list and a shared spreadsheet. It works until several people sell at once and the copies drift apart.",
        "BrickBytes builds the live map, holds, online reservations and the broker portal from your layout plan and price list, and takes you live in 10 to 14 business days.",
      ],
    },
  ],
  faqs: [
    {
      question: "Should we still list our project on property portals?",
      answer:
        "Yes. Portals bring enquiries. Point each listing to your live map, so buyers see which plots are left before they call.",
    },
    {
      question: "Can buyers reserve a plot online?",
      answer:
        "Yes. Buyers reserve from the map, the plot goes on hold with a reservation timer, and your team turns the hold into a booking.",
    },
    {
      question: "Does selling online replace site visits?",
      answer:
        "No. Buyers still visit before they book, but they arrive knowing which plots they want. Brokers schedule and log those visits in their portal.",
    },
  ],
  related: [
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "Stopping double bookings", href: "/stop-double-booking-plots" },
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
  ],
};

export default function SellPlotsOnlineGuideRoute() {
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
