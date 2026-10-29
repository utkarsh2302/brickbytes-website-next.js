"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { name: "Our Technology", href: "/technology" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Solutions", href: "/#use-cases" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 mt-4 transition-all duration-300 ${
          scrolled ? "max-w-5xl" : "max-w-7xl"
        }`}
      >
        <nav
          className={`flex items-center justify-between py-3 px-6 rounded-2xl transition-all duration-300 border ${
            scrolled
              ? "bg-[#fbfbfa]/75 backdrop-blur-xl border-[#1c1a17]/8 shadow-[0_10px_35px_-10px_rgba(28,26,23,0.08)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <Image
              src="/logo.svg"
              alt="BrickBytes Logo"
              width={148}
              height={32}
              className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-[#1c1a17] ${
                    isActive ? "text-brick-orange" : "text-zinc-600"
                  }`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="relative z-10">{item.name}</span>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 bg-[#1c1a17]/5 rounded-lg border border-[#1c1a17]/3"
                      layoutId="navbar-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brick-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions / CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brick-orange hover:bg-brick-orange/95 text-sm font-medium text-white transition-all duration-300 shadow-sm shadow-brick-orange/10 hover:shadow-brick-orange/25 group"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 rounded-xl text-zinc-600 hover:text-[#1c1a17] hover:bg-black/5 transition-colors border border-transparent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-black/5 bg-[#fbfbfa]/95 backdrop-blur-xl absolute top-full left-0 right-0 w-full overflow-hidden shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.name}
                    >
                      <Link
                        href={item.href}
                        className={`text-lg font-medium transition-colors ${
                          isActive ? "text-brick-orange" : "text-zinc-600 hover:text-[#1c1a17]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="h-px bg-zinc-200 w-full" />
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brick-orange text-white font-medium hover:bg-brick-orange/95 transition-colors shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
