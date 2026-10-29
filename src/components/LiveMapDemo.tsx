"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X } from "lucide-react";

// Plotted Land Gated Community Model
const plots = [
  // Block A - Lakeside Ridge (North-West)
  { id: "Plot 01", area: "750 Sq. Yds.", status: "available", facing: "Lakefront View", roadWidth: "40 ft", dimensions: "60 x 113 ft", path: "M 330,60 L 470,60 L 470,160 L 330,160 Z", cx: 400, cy: 110, block: "Lakeside Ridge", isPremium: true },
  { id: "Plot 02", area: "750 Sq. Yds.", status: "sold", facing: "Lakefront View", roadWidth: "40 ft", dimensions: "60 x 113 ft", path: "M 330,170 L 470,170 L 470,270 L 330,270 Z", cx: 400, cy: 220, block: "Lakeside Ridge", isPremium: false },
  { id: "Plot 03", area: "600 Sq. Yds.", status: "available", facing: "North facing", roadWidth: "30 ft", dimensions: "50 x 108 ft", path: "M 200,200 L 310,200 L 310,270 L 200,270 Z", cx: 255, cy: 235, block: "Lakeside Ridge", isPremium: false },
  { id: "Plot 04", area: "600 Sq. Yds.", status: "reserved", facing: "North facing", roadWidth: "30 ft", dimensions: "50 x 108 ft", path: "M 80,200 L 180,200 L 180,270 L 80,270 Z", cx: 130, cy: 235, block: "Lakeside Ridge", isPremium: false },

  // Block B - Premium Boulevard (North-East)
  { id: "Plot 05", area: "800 Sq. Yds.", status: "available", facing: "Boulevard Promenade", roadWidth: "60 ft", dimensions: "60 x 120 ft", path: "M 530,160 L 620,160 L 620,270 L 530,270 Z", cx: 575, cy: 215, block: "Premium Boulevard", isPremium: true },
  { id: "Plot 06", area: "800 Sq. Yds.", status: "sold", facing: "Boulevard Promenade", roadWidth: "60 ft", dimensions: "60 x 120 ft", path: "M 630,160 L 720,160 L 720,270 L 630,270 Z", cx: 675, cy: 215, block: "Premium Boulevard", isPremium: false },
  { id: "Plot 07", area: "830 Sq. Yds.", status: "available", facing: "East facing", roadWidth: "40 ft", dimensions: "60 x 125 ft", path: "M 730,160 L 820,160 L 820,270 L 730,270 Z", cx: 775, cy: 215, block: "Premium Boulevard", isPremium: true },
  { id: "Plot 08", area: "970 Sq. Yds.", status: "reserved", facing: "Corner Estate", roadWidth: "40 ft", dimensions: "70 x 125 ft", path: "M 830,160 L 940,160 L 940,270 L 830,270 Z", cx: 885, cy: 215, block: "Premium Boulevard", isPremium: true },

  // Block C - Boulevard Villas (South-West)
  { id: "Plot 09", area: "550 Sq. Yds.", status: "available", facing: "South facing", roadWidth: "35 ft", dimensions: "50 x 100 ft", path: "M 260,330 L 360,330 L 360,430 L 260,430 Z", cx: 310, cy: 380, block: "Boulevard Villas", isPremium: false },
  { id: "Plot 10", area: "550 Sq. Yds.", status: "sold", facing: "South facing", roadWidth: "35 ft", dimensions: "50 x 100 ft", path: "M 370,330 L 470,330 L 470,430 L 370,430 Z", cx: 420, cy: 380, block: "Boulevard Villas", isPremium: false },
  { id: "Plot 11", area: "550 Sq. Yds.", status: "available", facing: "West facing", roadWidth: "30 ft", dimensions: "50 x 100 ft", path: "M 370,440 L 470,440 L 470,540 L 370,540 Z", cx: 420, cy: 490, block: "Boulevard Villas", isPremium: false },
  { id: "Plot 12", area: "550 Sq. Yds.", status: "available", facing: "West facing", roadWidth: "30 ft", dimensions: "50 x 100 ft", path: "M 260,440 L 360,440 L 360,540 L 260,540 Z", cx: 310, cy: 490, block: "Boulevard Villas", isPremium: false },

  // Block D - Parkview Meadows (South-East)
  { id: "Plot 13", area: "660 Sq. Yds.", status: "available", facing: "Parkview Front", roadWidth: "40 ft", dimensions: "50 x 120 ft", path: "M 530,330 L 610,330 L 610,430 L 530,430 Z", cx: 570, cy: 380, block: "Parkview Meadows", isPremium: false },
  { id: "Plot 14", area: "660 Sq. Yds.", status: "sold", facing: "Parkview Front", roadWidth: "40 ft", dimensions: "50 x 120 ft", path: "M 620,330 L 690,330 L 690,430 L 620,430 Z", cx: 655, cy: 380, block: "Parkview Meadows", isPremium: false },
  { id: "Plot 15", area: "660 Sq. Yds.", status: "reserved", facing: "Parkview Front", roadWidth: "40 ft", dimensions: "50 x 120 ft", path: "M 530,440 L 610,440 L 610,540 L 530,540 Z", cx: 570, cy: 490, block: "Parkview Meadows", isPremium: false },
  { id: "Plot 16", area: "710 Sq. Yds.", status: "available", facing: "Park & Corner", roadWidth: "40 ft", dimensions: "53 x 120 ft", path: "M 620,440 L 690,440 L 690,540 L 620,540 Z", cx: 655, cy: 490, block: "Parkview Meadows", isPremium: true }
];

