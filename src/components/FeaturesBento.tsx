"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Map, Layers, Camera, Users, Monitor, ShieldAlert, Sparkles, LineChart } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const bentoItems = [
  {
    id: "plot-maps",
    tag: "Interactive Exploration",
    title: "Interactive Plot Maps",
    subtitle: "Live Subdivision Plans",
    desc: "Buyers can explore master plans dynamically. Filter plots by availability, inspect facing directions, road dimensions, and check real-time availability status.",
    span: "md:col-span-2 md:row-span-2",
    icon: <Map className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-full min-h-40 md:min-h-55" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 40 L 320 40 M 0 80 L 320 80 M 0 120 L 320 120 M 0 160 L 320 160 M 0 200 L 320 200 M 40 0 L 40 220 M 80 0 L 80 220 M 120 0 L 120 220 M 160 0 L 160 220 M 200 0 L 200 220 M 240 0 L 240 220 M 280 0 L 280 220" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Plot 1 */}
        <rect x="25" y="25" width="80" height="70" rx="4" fill="#f7f4ef" stroke="#ff5a1f" strokeWidth="1" />
        <rect x="35" y="65" width="40" height="12" rx="3" fill="#ff5a1f" />
        <text x="55" y="73" fontSize="6" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle">LOT 01</text>
        <text x="65" y="45" fontSize="6" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">50&apos; x 100&apos;</text>

        {/* Plot 2 */}
        <rect x="115" y="25" width="80" height="70" rx="4" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="155" y="60" fontSize="7" fontWeight="bold" fill="#5a6272" fontFamily="sans-serif" textAnchor="middle">LOT 02</text>
        <text x="155" y="72" fontSize="5" fontWeight="bold" fill="#2e7a4e" fontFamily="sans-serif" textAnchor="middle">SOLD</text>
        <text x="155" y="45" fontSize="6" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">50&apos; x 100&apos;</text>

        {/* Plot 3 */}
        <rect x="205" y="25" width="80" height="70" rx="4" fill="#f7f4ef" stroke="#b7791f" strokeWidth="1" />
        <rect x="215" y="65" width="45" height="12" rx="3" fill="#b7791f" />
        <text x="237.5" y="73" fontSize="6" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle">RESERVED</text>
        <text x="245" y="45" fontSize="6" fontFamily="monospace" fill="#9aa0a8" textAnchor="middle">60&apos; x 110&apos;</text>

        {/* Plot 4 */}
        <rect x="25" y="115" width="170" height="75" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <path d="M 35 155 Q 110 130 185 155" fill="none" stroke="#e3ddd3" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="110" cy="143" r="4" fill="#ff5a1f" />
        <text x="110" y="133" fontSize="6" fontWeight="bold" fill="#ff5a1f" fontFamily="sans-serif" textAnchor="middle">Lakeside Boardwalk</text>
        <text x="110" y="170" fontSize="7" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif" textAnchor="middle">Community Layout Boundary</text>
      </svg>
    )
  },
  {
    id: "3d-viz",
    tag: "Volumetric Models",
    title: "3D Project Visualization",
    subtitle: "Elevation Perspectives",
    desc: "Provide interactive isometric models that allow buyers to visualize spatial bounds, building heights, and surrounding properties.",
    span: "md:col-span-1 md:row-span-1",
    icon: <Layers className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Isometric 3D Prism Cap */}
        <polygon points="80,15 115,30 80,45 45,30" fill="#fffdf5" stroke="#d9c2a3" strokeWidth="1" />
        {/* Left Side Extrusion */}
        <polygon points="45,30 80,45 80,75 45,60" fill="#ebdcc3" stroke="#d9c2a3" strokeWidth="0.5" />
        {/* Right Side Extrusion */}
        <polygon points="80,45 115,30 115,60 80,75" fill="#d5c3aa" stroke="#d9c2a3" strokeWidth="0.5" />
        {/* Dotted Guideline */}
        <line x1="80" y1="15" x2="80" y2="75" stroke="#d9c2a3" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      </svg>
    )
  },
  {
    id: "drone-view",
    tag: "Blueprint &rarr; Reality",
    title: "Drone & Ground Reality Views",
    subtitle: "Virtual Site Capture",
    desc: "Overlay coordinates and plot boundary vector lines on aerial and ground captures, letting buyers inspect real conditions virtually.",
    span: "md:col-span-1 md:row-span-1",
    icon: <Camera className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Camera Reticle indicator */}
        <circle cx="80" cy="48" r="24" fill="none" stroke="#e3ddd3" strokeWidth="0.8" />
        <circle cx="80" cy="48" r="6" fill="none" stroke="#ff5a1f" strokeWidth="1" />
        <path d="M 80 18 L 80 28 M 80 68 L 80 78 M 50 48 L 60 48 M 100 48 L 110 48" stroke="#ff5a1f" strokeWidth="0.8" />
        
        {/* Outer brackets */}
        <path d="M 40,32 L 40,24 L 48,24" fill="none" stroke="#5a6272" strokeWidth="0.8" />
        <path d="M 120,32 L 120,24 L 112,24" fill="none" stroke="#5a6272" strokeWidth="0.8" />
        <path d="M 40,64 L 40,72 L 48,72" fill="none" stroke="#5a6272" strokeWidth="0.8" />
        <path d="M 120,64 L 120,72 L 112,72" fill="none" stroke="#5a6272" strokeWidth="0.8" />
      </svg>
    )
  },
  {
    id: "broker-portal",
    tag: "Agent Workspace",
    title: "Broker Portal",
    subtitle: "Affiliate Sales Network",
    desc: "Empower affiliate networks with lead lists, direct plot reserving timers, and calendar widgets for scheduling site visits.",
    span: "md:col-span-1 md:row-span-1",
    icon: <Users className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="20" y="20" width="120" height="56" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <circle cx="38" cy="48" r="10" fill="#f3e9dc" stroke="#ff5a1f" strokeWidth="0.8" />
        <path d="M38,44 A2.5,2.5 0 1,0 38,49 A2.5,2.5 0 1,0 38,44 Z M33,54 A5,5 0 0,1 43,54" stroke="#ff5a1f" strokeWidth="0.8" fill="none" />
        <text x="54" y="44" fontSize="7" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Amit Sharma</text>
        <text x="54" y="55" fontSize="5.5" fill="#5a6272" fontFamily="sans-serif">Today, 2:30 PM</text>
        <rect x="98" y="60" width="30" height="10" rx="3" fill="#2e7a4e" />
        <text x="113" y="67" fontSize="5" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle">VISIT</text>
      </svg>
    )
  },
  {
    id: "admin-console",
    tag: "Developer Controls",
    title: "Admin Console",
    subtitle: "Live Management Platform",
    desc: "Control development properties, upload revised layout vector maps, approve broker commissions, track inventory details, and override availability manually from a single administrative control center.",
    span: "md:col-span-2 md:row-span-1",
    icon: <Monitor className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 320 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 320 16 M 0 48 L 320 48 M 0 80 L 320 80 M 40 0 L 40 96 M 80 0 L 80 96 M 120 0 L 120 96 M 160 0 L 160 96 M 200 0 L 200 96 M 240 0 L 240 96 M 280 0 L 280 96" stroke="#ece6dd" strokeWidth="0.5" />
        
        {/* Inventory Progress card bar */}
        <rect x="20" y="20" width="280" height="56" rx="8" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        
        <text x="35" y="42" fontSize="8" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Subdivision Progress</text>
        <text x="285" y="42" fontSize="8" fontWeight="bold" fill="#ff5a1f" fontFamily="sans-serif" textAnchor="end">72% Allocated</text>
        
        {/* Progress tracks bar */}
        <rect x="35" y="50" width="250" height="8" rx="4" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.5" />
        <rect x="35" y="50" width="180" height="8" rx="4" fill="#ff5a1f" />
      </svg>
    )
  },
  {
    id: "inventory",
    tag: "Instant Allocations",
    title: "Inventory Management",
    subtitle: "Real-time Sales Controls",
    desc: "Sync plot statuses across the platform. Instantly lock plots, override facing parameters, release holds, and generate reservation documents.",
    span: "md:col-span-1 md:row-span-1",
    icon: <ShieldAlert className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="20" y="25" width="120" height="46" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <text x="30" y="51" fontSize="8" fontWeight="bold" fill="#1c1a17" fontFamily="sans-serif">Status Lock: Plot 12</text>
        <rect x="100" y="41" width="30" height="14" rx="7" fill="#ff5a1f" />
        <circle cx="121" cy="48" r="5" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: "ai-assistant",
    tag: "AI-Assisted Engagement",
    title: "AI-Assisted Buyer Engagement",
    subtitle: "AI-Powered Exploration",
    desc: "An intelligent, context-aware spatial AI assistant answering buyer queries about plot sizes, dimensions, local regulations, and project parameters in real time.",
    span: "md:col-span-1 md:row-span-1",
    icon: <Sparkles className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="15" y="18" width="95" height="20" rx="6" fill="#f7f4ef" stroke="#e3ddd3" strokeWidth="0.5" />
        <text x="22" y="30" fontSize="6" fill="#5a6272" fontFamily="sans-serif">Show Plot 14 facing details.</text>
        
        <rect x="45" y="46" width="100" height="30" rx="6" fill="#f3e9dc" stroke="#ead9c4" strokeWidth="0.5" />
        <text x="52" y="58" fontSize="6.5" fontWeight="bold" fill="#ff5a1f" fontFamily="sans-serif">East facing</text>
        <text x="52" y="68" fontSize="5.5" fill="#5a6272" fontFamily="sans-serif">Road width is 40 feet.</text>
      </svg>
    )
  },
  {
    id: "analytics",
    tag: "Sales Panels",
    title: "Project Analytics",
    subtitle: "Business Velocity Insights",
    desc: "Monitor sales speeds, visual demand map metrics, broker performance volumes, and executive cash flows in one unified panel.",
    span: "md:col-span-1 md:row-span-1",
    icon: <LineChart className="w-5 h-5 text-bb-orange" />,
    svg: (
      <svg className="w-full h-24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 16 L 160 16 M 0 48 L 160 48 M 0 80 L 160 80 M 32 0 L 32 96 M 96 0 L 96 96" stroke="#ece6dd" strokeWidth="0.5" />
        <rect x="25" y="20" width="110" height="56" rx="6" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" />
        <rect x="40" y="55" width="10" height="15" rx="1" fill="#e3ddd3" />
        <rect x="60" y="45" width="10" height="25" rx="1" fill="#e3ddd3" />
        <rect x="80" y="35" width="10" height="35" rx="1" fill="#ffbe9f" />
        <rect x="100" y="28" width="10" height="42" rx="1" fill="#ff5a1f" />
        <text x="45" y="80" fontSize="5" fill="#5a6272" textAnchor="middle" fontFamily="sans-serif">M1</text>
        <text x="65" y="80" fontSize="5" fill="#5a6272" textAnchor="middle" fontFamily="sans-serif">M2</text>
        <text x="85" y="80" fontSize="5" fill="#5a6272" textAnchor="middle" fontFamily="sans-serif">M3</text>
        <text x="105" y="80" fontSize="5" fill="#5a6272" textAnchor="middle" fontFamily="sans-serif">M4</text>
      </svg>
    )
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function FeaturesBento() {
  return (
    <section id="features" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Decorative Blueprint Accent grid */}
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
            Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            Everything needed to digitize real estate sales.
          </motion.h2>
        </div>

        {/* Asymmetrical Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {bentoItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className={`group relative bg-white border border-line/60 rounded-3xl p-6 sm:p-8 hover:border-bb-orange/40 hover:shadow-luxury-deep transition-all duration-300 flex flex-col justify-between text-left card-hover-accent accent-radius-3xl ${item.span || ""}`}
            >
              
              <div>
                {/* Header Tag label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[8px] font-mono tracking-widest text-bb-slate uppercase">
                    {item.tag}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-bb-sand/15 border border-bb-sand/50">
                    {item.icon}
                  </span>
                </div>

                {/* SVG Visual elements if any */}
                {item.svg && (
                  <div className="w-full flex items-center justify-center bg-bb-paper rounded-2xl border border-line/70 p-2 mb-6 transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:border-bb-sand">
                    {item.svg}
                  </div>
                )}

                {/* Description details */}
                <span className="text-[10px] font-mono font-bold text-bb-orange uppercase tracking-wider block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-lg font-display font-semibold text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-line/70 pt-4 mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] font-mono font-bold tracking-wider text-bb-slate">BRICKBYTES PLATFORM</span>
                <span className="text-[9px] font-bold text-bb-orange uppercase tracking-widest flex items-center gap-1">
                  Active Feature
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
