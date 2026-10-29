"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const faqs = [
  {
    question: "What is BrickBytes?",
    answer: "BrickBytes is an interactive real estate sales engine that transforms static project layouts, master plans, and floor boundaries into immersive, transactional digital experiences. We replace flat blueprint drawings with dynamic 3D maps and reality site captures."
  },
  {
    question: "Who is BrickBytes for?",
    answer: "Our platform is designed specifically for modern property developers, broker networks, and high-end buyers. It enables sales departments to present real estate layouts with absolute spatial clarity while empowering agents to check live availability and close bookings."
  },
  {
    question: "Can buyers access projects remotely?",
    answer: "Yes. The entire interactive model operates natively in any web browser without requiring heavy installations or native apps. Remote buyers can inspect plot dimensions, check facing, trigger virtual drone site inspections, and review pricing on any desktop or mobile device."
  },
  {
    question: "How long does onboarding take?",
    answer: "Onboarding is fully managed and typically takes 10 to 14 business days. Our spatial engineering team handles the conversion of your standard CAD (.dwg) drawings or PDF boundary drafts into a high-fidelity, interactive digital model."
  },
  {
    question: "Can BrickBytes support plotted developments?",
    answer: "Absolutely. BrickBytes is built to handle plotted subdivisions, gated villa communities, and high-rise apartment towers. The engine supports custom layers for boundary lines, road widths, amenities, and floor structures."
  },
  {
    question: "Do brokers get their own portal?",
    answer: "Yes. BrickBytes features a dedicated Broker Portal where affiliate agents can view lead listings, track reservation timers, log client site visits, and coordinate inventory reserves independently."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-bb-paper text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Decorative Grid Accent */}
      <InteractiveGrid opacity={0.4} />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bb-sand/15 border border-bb-sand/50 text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Platform Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`group border rounded-2xl bg-white transition-all duration-300 ${
                  isOpen 
                    ? "border-bb-orange/40 shadow-luxury-deep" 
                    : "border-line/60 hover:border-bb-orange/20"
                }`}
              >
                {/* Header / Click Area */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none"
                >
                  <span className={`text-sm sm:text-base font-display transition-colors duration-300 ${
                    isOpen ? "text-bb-orange" : "text-ink group-hover:text-bb-orange/90"
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Rotating Indicator */}
                  <span className={`flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? "border-bb-orange/30 bg-bb-sand/30 text-bb-orange rotate-180" 
                      : "border-line text-bb-slate group-hover:border-bb-orange/20 group-hover:text-bb-orange"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Animated Body panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-line/70 pt-4">
                        <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Hook */}
        <div className="mt-12 text-left pl-6">
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-bb-orange hover:text-bb-orange/80 transition-colors group"
          >
            <span>Have a different question? Contact Sales</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
