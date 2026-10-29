"use client";

import React, { useRef, useState } from "react";
import { motion, Variants, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight, FileUp, Cpu, Globe } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const steps = [
  {
    number: "01",
    title: "Share Project Information",
    desc: "Upload layout plans, CAD drawings, parcel boundary dimensions, price lists, and developer rules to our secure onboarding panel.",
    icon: <FileUp className="w-4 h-4 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="55" y="20" width="50" height="56" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <path d="M 93 20 L 105 32 L 105 76 L 55 76" stroke="#e3ddd3" strokeWidth="0.8" />
        <polygon points="93,20 105,32 93,32" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.8" />
        <motion.path 
          variants={{
            hidden: { y: 0 },
            show: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }
          }}
          d="M 80 62 L 80 44 M 74 50 L 80 44 L 86 50" 
          fill="none" 
          stroke="#ff5a1f" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path d="M 68 62 L 92 62" stroke="#e3ddd3" strokeWidth="0.8" />
      </svg>
    )
  },
  {
    number: "02",
    title: "BrickBytes Builds The Experience",
    desc: "Our spatial engineers convert your layouts into interactive vector models, mapping individual coordinates and integrating drone views.",
    icon: <Cpu className="w-4 h-4 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="40" y="25" width="80" height="46" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="50" y1="48" x2="75" y2="38" stroke="#ff5a1f" strokeWidth="1" />
        <line x1="75" y1="38" x2="110" y2="52" stroke="#ff5a1f" strokeWidth="1" />
        <line x1="50" y1="48" x2="90" y2="58" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="90" y1="58" x2="110" y2="52" stroke="#e3ddd3" strokeWidth="0.8" />
        <circle cx="50" cy="48" r="3" fill="#1c1a17" />
        <motion.circle 
          variants={{
            hidden: { scale: 1 },
            show: { scale: [1, 1.25, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
          }}
          style={{ transformOrigin: "75px 38px" }}
          cx="75" 
          cy="38" 
          r="3.5" 
          fill="#ff5a1f" 
          stroke="#ffffff" 
          strokeWidth="1" 
        />
        <circle cx="110" cy="52" r="3" fill="#1c1a17" />
        <circle cx="90" cy="58" r="2.5" fill="#9aa0a8" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Launch & Start Engaging Buyers",
    desc: "Embed the live interactive showcase onto your website, invite broker partners, and secure buyer reservations with instant updates.",
    icon: <Globe className="w-4 h-4 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <circle cx="80" cy="48" r="18" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <circle cx="80" cy="48" r="6" fill="#ff5a1f" />
        <motion.circle 
          variants={{
            hidden: { scale: 0.9, opacity: 0.4 },
            show: { scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.8, 0.4], transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }
          }}
          style={{ transformOrigin: "80px 48px" }}
          cx="80" 
          cy="48" 
          r="26" 
          fill="none" 
          stroke="#ff5a1f" 
          strokeWidth="0.8" 
          strokeDasharray="2 2" 
        />
        <motion.circle 
          variants={{
            hidden: { scale: 0.9, opacity: 0.2 },
            show: { scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.5, 0.2], transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } }
          }}
          style={{ transformOrigin: "80px 48px" }}
          cx="80" 
          cy="48" 
          r="34" 
          fill="none" 
          stroke="#ff5a1f" 
          strokeWidth="0.5" 
        />
      </svg>
    )
  }
];

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.96, borderColor: "rgba(228, 228, 230, 0.6)", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    borderColor: "rgba(255, 94, 19, 0.25)",
    boxShadow: "0 20px 40px -15px rgba(255, 94, 19, 0.07)",
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96, borderColor: "rgba(228, 228, 230, 0.6)", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    borderColor: "rgba(255, 94, 19, 0.25)",
    boxShadow: "0 20px 40px -15px rgba(255, 94, 19, 0.07)",
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 },
  },
};

const springUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, borderColor: "rgba(228, 228, 230, 0.6)", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    borderColor: "rgba(255, 94, 19, 0.25)",
    boxShadow: "0 20px 40px -15px rgba(255, 94, 19, 0.07)",
    transition: { type: "spring", stiffness: 70, damping: 12, duration: 0.9 },
  },
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  useMotionValueEvent(scaleY, "change", (latest) => {
    if (latest >= 0.85) {
      setActiveStep(2);
    } else if (latest >= 0.4) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  });

  return (
    <section id="process" className="relative bg-bb-paper text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      <InteractiveGrid opacity={0.4} />
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
          >
            How It Works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            Launch your digital project experience in three steps.
          </motion.h2>
        </div>

        {/* Vertical Timeline container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto pl-0 pr-4 sm:pl-0 sm:pr-8 py-4">
          
          {/* Vertical Track Line */}
          <div className="absolute left-8 sm:left-12 top-4 bottom-4 w-0.5 bg-bb-stone/80 rounded-full">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 bg-bb-orange origin-top rounded-full shadow-[0_0_10px_rgba(255,94,19,0.5)]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16 relative z-10">
            {steps.map((item, idx) => {
              const cardVariant = idx === 0 ? slideInLeft : idx === 1 ? springUp : slideInRight;
              return (
                <div key={idx} className="relative pl-16 sm:pl-24">
                  {/* Circle Node */}
                  <div className="absolute left-0 top-0 h-16 w-16 sm:w-24 flex items-center justify-center">
                    <motion.div
                      initial="hidden"
                      animate={activeStep >= idx ? "show" : "hidden"}
                      variants={{
                        hidden: { scale: 0.8, borderColor: "#e3ddd3", color: "#9aa0a8", boxShadow: "none" },
                        show: {
                          scale: 1.05,
                          borderColor: "#ff5a1f",
                          color: "#ff5a1f",
                          boxShadow: "0 0 25px rgba(255, 94, 19, 0.35)",
                          transition: { type: "spring", stiffness: 120, damping: 10 }
                        }
                      }}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 text-base font-mono font-bold select-none z-10"
                    >
                      {item.number}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial="hidden"
                    animate={activeStep >= idx ? "show" : "hidden"}
                    variants={cardVariant}
                    className="group bg-white border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm transition-all duration-500"
                  >
                    {/* SVG Diagram Column */}
                    <div className="w-full md:w-1/3 flex items-center justify-center bg-bb-paper rounded-2xl border border-line/70 p-2 shadow-inner shrink-0 overflow-hidden">
                      {item.svg}
                    </div>

                    {/* Text Details Column */}
                    <div className="text-left w-full">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bb-sand/15 text-[9px] font-bold text-bb-orange border border-bb-sand/50 mb-3 uppercase tracking-wider">
                        {item.icon}
                        Step {item.number}
                      </div>
                      <h3 className="text-xl font-display font-semibold text-ink mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process CTA Button */}
        <div className="mt-16 sm:mt-24 text-center relative z-20">
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-bb-orange hover:bg-bb-orange/95 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md shadow-bb-orange/20 hover:shadow-bb-orange/30 group"
          >
            <span>Launch Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
