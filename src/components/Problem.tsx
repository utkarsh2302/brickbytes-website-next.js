"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import InteractiveGrid from "./InteractiveGrid";

const problems = [
  {
    tag: "01 / STATIC SHEET",
    title: "Static Layouts",
    description: "Buyers struggle to understand projects through flat drawings and brochures.",
    svg: (
      <svg className="w-full h-32" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 20 L 200 20 M 0 50 L 200 50 M 0 80 L 200 80 M 50 0 L 50 100 M 100 0 L 100 100 M 150 0 L 150 100" stroke="#f1f1ef" strokeWidth="0.5" strokeDasharray="2 2" />
        <rect x="20" y="20" width="160" height="60" rx="3" stroke="#e3ddd3" strokeWidth="1" />
        <line x1="20" y1="20" x2="180" y2="80" stroke="#ece6dd" strokeWidth="0.8" />
        <line x1="180" y1="20" x2="20" y2="80" stroke="#ece6dd" strokeWidth="0.8" />
        <line x1="60" y1="20" x2="60" y2="80" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="100" y1="20" x2="100" y2="80" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="140" y1="20" x2="140" y2="80" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="20" y1="12" x2="60" y2="12" stroke="#9aa0a8" strokeWidth="0.6" />
        <line x1="20" y1="9" x2="20" y2="15" stroke="#9aa0a8" strokeWidth="0.6" />
        <line x1="60" y1="9" x2="60" y2="15" stroke="#9aa0a8" strokeWidth="0.6" />
        <text x="40" y="8" fontSize="6" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">50.00&apos;</text>
        <rect x="65" y="38" width="70" height="24" rx="3" fill="#f7f4ef" stroke="#ff5a1f" strokeWidth="1" />
        <text x="100" y="52" fontSize="7" fontFamily="sans-serif" fontWeight="bold" fill="#ff5a1f" textAnchor="middle" letterSpacing="0.8">STATIC DRAFT</text>
      </svg>
    )
  },
  {
    tag: "02 / FRICTION",
    title: "Repeated Questions",
    description: "Sales teams spend time answering the same questions again and again.",
    svg: (
      <svg className="w-full h-32" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="100" height="20" rx="6" fill="#ece6dd" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="24" y="22" fontSize="7" fontFamily="sans-serif" fill="#5a6272">&ldquo;Is Plot 14 available?&rdquo;</text>
        <path d="M 120 20 Q 150 35 120 50" fill="none" stroke="#ff5a1f" strokeWidth="0.8" strokeDasharray="2 2" />
        <polygon points="118,50 123,47 123,53" fill="#ff5a1f" />
        <rect x="15" y="40" width="100" height="20" rx="6" fill="#ece6dd" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="24" y="52" fontSize="7" fontFamily="sans-serif" fill="#5a6272">&ldquo;Is Plot 14 available?&rdquo;</text>
        <path d="M 120 50 Q 150 65 120 80" fill="none" stroke="#ff5a1f" strokeWidth="0.8" strokeDasharray="2 2" />
        <polygon points="118,80 123,77 123,83" fill="#ff5a1f" />
        <rect x="15" y="70" width="100" height="20" rx="6" fill="#ece6dd" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="24" y="82" fontSize="7" fontFamily="sans-serif" fill="#5a6272">&ldquo;Is Plot 14 available?&rdquo;</text>
        <path d="M 160 42 C 150 42, 142 50, 150 58 C 158 66, 172 34, 180 42 C 188 50, 180 58, 170 58 C 160 58, 152 42, 160 42 Z" fill="none" stroke="#e3ddd3" strokeWidth="1.2" opacity="0.4" />
      </svg>
    )
  },
  {
    tag: "03 / DATA SILOS",
    title: "Disconnected Information",
    description: "Project details, availability, and updates are spread across multiple channels.",
    svg: (
      <svg className="w-full h-32" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="45" height="30" rx="4" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.8" />
        <rect x="20" y="20" width="10" height="6" rx="1" fill="#2e7a4e" opacity="0.1" stroke="#2e7a4e" strokeWidth="0.5" />
        <line x1="33" y1="23" x2="55" y2="23" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="20" y1="32" x2="55" y2="32" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="20" y1="38" x2="45" y2="38" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="37.5" y="41" fontSize="5" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">.XLSX</text>
        
        <rect x="140" y="15" width="45" height="30" rx="4" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.8" />
        <path d="M 145 22 L 162.5 30 L 180 22" stroke="#9aa0a8" strokeWidth="0.8" />
        <text x="162.5" y="41" fontSize="5" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">EMAIL</text>

        <rect x="77.5" y="55" width="45" height="30" rx="4" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.8" />
        <path d="M 83 62 L 91 62 L 91 76 L 83 76 Z" fill="#e3ddd3" />
        <line x1="96" y1="65" x2="117" y2="65" stroke="#e3ddd3" strokeWidth="0.8" />
        <line x1="96" y1="70" x2="117" y2="70" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="100" y="80" fontSize="5" fontFamily="monospace" fill="#9aa0a8">PDF</text>

        <path d="M 60 30 L 77.5 55" fill="none" stroke="#ff5a1f" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="68.75" cy="42.5" r="4.5" fill="#f7f4ef" stroke="#ff5a1f" strokeWidth="0.8" />
        <line x1="66.5" y1="42.5" x2="71" y2="42.5" stroke="#ff5a1f" strokeWidth="0.8" />

        <path d="M 140 30 L 122.5 55" fill="none" stroke="#ff5a1f" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="131.25" cy="42.5" r="4.5" fill="#f7f4ef" stroke="#ff5a1f" strokeWidth="0.8" />
        <line x1="129" y1="42.5" x2="133.5" y2="42.5" stroke="#ff5a1f" strokeWidth="0.8" />
      </svg>
    )
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Problem() {
  return (
    <section id="problem" className="relative bg-bb-paper text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Blueprint grid accent backgrounds */}
      <InteractiveGrid opacity={0.4} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
          >
            The Problem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            Selling property shouldn&apos;t depend on{" "}
            <span className="font-normal">static PDFs</span> and endless calls.
          </motion.h2>
        </div>

        {/* Storytelling Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between bg-white border border-line/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-luxury-deep hover:border-bb-orange/40 transition-all duration-300 text-left card-hover-accent accent-radius-2xl"
            >
              
              <div>
                {/* Tech tag */}
                <div className="text-[8px] font-mono tracking-widest text-bb-slate mb-4 uppercase">
                  {item.tag}
                </div>
                
                {/* SVG Visual */}
                <div className="w-full flex items-center justify-center bg-bb-paper rounded-xl border border-line/70 p-2 mb-6 transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:border-bb-sand">
                  {item.svg}
                </div>
              </div>

              <div>
                {/* Card Title */}
                <h3 className="text-lg font-display font-semibold text-ink mb-2.5">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
