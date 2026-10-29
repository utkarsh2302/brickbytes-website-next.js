"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Mail } from "lucide-react";
import InteractiveGrid from "@/components/InteractiveGrid";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bb-paper text-ink px-4 overflow-hidden">
      {/* Dynamic architectural grid background */}
      <InteractiveGrid opacity={0.55} />

      <div className="relative max-w-lg w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-line/60 shadow-luxury-deep"
        >
          {/* Subtle label */}
          <div className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-bb-orange mb-4">
            System Alert
          </div>

          {/* Elegant header */}
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-ink mb-4">
            Experience <span className="">Interrupted</span>
          </h1>

          {/* Error copy */}
          <p className="text-sm sm:text-base text-bb-slate font-sans font-light leading-relaxed mb-8">
            An unexpected layout rendering boundary was crossed or a network timeout occurred. Please try resetting the view, or contact our support desk if this persists.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Reset / Retry CTA */}
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-bb-orange hover:bg-bb-orange/95 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-bb-orange/20 hover:shadow-bb-orange/30 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Retry Render</span>
            </button>

            {/* Support CTA */}
            <a
              href="mailto:business@brickbytes.in"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white border border-line hover:border-ink/15 hover:bg-bb-paper font-bold text-xs uppercase tracking-wider text-bb-slate transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
