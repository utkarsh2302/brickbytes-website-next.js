import React from "react";
import type { Metadata } from "next";
import InteractiveGrid from "@/components/InteractiveGrid";
import FinalCTA from "@/components/FinalCTA";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | BrickBytes",
  description: "Learn about how BrickBytes collects, stores, and handles your data safely and transparently.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "June 14, 2026";

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#fbfbfa] text-[#1c1a17] pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden border-b border-zinc-200/50">
        <InteractiveGrid opacity={0.6} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="max-w-3xl text-left">
            <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-brick-orange mb-3">
              Legal
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight leading-[1.15] text-zinc-950 mb-6">
              Privacy <span className="text-brick-orange italic">Policy</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono font-light">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Document Content ─── */}
      <section className="relative bg-white text-[#1c1a17] py-16 sm:py-24 overflow-hidden border-b border-zinc-200/50">
        <InteractiveGrid opacity={0.3} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="flex flex-col gap-10 text-left font-sans font-light text-sm sm:text-base text-zinc-600 leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to BrickBytes, operated by <strong>BrickNova Technologies Private Limited</strong>. We respect your privacy and are committed to protecting the personal data we collect from you. This Privacy Policy explains how we gather, use, disclose, and secure your information when you visit our website and use our real estate interactive showcase platforms.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you request a demo, submit an inquiry, or contact us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact details</strong>: Name, email address, telephone/WhatsApp number, and physical office location.</li>
                <li><strong>Professional info</strong>: Company name, job title, and project scale metadata.</li>
                <li><strong>Interactive inputs</strong>: Content and messages submitted through our request forms and custom chat panels.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the collected data exclusively to power and improve our product offerings, specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and arranging personalized interactive demo walkthroughs.</li>
                <li>Sending transactional updates, service alerts, and responder confirmations via email or WhatsApp.</li>
                <li>Optimizing user engagement metrics across our digital maps and bento interfaces.</li>
                <li>Complying with statutory regulatory obligations and company transparency values.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                4. Data Sharing and Third Parties
              </h2>
              <p>
                We do not sell, rent, or trade your personal data to third-party marketing companies. Data is only shared with certified cloud hosting servers and database APIs (such as Resend or Vercel) necessary to deliver website notification emails and host interactive models securely.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                5. Security and Data Retention
              </h2>
              <p>
                We implement strict standard security measures to safeguard your credentials. Your personal details are retained only as long as necessary to fulfill the demo setup and ongoing business interactions, or to satisfy legal, accounting, and compliance reporting requirements.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-zinc-950 mb-4">
                6. Contact Information
              </h2>
              <p className="mb-4">
                For questions or requests regarding your personal data rights under this Privacy Policy, please contact our legal desk:
              </p>
              <div className="bg-[#fbfbfa] border border-zinc-200/50 rounded-2xl p-6 font-mono text-xs sm:text-sm text-zinc-500">
                <span className="font-bold text-zinc-900 block mb-2 font-serif">BrickNova Technologies Private Limited</span>
                Office: Khushi Sansar, Lakshmi Nikunj, Rampura Road, Mohanpura, Jaipur, Rajasthan 302020, India<br />
                CIN: U62011RJ2026PTC113544<br />
                Email: <a href="mailto:business@brickbytes.in" className="text-brick-orange hover:underline">business@brickbytes.in</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <FinalCTA />
    </>
  );
}
