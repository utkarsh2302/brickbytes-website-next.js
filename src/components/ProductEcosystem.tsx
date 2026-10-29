"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Check, Map, Calendar, ShieldCheck } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const platformCards = [
  {
    tag: "01 / BUYER HUB",
    title: "Buyer Experience",
    desc: "Empower buyers to explore layout boundaries with live availability, detailed spatial insights, and interactive site captures.",
    badge: "Interactive Exploration",
    icon: <Map className="w-5 h-5 text-bb-orange" />,
    features: [
      "Interactive project exploration",
      "Plot information",
      "Availability visibility",
      "Project details"
    ],
    svg: (
      <svg className="w-full h-40" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Grid */}
        <path d="M 0 30 L 240 30 M 0 60 L 240 60 M 0 90 L 240 90 M 0 120 L 240 120 M 40 0 L 40 160 M 80 0 L 80 160 M 120 0 L 120 160 M 160 0 L 160 160 M 200 0 L 200 160" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Buyer HUD Plot Card */}
        <rect x="15" y="15" width="210" height="130" rx="10" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <rect x="25" y="25" width="190" height="28" rx="6" fill="#f7f4ef" stroke="#ff5a1f" strokeWidth="0.8" />
        
        <text x="35" y="42" fontSize="9" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Plot 14</text>
        <rect x="150" y="31" width="55" height="15" rx="4" fill="#ff5a1f" />
        <text x="177.5" y="41" fontSize="7" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle">AVAILABLE</text>
        
        {/* Plot Data Sheet */}
        <text x="25" y="72" fontSize="7" fill="#5a6272" fontFamily="sans-serif">Area:</text>
        <text x="90" y="72" fontSize="7" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">660 Sq. Yds.</text>
        <line x1="25" y1="78" x2="215" y2="78" stroke="#ece6dd" strokeWidth="0.5" />
        
        <text x="25" y="92" fontSize="7" fill="#5a6272" fontFamily="sans-serif">Facing:</text>
        <text x="90" y="92" fontSize="7" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Parkview Front</text>
        <line x1="25" y1="98" x2="215" y2="98" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Action Button HUD */}
        <rect x="25" y="112" width="90" height="20" rx="4" fill="#1c1a17" />
        <text x="70" y="124" fontSize="7" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle">Drone View</text>
        
        <rect x="125" y="112" width="90" height="20" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="170" y="124" fontSize="7" fontWeight="bold" fill="#5a6272" fontFamily="sans-serif" textAnchor="middle">Add to Compare</text>
      </svg>
    )
  },
  {
    tag: "02 / BROKER WORKSPACE",
    title: "Broker Workspace",
    desc: "Enable agent networks to track leads, coordinate site visits, and execute client bookings directly from their mobile workspace.",
    badge: "Leads & Scheduling",
    icon: <Calendar className="w-5 h-5 text-bb-orange" />,
    features: [
      "Broker Lead Tracking",
      "Visit management",
      "Booking Coordination",
      "Performance visibility"
    ],
    svg: (
      <svg className="w-full h-40" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Grid */}
        <path d="M 0 30 L 240 30 M 0 60 L 240 60 M 0 90 L 240 90 M 0 120 L 240 120 M 40 0 L 40 160 M 80 0 L 80 160 M 120 0 L 120 160 M 160 0 L 160 160 M 200 0 L 200 160" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* CRM UI container */}
        <rect x="15" y="15" width="210" height="130" rx="10" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        
        {/* Row 1 */}
        <rect x="25" y="25" width="190" height="30" rx="6" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="35" y="43" fontSize="8" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Rajesh M.</text>
        <text x="95" y="42" fontSize="7" fill="#5a6272" fontFamily="sans-serif">Visit Scheduled</text>
        <rect x="160" y="32" width="45" height="14" rx="4" fill="#f3e9dc" stroke="#ead9c4" strokeWidth="0.5" />
        <text x="182.5" y="41" fontSize="6" fontWeight="bold" fill="#ff5a1f" fontFamily="sans-serif" textAnchor="middle">PLOT 14</text>

        {/* Row 2 */}
        <rect x="25" y="62" width="190" height="30" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="35" y="80" fontSize="8" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Priya V.</text>
        <text x="95" y="79" fontSize="7" fill="#5a6272" fontFamily="sans-serif">Offer Negotiation</text>
        <rect x="160" y="69" width="45" height="14" rx="4" fill="#ece6dd" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="182.5" y="78" fontSize="6" fontWeight="bold" fill="#5a6272" fontFamily="sans-serif" textAnchor="middle">PLOT 05</text>

        {/* Row 3 */}
        <rect x="25" y="99" width="190" height="30" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="35" y="117" fontSize="8" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Amit S.</text>
        <text x="95" y="116" fontSize="7" fill="#2e7a4e" fontFamily="sans-serif">Booking Confirmed</text>
        <rect x="160" y="106" width="45" height="14" rx="4" fill="#ecfdf5" stroke="#d1fae5" strokeWidth="0.5" />
        <text x="182.5" y="115" fontSize="6" fontWeight="bold" fill="#2e7a4e" fontFamily="sans-serif" textAnchor="middle">PLOT 09</text>
      </svg>
    )
  },
  {
    tag: "03 / ADMIN ENGINE",
    title: "Developer Control Center",
    desc: "Manage master plan layouts, allocate plots, coordinate broker networks, and review executive sales metrics in a unified Developer Control Center.",
    badge: "Inventory & Analytics",
    icon: <ShieldCheck className="w-5 h-5 text-bb-orange" />,
    features: [
      "Inventory management tools",
      "Team & broker oversight",
      "Project sales analytics",
      "Business volume visibility"
    ],
    svg: (
      <svg className="w-full h-40" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Grid */}
        <path d="M 0 30 L 240 30 M 0 60 L 240 60 M 0 90 L 240 90 M 0 120 L 240 120 M 40 0 L 40 160 M 80 0 L 80 160 M 120 0 L 120 160 M 160 0 L 160 160 M 200 0 L 200 160" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Console Box */}
        <rect x="15" y="15" width="210" height="130" rx="10" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        
        {/* Metric widgets */}
        <rect x="25" y="25" width="55" height="35" rx="6" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="32" y="37" fontSize="6" fill="#5a6272" fontFamily="sans-serif">Total Value</text>
        <text x="32" y="52" fontSize="10" fontWeight="bold" fill="#ff5a1f" fontFamily="sans-serif">₹95 Cr</text>

        <rect x="92" y="25" width="55" height="35" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="99" y="37" fontSize="6" fill="#5a6272" fontFamily="sans-serif">Plots Sold</text>
        <text x="99" y="52" fontSize="10" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">56%</text>

        <rect x="160" y="25" width="55" height="35" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="167" y="37" fontSize="6" fill="#5a6272" fontFamily="sans-serif">Reserved</text>
        <text x="167" y="52" fontSize="10" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">12%</text>

        {/* Analytics mini line chart */}
        <rect x="25" y="70" width="190" height="60" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="32" y="82" fontSize="6" fontWeight="bold" fill="#5a6272" fontFamily="sans-serif">SALES VELOCITY (MONTHLY)</text>
        
        <path d="M 35 120 L 70 105 L 105 110 L 140 92 L 175 80 L 205 76" fill="none" stroke="#ff5a1f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 35 120 L 70 105 L 105 110 L 140 92 L 175 80 L 205 76 L 205 125 L 35 125 Z" fill="url(#chart-gradient)" opacity="0.1" />
        <circle cx="205" cy="76" r="3" fill="#ff5a1f" />
        
        {/* Definition for the gradient inside SVG */}
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5a1f" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function ProductEcosystem() {
  return (
    <section id="platform" className="relative bg-bb-paper text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Decorative Blueprint Background Details */}
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
            Platform
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            Built for buyers, brokers, and developers.
          </motion.h2>
        </div>

        {/* 3 Columns Platform Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8"
        >
          {platformCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-white border border-line/60 rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-luxury-deep hover:border-bb-orange/40 flex flex-col justify-between text-left card-hover-accent accent-radius-3xl"
            >
              
              <div>
                {/* Header Tag info */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[8px] font-mono tracking-widest text-bb-slate uppercase">
                    {card.tag}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bb-sand/15 text-[9px] font-bold text-bb-orange border border-bb-sand/50">
                    {card.icon}
                    {card.badge}
                  </span>
                </div>

                {/* SVG Visual Panel */}
                <div className="w-full flex items-center justify-center bg-bb-paper rounded-2xl border border-line/70 p-2 mb-8 transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:border-bb-sand">
                  {card.svg}
                </div>

                {/* Info Text */}
                <h3 className="text-xl font-display font-semibold text-ink mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light mb-8">
                  {card.desc}
                </p>
              </div>

              <div>
                {/* Features List Checklist */}
                <div className="border-t border-line/70 pt-6 mt-2">
                  <h4 className="text-[9px] font-mono tracking-widest text-bb-slate uppercase mb-4">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-bb-slate font-sans font-light">
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-bb-sand/30 border border-bb-sand mt-0.5">
                          <Check className="w-2.5 h-2.5 text-bb-orange" strokeWidth={3} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Link */}
                <div className="mt-8 pt-6 border-t border-line/70 flex items-center justify-between">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-bb-orange group-hover:text-bb-orange/80 transition-colors"
                  >
                    <span>Request Access</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
