import React from "react";
import type { Metadata } from "next";
import InteractiveGrid from "@/components/InteractiveGrid";
import FinalCTA from "@/components/FinalCTA";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | BrickBytes",
  description: "Read the Terms of Service for using BrickBytes interactive platform solutions.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "June 14, 2026";

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative bg-bb-paper text-ink pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.6} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="max-w-3xl text-left">
            <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
              Legal
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-ink mb-6">
              Terms of <span className="">Service</span>
            </h1>
            <p className="text-xs sm:text-sm text-bb-slate font-mono font-light">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Document Content ─── */}
      <section className="relative bg-white text-ink py-16 sm:py-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.3} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="flex flex-col gap-10 text-left font-sans font-light text-sm sm:text-base text-bb-slate leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the BrickBytes website and digital visualization tools (the &quot;Services&quot;), operated by <strong>BrickNova Technologies Private Limited</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our Services.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                2. Scope of Services
              </h2>
              <p>
                BrickBytes provides interactive subdivision maps, real-time inventory synchronization systems, and AI-assisted buyer communication interfaces. The Services are intended for commercial real estate developers, building networks, and affiliated brokers. We reserve the right to modify, suspend, or discontinue any feature of the platform at any time without notice.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                3. User Account and Data Accuracy
              </h2>
              <p>
                To utilize certain developer management tools, you may be required to register credentials. You are responsible for maintaining the confidentiality of your account details. Any master plans, vector layout specifications, pricing parameters, or availability parameters you submit to our mapping database must be accurate and up-to-date.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                4. Intellectual Property Rights
              </h2>
              <p>
                All elements of the Services, including text, bento layouts, SVG illustrations, styling presets, code components, and the &quot;BrickBytes&quot; brand logo systems are the exclusive intellectual property of BrickNova Technologies Private Limited. You may not copy, extract, reverse engineer, or redistribute our spatial visualization engines without explicit written license agreements.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                5. Limitation of Liability
              </h2>
              <p>
                Our interactive showcases and availability mockups are digital tools intended to assist sales velocity and buyer visualization. While we aim for live accuracy, we do not warrant that details are free from error. In no event shall we be liable for any direct, indirect, incidental, or consequential damages arising from out-of-sync inventory labels or technical service interruptions.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                6. Governing Law
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with the Services shall be subject to the exclusive jurisdiction of the courts located in <strong>Jaipur, Rajasthan, India</strong>.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-4">
                7. Contact Us
              </h2>
              <p className="mb-4">
                For questions regarding these Terms of Service or commercial licenses, please contact us at:
              </p>
              <div className="bg-bb-paper border border-line/50 rounded-2xl p-6 font-mono text-xs sm:text-sm text-bb-slate">
                <span className="text-ink block mb-2 font-display font-semibold">BrickNova Technologies Private Limited</span>
                Office: Khushi Sansar, Lakshmi Nikunj, Rampura Road, Mohanpura, Jaipur, Rajasthan 302020, India<br />
                CIN: U62011RJ2026PTC113544<br />
                Email: <a href="mailto:business@brickbytes.in" className="text-bb-orange hover:underline">business@brickbytes.in</a>
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
