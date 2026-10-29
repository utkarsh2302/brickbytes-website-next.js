"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const faqs = [
  {
    question: "What is BrickBytes?",
    answer:
      "BrickBytes turns a project's layout plan into a live, interactive map. Buyers and brokers see each plot's size, facing, price and availability, in a 2D, 3D or drone view.",
  },
  {
    question: "Who is BrickBytes for?",
    answer:
      "Real estate developers and their broker networks. Your sales team presents the layout clearly, brokers check live availability and close bookings, and buyers explore plots before they visit.",
  },
  {
    question: "Can buyers access projects remotely?",
    answer:
      "Yes. The map runs in any web browser on a phone or computer, with nothing to install. Buyers can check plot dimensions and facing, see prices and take a drone view of the site.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Usually 10 to 14 business days, and we handle the setup. Send us your CAD (.dwg) drawings or PDF layout plan, and our team turns them into your interactive map.",
  },
  {
    question: "Can BrickBytes support plotted developments?",
    answer:
      "Yes. BrickBytes works for plotted developments, gated villa communities and apartment towers, with layers for plot boundaries, road widths, amenities and floors.",
  },
  {
    question: "Do brokers get their own portal?",
    answer:
      "Yes. In the broker portal, brokers see their leads, track reservation timers, log client site visits and hold plots for their clients.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-bb-paper py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading title="Frequently asked questions" />
          <p className="mt-6 text-base text-bb-slate">Have another question?</p>
          <Link
            href="/contact"
            className="mt-1 inline-flex items-center gap-1.5 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Contact sales
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="border-b border-line lg:col-span-8">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;
            return (
              <li key={faq.question} className="border-t border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="font-display text-lg font-semibold text-ink sm:text-xl">{faq.question}</span>
                    <Plus
                      aria-hidden
                      strokeWidth={1.5}
                      className={`h-6 w-6 shrink-0 text-ink transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-base leading-relaxed text-bb-slate sm:text-lg">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
