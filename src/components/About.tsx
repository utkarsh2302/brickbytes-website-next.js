"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Compass, ShieldAlert, Sparkles } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const aboutItems = [
  {
    tag: "01 / MISSION",
    title: "Replace obsolete flat paperwork",
    desc: "To replace obsolete flat paper plans and static PDFs with dynamic, interactive spatial blueprints that clarify property layouts for modern real estate buyers.",
    icon: <Compass className="w-4 h-4 text-bb-orange" />
  },
  {
    tag: "02 / VISION",
    title: "Global interactive sales standard",
    desc: "A global real estate sales standard where every master layout is digitally explorable, transparent, and instantly transactional.",
    icon: <Sparkles className="w-4 h-4 text-bb-orange" />
  },
  {
    tag: "03 / PHILOSOPHY",
    title: "Precision meets presentation",
    desc: "Engineering-grade precision meets high-end luxury presentation. We build products designed around how elite developers actually sell.",
    icon: <ShieldAlert className="w-4 h-4 text-bb-orange" />
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
  hidden: { opacity: 0, x: 25 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function About() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="about" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Blueprint Grid Accent */}
      <InteractiveGrid opacity={0.4} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: TITLE & CAD GRAPHIC */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
              >
                About | A Venture by BrickNova Technologies
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink mb-8"
              >
                Why BrickBytes exists.
              </motion.h2>
            </div>

            {/* Abstract CAD Blueprint Drawing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-white border border-line/50 rounded-3xl p-6 shadow-sm overflow-hidden z-10"
            >
              <svg className="w-full h-48 md:h-56" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Internal grids */}
                <path d="M 0 20 L 200 20 M 0 50 L 200 50 M 0 80 L 200 80 M 0 110 L 200 110 M 0 140 L 200 140 M 30 0 L 30 160 M 60 0 L 60 160 M 90 0 L 90 160 M 120 0 L 120 160 M 150 0 L 150 160 M 180 0 L 180 160" stroke="#ece6dd" strokeWidth="0.5" />
                
                {/* Intersecting circle maps */}
                <circle cx="100" cy="80" r="45" fill="none" stroke="#e3ddd3" strokeWidth="0.8" />
                <circle cx="100" cy="80" r="30" fill="none" stroke="#ff5a1f" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="100" cy="80" r="3" fill="#ff5a1f" />

                {/* Symmetrical axis vectors */}
                <line x1="100" y1="20" x2="100" y2="140" stroke="#ff5a1f" strokeWidth="0.6" opacity="0.4" />
                <line x1="40" y1="80" x2="160" y2="80" stroke="#ff5a1f" strokeWidth="0.6" opacity="0.4" />

                {/* Dimension callouts */}
                <text x="145" y="75" fontSize="5" fontFamily="monospace" fill="#9aa0a8">R 45.00&apos;</text>
                <text x="105" y="32" fontSize="5" fontFamily="monospace" fill="#9aa0a8">GPS: 12.35&apos; N</text>

                {/* Polygon boundary draft */}
                <polygon points="68,58 132,58 132,102 68,102" fill="none" stroke="#1c1a17" strokeWidth="0.8" />
                <rect x="68" y="58" width="6" height="6" fill="#1c1a17" />
                <rect x="126" y="58" width="6" height="6" fill="#1c1a17" />
                <rect x="126" y="96" width="6" height="6" fill="#1c1a17" />
                <rect x="68" y="96" width="6" height="6" fill="#1c1a17" />
              </svg>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: CORE CONCISE BLOCKS */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 sm:space-y-8"
            >
              {aboutItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative bg-white border rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm text-left flex flex-col justify-between card-hover-accent accent-radius-3xl ${
                    hoveredIdx === idx
                      ? "border-bb-orange/40 shadow-luxury-deep accent-active"
                      : "border-line/60"
                  }`}
                >
                  
                  <div>
                    {/* Header line metadata */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[8px] font-mono tracking-widest text-bb-slate uppercase">
                        {item.tag}
                      </span>
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-bb-sand/30 border border-bb-sand/30">
                        {item.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg sm:text-xl font-display font-normal mb-3 transition-colors duration-300 ${
                      hoveredIdx === idx ? "text-bb-orange" : "text-ink"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Optional bottom link */}
            <div className="mt-10 text-left pl-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-bb-orange hover:text-bb-orange/80 transition-colors group"
              >
                <span>Connect with our team</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
