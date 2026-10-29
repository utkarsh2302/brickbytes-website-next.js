"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Info, Database, Check, Layers, RefreshCw } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

interface Plot {
  id: string;
  type: string;
  facing: string;
  size: string;
  road: string;
  price: string;
  status: "Available" | "Hold" | "Sold";
  category: "corner" | "east" | "lakeside" | "north";
  x: number;
  y: number;
  w: number;
  h: number;
}

const initialPlots: Plot[] = [
  { id: "PLOT 01", type: "Corner Estate", facing: "North", size: "265 Sq. Yds.", road: "40 ft. Road", price: "₹72.0 L", status: "Available", category: "corner", x: 25, y: 25, w: 90, h: 70 },
  { id: "PLOT 02", type: "Standard Plot", facing: "East", size: "133 Sq. Yds.", road: "30 ft. Road", price: "₹36.0 L", status: "Sold", category: "east", x: 125, y: 25, w: 90, h: 70 },
  { id: "PLOT 03", type: "Lakeside Villa", facing: "East", size: "333 Sq. Yds.", road: "60 ft. Avenue", price: "₹1.2 Cr", status: "Hold", category: "lakeside", x: 225, y: 25, w: 100, h: 70 },
  { id: "PLOT 04", type: "Corner Estate", facing: "East", size: "265 Sq. Yds.", road: "40 ft. Road", price: "₹76.0 L", status: "Available", category: "corner", x: 25, y: 115, w: 90, h: 80 },
  { id: "PLOT 05", type: "Standard Plot", facing: "North", size: "165 Sq. Yds.", road: "35 ft. Road", price: "₹45.0 L", status: "Available", category: "north", x: 125, y: 115, w: 90, h: 80 },
  { id: "PLOT 06", type: "Lakeside Villa", facing: "North", size: "355 Sq. Yds.", road: "60 ft. Avenue", price: "₹1.3 Cr", status: "Available", category: "lakeside", x: 225, y: 115, w: 100, h: 80 },
];

const filters = [
  { label: "Show All", value: "all" },
  { label: "East Facing", value: "east" },
  { label: "Corner Estates", value: "corner" },
  { label: "Lakeside View", value: "lakeside" }
];

