"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SALES_PHONE, SALES_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { buttonPrimary, buttonSecondary } from "./ui/button";

const navItems = [
  { name: "Custom software", href: "/custom-real-estate-software" },
  { name: "Technology", href: "/technology" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Solutions", href: "/#use-cases" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // While the menu is open the page behind it must not scroll. Escape, or
  // widening the window to the desktop layout, closes it.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    root.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  // A link to a section of the current page (Solutions on the homepage) does
  // not change the pathname, so every menu link closes the menu itself.
  const closeMenu = () => setIsOpen(false);

  const solid = scrolled || isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-line bg-bb-paper" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="BrickBytes" width={148} height={32} className="h-8 w-auto" priority />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors hover:text-ink ${
                    isActive ? "text-ink" : "text-bb-slate"
                  }`}
                >
                  {item.name}
                  {isActive && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-bb-orange" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden items-center gap-1.5 rounded-full bg-bb-orange px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-bb-kiln focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:inline-flex"
        >
          Book a demo
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto overscroll-contain border-t border-line bg-bb-paper motion-safe:animate-[fade-up_300ms_cubic-bezier(0.16,1,0.3,1)] lg:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
            <ul className="divide-y divide-line">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className="flex min-h-14 items-center justify-between py-3 font-display text-2xl font-semibold text-ink"
                    >
                      {item.name}
                      {isActive ? (
                        <span aria-hidden className="h-2 w-2 rounded-full bg-bb-orange" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-bb-slate" aria-hidden />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto grid gap-3 pt-8">
              <Link href="/contact" onClick={closeMenu} className={buttonPrimary}>
                Book a demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                <MessageCircle className="h-4 w-4" aria-hidden />
                Message us on WhatsApp
              </a>
              <p className="pt-1 text-center text-sm text-bb-slate">
                Or call{" "}
                <a href={`tel:${SALES_PHONE}`} className="font-mono text-ink underline-offset-4 hover:underline">
                  {SALES_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
