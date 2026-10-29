"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Scroll, Phone, FileSpreadsheet, Clock, TrendingDown, Compass, RefreshCw, Sparkles, Layers, Zap, AlertTriangle } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const traditionalSteps = [
  {
    icon: <Scroll className="w-5 h-5 text-bb-slate" />,
    title: "Printed Layout Plans",
    desc: "Customers rely on static PDFs and printed layouts that are hard to read and easily outdated.",
  },
  {
    icon: <Phone className="w-5 h-5 text-bb-slate" />,
    title: "Phone Calls & Follow-Ups",
    desc: "Sales teams manually answer availability, pricing, and plot detail questions repeatedly.",
  },
  {
    icon: <FileSpreadsheet className="w-5 h-5 text-bb-slate" />,
    title: "Spreadsheet Updates",
    desc: "Inventory updates are shared manually through spreadsheets, emails, and group chat messages.",
  },
  {
    icon: <Clock className="w-5 h-5 text-bb-slate" />,
    title: "Delayed Decisions",
    desc: "Buyers wait days for information or physical site visits before making any booking decisions.",
  },
  {
    icon: <TrendingDown className="w-5 h-5 text-bb-slate" />,
    title: "Lost Opportunities",
    desc: "Miscommunication and outdated inventory data lead to dropped bookings and low conversion rates.",
  },
];

const brickbytesSteps = [
  {
    icon: <Compass className="w-5 h-5 text-bb-orange" />,
    title: "Interactive Project Exploration",
    desc: "Buyers explore layout plots, filters, and boundaries directly on a digital, interactive layout map.",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-bb-orange" />,
    title: "Real-Time Availability",
    desc: "Live inventory status is synced instantly, eliminating availability uncertainty for buyers.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-bb-orange" />,
    title: "AI-Assisted Buyer Engagement",
    desc: "Automated assistance provides accurate project information instantly and consistently.",
  },
  {
    icon: <Layers className="w-5 h-5 text-bb-orange" />,
    title: "Instant Plot Insights",
    desc: "Buyers view plot size, facing, road width, dimensions, and booking status immediately.",
  },
  {
    icon: <Zap className="w-5 h-5 text-bb-orange" />,
    title: "Faster Closures",
    desc: "Reduced sales friction, zero information delay, and visual clarity boost buyer confidence.",
  },
];

// Counting component for final metrics
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [motionValue]);

  return <span ref={ref}>0</span>;
}

