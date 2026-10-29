"use client";

import React from "react";
import { ArrowUp, Mail, MapPin, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import InteractiveGrid from "./InteractiveGrid";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/contact";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-bb-paper text-ink py-16 sm:py-20 border-t border-line/80 z-20">
      <InteractiveGrid opacity={0.3} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 flex flex-col gap-6 text-left">
            <Link href="/" className="flex items-center group cursor-pointer">
              <Image
                src="/logo.svg"
                alt="BrickBytes Logo"
                width={130}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>

            <div className="flex flex-col gap-2">
              <p className="font-display font-semibold text-base text-ink">Technology that holds.</p>
              <p className="max-w-xs text-sm leading-relaxed text-bb-slate">
                Live, interactive plot maps for real estate developers and their brokers.
              </p>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="col-span-1 flex flex-col gap-4 text-left">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: "Technology", href: "/technology" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Solutions", href: "/#use-cases" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-bb-slate hover:text-bb-orange font-sans font-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-bb-slate hover:text-bb-orange font-sans font-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-bb-slate hover:text-bb-orange font-sans font-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="col-span-1 flex flex-col gap-4 text-left">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm text-bb-slate hover:text-bb-available font-sans font-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-bb-available shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:business@brickbytes.in"
                  className="flex items-center gap-2 text-xs sm:text-sm text-bb-slate hover:text-bb-orange font-sans font-light transition-colors"
                >
                  <Mail className="w-4 h-4 text-bb-orange shrink-0" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-xs sm:text-sm text-bb-slate hover:text-bb-orange font-sans font-light transition-colors"
                >
                  <Calendar className="w-4 h-4 text-bb-orange shrink-0" />
                  <span>Book Demo</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Company Information Strip */}
        <div className="border-t border-line/80 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 text-left">
            <div className="text-xs text-bb-slate font-sans font-light">
              <span className="font-medium text-bb-slate">BrickNova Technologies Private Limited</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="flex items-center gap-1.5 text-xs text-bb-slate font-sans font-light">
                <MapPin className="w-3 h-3 text-bb-orange shrink-0" />
                Jaipur, Rajasthan, India
              </span>
              <span className="text-xs text-bb-slate font-mono font-light">
                CIN: U62011RJ2026PTC113544
              </span>
              <span className="text-xs text-bb-slate font-mono font-light">
                GSTIN: 08AAOCB6672J1Z2
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-line/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bb-slate font-sans font-light">
            &copy; 2026 BrickBytes. A Venture by BrickNova Technologies. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-line hover:border-bb-orange hover:text-bb-orange bg-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
