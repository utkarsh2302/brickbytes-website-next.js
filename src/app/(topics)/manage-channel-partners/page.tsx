import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

const path = "/manage-channel-partners";
const title = "How to manage channel partners in real estate";
const description =
  "A guide for developers selling through brokers: written rules, one live inventory, proof of who brought the buyer, visible commissions and on-time payouts.";
// Update when the guide's content changes
const published = "2026-11-02";

export const metadata: Metadata = constructMetadata({
  title: "How to Manage Channel Partners in Real Estate | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "How to manage channel partners",
  path,
  title,
  lead: "Channel partners can bring in more buyers than your own team could reach, or turn a project into double bookings and commission disputes. The difference is mostly in the rules you set and the information you share.",
  sections: [
    {
      title: "Where channel partner sales go wrong",
      paragraphs: [
        "Most problems start in the same few places: two partners promise the same plot, two partners claim the same buyer, a commission is worked out differently from what was agreed, or partners lose interest because they can't see what's still available.",
      ],
    },
    {
      title: "1. Write the rules down before the first booking",
      paragraphs: [
        "Agree on paper: the commission for each sale and, if partners bring in other partners, what each level earns; when commission is paid, for example at booking or once the buyer has paid a set share; how long a partner can hold a plot; and who gets credit when a buyer comes through two partners.",
        "Disputes start where the rules are unwritten.",
      ],
    },
    {
      title: "2. Give every partner the same live inventory",
      paragraphs: [
        "If partners learn what's available from phone calls or a forwarded PDF, two of them will sell the same plot. Share one live inventory that changes the moment a plot is held or booked, and let partners hold plots for clients themselves, with each hold expiring on its own.",
      ],
      link: { label: "How to stop double bookings", href: "/stop-double-booking-plots" },
    },
    {
      title: "3. Settle who brought the buyer with evidence",
      paragraphs: [
        "The fairest rule is one you can check. Record each lead against the partner who registered it, and log site visits with a check-in from the site that carries the location and a photo. When two partners claim one buyer, the record decides.",
      ],
    },
    {
      title: "4. Make commissions visible",
      paragraphs: [
        "Partners trust a commission they can see. Show each partner their bookings and what they've earned at every level, and have your team approve each payout, so the figures in your accounts and on the partner's phone match.",
      ],
    },
    {
      title: "5. Keep partners selling your project",
      paragraphs: [
        "Partners usually work with several developers and push the project that's easiest to sell. Make yours the easy one: tell them when plots sell, give them a booking page to share with clients, show them where they stand against other partners, and pay on time.",
      ],
    },
    {
      title: "6. Control who sees what",
      paragraphs: [
        "Decide what each partner can see: prices, buyer details, other partners' sales. Remove access the day a partner leaves, so your inventory and buyer list don't leave with them.",
      ],
    },
    {
      title: "Where BrickBytes fits",
      paragraphs: [
        "BrickBytes is built for this: one live inventory for your team and every partner, holds that expire on their own, GPS-verified site visits with a photo, and commissions that follow your plan level by level, with payouts your team approves.",
        "Partners get leaderboards, a notification when a plot in their project sells and their own booking page, in a mobile app that works in English and Hindi.",
      ],
      link: { label: "Channel partner and commission software", href: "/channel-partner-management-software" },
    },
  ],
  faqs: [
    {
      question: "Who should get credit when two channel partners bring the same buyer?",
      answer:
        "Whoever your written rules say. A common rule is the partner who registered the buyer first and brought them for the site visit. What matters is that the rule is agreed before it's needed and that there's a record to check it against.",
    },
    {
      question: "When should channel partner commission be paid?",
      answer:
        "That's your policy to set. Some developers pay at booking, others once the buyer has paid a set share of the price. Whichever you choose, put it in the partner agreement and show partners where each payout stands.",
    },
    {
      question: "How do we stop partners quoting different prices?",
      answer:
        "Give every partner the same live price list, the one your inventory shows, instead of copies that go out of date. When a price changes, change it once.",
    },
  ],
  related: [
    { label: "Channel partner software", href: "/channel-partner-management-software" },
    { label: "The broker portal", href: "/broker-portal" },
    { label: "How to choose a real estate CRM", href: "/best-real-estate-crm" },
  ],
};

export default function ManageChannelPartnersGuideRoute() {
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