export default function SalesComparison() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [ambientCycle, setAmbientCycle] = useState(0);

  // Cycle ambient pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientCycle((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="comparison" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
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
            The Process Shift
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink"
          >
            From Traditional Selling to{" "}
            <span className="font-normal block sm:inline">Digital-First Selling</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-bb-slate leading-relaxed font-sans font-light max-w-2xl"
          >
            Replace paperwork, manual follow-ups, and disconnected updates with a real-time, interactive sales experience powered by BrickBytes.
          </motion.p>
        </div>

        {/* COMPARISON CONTAINER - DESKTOP LAYOUT */}
        <div className="hidden lg:block relative min-h-150 w-full">
          {/* Vertical Track lines running through both columns */}
          <div className="absolute left-[22%] top-8 bottom-8 w-px bg-bb-stone/50" />
          <div className="absolute right-[22%] top-8 bottom-8 w-px bg-bb-stone/50" />

          {/* Connected Data Flow Line (vertical active tracker on BrickBytes side) */}
          <div className="absolute right-[22%] top-8 bottom-8 w-px bg-bb-stone/70">
            {activeStep !== null && (
              <motion.div
                className="absolute w-0.5 bg-bb-orange shadow-[0_0_12px_#ff5a1f]"
                initial={{ height: "0%", top: "0%" }}
                animate={{
                  height: "20%",
                  top: `${activeStep * 20}%`,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
            )}
          </div>

          {/* Steps Map */}
          <div className="space-y-8 relative">
            {traditionalSteps.map((tradStep, idx) => {
              const isActive = activeStep === idx;
              const isAnyActive = activeStep !== null;
              const isAmbientActive = ambientCycle === idx && !isAnyActive;

              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-center gap-4 relative py-2"
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* TRADITIONAL CARD (Left: Cols 1-5) */}
                  <motion.div
                    className={`col-span-5 relative bg-[#f7f4ef]/70 border rounded-2xl p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-ink/12 bg-bb-paper/50 opacity-60 shadow-sm"
                        : isAnyActive
                        ? "border-line/40 opacity-40"
                        : "border-line/80 opacity-90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    {/* Warning pulse on traditional side */}
                    {isAmbientActive && (
                      <motion.div
                        className="absolute inset-0 border border-red-500/20 rounded-2xl pointer-events-none"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}

                    <div className="flex gap-4 items-start">
                      <div className="flex items-center justify-center p-2.5 rounded-xl bg-white border border-line/70 shadow-sm shrink-0">
                        {tradStep.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-mono tracking-widest text-bb-slate">
                            TRADITIONAL {idx + 1}
                          </span>
                          {isAmbientActive && (
                            <span className="flex items-center gap-0.5 text-[8px] font-bold text-red-500 uppercase tracking-wide">
                              <AlertTriangle className="w-2.5 h-2.5" /> Slow
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-display font-semibold text-ink mb-1">
                          {tradStep.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-bb-slate leading-relaxed font-sans font-light">
                          {tradStep.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CENTRAL CONNECTOR (Col 6) */}
                  <div className="col-span-2 flex items-center justify-center relative h-full min-h-12.5">
                    {/* Left connection line */}
                    <div className="absolute left-0 right-1/2 h-px bg-bb-stone/40" />
                    
                    {/* Right connection line */}
                    <div className="absolute left-1/2 right-0 h-px bg-bb-stone/40" />

                    {/* Animated Connection Link */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-zinc-300 via-bb-orange to-bb-orange z-20"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    )}

                    {/* Center Node */}
                    <motion.div
                      className={`w-6 h-6 rounded-full border-2 bg-white z-30 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "border-bb-orange text-bb-orange shadow-[0_0_15px_rgba(255,94,19,0.4)] scale-110"
                          : "border-line text-bb-slate"
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold">{idx + 1}</span>
                    </motion.div>
                  </div>

                  {/* BRICKBYTES CARD (Right: Cols 7-12) */}
                  <motion.div
                    className={`col-span-5 relative border rounded-2xl p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-bb-orange/40 bg-white shadow-[0_15px_30px_-10px_rgba(255,94,19,0.08)] scale-[1.01]"
                        : isAnyActive
                        ? "border-line/40 opacity-40 bg-white/40"
                        : "border-line/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    {/* Soft activity indicators on BrickBytes side */}
                    {(isActive || isAmbientActive) && (
                      <div className="absolute top-4 right-4 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bb-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-bb-orange"></span>
                      </div>
                    )}

                    {/* Data pulse flowing along vertical column */}
                    {isAmbientActive && (
                      <motion.div
                        className="absolute -left-13.5 w-2.5 h-2.5 rounded-full bg-bb-orange/80 shadow-[0_0_8px_#ff5a1f] z-40"
                        animate={{
                          y: [-30, 80],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    <div className="flex gap-4 items-start">
                      <div className="flex items-center justify-center p-2.5 rounded-xl bg-bb-sand/12 border border-bb-sand shadow-sm shrink-0">
                        {brickbytesSteps[idx].icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-mono tracking-widest text-bb-orange font-bold uppercase">
                            BRICKBYTES {idx + 1}
                          </span>
                          {isActive && (
                            <span className="text-[8px] font-bold text-bb-orange uppercase tracking-wide">
                              Active
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-display font-semibold text-ink mb-1">
                          {brickbytesSteps[idx].title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-bb-slate leading-relaxed font-sans font-light">
                          {brickbytesSteps[idx].desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPARISON CONTAINER - MOBILE STACKED LAYOUT */}
        <div className="block lg:hidden space-y-16">
          {/* TRADITIONAL COLUMN */}
          <div className="relative">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-6 bg-bb-booked rounded-full" />
              <h3 className="text-lg font-display font-semibold text-ink">
                Traditional Sales Process
              </h3>
            </div>
            
            {/* Mobile timeline track */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-bb-stone/70" />

            <div className="space-y-6">
              {traditionalSteps.map((step, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-3.5 -translate-x-1/2 top-4 w-5 h-5 rounded-full border-2 border-line bg-white flex items-center justify-center z-10 text-[8px] font-mono font-bold text-bb-slate">
                    {idx + 1}
                  </div>
                  <div className="bg-[#f7f4ef]/80 border border-line/60 rounded-2xl p-4 text-left">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-white border border-line/70 text-bb-slate">
                        {step.icon}
                      </div>
                      <h4 className="text-sm font-display font-semibold text-ink">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-bb-slate font-sans font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BRICKBYTES COLUMN */}
          <div className="relative">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-6 bg-bb-orange rounded-full" />
              <h3 className="text-lg font-display font-semibold text-ink">
                BrickBytes Sales Process
              </h3>
            </div>

            {/* Mobile timeline track */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-bb-sand/60" />

            <div className="space-y-6">
              {brickbytesSteps.map((step, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-3.5 -translate-x-1/2 top-4 w-5 h-5 rounded-full border-2 border-bb-orange bg-white flex items-center justify-center z-10 text-[8px] font-mono font-bold text-bb-orange">
                    {idx + 1}
                  </div>
                  <div className="bg-white border border-bb-sand rounded-2xl p-4 text-left shadow-sm">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-bb-sand/15 border border-bb-sand/50 text-bb-orange">
                        {step.icon}
                      </div>
                      <h4 className="text-sm font-display font-semibold text-ink">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-bb-slate font-sans font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONVERSION MOMENT (METRIC STRIP) */}
        <div className="mt-20 sm:mt-28 border border-line/80 rounded-3xl bg-[#f7f4ef]/40 backdrop-blur-sm p-6 sm:p-10 text-center relative max-w-4xl mx-auto shadow-sm">
          <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none rounded-3xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-line/80 relative z-10">
            {/* Traditional Column */}
            <div className="pb-6 md:pb-0 md:pr-8 flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-widest text-bb-slate uppercase mb-2">
                Traditional Sales Process
              </span>
              <div className="flex items-baseline gap-1 text-ink">
                <span className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-bb-slate">
                  <Counter value={6} />
                </span>
                <span className="text-sm font-display font-semibold text-bb-slate">Weeks</span>
              </div>
              <span className="text-xs text-bb-slate font-sans font-light mt-1">
                of back-and-forth coordination
              </span>
            </div>

            {/* BrickBytes Column */}
            <div className="pt-6 md:pt-0 md:pl-8 flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-widest text-bb-orange font-bold uppercase mb-2">
                BrickBytes Sales Process
              </span>
              <div className="flex items-baseline gap-1 text-bb-orange">
                <span className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
                  <Counter value={15} />
                </span>
                <span className="text-sm font-display font-semibold">Minutes</span>
              </div>
              <span className="text-xs text-bb-slate font-sans font-light mt-1">
                of self-directed plot exploration
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
