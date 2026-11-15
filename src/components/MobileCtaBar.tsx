"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { buttonPrimary } from "./ui/button";

// Phones only: once the visitor scrolls past the opening screen, a slim bar at
// the bottom keeps "Book a demo" and WhatsApp within thumb reach. It steps
// aside near the closing call to action and the footer, which offer the same
// two actions, and never shows on /contact, which is the form itself.
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [pastOpening, setPastOpening] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const update = () => setPastOpening(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const endSections = [document.getElementById("contact"), document.querySelector("footer")].filter(
      (element): element is HTMLElement => element !== null,
    );
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setNearEnd(onScreen.size > 0);
    });
    endSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/contact") return null;
  const shown = pastOpening && !nearEnd;

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bb-paper px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgb(28_26_23/0.18)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <Link href="/contact" className={`${buttonPrimary} flex-1`}>
          Book a demo
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
