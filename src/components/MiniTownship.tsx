"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ShieldCheck, MapPin } from "lucide-react";

interface MiniPlot {
  id: string;
  area: string;
  facing: string;
  status: "available" | "sold" | "reserved";
  points: string;
  cx: number;
  cy: number;
  price: string;
  type: string;
}

const miniPlots: MiniPlot[] = [
  { id: "Plot 101", area: "265 Sq. Yds.", facing: "North", status: "available", points: "150,50 210,80 150,110 90,80", cx: 150, cy: 80, price: "₹72 L", type: "Premium Vista" },
  { id: "Plot 102", area: "200 Sq. Yds.", facing: "East", status: "sold", points: "220,85 280,115 220,145 160,115", cx: 220, cy: 115, price: "₹54 L", type: "Standard Plot" },
  { id: "Plot 103", area: "333 Sq. Yds.", facing: "East", status: "available", points: "290,120 350,150 290,180 230,150", cx: 290, cy: 150, price: "₹95 L", type: "Lakeside Reserve" },
  { id: "Plot 104", area: "265 Sq. Yds.", facing: "North", status: "available", points: "90,105 150,135 90,165 30,135", cx: 90, cy: 135, price: "₹74 L", type: "Premium Vista" },
  { id: "Plot 105", area: "200 Sq. Yds.", facing: "West", status: "reserved", points: "160,140 220,170 160,200 100,170", cx: 160, cy: 170, price: "₹55 L", type: "Standard Plot" },
  { id: "Plot 106", area: "355 Sq. Yds.", facing: "North", status: "available", points: "230,175 290,205 230,235 170,205", cx: 230, cy: 205, price: "₹1.1 Cr", type: "Lakeside Reserve" }
];

