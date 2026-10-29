import React from "react";
import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/ui/PageHero";
import { OFFICE_ADDRESS_LINE } from "@/lib/contact";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | BrickBytes",
  description: "Learn about how BrickBytes collects, stores, and handles your data safely and transparently.",
  path: "/privacy",
});

const h2Class = "font-display text-2xl font-semibold text-ink";

export default function PrivacyPage() {
  const lastUpdated = "June 14, 2026";

  return (
    <>
      <PageHero title="Privacy policy" lead={`Last updated ${lastUpdated}`} accent="pin" />

      <section className="relative bg-bb-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <article className="flex max-w-3xl flex-col gap-12 border-t border-line pt-16 text-base leading-7 text-bb-slate [&_strong]:font-semibold [&_strong]:text-ink">
            <div>
              <h2 className={h2Class}>1. Introduction</h2>
              <p className="mt-4">
                Welcome to BrickBytes, operated by <strong>BrickNova Technologies Private Limited</strong>. We respect your privacy and are committed to protecting the personal data we collect from you. This Privacy Policy explains how we gather, use, disclose, and secure your information when you visit our website and use our real estate interactive showcase platforms.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>2. Information we collect</h2>
              <p className="mt-4">
                We collect personal information that you voluntarily provide to us when you request a demo, submit an inquiry, or contact us. This includes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>Contact details</strong>: Name, email address, telephone/WhatsApp number, and physical office location.</li>
                <li><strong>Professional info</strong>: Company name, job title, and project scale metadata.</li>
                <li><strong>Interactive inputs</strong>: Content and messages submitted through our request forms and custom chat panels.</li>
              </ul>
            </div>

            <div>
              <h2 className={h2Class}>3. How we use your information</h2>
              <p className="mt-4">
                We use the collected data exclusively to power and improve our product offerings, specifically:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Processing and arranging personalized interactive demo walkthroughs.</li>
                <li>Sending transactional updates, service alerts, and responder confirmations via email or WhatsApp.</li>
                <li>Optimizing user engagement metrics across our digital maps and bento interfaces.</li>
                <li>Complying with statutory regulatory obligations and company transparency values.</li>
              </ul>
            </div>

            <div>
              <h2 className={h2Class}>4. Data sharing and third parties</h2>
              <p className="mt-4">
                We do not sell, rent, or trade your personal data to third-party marketing companies. Data is only shared with certified cloud hosting servers and database APIs (such as Resend or Vercel) necessary to deliver website notification emails and host interactive models securely.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>5. Security and data retention</h2>
              <p className="mt-4">
                We implement strict standard security measures to safeguard your credentials. Your personal details are retained only as long as necessary to fulfill the demo setup and ongoing business interactions, or to satisfy legal, accounting, and compliance reporting requirements.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>6. Contact information</h2>
              <p className="mt-4">
                For questions or requests regarding your personal data rights under this Privacy Policy, please contact our legal desk:
              </p>
              <address className="mt-4 rounded-2xl border border-line bg-white p-6 not-italic">
                <span className="block font-display font-semibold text-ink">BrickNova Technologies Private Limited</span>
                <span className="mt-2 block">
                  Office: {OFFICE_ADDRESS_LINE}
                </span>
                <span className="block">
                  CIN: <span className="font-mono">U62011RJ2026PTC113544</span>
                </span>
                <span className="block">
                  Email:{" "}
                  <a href="mailto:business@brickbytes.in" className="text-ink underline underline-offset-4 hover:text-bb-kiln">
                    business@brickbytes.in
                  </a>
                </span>
              </address>
            </div>
          </article>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
