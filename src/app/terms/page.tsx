import React from "react";
import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/ui/PageHero";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | BrickBytes",
  description: "Read the Terms of Service for using BrickBytes interactive platform solutions.",
  path: "/terms",
});

const h2Class = "font-display text-2xl font-semibold text-ink";

export default function TermsPage() {
  const lastUpdated = "June 14, 2026";

  return (
    <>
      <PageHero title="Terms of service" lead={`Last updated ${lastUpdated}`} accent="pin" />

      <section className="relative bg-bb-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <article className="flex max-w-3xl flex-col gap-12 border-t border-line pt-16 text-base leading-7 text-bb-slate [&_strong]:font-semibold [&_strong]:text-ink">
            <div>
              <h2 className={h2Class}>1. Acceptance of terms</h2>
              <p className="mt-4">
                By accessing or using the BrickBytes website and digital visualization tools (the &quot;Services&quot;), operated by <strong>BrickNova Technologies Private Limited</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our Services.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>2. Scope of services</h2>
              <p className="mt-4">
                BrickBytes provides interactive subdivision maps, real-time inventory synchronization systems, and AI-assisted buyer communication interfaces. The Services are intended for commercial real estate developers, building networks, and affiliated brokers. We reserve the right to modify, suspend, or discontinue any feature of the platform at any time without notice.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>3. User account and data accuracy</h2>
              <p className="mt-4">
                To utilize certain developer management tools, you may be required to register credentials. You are responsible for maintaining the confidentiality of your account details. Any master plans, vector layout specifications, pricing parameters, or availability parameters you submit to our mapping database must be accurate and up-to-date.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>4. Intellectual property rights</h2>
              <p className="mt-4">
                All elements of the Services, including text, bento layouts, SVG illustrations, styling presets, code components, and the &quot;BrickBytes&quot; brand logo systems are the exclusive intellectual property of BrickNova Technologies Private Limited. You may not copy, extract, reverse engineer, or redistribute our spatial visualization engines without explicit written license agreements.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>5. Limitation of liability</h2>
              <p className="mt-4">
                Our interactive showcases and availability mockups are digital tools intended to assist sales velocity and buyer visualization. While we aim for live accuracy, we do not warrant that details are free from error. In no event shall we be liable for any direct, indirect, incidental, or consequential damages arising from out-of-sync inventory labels or technical service interruptions.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>6. Governing law</h2>
              <p className="mt-4">
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with the Services shall be subject to the exclusive jurisdiction of the courts located in <strong>Jaipur, Rajasthan, India</strong>.
              </p>
            </div>

            <div>
              <h2 className={h2Class}>7. Contact us</h2>
              <p className="mt-4">
                For questions regarding these Terms of Service or commercial licenses, please contact us at:
              </p>
              <address className="mt-4 rounded-2xl border border-line bg-white p-6 not-italic">
                <span className="block font-display font-semibold text-ink">BrickNova Technologies Private Limited</span>
                <span className="mt-2 block">
                  Office: Khushi Sansar, Lakshmi Nikunj, Rampura Road, Mohanpura, Jaipur, Rajasthan 302020, India
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