export default function MiniTownship() {
  const [hoveredPlot, setHoveredPlot] = useState<MiniPlot | null>(null);
  const [activePlot, setActivePlot] = useState<MiniPlot | null>(miniPlots[0]);
  const [scanActive, setScanActive] = useState(true);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md bg-white/70 backdrop-blur-md border border-line/80 rounded-2xl p-5 sm:p-6 shadow-xl select-none overflow-hidden">
      {/* Decorative Blueprint Corner Marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-ink/15" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-ink/15" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-ink/15" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-ink/15" />

      {/* Embedded Styles for Animations */}
      <style>{`
        @keyframes marker-ripple {
          0% { r: 2.5; opacity: 1; }
          50% { r: 7.5; opacity: 0.4; }
          100% { r: 2.5; opacity: 1; }
        }
        .marker-pulse-anim {
          animation: marker-ripple 2.5s infinite ease-in-out;
          transform-origin: center;
        }
        @keyframes scan-laser {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(220px); opacity: 0; }
        }
        .laser-sweep-anim {
          animation: scan-laser 4.5s infinite linear;
        }
      `}</style>

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-line/70 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-bb-orange animate-spin-slow" />
          <span className="text-[10px] font-mono tracking-widest text-bb-slate uppercase font-bold">
            Live Development HUD
          </span>
        </div>
        <button
          onClick={() => setScanActive(!scanActive)}
          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase border ${
            scanActive
              ? "bg-bb-sand/30 border-bb-sand text-bb-orange font-bold"
              : "bg-bb-paper border-line text-bb-slate"
          }`}
        >
          {scanActive ? "Scan Active" : "Scan Idle"}
        </button>
      </div>

      {/* SVG Viewport */}
      <div className="relative w-full aspect-4/3 flex items-center justify-center bg-bb-paper/50 rounded-xl border border-line/50 overflow-hidden">
        {/* Fine Architectural grid backdrop */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[20px_20px]" />
        </div>

        {/* Laser Sweep Overlay */}
        {scanActive && (
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-bb-orange/45 to-transparent shadow-[0_0_10px_rgba(255,94,19,0.5)] laser-sweep-anim pointer-events-none z-10" />
        )}

        <svg className="w-full h-full p-2 overflow-visible" viewBox="0 0 380 270" fill="none">
          {/* Legend Coordinates grid lines */}
          <line x1="20" y1="20" x2="360" y2="20" stroke="rgba(28,26,23,0.04)" strokeWidth="0.8" />
          <line x1="20" y1="250" x2="360" y2="250" stroke="rgba(28,26,23,0.04)" strokeWidth="0.8" />
          <line x1="20" y1="20" x2="20" y2="250" stroke="rgba(28,26,23,0.04)" strokeWidth="0.8" />
          <line x1="360" y1="20" x2="360" y2="250" stroke="rgba(28,26,23,0.04)" strokeWidth="0.8" />

          {/* Plot Polygons */}
          {miniPlots.map((plot) => {
            const isHovered = hoveredPlot?.id === plot.id;
            const isActive = activePlot?.id === plot.id;

            // Compute styling based on status
            let fill = "rgba(28, 26, 23, 0.02)";
            let stroke = "rgba(28, 26, 23, 0.15)";
            let glowFilter = "";

            if (plot.status === "available") {
              fill = isHovered 
                ? "rgba(255, 94, 19, 0.12)" 
                : isActive 
                ? "rgba(255, 94, 19, 0.08)"
                : "rgba(255, 94, 19, 0.03)";
              stroke = isHovered || isActive ? "#ff5a1f" : "rgba(255, 94, 19, 0.4)";
              glowFilter = isHovered || isActive ? "drop-shadow(0px 0px 5px rgba(255, 94, 19, 0.35))" : "drop-shadow(0px 0px 2px rgba(255, 94, 19, 0.15))";
            } else if (plot.status === "reserved") {
              fill = "rgba(217, 119, 6, 0.05)";
              stroke = "rgba(217, 119, 6, 0.4)";
            } else { // sold
              fill = "rgba(113, 113, 122, 0.02)";
              stroke = "rgba(113, 113, 122, 0.18)";
            }

            if (isHovered || isActive) {
              stroke = "#ff5a1f";
            }

            return (
              <g
                key={plot.id}
                onMouseEnter={() => setHoveredPlot(plot)}
                onMouseLeave={() => setHoveredPlot(null)}
                onClick={() => setActivePlot(plot)}
                className="cursor-pointer"
              >
                {/* Visual Plot Polygon */}
                <polygon
                  points={plot.points}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered || isActive ? 2 : 1}
                  style={{
                    filter: glowFilter,
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                />

                {/* Plot Labels */}
                <text
                  x={plot.cx}
                  y={plot.cy - 2}
                  textAnchor="middle"
                  className="text-[7.5px] font-mono font-bold fill-ink"
                  style={{ pointerEvents: "none" }}
                >
                  {plot.id.replace("Plot ", "")}
                </text>

                {/* Pulsing Available Markers */}
                {plot.status === "available" && (
                  <g>
                    {/* Glowing outer aura */}
                    <circle
                      cx={plot.cx}
                      cy={plot.cy + 10}
                      r="4.5"
                      fill="none"
                      stroke="#ff5a1f"
                      strokeWidth="0.8"
                      className="marker-pulse-anim"
                    />
                    {/* Center Core dot */}
                    <circle
                      cx={plot.cx}
                      cy={plot.cy + 10}
                      r="2"
                      fill="#ff5a1f"
                    />
                  </g>
                )}

                {/* Reserved Marker */}
                {plot.status === "reserved" && (
                  <circle
                    cx={plot.cx}
                    cy={plot.cy + 10}
                    r="2"
                    fill="#b7791f"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic Inner-SVG Micro Tooltip Card */}
        <AnimatePresence>
          {hoveredPlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none bg-ink text-white rounded-lg p-2.5 shadow-xl border border-white/10 flex flex-col gap-0.5 text-left z-20"
              style={{
                top: `${(hoveredPlot.cy / 270) * 100}%`,
                left: `${(hoveredPlot.cx / 380) * 100}%`,
                transform: "translate(-50%, 8px)",
              }}
            >
              <div className="flex items-center gap-1.5 justify-between">
                <span className="text-[9px] font-bold font-mono">{hoveredPlot.id}</span>
                <span className={`text-[6px] font-bold uppercase px-1 rounded ${
                  hoveredPlot.status === "available"
                    ? "bg-bb-available/20 text-bb-available"
                    : hoveredPlot.status === "reserved"
                    ? "bg-bb-hold/20 text-bb-hold"
                    : "bg-ink/40 text-bb-slate"
                }`}>
                  {hoveredPlot.status}
                </span>
              </div>
              <span className="text-[7.5px] font-mono text-bb-slate">{hoveredPlot.type}</span>
              <span className="text-[8px] font-bold text-bb-orange mt-0.5">{hoveredPlot.price} • {hoveredPlot.area}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Unit Details Panel */}
      <div className="mt-4">
        {activePlot ? (
          <div className="bg-bb-paper border border-line/50 rounded-xl p-3 text-left">
            <div className="flex justify-between items-center mb-1.5 border-b border-line/40 pb-1.5">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-bb-orange" />
                <span className="text-xs font-display font-semibold text-ink">{activePlot.id}</span>
              </div>
              <span className="text-[9px] font-bold text-bb-slate font-mono tracking-wide uppercase">
                {activePlot.type}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-bb-slate">
              <div>
                <span className="text-[8px] font-mono text-bb-slate uppercase block">Area</span>
                <span className="font-semibold text-ink">{activePlot.area}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-bb-slate uppercase block">Facing</span>
                <span className="font-semibold text-ink">{activePlot.facing}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-bb-slate uppercase block">Price</span>
                <span className="font-semibold text-bb-orange">{activePlot.price}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-bb-paper border border-line/50 rounded-xl p-3 text-center text-[10px] text-bb-slate font-light">
            Click any plot on the HUD map to view specs.
          </div>
        )}
      </div>

      {/* HUD Info Footer */}
      <div className="mt-3.5 flex items-center justify-between text-[8.5px] text-bb-slate font-mono">
        <span className="flex items-center gap-1 text-bb-available font-bold">
          <ShieldCheck className="w-3 h-3 text-bb-available" /> Secure Node Verified
        </span>
        <span>BRICKBYTES HUD v1.2</span>
      </div>
    </div>
  );
}