export default function ProductShowcase() {
  const [plots, setPlots] = useState<Plot[]>(initialPlots);
  const [selectedId, setSelectedId] = useState<string | null>("PLOT 01");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number; color: string } | null>(null);

  const selectedPlot = plots.find((p) => p.id === selectedId) || null;

  // Derived state for inventory management counts
  const totalCount = plots.length;
  const availableCount = plots.filter((p) => p.status === "Available").length;
  const holdCount = plots.filter((p) => p.status === "Hold").length;
  const soldCount = plots.filter((p) => p.status === "Sold").length;

  const handleSelectPlot = (id: string, isFilteredOut: boolean) => {
    if (isFilteredOut) return;
    setSelectedId(id);
  };

  const handleUpdateStatus = (id: string, newStatus: "Available" | "Hold" | "Sold") => {
    setPlots((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const plot = plots.find((p) => p.id === id);
    if (plot) {
      const rx = plot.x + plot.w / 2;
      const ry = plot.y + plot.h / 2;
      let color = "#2e7a4e"; // Available
      if (newStatus === "Hold") color = "#f59e0b";
      if (newStatus === "Sold") color = "#ef4444";
      
      setRipple({ x: rx, y: ry, color });
      setTimeout(() => setRipple(null), 1200);
    }

    triggerToast(`${id} status updated to ${newStatus}. Broadcasting live update...`);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2500);
  };

  return (
    <section id="showcase" className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden border-t border-line/50">
      <InteractiveGrid opacity={0.35} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
            Interactive Showcase
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink mb-4">
            Master Plan Explorer
          </h2>
          <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light max-w-xl">
            Experience the central operating system. Click plots to explore parameters, toggle status filters, and run real-time availability updates.
          </p>
        </div>

        {/* Filters and Inventory Status HUD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-line/70 pb-6">
          {/* Filters Panel */}
          <div className="flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === f.value
                    ? "bg-ink text-white shadow-sm"
                    : "bg-bb-paper text-bb-slate border border-line/50 hover:bg-bb-stone/35"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Real-time Inventory Counts HUD */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-bb-paper border border-line/40 rounded-2xl p-3 text-center min-w-70 sm:min-w-85">
            <div>
              <span className="text-[8px] font-mono text-bb-slate uppercase block">Total</span>
              <motion.span 
                key={totalCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-bold text-ink"
              >
                {totalCount}
              </motion.span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-bb-available uppercase block">Available</span>
              <motion.span 
                key={availableCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-bold text-bb-available"
              >
                {availableCount}
              </motion.span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-bb-hold uppercase block">Hold</span>
              <motion.span 
                key={holdCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-bold text-bb-hold"
              >
                {holdCount}
              </motion.span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-bb-slate block uppercase">Sold</span>
              <motion.span 
                key={soldCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-bold text-bb-slate"
              >
                {soldCount}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Showcase Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: SVG Master Plan Map */}
          <div className="lg:col-span-7 bg-bb-paper border border-line/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative min-h-87.5 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[16px_16px]" />
            </div>

            {/* Map Header details */}
            <div className="flex justify-between items-center z-10 mb-6">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-bb-sand/30 border border-bb-sand/30">
                  <Map className="w-4 h-4 text-bb-orange" />
                </span>
                <span className="text-[10px] font-mono tracking-widest text-bb-slate uppercase font-bold">
                  Sector A Master Plan
                </span>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-bb-available">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-available" />
                  Available
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-bb-hold">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-hold" />
                  On Hold
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-bb-slate">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-booked" />
                  Sold Out
                </span>
              </div>
            </div>

            {/* SVG Interactive Map */}
            <div className="flex-1 flex items-center justify-center py-4 z-10">
              <svg className="w-full max-w-120 h-auto aspect-16/10 overflow-visible" viewBox="0 0 350 220" fill="none">
                {/* Background Roads / Accents */}
                <path d="M 0 102 L 350 102" stroke="#e3ddd3" strokeWidth="12" strokeLinecap="square" />
                <path d="M 0 102 L 350 102" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
                <text x="175" y="105" fontSize="6" fontWeight="bold" fill="#9aa0a8" fontFamily="monospace" textAnchor="middle" tracking-widest="0.1em">CENTRAL AVENUE (60FT ROAD)</text>

                {/* Plot Paths */}
                {plots.map((plot) => {
                  const isFilteredOut = activeFilter !== "all" && plot.category !== activeFilter;
                  const isSelected = plot.id === selectedId;
                  
                  // Status Colors
                  let fill = "#ecfdf5";
                  let stroke = "#2e7a4e";
                  let textCol = "#047857";

                  if (plot.status === "Hold") {
                    fill = "#fef3c7";
                    stroke = "#f59e0b";
                    textCol = "#b45309";
                  } else if (plot.status === "Sold") {
                    fill = "#ece6dd";
                    stroke = "#9ca3af";
                    textCol = "#5a6272";
                  }

                  if (isSelected) {
                    stroke = "#ff5a1f";
                  }

                  return (
                    <motion.g
                      key={plot.id}
                      onClick={() => handleSelectPlot(plot.id, isFilteredOut)}
                      className={`cursor-pointer select-none transition-all duration-300 ${
                        isFilteredOut ? "pointer-events-none opacity-10" : "opacity-100"
                      }`}
                      whileHover={{ scale: isFilteredOut ? 1 : 1.02, zIndex: 10 }}
                    >
                      {/* Plot block */}
                      <motion.rect
                        x={plot.x}
                        y={plot.y}
                        width={plot.w}
                        height={plot.h}
                        rx="6"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isSelected ? 2.5 : 1}
                        animate={isSelected ? { stroke: "#ff5a1f" } : { stroke }}
                        className="transition-colors duration-300"
                      />
                      
                      {/* Active Selection Marching Ants Outline */}
                      {isSelected && (
                        <motion.rect
                          x={plot.x - 2}
                          y={plot.y - 2}
                          width={plot.w + 4}
                          height={plot.h + 4}
                          rx="8"
                          fill="none"
                          stroke="#ff5a1f"
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          animate={{ strokeDashoffset: [0, -20] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        />
                      )}
                      
                      {/* Plot label */}
                      <text
                        x={plot.x + plot.w / 2}
                        y={plot.y + plot.h / 2 - 2}
                        fontSize="7.5"
                        fontWeight="bold"
                        fill={isSelected ? "#ff5a1f" : textCol}
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {plot.id}
                      </text>

                      {/* Small details inside */}
                      <text
                        x={plot.x + plot.w / 2}
                        y={plot.y + plot.h / 2 + 8}
                        fontSize="5.5"
                        fill={isSelected ? "#ff5a1f" : "#5a6272"}
                        fontFamily="monospace"
                        textAnchor="middle"
                        opacity={0.8}
                      >
                        {plot.size}
                      </text>

                      {/* Corner Badge representation */}
                      {plot.type === "Corner Estate" && (
                        <circle cx={plot.x + 8} cy={plot.y + 8} r="2.5" fill="#ff5a1f" />
                      )}
                    </motion.g>
                  );
                })}

                {/* Database Synchronization Waves */}
                <AnimatePresence>
                  {ripple && (
                    <g key={`sync-ripple-${ripple.x}-${ripple.y}`}>
                      <motion.circle
                        initial={{ r: 12, opacity: 0.6 }}
                        animate={{ r: 85, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        cx={ripple.x}
                        cy={ripple.y}
                        fill="none"
                        stroke={ripple.color}
                        strokeWidth="2.5"
                      />
                      <motion.circle
                        initial={{ r: 6, opacity: 0.8 }}
                        animate={{ r: 45, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                        cx={ripple.x}
                        cy={ripple.y}
                        fill="none"
                        stroke={ripple.color}
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            {/* Simulated Live Connection Info */}
            <div className="mt-4 flex items-center justify-between z-10 border-t border-line/70 pt-4">
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-bb-slate" />
                <span className="text-[9px] font-mono text-bb-slate">Node Sync State</span>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-bb-available">
                <RefreshCw className="w-3 h-3 animate-spin mr-0.5" />
                Live Broadcast
              </span>
            </div>

            {/* Sync Alert Toast Overlay inside map */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-6 left-6 right-6 bg-ink text-white px-5 py-3 rounded-2xl flex items-center gap-3 z-30 shadow-luxury-deep border border-white/10"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-bb-available shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[11px] font-sans font-medium tracking-wide">
                    {toastMessage}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Detail Information Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-line/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm">
              <div>
                {/* Panel Title */}
                <div className="flex items-center justify-between border-b border-line/70 pb-5 mb-6">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-bb-orange" />
                    <h3 className="text-base font-display font-semibold text-ink">
                      Unit Specifications
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-bb-paper border border-line/40 text-bb-slate">
                    Workspace Mode
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {selectedPlot ? (
                    <motion.div
                      key={selectedPlot.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Plot Meta Data */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-2xl font-display font-semibold text-ink">
                            {selectedPlot.id}
                          </h4>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-bb-orange mt-1">
                            {selectedPlot.type}
                          </p>
                        </div>

                        {/* Dynamic Badge */}
                        <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-mono font-medium tracking-wide border flex items-center gap-1.5 select-none ${
                          selectedPlot.status === "Available"
                            ? "bg-bb-available/4 border-bb-available/12 text-bb-available"
                            : selectedPlot.status === "Hold"
                            ? "bg-bb-hold/4 border-bb-hold/15 text-bb-hold"
                            : "bg-bb-paper border-line/60 text-bb-slate"
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${
                            selectedPlot.status === "Available"
                              ? "bg-bb-available"
                              : selectedPlot.status === "Hold"
                              ? "bg-bb-hold"
                              : "bg-bb-booked"
                          }`} />
                          {selectedPlot.status}
                        </span>
                      </div>

                      {/* Parameters Spec Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8 bg-bb-paper border border-line/40 rounded-2xl p-5">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase block mb-1">Facing</span>
                          <span className="text-xs font-sans font-semibold text-ink">{selectedPlot.facing} Facing</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase block mb-1">Area</span>
                          <span className="text-xs font-sans font-semibold text-ink">{selectedPlot.size}</span>
                        </div>
                        <div className="border-t border-line/70 pt-3">
                          <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase block mb-1">Accessway</span>
                          <span className="text-xs font-sans font-semibold text-ink">{selectedPlot.road}</span>
                        </div>
                        <div className="border-t border-line/70 pt-3">
                          <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase block mb-1">Est. Price</span>
                          <span className="text-xs font-sans font-semibold text-ink">{selectedPlot.price}</span>
                        </div>
                      </div>

                      {/* Operation simulator label */}
                      <div className="mb-4">
                        <span className="text-[9px] font-mono tracking-widest text-bb-slate uppercase font-bold flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Simulate Broker Operations
                        </span>
                      </div>

                      {/* Control Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleUpdateStatus(selectedPlot.id, "Available")}
                          disabled={selectedPlot.status === "Available"}
                          className="py-2.5 px-3 rounded-lg border border-line hover:border-bb-available/20 hover:bg-bb-available/2 hover:text-bb-available text-[10px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Available
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedPlot.id, "Hold")}
                          disabled={selectedPlot.status === "Hold"}
                          className="py-2.5 px-3 rounded-lg border border-line hover:border-bb-hold/25 hover:bg-bb-hold/2 hover:text-bb-hold text-[10px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Hold
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedPlot.id, "Sold")}
                          disabled={selectedPlot.status === "Sold"}
                          className="py-2.5 px-3 rounded-lg border border-line hover:border-red-200 hover:bg-red-50/30 hover:text-red-600 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Sold
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-sm text-bb-slate font-sans font-light">
                        Select a plot block on the master plan to inspect details.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panel Footer */}
              <div className="border-t border-line/70 pt-5 mt-6 text-left">
                <p className="text-[10px] text-bb-slate leading-relaxed font-sans font-light">
                  *This interactive console demonstrates plot availability synchronization across active developer consoles and broker maps.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