export default function LiveMapDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // States
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isIntroAnimating, setIsIntroAnimating] = useState(true);
  const [selectedPlotIndex, setSelectedPlotIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [dronePlotId, setDronePlotId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"2d" | "3d" | "drone">("3d");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intro Sequence Animation on Load: Center (50) -> Left (15) -> Right (85) -> Center (50)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (hasUserInteracted) return;
      setSliderPosition(15);
      
      await new Promise((r) => setTimeout(r, 1100));
      if (hasUserInteracted) return;
      setSliderPosition(85);
      
      await new Promise((r) => setTimeout(r, 1300));
      if (hasUserInteracted) return;
      setSliderPosition(50);
      
      await new Promise((r) => setTimeout(r, 1000));
      setIsIntroAnimating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [hasUserInteracted]);

  // Handle Divider Dragging
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, percentage)));
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    setIsIntroAnimating(false);
    setHasUserInteracted(true);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    setIsIntroAnimating(false);
    setHasUserInteracted(true);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUpGlobal = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUpGlobal);
    window.addEventListener("touchmove", handleTouchMoveGlobal);
    window.addEventListener("touchend", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
      window.removeEventListener("touchend", handleMouseUpGlobal);
    };
  }, []);

  const handlePlotHover = (index: number) => {
    if (dronePlotId) return; // Lock hover changes during plot-focused Drone View
    setSelectedPlotIndex(index);
  };

  const currentPlot = plots[selectedPlotIndex];

  // Transition style depending on active interaction
  const transitionStyle = isIntroAnimating || !isDragging.current
    ? "transition-all duration-1000 ease-out"
    : "";



  // Plot-specific Drone view zoom calculations
  const activeDronePlot = plots.find(p => p.id === dronePlotId);
  const zoomScale = 2.4;
  const zoomTransform = activeDronePlot && viewMode !== "drone"
    ? `translate(${500 - activeDronePlot.cx * zoomScale}px, ${300 - activeDronePlot.cy * zoomScale}px) scale(${zoomScale})`
    : `translate(0px, 0px) scale(1)`;

  // Helper to render extruded 3D model blocks for plots
  const renderExtrudedPlot = (plot: typeof plots[0], index: number) => {
    const isSelected = selectedPlotIndex === index;
    const isFiltered = false;
    const isPlotZoomed = dronePlotId === plot.id;
    
    // Parse coordinates: M x1,y1 L x2,y1 L x2,y2 L x1,y2 Z
    const match = plot.path.match(/M\s*(\d+),(\d+)\s*L\s*(\d+),\d+\s*L\s*\d+,(\d+)/);
    if (!match) return null;
    
    const x1 = parseInt(match[1]);
    const y1 = parseInt(match[2]);
    const x2 = parseInt(match[3]);
    const y2 = parseInt(match[4]);
    
    // Extrusion offsets (isometric projection shift)
    // Elevate more when hovered/selected to show 3D "rising" animation
    let height = 0;
    if (viewMode === "3d") {
      height = 3.5;
      if (isSelected && !isFiltered && !dronePlotId) {
        height = 8.5;
      }
    }
    
    // dx and dy representing the shift for the top cap
    const dx = -height * 0.7;
    const dy = -height;
    
    // Coordinates for cap (shifted)
    const cx1 = x1 + dx;
    const cy1 = y1 + dy;
    const cx2 = x2 + dx;
    const cy2 = y2 + dy;
    
    // Colors for materials based on plot status and premium state
    let capFill = "rgba(255, 255, 255, 0.9)";
    let wallRightFill = "#e5e3dd";
    let wallBottomFill = "#d5d2c8";
    let capStroke = "#c5a880";
    let capStrokeWidth = "1.2";
    let filter = "url(#shadow-plot-elevated)";
    
    if (isFiltered) {
      capFill = "rgba(0, 0, 0, 0.01)";
      wallRightFill = "transparent";
      wallBottomFill = "transparent";
      capStroke = "rgba(0, 0, 0, 0.04)";
      filter = "";
    } else if (viewMode === "drone") {
      if (isSelected) {
        capFill = "rgba(255, 94, 19, 0.15)";
        wallRightFill = "transparent";
        wallBottomFill = "transparent";
        capStroke = "#ff5a1f";
        capStrokeWidth = "2";
        filter = "";
      } else {
        capFill = "rgba(255, 255, 255, 0.02)";
        wallRightFill = "transparent";
        wallBottomFill = "transparent";
        capStroke = "rgba(255, 255, 255, 0.3)";
        capStrokeWidth = "0.8";
        filter = "";
      }
    } else if (dronePlotId) {
      if (isPlotZoomed) {
        capFill = "rgba(212, 175, 55, 0.15)";
        wallRightFill = "#d9c2a3";
        wallBottomFill = "#bca032";
        capStroke = "#d9c2a3";
        capStrokeWidth = "2.5";
        filter = "url(#shadow-plot-hover)";
      } else {
        capFill = "rgba(28, 26, 23, 0.05)";
        wallRightFill = "#e0d9ce";
        wallBottomFill = "#ccc8c0";
        capStroke = "rgba(255, 255, 255, 0.15)";
        capStrokeWidth = "0.5";
        filter = "";
      }
    } else {
      // Standard Model Plot Styling based on status
      if (plot.status === "available") {
        if (plot.isPremium) {
          capFill = "#fefcf3"; 
          wallRightFill = "#d9c9b2";
          wallBottomFill = "#c5b399";
          capStroke = "#d9c2a3"; // Elegant Gold
        } else {
          capFill = "#faf8f4"; // Ivory
          wallRightFill = "#e6ded1";
          wallBottomFill = "#cfc7b7";
          capStroke = "#c5a880"; // Soft Bronze
        }
        
        if (isSelected) {
          capStroke = plot.isPremium ? "#d9c2a3" : "#ff5a1f";
          capStrokeWidth = "2";
          filter = "url(#shadow-plot-hover)";
          if (plot.isPremium) {
            capFill = "#fffdf5";
            wallRightFill = "#e3d2ba";
            wallBottomFill = "#cfbe9f";
          } else {
            capFill = "#fffdfa";
            wallRightFill = "#ebdcc3";
            wallBottomFill = "#d5c3aa";
          }
        }
      } else if (plot.status === "reserved") {
        capFill = "#f7edd8"; // Terracotta clay
        wallRightFill = "#dec3aa";
        wallBottomFill = "#caa98d";
        capStroke = "#b7791f";
        if (isSelected) {
          capStrokeWidth = "1.8";
          filter = "url(#shadow-plot-hover)";
        }
      } else { // Sold
        capFill = "#eae6df"; // Concrete Stone gray
        wallRightFill = "#d2cec5";
        wallBottomFill = "#c1bbb1";
        capStroke = "rgba(28, 26, 23, 0.12)";
      }
    }
    
    // Construct Path strings
    const bottomWallPath = `M ${x1},${y2} L ${x2},${y2} L ${cx2},${cy2} L ${cx1},${cy2} Z`;
    const rightWallPath = `M ${x2},${y1} L ${x2},${y2} L ${cx2},${cy2} L ${cx2},${cy1} Z`;
    const capPath = `M ${cx1},${cy1} L ${cx2},${cy1} L ${cx2},${cy2} L ${cx1},${cy2} Z`;
    
    return (
      <g 
        key={plot.id} 
        onMouseEnter={() => handlePlotHover(index)}
        onClick={() => {
          if (!isFiltered) {
            setSelectedPlotIndex(index);
            if (viewMode === "drone") {
              setDronePlotId(plot.id);
            }
          }
        }}
        className="cursor-pointer group"
      >
        {/* Shadow layer */}
        {!isFiltered && height > 0 && (
          <path 
            d={capPath} 
            fill="none" 
            filter={filter} 
            className="transition-all duration-300" 
          />
        )}
        
        {/* Right Wall extrusion */}
        {!isFiltered && height > 0 && (
          <path 
            d={rightWallPath} 
            fill={wallRightFill} 
            stroke="rgba(28, 26, 23, 0.05)"
            strokeWidth="0.5"
            className="transition-all duration-300"
          />
        )}
        
        {/* Bottom Wall extrusion */}
        {!isFiltered && height > 0 && (
          <path 
            d={bottomWallPath} 
            fill={wallBottomFill} 
            stroke="rgba(28, 26, 23, 0.05)"
            strokeWidth="0.5"
            className="transition-all duration-300"
          />
        )}
        
        {/* Top Cap representing the plot face */}
        <path 
          d={capPath} 
          fill={capFill} 
          stroke={capStroke} 
          strokeWidth={capStrokeWidth}
          className={`transition-all duration-300 ${isSelected && !isFiltered ? "selected-stroke-pulse" : ""}`}
        />

        {/* Premium Gold overlay pattern for cap */}
        {plot.isPremium && !isFiltered && !dronePlotId && (
          <path 
            d={capPath} 
            fill="url(#premium-gold-hatch)" 
            className="pointer-events-none transition-all duration-300"
          />
        )}
        
        {/* Plot labels, shifted to sit on the elevated cap */}
        {!isFiltered && (
          <>
            <text
              x={(cx1 + cx2) / 2}
              y={(cy1 + cy2) / 2 - 2}
              textAnchor="middle"
              className={`text-[8px] font-mono font-semibold tracking-wider transition-all duration-300 ${
                viewMode === "drone"
                  ? isSelected
                    ? "fill-white font-bold"
                    : "fill-white/45"
                  : isSelected
                  ? "fill-ink font-bold"
                  : "fill-bb-slate"
              } ${viewMode === "drone" && !isSelected ? "opacity-30" : "opacity-100"}`}
            >
              {plot.id.replace("Plot ", "")}
            </text>

            <circle
              cx={(cx1 + cx2) / 2}
              cy={(cy1 + cy2) / 2 + 10}
              r="2.5"
              fill={
                plot.status === "available" 
                  ? "#ff5a1f" 
                  : plot.status === "reserved" 
                  ? "#b7791f" 
                  : "#9aa0a8"
              }
              className={`transition-all duration-300 ${dronePlotId && !isPlotZoomed ? "opacity-20" : "opacity-100"}`}
            />
            
            {/* Premium Indicator Gold Ring on Cap */}
            {plot.isPremium && (
              <circle
                cx={(cx1 + cx2) / 2}
                cy={(cy1 + cy2) / 2 + 10}
                r="5.5"
                fill="none"
                stroke="#d9c2a3"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
                className={`animate-spin-slow ${dronePlotId && !isPlotZoomed ? "opacity-20" : "opacity-100"}`}
              />
            )}
          </>
        )}
      </g>
    );
  };

  return (
    <section id="live-map" className="relative scroll-mt-18 overflow-hidden bg-bb-stone py-24 text-ink sm:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col items-center">
        <div className="mb-12 w-full max-w-2xl self-start sm:mb-16">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">Try a live project map</h2>
          <p className="mt-5 text-lg leading-relaxed text-bb-slate">
            Drag the slider to compare a paper layout with the live map. Click any plot to see its size, facing and status.
          </p>
        </div>
        
        {/* Custom Animated Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 16 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-[10px] font-semibold tracking-wider uppercase px-5 py-3 rounded-lg shadow-2xl border border-white/10 flex items-center gap-3"
            >
              <span>{toastMessage}</span>
              <button 
                onClick={() => setToastMessage(null)} 
                className="p-1 rounded-full hover:bg-ink/90 text-bb-slate hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Showcase Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-275 h-57.5 xs:h-[290px] sm:h-95 md:h-125 lg:h-145 xl:h-160 bg-bb-paper border border-line/80 rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-[0_25px_60px_-15px_rgba(28,26,23,0.12)]"
        >
          {/* Flat Map Wrapper */}
          <div className="absolute inset-0 w-full h-full">
            
            {/* BACKGROUND: RIGHT SIDE - Luxury Project Presentation System */}
            <div className="absolute inset-0 w-full h-full bg-bb-paper">
              {/* Luxury Header Stamp */}
              <div className="absolute top-6 left-6 flex flex-col gap-1 text-[10px] text-bb-slate font-sans tracking-wider pointer-events-none text-left">
                <span className="font-semibold text-bb-orange uppercase tracking-[0.2em]">The Oasis Sanctuary</span>
                <span className="font-display font-semibold text-bb-slate">Master-Planned Luxury Reserve</span>
              </div>

              {/* Floating Interactive Controls (Top Right) */}
              <div className="absolute top-6 right-6 flex items-center gap-1 z-20 pointer-events-auto bg-white/95 backdrop-blur-sm p-1 rounded-lg border border-line/50 shadow-md">
                {(["2d", "3d", "drone"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      if (mode === "drone") {
                        setDronePlotId(currentPlot.id);
                      } else {
                        setDronePlotId(null);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold tracking-wider uppercase transition-all duration-200 ${
                      viewMode === mode
                        ? "bg-ink text-white shadow-sm"
                        : "text-bb-slate hover:text-ink hover:bg-bb-stone/42"
                    }`}
                  >
                    {mode === "2d" ? "2D View" : mode === "3d" ? "3D View" : "Drone View"}
                  </button>
                ))}
              </div>

              {/* Floating Buyer-Facing Experience HUD Cards */}
              
              {/* Floating Availability Legend (Top Right, under viewMode swapper) */}
              {viewMode !== "drone" && (
                <div className="absolute top-14.5 right-6 z-20 hidden sm:flex items-center gap-3.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-line/50 shadow-sm pointer-events-none text-[9px] font-bold tracking-wider uppercase">
                  <span className="flex items-center gap-1.5 text-bb-slate">
                    <span className="w-2 h-2 rounded-full bg-bb-orange" /> Available
                  </span>
                  <span className="flex items-center gap-1.5 text-bb-slate">
                    <span className="w-2 h-2 rounded-full bg-bb-hold" /> Reserved
                  </span>
                  <span className="flex items-center gap-1.5 text-bb-slate">
                    <span className="w-2 h-2 rounded-full bg-bb-booked" /> Sold
                  </span>
                </div>
              )}



              {/* SVG Plots Map - Interactive Landscape */}
              <svg 
                className="w-full h-full px-6 py-10" 
                viewBox="0 0 1000 600" 
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Interactive subdivision layout plan explorer for BrickBytes"
              >
                <title>Interactive subdivision layout plan explorer for BrickBytes</title>
                
                {/* Embedded luxury CSS animations */}
                <style>{`
                  @keyframes ripple-wave {
                    0% { transform: scale(0.8) translate(25px, 15px); opacity: 0.3; }
                    50% { opacity: 0.6; }
                    100% { transform: scale(1.6) translate(-35px, -25px); opacity: 0; }
                  }
                  .ripple-anim {
                    animation: ripple-wave 5s infinite cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: 200px 140px;
                  }
                  .ripple-anim-2 {
                    animation: ripple-wave 5s infinite cubic-bezier(0.16, 1, 0.3, 1);
                    animation-delay: 2.5s;
                    transform-origin: 200px 140px;
                  }
                  @keyframes tree-sway-anim {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2.5deg) scaleX(1.02); }
                  }
                  .tree-sway {
                    animation: tree-sway-anim 6s infinite ease-in-out;
                    transform-origin: center;
                  }
                  @keyframes selected-glow {
                    0%, 100% { stroke-opacity: 0.5; stroke-width: 2.2; }
                    50% { stroke-opacity: 1; stroke-width: 3.2; }
                  }
                  .selected-stroke-pulse {
                    animation: selected-glow 2s infinite ease-in-out;
                  }
                  @keyframes pool-shimmer {
                    0%, 100% { opacity: 0.85; }
                    50% { opacity: 1; }
                  }
                  .pool-shimmer-anim {
                    animation: pool-shimmer 4s infinite ease-in-out;
                  }
                `}</style>

                {/* SVG Definitions for luxury visual effects */}
                <defs>
                  {/* Luxury Pool Water Gradient */}
                  <linearGradient id="pool-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  
                  {/* Luxury Waterbody Gradient */}
                  <linearGradient id="lake-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>

                  {/* Luxury Lawn Radial Gradient */}
                  <radialGradient id="park-gradient" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#f7fee7" />
                    <stop offset="70%" stopColor="#d9f99d" />
                    <stop offset="100%" stopColor="#bef264" />
                  </radialGradient>

                  {/* Wood Deck Planking Pattern */}
                  <pattern id="wood-deck-upgraded" width="8" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
                    <rect width="8" height="48" fill="#f5e0c3" opacity="0.9" />
                    <line x1="8" y1="0" x2="8" y2="48" stroke="#d5c0a3" strokeWidth="0.8" />
                    <line x1="0" y1="24" x2="8" y2="24" stroke="#d5c0a3" strokeWidth="0.8" />
                  </pattern>

                  {/* Paved Stone/Road Paving Pattern */}
                  <pattern id="paving-pattern" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                    <rect width="16" height="16" fill="#f4f2ed" />
                    <path d="M 0 8 L 16 8 M 8 0 L 8 16" stroke="#e6e4df" strokeWidth="0.8" />
                    <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke="#f0ede6" strokeWidth="0.4" />
                  </pattern>

                  {/* Premium Gold diagonal hatch pattern */}
                  <pattern id="premium-gold-hatch" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#d9c2a3" strokeWidth="0.8" opacity="0.12" />
                  </pattern>

                  {/* Commercial Building Roof Pattern */}
                  <pattern id="roof-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#ece6dd" strokeWidth="0.8" />
                  </pattern>

                  {/* Deep Shadow for Clubhouse & Buildings */}
                  <filter id="shadow-building-deep" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="-4" dy="8" stdDeviation="6" floodColor="#1c1a17" floodOpacity="0.08" />
                  </filter>

                  {/* Normal model elevation shadow */}
                  <filter id="shadow-plot-elevated" x="-20%" y="-20%" width="145%" height="145%">
                    <feDropShadow dx="-2" dy="4" stdDeviation="3" floodColor="#1c1a17" floodOpacity="0.08" />
                  </filter>

                  {/* Elevated model shadow (hover/selected) */}
                  <filter id="shadow-plot-hover" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="-5" dy="10" stdDeviation="6" floodColor="#1c1a17" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* ZOOMABLE LAYOUT CONTAINER WRAPPER */}
                <g 
                  style={{
                    transform: zoomTransform,
                    transformOrigin: "0px 0px",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  {/* Drone View Background Render */}
                  {viewMode === "drone" && (
                    <image
                      href="/drone_aerial_view.webp"
                      x="0"
                      y="0"
                      width="1000"
                      height="600"
                      preserveAspectRatio="xMidYMid slice"
                      className="opacity-100 transition-opacity duration-700 pointer-events-none"
                    />
                  )}

                  {/* TOWNSHIP LAYOUT VECTORS (Only show outlines when Drone View is active) */}
                  {viewMode !== "drone" && (
                    <>
                      {/* Shoreline Sand bed (carved board recess) */}
                      <path
                        d="M 47,113 C 57,63 157,43 227,83 C 287,113 317,153 237,183 C 157,203 57,183 47,113 Z"
                        fill="#ebdcc7"
                        opacity="0.8"
                      />
                      {/* Winding Lake Sanctuary (Elevated Water Plane) */}
                      <path
                        d="M 50,110 C 60,60 160,40 230,80 C 290,110 320,150 240,180 C 160,200 60,180 50,110 Z"
                        fill="url(#lake-gradient)"
                        stroke="#7dd3fc"
                        strokeWidth="1.2"
                      />
                      
                      {/* Concentric waves/ripples (animated CSS scale/fade paths) */}
                      <path
                        d="M 50,110 C 60,60 160,40 230,80 C 290,110 320,150 240,180 C 160,200 60,180 50,110 Z"
                        fill="none"
                        stroke="#bae6fd"
                        strokeWidth="2"
                        className="ripple-anim pointer-events-none"
                      />
                      <path
                        d="M 50,110 C 60,60 160,40 230,80 C 290,110 320,150 240,180 C 160,200 60,180 50,110 Z"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                        className="ripple-anim-2 pointer-events-none"
                      />

                      {/* Stylized Lake Boardwalk/Pier (3D Volumetric Extrusion) */}
                      {/* Mooring foundation posts (vertical cylinders) */}
                      <line x1="215" y1="135" x2="215" y2="142" stroke="#78350f" strokeWidth="1.8" />
                      <line x1="255" y1="155" x2="255" y2="162" stroke="#78350f" strokeWidth="1.8" />
                      <line x1="245" y1="170" x2="245" y2="177" stroke="#78350f" strokeWidth="1.8" />
                      <line x1="205" y1="150" x2="205" y2="157" stroke="#78350f" strokeWidth="1.8" />

                      {/* Pier deck bottom walls */}
                      <polygon points="215,135 255,155 253.5,153 213.5,133" fill="#9f8564" />
                      <polygon points="255,155 245,170 243.5,168 253.5,153" fill="#887053" />
                      {/* Pier deck top cap */}
                      <path
                        d="M 213.5,133 L 253.5,153 L 243.5,168 L 203.5,148 Z"
                        fill="url(#wood-deck-upgraded)"
                        stroke="#c5a880"
                        strokeWidth="0.8"
                        filter="url(#shadow-plot-elevated)"
                      />
                      {/* Mooring post caps on deck */}
                      <circle cx="213.5" cy="133" r="1.2" fill="#78350f" />
                      <circle cx="253.5" cy="153" r="1.2" fill="#78350f" />
                      <circle cx="243.5" cy="168" r="1.2" fill="#78350f" />
                      <circle cx="203.5" cy="148" r="1.2" fill="#78350f" />
                      
                      {/* Wavy reflection lines on lake */}
                      <path d="M 120,95 Q 140,90 160,95 M 150,135 Q 170,130 190,135 M 90,120 Q 105,115 120,120" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.55" strokeLinecap="round" />
                      
                      <text x="145" y="112" textAnchor="middle" className="text-[8px] font-sans font-bold tracking-[0.2em] fill-sky-950/70 pointer-events-none uppercase">
                        Lakeside Sanctuary
                      </text>

                      {/* Central Park Area / Sanctuary Gardens */}
                      <rect
                        x="710"
                        y="330"
                        width="240"
                        height="210"
                        rx="12"
                        fill="url(#park-gradient)"
                        stroke="#bef264"
                        strokeWidth="1.2"
                      />
                      
                      {/* Winding walking trails */}
                      <path
                        d="M 725,350 Q 820,340 840,410 T 930,515"
                        fill="none"
                        stroke="#f5e0c3"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                      <path
                        d="M 725,350 Q 820,340 840,410 T 930,515"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                      />

                      {/* Volumetric Hedges / Trimmed Green Shrub Blocks */}
                      <rect x="735" y="465" width="40" height="8" rx="2" fill="#15803d" stroke="#166534" strokeWidth="0.8" filter="url(#shadow-plot-elevated)" />
                      <rect x="735" y="465" width="40" height="8" rx="2" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />
                      
                      <rect x="890" y="485" width="35" height="8" rx="2" fill="#15803d" stroke="#166534" strokeWidth="0.8" filter="url(#shadow-plot-elevated)" />
                      <rect x="890" y="485" width="35" height="8" rx="2" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />

                      {/* Volumetric Tiered Stone Fountain (Architectural Showcase) */}
                      {/* Fountain Basin shadow */}
                      <circle cx="830" cy="385" r="14" fill="#1c1a17" fillOpacity="0.08" filter="url(#shadow-plot-hover)" />
                      {/* Basin stone coping */}
                      <circle cx="830" cy="385" r="14" fill="#ece6dd" stroke="#bbb8b0" strokeWidth="0.8" />
                      {/* Basin water pool */}
                      <circle cx="830" cy="385" r="11.5" fill="url(#pool-gradient)" />
                      <circle cx="830" cy="385" r="11.5" fill="none" stroke="rgba(28,26,23,0.15)" strokeWidth="1" />
                      
                      {/* Inner tier (elevated stone pedestal) */}
                      <circle cx="828" cy="383" r="6.5" fill="#fcfbf8" stroke="#bbb8b0" strokeWidth="0.6" filter="url(#shadow-plot-elevated)" />
                      <circle cx="828" cy="383" r="5" fill="url(#pool-gradient)" />
                      
                      {/* Spouting jet center cap */}
                      <circle cx="828" cy="383" r="1.2" fill="#ffffff" />
                      {/* Spray mist rings */}
                      <circle cx="828" cy="383" r="8.5" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="1.5 1.5" opacity="0.75" />

                      {/* Landscape Trees (Stylized Volumetric Symbols) */}
                      {[
                        { cx: 750, cy: 375, r: 10, fill: "#a3e635", stroke: "#84cc16" },
                        { cx: 790, cy: 485, r: 8, fill: "#84cc16", stroke: "#65a30d" },
                        { cx: 890, cy: 370, r: 11, fill: "#65a30d", stroke: "#4d7c0f" },
                        { cx: 920, cy: 475, r: 9, fill: "#a3e635", stroke: "#84cc16" },
                        { cx: 860, cy: 445, r: 10, fill: "#84cc16", stroke: "#65a30d" }
                      ].map((tree, i) => (
                        <g key={`tree-${i}`} className="tree-sway">
                          {/* Tree trunk ground line */}
                          <line x1={tree.cx} y1={tree.cy} x2={tree.cx - 2} y2={tree.cy + 3} stroke="#78350f" strokeWidth="1" />
                          {/* Tree drop shadow */}
                          <circle cx={tree.cx + 2} cy={tree.cy + 3} r={tree.r} fill="#1c1a17" fillOpacity="0.08" />
                          {/* Main volumetric canopy */}
                          <circle cx={tree.cx} cy={tree.cy} r={tree.r} fill={tree.fill} stroke={tree.stroke} strokeWidth="0.8" />
                          {/* Highlighting circle */}
                          <circle cx={tree.cx - tree.r/3} cy={tree.cy - tree.r/3} r={tree.r/2.5} fill="#ffffff" fillOpacity="0.15" />
                          {/* Center core point */}
                          <circle cx={tree.cx} cy={tree.cy} r="1" fill="#4d7c0f" />
                        </g>
                      ))}

                      <text x="830" y="440" textAnchor="middle" className="text-[9px] font-display font-semibold tracking-[0.15em] fill-ink">
                        SANCTUARY GARDENS
                      </text>
                      <text x="830" y="452" textAnchor="middle" className="text-[6.5px] font-sans tracking-widest fill-bb-slate font-bold uppercase">
                        Wellness Trails
                      </text>

                      {/* Clubhouse Gated Compound */}
                      <rect
                        x="660"
                        y="50"
                        width="290"
                        height="100"
                        rx="12"
                        fill="#fdfcf9"
                        stroke="#d6c7b2"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                      />
                      
                      {/* Wooden Pool Deck Block Extrusion */}
                      {/* Deck bottom wall */}
                      <polygon points="805,135 935,135 933.5,133 803.5,133" fill="#cfbba0" />
                      {/* Deck right wall */}
                      <polygon points="935,65 935,135 933.5,133 933.5,63" fill="#cfbba0" />
                      {/* Deck top cap */}
                      <rect
                        x="803.5"
                        y="63"
                        width="130"
                        height="70"
                        rx="4"
                        fill="url(#wood-deck-upgraded)"
                        stroke="#c5a880"
                        strokeWidth="0.8"
                      />

                      {/* Pool (Recessed Effect) */}
                      <rect
                        x="815"
                        y="72"
                        width="110"
                        height="56"
                        rx="3"
                        fill="url(#pool-gradient)"
                        stroke="#38bdf8"
                        strokeWidth="0.8"
                        className="pool-shimmer-anim"
                      />
                      {/* Pool Inner Edge Shadow */}
                      <rect
                        x="815"
                        y="72"
                        width="110"
                        height="56"
                        rx="3"
                        fill="none"
                        stroke="rgba(28, 26, 23, 0.25)"
                        strokeWidth="1.2"
                      />
                      {/* Pool Entry Steps */}
                      <line x1="818" y1="76" x2="824" y2="76" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
                      <line x1="818" y1="80" x2="824" y2="80" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
                      <line x1="818" y1="84" x2="824" y2="84" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />

                      {/* Pool lanes lines */}
                      <line x1="828" y1="86" x2="912" y2="86" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                      <line x1="828" y1="100" x2="912" y2="100" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                      <line x1="828" y1="114" x2="912" y2="114" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />

                      {/* Loungers & Sun Umbrellas */}
                      <g opacity="0.85">
                        {/* Sunbed 1 */}
                        <rect x="840" y="66" width="4" height="8" rx="0.5" fill="#ffffff" stroke="#c5a880" strokeWidth="0.4" transform="rotate(-10 840 66)" />
                        <line x1="841" y1="67" x2="843" y2="72" stroke="#bae6fd" strokeWidth="2.4" />
                        {/* Umbrella 1 */}
                        <circle cx="835" cy="68" r="4" fill="#ffffff" stroke="#c5a880" strokeWidth="0.5" filter="url(#shadow-plot-elevated)" />
                        <circle cx="835" cy="68" r="0.6" fill="#78350f" />

                        {/* Sunbed 2 */}
                        <rect x="855" y="66" width="4" height="8" rx="0.5" fill="#ffffff" stroke="#c5a880" strokeWidth="0.4" transform="rotate(-10 855 66)" />
                        <line x1="856" y1="67" x2="858" y2="72" stroke="#bae6fd" strokeWidth="2.4" />
                        {/* Umbrella 2 */}
                        <circle cx="850" cy="68" r="4" fill="#ffffff" stroke="#c5a880" strokeWidth="0.5" filter="url(#shadow-plot-elevated)" />
                        <circle cx="850" cy="68" r="0.6" fill="#78350f" />
                      </g>

                      {/* Clubhouse Pavilion Building - Volumetric 3D Extrusion */}
                      {/* Pavilion bottom wall */}
                      <polygon points="675,140 795,140 788,130 668,130" fill="#bbb8b0" />
                      {/* Pavilion right wall */}
                      <polygon points="795,60 795,140 788,130 788,50" fill="#d2cec4" />
                      {/* Pavilion support pillars */}
                      <line x1="788" y1="130" x2="795" y2="140" stroke="#7c6e5e" strokeWidth="1" />
                      <line x1="788" y1="50" x2="795" y2="60" stroke="#7c6e5e" strokeWidth="1" />
                      
                      {/* Pavilion top cap */}
                      <rect
                        x="668"
                        y="50"
                        width="120"
                        height="80"
                        rx="4"
                        fill="#ffffff"
                        stroke="#c5a880"
                        strokeWidth="1"
                        filter="url(#shadow-building-deep)"
                      />
                      {/* Clubhouse architectural design details - Volumetric Window Panes */}
                      <rect x="678" y="60" width="100" height="40" rx="2" fill="rgba(186, 230, 253, 0.15)" stroke="rgba(14, 165, 233, 0.15)" strokeWidth="0.8" />
                      <line x1="711" y1="60" x2="711" y2="100" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="0.6" />
                      <line x1="744" y1="60" x2="744" y2="100" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="0.6" />
                      
                      <rect x="685" y="112" width="86" height="4" fill="#ff5a1f" opacity="0.08" />
                      <line x1="690" y1="112" x2="766" y2="112" stroke="#ece6dd" strokeWidth="1.5" />
                      
                      <text x="728" y="82" textAnchor="middle" className="text-[9px] font-display font-semibold tracking-[0.2em] fill-ink">
                        THE PAVILION
                      </text>
                      <text x="728" y="94" textAnchor="middle" className="text-[6px] font-sans tracking-wider fill-bb-slate font-bold uppercase">
                        Club &amp; Amenities
                      </text>

                      {/* Commercial Plaza (Retail Promenade) */}
                      <rect
                        x="60"
                        y="330"
                        width="180"
                        height="110"
                        rx="12"
                        fill="#FAF9F6"
                        stroke="#e3ddd3"
                        strokeWidth="1"
                      />
                      {/* Shop structures with shadows */}
                      <rect x="75" y="345" width="40" height="40" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" filter="url(#block-shadow)" />
                      <rect x="75" y="345" width="40" height="12" fill="url(#roof-hatch)" stroke="#e3ddd3" strokeWidth="0.8" />
                      
                      <rect x="125" y="345" width="50" height="30" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" filter="url(#block-shadow)" />
                      <rect x="125" y="345" width="50" height="10" fill="url(#roof-hatch)" stroke="#e3ddd3" strokeWidth="0.8" />
                      
                      <rect x="185" y="345" width="40" height="50" rx="4" fill="#ffffff" stroke="#e3ddd3" strokeWidth="0.8" filter="url(#block-shadow)" />
                      <rect x="185" y="345" width="40" height="15" fill="url(#roof-hatch)" stroke="#e3ddd3" strokeWidth="0.8" />
                      
                      <text x="150" y="415" textAnchor="middle" className="text-[8px] font-display font-semibold tracking-widest fill-bb-slate">
                        RETAIL PROMENADE
                      </text>
                    </>
                  )}

                  {/* Roads: Main Boulevard & Avenue division */}
                  <g className={viewMode === "drone" ? "opacity-45" : "opacity-100"} style={{ transition: "opacity 0.5s ease" }}>
                    {/* Horizontal Main Boulevard Road Bed */}
                    <rect 
                      x="0" 
                      y="284" 
                      width="1000" 
                      height="32" 
                      fill={viewMode === "drone" ? "rgba(255, 255, 255, 0.15)" : "url(#paving-pattern)"} 
                      stroke={viewMode === "drone" ? "rgba(255, 255, 255, 0.3)" : "none"} 
                      strokeWidth="0.5"
                    />
                    
                    {/* Horizontal Sidewalk Curbs (Raised concrete lines) */}
                    {viewMode !== "drone" && (
                      <>
                        <rect x="0" y="281" width="1000" height="3" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <line x1="0" y1="284" x2="1000" y2="284" stroke="#c8c6c0" strokeWidth="1" />
                        {/* Bottom Curb */}
                        <rect x="0" y="316" width="1000" height="3" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <line x1="0" y1="316" x2="1000" y2="316" stroke="#c8c6c0" strokeWidth="1" />
                        
                        {/* Central white divider line */}
                        <line x1="0" y1="300" x2="1000" y2="300" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="8 6" opacity="0.8" />
                      </>
                    )}

                    {/* Vertical North Avenue Road Bed */}
                    <rect 
                      x="488" 
                      y="50" 
                      width="24" 
                      height="231" 
                      fill={viewMode === "drone" ? "rgba(255, 255, 255, 0.15)" : "url(#paving-pattern)"} 
                      stroke={viewMode === "drone" ? "rgba(255, 255, 255, 0.3)" : "none"} 
                      strokeWidth="0.5"
                    />
                    {/* North Avenue Curbs */}
                    {viewMode !== "drone" && (
                      <>
                        <rect x="485" y="50" width="3" height="231" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <rect x="512" y="50" width="3" height="231" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <line x1="500" y1="50" x2="500" y2="281" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 5" opacity="0.8" />
                      </>
                    )}

                    {/* Vertical South Avenue Road Bed */}
                    <rect 
                      x="488" 
                      y="319" 
                      width="24" 
                      height="231" 
                      fill={viewMode === "drone" ? "rgba(255, 255, 255, 0.15)" : "url(#paving-pattern)"} 
                      stroke={viewMode === "drone" ? "rgba(255, 255, 255, 0.3)" : "none"} 
                      strokeWidth="0.5"
                    />
                    {/* South Avenue Curbs */}
                    {viewMode !== "drone" && (
                      <>
                        <rect x="485" y="319" width="3" height="231" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <rect x="512" y="319" width="3" height="231" fill="#ece6dd" stroke="#e0d9ce" strokeWidth="0.5" />
                        <line x1="500" y1="319" x2="500" y2="550" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 5" opacity="0.8" />
                        
                        {/* Volumetric Crosswalks at Intersection */}
                        <g fill="#ffffff" opacity="0.75">
                          {/* Left approach */}
                          <rect x="464" y="287" width="4" height="26" />
                          <rect x="470" y="287" width="4" height="26" />
                          <rect x="476" y="287" width="4" height="26" />
                          <rect x="482" y="287" width="4" height="26" />
                          {/* Right approach */}
                          <rect x="514" y="287" width="4" height="26" />
                          <rect x="520" y="287" width="4" height="26" />
                          <rect x="526" y="287" width="4" height="26" />
                          <rect x="532" y="287" width="4" height="26" />
                        </g>

                        {/* Road Label Text (Luxury Minimalist) */}
                        <text x="240" y="303" textAnchor="middle" className="text-[7px] font-sans font-bold tracking-[0.25em] fill-[#bca07e] uppercase opacity-85">
                          Oasis Boulevard
                        </text>
                        <text x="750" y="303" textAnchor="middle" className="text-[7px] font-sans font-bold tracking-[0.25em] fill-[#bca07e] uppercase opacity-85">
                          Oasis Boulevard
                        </text>
                        <text x="502" y="160" textAnchor="middle" transform="rotate(-90 502 160)" className="text-[7px] font-sans font-bold tracking-[0.25em] fill-[#bca07e] uppercase opacity-85">
                          North Avenue
                        </text>
                        <text x="502" y="440" textAnchor="middle" transform="rotate(-90 502 440)" className="text-[7px] font-sans font-bold tracking-[0.25em] fill-[#bca07e] uppercase opacity-85">
                          South Avenue
                        </text>

                        {/* Sidewalk trees lining the main boulevard (Upgraded volumetric trees) */}
                        {[80, 180, 280, 380, 600, 700, 800, 900].map((cx, i) => (
                          <g key={`road-tree-${i}`} className="tree-sway">
                            {/* Top Side Trees */}
                            <circle cx={cx + 1} cy={273} r="3.5" fill="#1c1a17" fillOpacity="0.06" />
                            <circle cx={cx} cy={271} r="3.5" fill="#a3e635" stroke="#84cc16" strokeWidth="0.5" />
                            <circle cx={cx - 1} cy={270} r="1.5" fill="#d9f99d" opacity="0.6" />
                            <circle cx={cx} cy={271} r="0.6" fill="#4d7c0f" />

                            {/* Bottom Side Trees */}
                            <circle cx={cx + 1} cy={329} r="3.5" fill="#1c1a17" fillOpacity="0.06" />
                            <circle cx={cx} cy={327} r="3.5" fill="#a3e635" stroke="#84cc16" strokeWidth="0.5" />
                            <circle cx={cx - 1} cy={326} r="1.5" fill="#d9f99d" opacity="0.6" />
                            <circle cx={cx} cy={327} r="0.6" fill="#4d7c0f" />
                          </g>
                        ))}
                      </>
                    )}
                  </g>

                  {/* Plot Boundaries - Volumetric 3D Model Blocks */}
                  {plots.map((plot, index) => renderExtrudedPlot(plot, index))}

                  {/* Floating SVG tooltip marker overlay - connecting tag to selected plot (Disabled during Drone View) */}
                  <AnimatePresence>
                    {currentPlot && !dronePlotId && (() => {
                      const height = 8.5;
                      const dx = -height * 0.7;
                      const dy = -height;
                      const ecx = currentPlot.cx + dx;
                      const ecy = currentPlot.cy + dy;
                      return (
                        <motion.g
                          key={`tag-${currentPlot.id}`}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pointer-events-none hidden sm:block"
                        >
                          <line
                            x1={ecx}
                            y1={ecy}
                            x2={ecx}
                            y2={ecy - 35}
                            stroke="#ff5a1f"
                            strokeWidth="1.5"
                            strokeDasharray="2 2"
                          />
                          <circle cx={ecx} cy={ecy} r="3" fill="#ff5a1f" />
                          <rect
                            x={ecx - 65}
                            y={ecy - 60}
                            width="130"
                            height="26"
                            rx="13"
                            fill="#ffffff"
                            stroke="#ff5a1f"
                            strokeWidth="1"
                            className="shadow-sm"
                          />
                          <text x={ecx} y={ecy - 44} textAnchor="middle" className="text-[10px] font-bold fill-ink font-sans">
                            {currentPlot.id} • {currentPlot.area}
                          </text>
                        </motion.g>
                      );
                    })()}
                  </AnimatePresence>
                </g>
              </svg>

              {/* Floating dynamic plot details sales card (Fixed Bottom Right) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlot.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="hidden md:block absolute bottom-6 right-6 w-60 glass-card rounded-xl p-4 border border-line/50 z-20 text-left pointer-events-auto shadow-luxury-deep"
                >
                  {/* Card Header */}
                  <div className="flex flex-col gap-0.5 border-b border-line/60 pb-2.5 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display font-semibold text-ink leading-tight">{currentPlot.id}</span>
                      <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        currentPlot.status === "available" 
                          ? "bg-bb-sand/36 text-bb-orange" 
                          : currentPlot.status === "reserved"
                          ? "bg-bb-hold/9 text-bb-hold"
                          : "bg-bb-stone/70 text-bb-slate"
                      }`}>
                        {currentPlot.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-bb-slate uppercase tracking-wider mt-0.5">Residential Plot</span>
                  </div>

                  {/* Price Row */}
                  <div className="flex justify-between items-center py-2 border-b border-line/40 mb-3 text-xs">
                    <span className="text-bb-slate font-bold uppercase tracking-wider text-[9px]">Price</span>
                    <span className="font-semibold text-ink font-mono">Price on Request</span>
                  </div>

                  {/* Lot Metadata Specifications */}
                  <div className="space-y-2 text-xs text-bb-slate">
                    <div className="flex justify-between">
                      <span className="text-bb-slate">Area:</span>
                      <span className="font-semibold text-ink">{currentPlot.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bb-slate">Facing:</span>
                      <span className="font-semibold text-ink">{currentPlot.facing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bb-slate">Dimensions:</span>
                      <span className="font-semibold text-ink">{currentPlot.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bb-slate">Road Width:</span>
                      <span className="font-semibold text-ink">{currentPlot.roadWidth}</span>
                    </div>

                    {/* Actions Process: Drone View toggle & Add to Compare */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-line/40">
                      <button
                        onClick={() => setToastMessage(`Drone view for ${currentPlot.id} is coming soon.`)}
                        className="w-full py-2.5 rounded text-[9px] font-bold tracking-wider uppercase border border-line bg-white hover:bg-bb-paper text-bb-slate transition-colors"
                      >
                        Drone View
                      </button>

                      <button
                        onClick={() => setToastMessage(`Added ${currentPlot.id} to comparison list.`)}
                        className="w-full py-2.5 bg-ink hover:bg-ink/90 text-white rounded text-[9px] font-bold tracking-wider uppercase transition-colors"
                      >
                        Add To Compare
                      </button>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Subtle Compass Needle HUD */}
              {viewMode === "drone" && (
                <div className="absolute top-20 left-6 z-20 hidden sm:flex flex-col items-center gap-1.5 p-2 rounded-lg bg-ink/85 backdrop-blur-sm border border-white/10 shadow-lg pointer-events-none text-white">
                  <svg className="w-8 h-8" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <text x="50" y="24" textAnchor="middle" fill="#ffffff" className="text-[12px] font-mono font-bold">N</text>
                    <text x="50" y="84" textAnchor="middle" fill="rgba(255,255,255,0.3)" className="text-[10px] font-mono">S</text>
                    <g style={{ transform: "rotate(35deg)", transformOrigin: "50px 50px" }}>
                      <polygon points="50,18 55,50 50,46" fill="#ff5a1f" />
                      <polygon points="50,82 55,50 50,46" fill="rgba(255,255,255,0.4)" />
                      <polygon points="50,18 45,50 50,46" fill="#ff3e00" />
                      <polygon points="50,82 45,50 50,46" fill="rgba(255,255,255,0.2)" />
                    </g>
                    <circle cx="50" cy="50" r="3" fill="#ffffff" />
                  </svg>
                  <span className="text-[7px] font-mono tracking-widest text-bb-slate">BEARING: 35° N</span>
                </div>
              )}

              {/* Drag to Explore Reality Indicator */}
              {viewMode === "drone" && (
                <div className="absolute bottom-6 right-65 z-20 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink/85 backdrop-blur-sm text-white text-[8px] font-bold tracking-widest uppercase border border-white/10 shadow-lg pointer-events-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-orange animate-pulse" />
                  <span>Drag Divider to Compare with Blueprint</span>
                </div>
              )}

              {/* Plot Specific Drone view overlays */}
              {viewMode === "drone" && dronePlotId && (
                <div className="absolute inset-0 pointer-events-none z-30">
                  <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-white/40" />
                  <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-white/40" />
                  <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-white/40" />
                  <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-white/40" />
                  
                  {/* Drone aerial label */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4.5 py-2.5 rounded-lg bg-ink/85 backdrop-blur-sm text-white text-[9px] font-sans tracking-[0.2em] uppercase flex items-center gap-2 shadow border border-white/10 pointer-events-auto">
                    <Compass className="w-3.5 h-3.5 text-bb-orange animate-spin-slow" />
                    <span>Plot {dronePlotId} Site Inspection Mode</span>
                    <span className="text-[7.5px] text-bb-slate font-mono tracking-normal normal-case ml-1 border-l border-white/20 pl-2">
                      Real site capture placeholder
                    </span>
                    <button 
                      onClick={() => {
                        setDronePlotId(null);
                        setViewMode("3d");
                      }}
                      className="ml-2.5 p-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* OVERLAY: LEFT SIDE - Engineering Subdivision Blueprint Draft */}
            <div
              className="absolute inset-0 w-full h-full bg-[#f4f2ed] border-r border-ink/15"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                ...{ transition: transitionStyle }
              }}
            >
              {/* Engineering Title Stamp */}
              <div className="absolute top-6 left-6 flex flex-col gap-1.5 text-[9px] text-bb-slate font-mono uppercase tracking-widest pointer-events-none">
                <span className="font-bold text-bb-slate">SUBDIVISION MAP SYSTEM</span>
                <span>SHEET: SEC-C / SITE PLAN</span>
                <span>REVISION v2.0 • 12/04/2004</span>
              </div>

              {/* Title Block Box (Engineering Drafting Stamp) */}
              <div className="absolute bottom-6 left-6 z-10 p-4 border border-ink/15 font-mono text-[9px] text-bb-slate leading-relaxed bg-[#f4f2ed]/90 max-w-55 pointer-events-none">
                <p className="font-bold text-bb-slate border-b border-ink/15 pb-1.5 mb-1.5 uppercase tracking-wide">Technical Boundary Draft</p>
                <p>SCALE: 1 INCH = 40 FEET</p>
                <p>TOTAL UNITS: 16 SUBDIVISIONS</p>
                <p>SURVEYOR: BRICKBYTES ASSOC</p>
                <p className="text-red-700/60 font-semibold mt-1">STATUS: STATIC CAD SHEET</p>
              </div>

              {/* SVG Plots Map - Flat Monochrome Draft Layout */}
              <svg className="w-full h-full px-6 py-10 opacity-70" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                
                <defs>
                  {/* Diagonal line hatch representing natural reserve/lake */}
                  <pattern id="diagonal-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#9aa0a8" strokeWidth="0.8" />
                  </pattern>
                  {/* Grid hatch representing retail zone */}
                  <pattern id="grid-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#9aa0a8" strokeWidth="0.8" />
                  </pattern>
                  {/* Drafting layout grid */}
                  <pattern id="draft-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Drafting Grid */}
                <rect width="1000" height="600" fill="url(#draft-grid)" />
                
                {/* ZOOMABLE CONTAINER ON BLUEPRINT (Mirrors the right side zoom for alignment) */}
                <g
                  style={{
                    transform: zoomTransform,
                    transformOrigin: "0px 0px",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  {/* Boundary drafting layout guide lines */}
                  <line x1="0" y1="110" x2="1000" y2="110" stroke="#e0d9ce" strokeWidth="0.8" />
                  <line x1="0" y1="440" x2="1000" y2="440" stroke="#e0d9ce" strokeWidth="0.8" />
                  <line x1="260" y1="0" x2="260" y2="600" stroke="#e0d9ce" strokeWidth="0.8" />
                  <line x1="730" y1="0" x2="730" y2="600" stroke="#e0d9ce" strokeWidth="0.8" />

                  {/* Flat monochrome Winding Lake Boundary */}
                  <path
                    d="M 50,110 C 60,60 160,40 230,80 C 290,110 320,150 240,180 C 160,200 60,180 50,110 Z"
                    fill="url(#diagonal-hatch)"
                    stroke="#9aa0a8"
                    strokeWidth="1"
                  />
                  <text x="150" y="125" textAnchor="middle" className="text-[8px] font-mono tracking-wider fill-bb-slate pointer-events-none">
                    NATURAL RESERVE RESERVOIR
                  </text>

                  {/* Central Park Outline */}
                  <rect
                    x="710"
                    y="330"
                    width="240"
                    height="210"
                    rx="0"
                    fill="none"
                    stroke="#9aa0a8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text x="830" y="440" textAnchor="middle" className="text-[8px] font-mono tracking-wider fill-bb-slate pointer-events-none">
                    RECREATIONAL LAND [SEC-B]
                  </text>

                  {/* Clubhouse Compound Outline */}
                  <rect
                    x="660"
                    y="60"
                    width="290"
                    height="90"
                    fill="none"
                    stroke="#9aa0a8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <rect
                    x="675"
                    y="70"
                    width="120"
                    height="70"
                    fill="none"
                    stroke="#9aa0a8"
                    strokeWidth="1"
                  />
                  <text x="735" y="110" textAnchor="middle" className="text-[8px] font-mono tracking-widest fill-bb-slate pointer-events-none">
                    CLUBHOUSE BOUNDARY
                  </text>
                  <rect
                    x="815"
                    y="75"
                    width="120"
                    height="60"
                    fill="none"
                    stroke="#9aa0a8"
                    strokeWidth="1"
                  />
                  <text x="875" y="110" textAnchor="middle" className="text-[8px] font-mono tracking-wider fill-bb-slate pointer-events-none">
                    RETENTION POOL
                  </text>

                  {/* Commercial Plaza Blueprint Outline */}
                  <rect
                    x="60"
                    y="330"
                    width="180"
                    height="110"
                    fill="url(#grid-hatch)"
                    stroke="#9aa0a8"
                  />
                  <text x="150" y="390" textAnchor="middle" className="text-[8px] font-mono tracking-wider fill-bb-slate bg-white px-1 pointer-events-none">
                    RETAIL RESERVE ZONE A
                  </text>

                  {/* Flat roads outline */}
                  {/* Horizontal Boulevard */}
                  <line x1="0" y1="284" x2="1000" y2="284" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="0" y1="316" x2="1000" y2="316" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="0" y1="300" x2="1000" y2="300" stroke="#9aa0a8" strokeWidth="0.8" strokeDasharray="6 6" />

                  {/* Vertical North Avenue */}
                  <line x1="488" y1="50" x2="488" y2="284" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="512" y1="50" x2="512" y2="284" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="500" y1="50" x2="500" y2="284" stroke="#9aa0a8" strokeWidth="0.8" strokeDasharray="5 5" />

                  {/* Vertical South Avenue */}
                  <line x1="488" y1="316" x2="488" y2="550" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="512" y1="316" x2="512" y2="550" stroke="#9aa0a8" strokeWidth="0.8" />
                  <line x1="500" y1="316" x2="500" y2="550" stroke="#9aa0a8" strokeWidth="0.8" strokeDasharray="5 5" />

                  {/* Dashed blueprint subdivision plots */}
                  {plots.map((plot) => (
                    <g key={`blueprint-${plot.id}`}>
                      <path
                        d={plot.path}
                        fill="none"
                        stroke="#8f8e87"
                        strokeWidth="1"
                        strokeDasharray="3 2"
                      />
                      <text
                        x={plot.cx}
                        y={plot.cy - 10}
                        textAnchor="middle"
                        fill="#8f8e87"
                        className="text-[8px] font-mono font-medium"
                      >
                        {plot.id}
                      </text>
                      <text
                        x={plot.cx}
                        y={plot.cy + 10}
                        textAnchor="middle"
                        fill="#b5b3ad"
                        className="text-[6.5px] font-mono font-light"
                      >
                        {plot.area.replace(" Sq. Yds.", " SY")}
                      </text>
                      
                      {/* Architectural dimension labels on selected edges */}
                      <line x1={plot.cx - 15} y1={plot.cy + 20} x2={plot.cx + 15} y2={plot.cy + 20} stroke="#b5b3ad" strokeWidth="0.6" />
                      <text x={plot.cx} y={plot.cy + 26} textAnchor="middle" fill="#b5b3ad" className="text-[6px] font-mono">110.00&apos;</text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>

          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-bb-orange z-30 cursor-ew-resize"
            style={{
              left: `${sliderPosition}%`,
              ...{ transition: transitionStyle }
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-bb-orange text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,94,19,0.35)] border-2 border-white hover:scale-105 active:scale-95 transition-transform">
              <span className="text-base font-bold font-mono select-none">↔</span>
            </div>
            
            {/* Sliding Hint Label */}
            <AnimatePresence>
              {isIntroAnimating && (
                <motion.div
                  initial={{ opacity: 0, y: -20, x: "-50%" }}
                  animate={{ opacity: 1, y: -48 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 whitespace-nowrap bg-ink text-white text-[9px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md shadow-md border border-white/10"
                >
                  ← Drag to Reveal →
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Layout Accessories (Details Only) */}
        <div className="w-full max-w-275 mt-6 md:hidden px-2 flex flex-col gap-4 text-left pointer-events-auto">

          {/* Mobile Plot Details Card */}
          <div className="w-full bg-white border border-line/80 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col gap-0.5 border-b border-line/70 pb-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-display font-semibold text-ink">{currentPlot.id}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  currentPlot.status === "available" 
                    ? "bg-bb-sand/36 text-bb-orange" 
                    : currentPlot.status === "reserved"
                    ? "bg-bb-hold/9 text-bb-hold"
                    : "bg-bb-stone/70 text-bb-slate"
                }`}>
                  {currentPlot.status}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-bb-slate uppercase tracking-wider mt-0.5">Residential Plot</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-line/70 mb-3 text-xs">
              <span className="text-bb-slate font-bold uppercase tracking-wider text-[9px]">Price</span>
              <span className="font-semibold text-ink font-mono">Price on Request</span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-bb-slate mb-4">
              <div className="flex justify-between border-b border-line/50 pb-1.5">
                <span className="text-bb-slate">Area:</span>
                <span className="font-semibold text-ink">{currentPlot.area}</span>
              </div>
              <div className="flex justify-between border-b border-line/50 pb-1.5">
                <span className="text-bb-slate">Road Width:</span>
                <span className="font-semibold text-ink">{currentPlot.roadWidth}</span>
              </div>
              <div className="flex justify-between border-b border-line/50 pb-1.5">
                <span className="text-bb-slate">Facing:</span>
                <span className="font-semibold text-ink">{currentPlot.facing}</span>
              </div>
              <div className="flex justify-between border-b border-line/50 pb-1.5">
                <span className="text-bb-slate">Dimensions:</span>
                <span className="font-semibold text-ink">{currentPlot.dimensions}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1 pt-3 border-t border-line/70">
              <button
                onClick={() => setToastMessage(`Drone view for ${currentPlot.id} is coming soon.`)}
                className="w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase border border-line bg-white text-bb-slate hover:bg-bb-paper transition-colors"
              >
                Drone View
              </button>

              <button
                onClick={() => setToastMessage(`Added ${currentPlot.id} to comparison list.`)}
                className="w-full py-2.5 bg-ink hover:bg-ink/90 text-white rounded-lg text-xs font-bold tracking-wider uppercase transition-colors"
              >
                Add To Compare
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
