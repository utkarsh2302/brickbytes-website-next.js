"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SALES_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Technology", href: "/technology" },
      { name: "How it works", href: "/how-it-works" },
      { name: "3D plot viewer", href: "/3d-plot-viewer" },
      { name: "Plot booking", href: "/plot-booking-software" },
      { name: "Plot inventory", href: "/plot-inventory-management-software" },
      { name: "Broker portal", href: "/broker-portal" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Plotted developments", href: "/plotted-developments" },
      { name: "Villa communities", href: "/villa-communities" },
      { name: "Apartment projects", href: "/apartment-projects" },
      { name: "Jaipur", href: "/jaipur" },
    ],
  },
  {
    title: "Guides",
    links: [
      { name: "Interactive map vs PDF", href: "/interactive-plot-map-vs-pdf" },
      { name: "Layout plan to interactive map", href: "/layout-plan-to-interactive-map" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy policy", href: "/privacy" },
      { name: "Terms of service", href: "/terms" },
    ],
  },
];

const linkClass = "text-sm text-bb-slate transition-colors hover:text-ink";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-line bg-bb-paper py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8 lg:grid-cols-7">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex w-fit items-center">
              <Image src="/logo.svg" alt="BrickBytes" width={130} height={28} className="h-7 w-auto" />
            </Link>
            <div className="flex flex-col gap-2">
              <p className="font-display text-base font-semibold text-ink">Technology that holds.</p>
              <p className="max-w-xs text-sm leading-relaxed text-bb-slate">
                Live, interactive plot maps for real estate developers and their brokers.
              </p>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title}`} className="flex flex-col gap-4">
              <p id={`footer-${column.title}`} className="text-sm font-semibold text-ink">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-ink">Get in touch</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp <span className="block whitespace-nowrap font-mono">{SALES_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href="mailto:business@brickbytes.in" className={linkClass}>
                  business@brickbytes.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-sm text-bb-slate sm:flex-row sm:flex-wrap sm:gap-x-8">
          <span className="font-medium text-ink">BrickNova Technologies Private Limited</span>
          <span>Jaipur, Rajasthan, India</span>
          <span>
            CIN <span className="font-mono">U62011RJ2026PTC113544</span>
          </span>
          <span>
            GSTIN <span className="font-mono">08AAOCB6672J1Z2</span>
          </span>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-bb-slate">
            &copy; 2026 BrickBytes, a venture by BrickNova Technologies. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
