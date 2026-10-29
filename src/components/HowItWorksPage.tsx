"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  FileUp,
  Cpu,
  Globe,
  ThumbsUp,
  Zap,
  ShieldCheck,
  Eye,
  Upload,
  Code,
  Satellite,
  Users,
  BarChart3,
  Bot,
  Rocket,
} from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ──────────────────────────────────────────
   EXPANDED STEP DATA — sourced from existing HowItWorks component
   ────────────────────────────────────────── */

const expandedSteps = [
  {
    number: "01",
    tag: "STEP ONE",
    title: "Share Project Information",
    desc: "Upload layout plans, CAD drawings, parcel boundary dimensions, price lists, and developer rules to our secure onboarding panel.",
    longDesc: "You provide the raw materials — we handle everything else. Our team works with whatever formats you have, from professional CAD exports to hand-drawn sketches and PDF brochures.",
    icon: <FileUp className="w-6 h-6 text-bb-orange" />,
    items: [
      { label: "Layout plans", detail: "CAD / DWG / PDF format", icon: <Upload className="w-4 h-4" /> },
      { label: "Parcel boundary dimensions", detail: "Plot sizes, facing, road widths", icon: <Eye className="w-4 h-4" /> },
      { label: "Price lists and availability data", detail: "Current inventory status", icon: <BarChart3 className="w-4 h-4" /> },
      { label: "Developer rules and guidelines", detail: "Booking terms, restrictions", icon: <ShieldCheck className="w-4 h-4" /> },
      { label: "Drone footage and site captures", detail: "If available", icon: <Satellite className="w-4 h-4" /> },
    ],
  },
  {
    number: "02",
    tag: "STEP TWO",
    title: "BrickBytes Builds The Experience",
    desc: "Our spatial engineers convert your layouts into interactive vector models, mapping individual coordinates and integrating drone views.",
    longDesc: "Our engineering team transforms your static documents into a fully interactive digital experience. Every plot boundary, road width, and amenity is mapped with precision.",
    icon: <Cpu className="w-6 h-6 text-bb-orange" />,
    items: [
      { label: "Vector model conversion", detail: "From CAD to interactive maps", icon: <Code className="w-4 h-4" /> },
      { label: "Individual coordinate mapping", detail: "Precise spatial positioning", icon: <Eye className="w-4 h-4" /> },
      { label: "Drone view integration", detail: "Aerial and ground captures", icon: <Satellite className="w-4 h-4" /> },
      { label: "Interactive availability overlay", detail: "Real-time status layer", icon: <BarChart3 className="w-4 h-4" /> },
      { label: "Broker workspace configuration", detail: "Portal setup and access", icon: <Users className="w-4 h-4" /> },
    ],
  },
  {
    number: "03",
    tag: "STEP THREE",
    title: "Launch & Start Engaging Buyers",
    desc: "Embed the live interactive showcase onto your website, invite broker partners, and secure buyer reservations with instant updates.",
    longDesc: "Your digital project experience goes live. Buyers explore layouts, brokers track leads, and your team manages everything from a centralized console.",
    icon: <Globe className="w-6 h-6 text-bb-orange" />,
    items: [
      { label: "Website embedding", detail: "One-line integration", icon: <Code className="w-4 h-4" /> },
      { label: "Broker partner invitations", detail: "Agent portal access", icon: <Users className="w-4 h-4" /> },
      { label: "Buyer reservation system", detail: "Real-time booking flow", icon: <Rocket className="w-4 h-4" /> },
      { label: "Real-time status updates", detail: "Instant inventory sync", icon: <BarChart3 className="w-4 h-4" /> },
      { label: "AI assistant activation", detail: "Automated buyer engagement", icon: <Bot className="w-4 h-4" /> },
    ],
  },
];

const outcomes = [
  { title: "Faster buyer decisions", desc: "Clear spatial context answers layout questions instantly.", icon: <ThumbsUp className="w-5 h-5 text-bb-orange" /> },
  { title: "Better spatial understanding", desc: "Interactive exploration replaces static PDFs and brochures.", icon: <Eye className="w-5 h-5 text-bb-orange" /> },
  { title: "Improved transparency", desc: "One source of truth syncing prices, status updates, and documents.", icon: <ShieldCheck className="w-5 h-5 text-bb-orange" /> },
  { title: "Higher sales efficiency", desc: "Equip agents with real-time availability and lead tools.", icon: <Zap className="w-5 h-5 text-bb-orange" /> },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-bb-paper text-ink pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.6} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl text-left">
            <motion.div variants={fadeUp} className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
              Process
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-ink mb-6">
              From blueprint to{" "}
              <span className="">live experience</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-bb-slate leading-relaxed font-sans font-light max-w-xl">
              Three steps. Zero friction. Your static layout plans become interactive digital sales tools in under two weeks.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Compact Timeline ─── */}
      <HowItWorks />

      {/* ─── Expanded Steps ─── */}
      {expandedSteps.map((step, idx) => (
        <section
          key={idx}
          className={`relative text-ink py-16 sm:py-24 overflow-hidden border-b border-line/50 ${
            idx % 2 === 0 ? "bg-white" : "bg-bb-paper"
          }`}
        >
          <InteractiveGrid opacity={0.4} />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 w-full">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              {/* Step Header */}
              <motion.div variants={fadeUp} className="flex items-start gap-5 mb-8 text-left">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-bb-sand/30 border border-bb-sand/50 shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-widest text-bb-slate uppercase mb-1">
                    {step.tag}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-ink">
                    {step.title}
                  </h2>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-sm sm:text-base text-bb-slate leading-relaxed font-sans font-light max-w-2xl mb-10 text-left">
                {step.longDesc}
              </motion.p>

              {/* Detail Items */}
              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {step.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-start gap-3 bg-white border border-line/50 rounded-2xl p-5 text-left"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-bb-sand/30 border border-bb-sand/30 shrink-0 text-bb-orange">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-sm font-display font-semibold text-ink mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-xs text-bb-slate font-sans font-light">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ─── Expected Outcomes ─── */}
      <section className="relative bg-bb-paper text-ink py-16 sm:py-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.45} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-3xl mb-12 text-left">
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
                Expected Outcomes
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-ink">
                What changes after launch
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white border border-line/60 rounded-3xl p-6 sm:p-8 text-left card-hover-accent accent-radius-3xl hover:border-bb-orange/40 hover:shadow-luxury-deep transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-bb-sand/30 border border-bb-sand/50 mb-5">
                    {item.icon}
                  </span>
                  <h3 className="text-base font-display font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-bb-slate font-sans font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <FAQ />

      {/* ─── CTA ─── */}
      <FinalCTA />
    </>
  );
}
