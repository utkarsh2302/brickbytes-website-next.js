import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/channel-partner-management-software";
const description =
  "Manage channel partners and associate networks: commissions across levels, a team view for every associate, leaderboards and payouts your team approves.";

export const metadata: Metadata = constructMetadata({
  title: "Channel Partner & Broker Commission Software | BrickBytes",
  description,
  path,
});

// The developer's side of broker sales. What brokers themselves see is on /broker-portal.
const content: LandingPageContent = {
  name: "Channel partner software",
  path,
  title: "Channel partner and broker commission software",
  lead: "Run your channel partners and associate network from one place: who brought which buyer, what each partner has earned at every level, and which payouts your team has approved.",
  sections: [
    {
      title: "Commissions that follow your plan",
      paragraphs: [
        "Commission rules follow your plan, level by level. Each booking records the broker who made it and the commission due to them and, where your plan pays them, to the brokers above.",
        "Your team reviews and approves every payout from the admin dashboard.",
      ],
    },
    {
      title: "Associate networks and downlines",
      paragraphs: [
        "Where associates bring in other associates, each one sees their own team: who they recruited, who those people recruited, and what the team has sold. Your team sees the whole network.",
      ],
      points: ["A team view for every associate", "Recruiting new associates", "Team sales and performance", "Leaderboards"],
    },
    {
      title: "Partners sell from live inventory",
      paragraphs: [
        "Brokers see live availability, hold plots for clients, log GPS-verified site visits and book on the spot from their phone, so two partners never sell the same plot.",
      ],
      link: { label: "The broker portal", href: "/broker-portal" },
    },
    {
      title: "Add and remove partners",
      paragraphs: [
        "Add channel partners, choose what each of them can see, and remove a partner's access when they leave.",
      ],
    },
    {
      title: "See who is selling",
      paragraphs: [
        "Leaderboards and team performance show which partners are selling, and sales analytics show how fast your inventory moves. Partners get a notification when a plot in their project sells.",
      ],
    },
    {
      title: "A booking page for every partner",
      paragraphs: ["Each broker gets their own booking page to share with clients."],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
  ],
  faqs: [
    {
      question: "Does it work for real estate MLM or associate plans?",
      answer:
        "Yes. Commissions can follow a multi-level associate plan, and each associate sees their own team and their own earnings.",
    },
    {
      question: "How do new associates join?",
      answer: "Associates can recruit new associates through the app, and your team controls who gets access.",
    },
    {
      question: "Can a partner see other partners' sales?",
      answer: "Each partner sees their own bookings and their own team. Your team sees every partner.",
    },
  ],
  related: [
    { label: "The broker portal", href: "/broker-portal" },
    { label: "Real estate CRM", href: "/real-estate-crm" },
    { label: "Stopping double bookings", href: "/stop-double-booking-plots" },
  ],
};

export default function ChannelPartnerRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Channel partner and broker commission software", description, path })]}
        />
      </main>
    </div>
  );
}
