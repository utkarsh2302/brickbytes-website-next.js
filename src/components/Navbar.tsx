"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
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
        <div id="mobile-menu" className="border-t border-line bg-bb-paper lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block py-3 text-lg font-medium ${isActive ? "text-ink" : "text-bb-slate"}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-bb-orange py-3.5 font-semibold text-ink"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
