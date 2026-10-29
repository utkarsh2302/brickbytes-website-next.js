"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, EyeOff, Lock, Server, Users, Key } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const trustCards = [
  {
    title: "Secure Project Data",
    desc: "Your vector master plans, boundaries, and layout files are encrypted at rest and in transit using industry-grade protocols.",
    icon: <Lock className="w-5 h-5 text-bb-orange" />,
  },
  {
    title: "Developer-Owned Information",
    desc: "All inventory, pricing history, and buyer details belong entirely to you. You maintain absolute sovereignty over your dataset.",
    icon: <ShieldCheck className="w-5 h-5 text-bb-orange" />,
  },
  {
    title: "Privacy-First Infrastructure",
    desc: "Built on a private cloud environment, keeping your project layout maps completely shielded from unauthorized third-party scrapers.",
    icon: <EyeOff className="w-5 h-5 text-bb-orange" />,
  },
  {
    title: "No Data Resale",
    desc: "We do not monetize your project leads, buyer questions, or pricing logs. BrickBytes sells software, not developer or buyer intelligence.",
    icon: <Server className="w-5 h-5 text-bb-orange" />,
  },
  {
    title: "Controlled Access Management",
    desc: "Manage broker and sales team access with precision. Revoke permissions, lock plot allocations, and audit history at any time.",
    icon: <Key className="w-5 h-5 text-bb-orange" />,
  },
  {
    title: "Enterprise-Grade Security",
    desc: "Backed by standard firewalls, constant threat monitoring, and zero-trust credentials policy for all administrative tools.",
    icon: <Users className="w-5 h-5 text-bb-orange" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Trust() {
  return (
    <section id="security" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      {/* Decorative background grid */}
      <InteractiveGrid opacity={0.4} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24 items-end">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
            >
              Data Privacy & Sovereignty
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
            >
              Your Project Data Stays Yours.
            </motion.h2>
          </div>
          <div className="lg:col-span-5 text-left lg:text-right">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs sm:text-sm text-bb-slate max-w-md leading-relaxed font-sans font-light inline-block"
            >
              BrickBytes is built for developers who value ownership, privacy, and long-term control of their project information.
            </motion.p>
          </div>
        </div>

        {/* Trust Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {trustCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-bb-paper border border-line/50 rounded-3xl p-8 hover:border-bb-orange/40 hover:shadow-luxury-deep transition-all duration-300 flex flex-col justify-between text-left card-hover-accent accent-radius-3xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[8px] font-mono tracking-widest text-bb-slate uppercase">
                    Security Layer {index + 1}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-bb-sand/15 border border-bb-sand/50">
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-ink mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                  {card.desc}
                </p>
              </div>

              <div className="border-t border-line/40 pt-4 mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] font-mono font-bold tracking-wider text-bb-slate">ENTERPRISE PROTOCOL</span>
                <span className="text-[9px] font-bold text-bb-orange uppercase tracking-widest">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
