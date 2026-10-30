import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/plotted-development-marketing";
const title = "How to market a plotted development";
const description =
  "A practical guide to marketing a plotted development: what plot buyers weigh, where enquiries come from, and how a live plot map turns them into site visits.";
// Update when the guide's content changes
const published = "2026-10-31";

export const metadata: Metadata = constructMetadata({
  title: "How to Market a Plotted Development Project | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "How to market a plotted development",
  path,
  title,
  lead: "Plot buyers compare location, plot size, price and how far the project has progressed. Good marketing answers those questions before the first call, then makes picking a plot easy.",
  sections: [
    {
      title: "Know what plot buyers weigh",
      paragraphs: [
        "Buyers of plots look at location and connectivity, plot size, price, the quality of the project and how far development has got: roads, boundary walls, drainage, the clubhouse and other amenities.",
        "Lead with the points where your project is strongest, and make every one of them easy to check.",
      ],
    },
    {
      title: "Show progress, not just renders",
      paragraphs: [
        "A plot buyer is buying land they'll build on later, so they want to see what's on the ground today. Drone footage and site photos with the plot boundaries drawn on top show the real site, and they're more convincing than a render.",
        "Refresh them as roads and amenities are finished. Visible progress gives buyers a reason to book now rather than wait.",
      ],
    },
    {
      title: "Send every enquiry to one place",
      paragraphs: [
        "Ads, portal listings, hoardings, brochures and WhatsApp messages should all point to the same live map. Print a short link or a QR code on hoardings and brochures, so anyone who sees them can check available plots on their phone.",
        "With one destination, every channel shows the same prices and availability, and you can compare which channels bring buyers.",
      ],
    },
    {
      title: "Answer the questions before the call",
      paragraphs: [
        "Put each plot's size, facing, road width and price on the plot itself, and use an assistant that answers buyer questions from your project data at any hour. Your sales team then spends its calls on buyers who are ready to visit.",
      ],
    },
    {
      title: "Make the site visit the next step",
      paragraphs: [
        "For plots, marketing works when it leads to a site visit. Buyers who have explored the map arrive with a shortlist, and brokers can schedule and log those visits in their portal, so your team knows who is coming and why.",
      ],
    },
    {
      title: "Work your broker network",
      paragraphs: [
        "Brokers are a marketing channel too. Give them live availability and plots they can share with clients straight from the map, rather than a PDF that's out of date by the weekend.",
        "Sales analytics show which brokers are selling, so you know where to put your effort.",
      ],
    },
    {
      title: "Measure what sells",
      paragraphs: [
        "Track how fast plots sell and which parts of the layout draw the most interest. If one phase or plot size is slow, adjust the price or the message for that part of the project instead of the whole campaign.",
      ],
    },
    {
      title: "Check the rules before you advertise",
      paragraphs: [
        "Under the RERA Act, a project that needs registration can't be advertised or sold until it's registered, and its adverts must show the registration number and the state authority's website. Check your state RERA authority's rules before a pre-launch campaign.",
      ],
    },
    {
      title: "Where BrickBytes fits",
      paragraphs: [
        "BrickBytes gives every channel one live map to point to: plots with their size, facing and price, drone and 3D views with the boundaries drawn on, an assistant for buyer questions, a broker portal and sales analytics. Projects go live in 10 to 14 business days.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can we put the map link on hoardings and brochures?",
      answer:
        "Yes. Print a short link or a QR code that opens the live map, so anyone who sees the hoarding can check available plots on their phone.",
    },
    {
      question: "Which marketing channel works best for plots?",
      answer:
        "It depends on your location and buyers. Count site visits, not just enquiries, and send every channel to the same live map so you can compare them fairly.",
    },
    {
      question: "Do we need RERA registration before marketing a project?",
      answer:
        "In most cases, yes: a project that needs registration can't be advertised until it's registered. Check with your state RERA authority for your project.",
    },
  ],
  related: [
    { label: "How to sell plots online", href: "/how-to-sell-plots-online" },
    { label: "The 3D plot viewer", href: "/3d-plot-viewer" },
    { label: "The broker portal", href: "/broker-portal" },
  ],
};

export default function PlottedMarketingGuideRoute() {
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
