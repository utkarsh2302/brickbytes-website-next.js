import type { Metadata } from "next";
import LandingPage, { type LandingPageContent } from "@/components/LandingPage";
import { constructMetadata, serviceJsonLd } from "@/lib/seo";

const path = "/real-estate-payment-tracking";
const description =
  "Track booking amounts and instalments for every plot and flat: what each buyer has paid, what's still due, and each customer's home-loan progress.";

export const metadata: Metadata = constructMetadata({
  title: "Real Estate Payment & Instalment Tracking | BrickBytes",
  description,
  path,
});

const content: LandingPageContent = {
  name: "Payment tracking",
  path,
  title: "Payment and instalment tracking for real estate",
  lead: "Record the booking amount and every instalment against the plot or flat it belongs to, so your accounts team, sales team and brokers all see what each buyer has paid and what is still due.",
  sections: [
    {
      title: "One payment record per booking",
      paragraphs: [
        "Every payment is tied to its booking, its plot or flat, its buyer and the broker who brought them. There's no separate register and no spreadsheet to reconcile at the end of the month.",
      ],
    },
    {
      title: "Instalment plans that match your scheme",
      paragraphs: [
        "Whether buyers pay in full at booking or over an instalment plan, the plan is set up to match your scheme, and each instalment is recorded against it.",
      ],
    },
    {
      title: "Home-loan progress for each customer",
      paragraphs: [
        "Brokers and your team follow each customer's booking and home-loan progress in the same place, so everyone knows where a sale stands.",
      ],
    },
    {
      title: "Buyers check their own status",
      paragraphs: [
        "Buyers check their booking status with their phone number, and can work out EMI options before they book.",
      ],
    },
    {
      title: "The reports your accounts team uses",
      paragraphs: [
        "We build the payment reports your accounts team already relies on into the system, as part of the software we set up for each developer.",
      ],
      link: { label: "Everything we build", href: "/custom-real-estate-software" },
    },
  ],
  faqs: [
    {
      question: "Does it handle instalment plans?",
      answer: "Yes. Plans are set up to match your scheme, and every instalment is recorded against its booking.",
    },
    {
      question: "Can buyers check their booking status?",
      answer: "Yes. Buyers check their booking status with their phone number.",
    },
    {
      question: "Can we track home loans?",
      answer: "Yes. Your team and brokers follow each customer's home-loan progress alongside their booking.",
    },
  ],
  related: [
    { label: "Real estate CRM", href: "/real-estate-crm" },
    { label: "Plot booking software", href: "/plot-booking-software" },
    { label: "Flat booking software", href: "/flat-booking-software" },
  ],
};

export default function PaymentTrackingRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <LandingPage
          content={content}
          schema={[serviceJsonLd({ name: "Real estate payment and instalment tracking", description, path })]}
        />
      </main>
    </div>
  );
}
