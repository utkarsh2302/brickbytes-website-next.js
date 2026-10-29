import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Book a Demo or Contact Sales | BrickBytes",
  description: "Book a BrickBytes demo for your next real estate project. Message us on WhatsApp, email business@brickbytes.in, or send your project details through the form.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <ContactPage />
      </main>
    </div>
  );
}
