"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, FileText, Smartphone, Database, CheckCircle2, AlertCircle, Compass, Layers } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const traditionalFeatures = [
  {
    icon: <FileText className="w-5 h-5 text-bb-slate" />,
    title: "Static layouts",
    desc: "Buyers struggle to interpret flat CAD drafts and static blueprint PDFs.",
    badge: "Obsolete PDF"
  },
  {
    icon: <Smartphone className="w-5 h-5 text-bb-slate" />,
    title: "Manual follow-ups",
    desc: "Sales reps spend hours answering repetitive availability and pricing questions.",
    badge: "Endless Calls"
  },
  {
    icon: <Layers className="w-5 h-5 text-bb-slate" />,
    title: "Fragmented information",
    desc: "Pricing catalogs, lot statuses, and emails exist in disjointed silos.",
    badge: "Siloed Info"
  }
];

const brickbytesFeatures = [
  {
    icon: <Compass className="w-5 h-5 text-bb-orange" />,
    title: "Interactive exploration",
    desc: "Buyers explore gated layout boundaries, filter by availability, and zoom in 3D.",
    badge: "Real-time 3D"
  },
  {
    icon: <Database className="w-5 h-5 text-bb-orange" />,
    title: "Organized information",
    desc: "One source of truth syncing prices, status updates, facing, and documents.",
    badge: "Live Database"
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-bb-orange" />,
    title: "Better buyer understanding",
    desc: "Immersive drone site inspections let buyers preview physical plots virtually.",
    badge: "Spatial Clarity"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Transformation() {
  const [activeHoverRow, setActiveHoverRow] = useState<number | null>(null);

  return (
    <section id="transformation" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Blueprint background grid pattern */}
      <InteractiveGrid opacity={0.4} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
          >
            The Transformation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            From traditional project marketing to{" "}
            <span className="font-normal block sm:inline">digital project experiences.</span>
          </motion.h2>
        </div>

        {/* Transformation Board Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative"
        >
          {/* TRADITIONAL SELLING - LEFT PANEL */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-[#f7f4ef]/80 border border-line/60 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm flex flex-col justify-between card-hover-accent accent-radius-3xl [--accent-base-color:#d4d4d8] [--accent-hover-color:#9aa0a8]"
          >
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase">
                  01 / TRADITIONAL SELLING
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bb-stone/50 text-[9px] font-semibold text-bb-slate font-sans tracking-wide">
                  <AlertCircle className="w-3 h-3 text-bb-slate" />
                  Muted Marketing
                </span>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {traditionalFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveHoverRow(idx)}
                    onMouseLeave={() => setActiveHoverRow(null)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      activeHoverRow === idx
                        ? "bg-bb-stone/35 border-ink/12 shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-center p-2.5 rounded-xl bg-white border border-line/70 shadow-sm transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-display font-semibold text-ink">
                          {item.title}
                        </h4>
                        <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-bb-slate/80 px-1.5 py-0.5 rounded bg-bb-stone/70 border border-line/30">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom context caption */}
            <div className="mt-8 pt-6 border-t border-line/50 text-[11px] font-sans font-light text-bb-slate">
              * Leads to high sales friction, extended sales cycles, and buyer hesitation.
            </div>
          </motion.div>

          {/* BRICKBYTES EXPERIENCE - RIGHT PANEL */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-white border border-line/60 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm hover:shadow-luxury-deep hover:border-bb-orange/30 flex flex-col justify-between card-hover-accent accent-radius-3xl [--accent-base-color:rgba(255,94,19,0.4)] [--accent-hover-color:#ff5a1f]"
          >
            
            {/* Glowing pattern overlay */}
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none rounded-3xl" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-mono tracking-widest text-bb-orange/80 uppercase font-bold">
                  02 / BRICKBYTES EXPERIENCE
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bb-sand/30 text-[9px] font-bold text-bb-orange font-sans tracking-wide border border-bb-sand">
                  <CheckCircle2 className="w-3 h-3 text-bb-orange" />
                  Digital Reality
                </span>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {brickbytesFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveHoverRow(idx)}
                    onMouseLeave={() => setActiveHoverRow(null)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      activeHoverRow === idx
                        ? "bg-bb-sand/6 border-bb-sand/60 shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-center p-2.5 rounded-xl bg-bb-sand/12 border border-bb-sand shadow-sm transition-colors duration-300 group-hover:bg-bb-sand/30">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-display font-semibold text-ink">
                          {item.title}
                        </h4>
                        <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-bb-orange px-1.5 py-0.5 rounded bg-bb-sand/30 border border-bb-sand/40">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom context caption */}
            <div className="mt-8 pt-6 border-t border-line/50 text-[11px] font-sans font-light text-bb-slate flex items-center justify-between">
              <span className="text-bb-slate">* Empowers instant visual verification and closes deals faster.</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-bb-orange hover:text-bb-orange/80 transition-colors"
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Divider Line & Arrow for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-48 bottom-16 w-px bg-dashed-pattern opacity-10 pointer-events-none" />
      </div>
    </section>
  );
}
