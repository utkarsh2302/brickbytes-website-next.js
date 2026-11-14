import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";
import { buttonPrimary, buttonSecondary } from "./ui/button";

// The glass-system sheet and construction circle from /brand/glass-shapes.svg,
// inlined so the decoration can never be the page's LCP element. The orange
// pin from that artwork is left out: the 3D model's pin and orange plot take
// its place, and two oranges side by side competed.
function GlassShapes() {
  return (
    <svg viewBox="0 0 600 600" className="relative h-auto w-full">
      <circle cx="380" cy="380" r="232" fill="none" stroke="#1c1a17" strokeOpacity="0.16" strokeDasharray="4 6" />
      <path d="M40 60H360A150 150 0 0 1 360 360H40Z" fill="#e6d3bc" />
      <path d="M372 380h16M380 372v16" stroke="#1c1a17" strokeOpacity="0.25" />
    </svg>
  );
}

// Homepage hero: the brand statement, then the product itself, the site plan
// as a live 3D model, over flat glass-system shapes cropped off the edge (p. 20).
export default function BrandHero() {
  return (
    <section className="relative overflow-hidden bg-bb-paper pb-12 pt-24 sm:pb-20 sm:pt-36">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:gap-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[88px]">
            Every plot, <span className="block">in plain sight.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-bb-slate sm:mt-8 sm:text-xl sm:leading-relaxed">
            BrickBytes builds custom software for real estate developers, from bookings, payments and broker commissions
            to a live, interactive plot map that buyers and brokers explore in any browser.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:flex">
            <Link href="/contact" className={`${buttonPrimary} py-4 max-sm:px-3`}>
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="#live-map" className={`${buttonSecondary} py-4 max-sm:px-3`}>
              Try the live map
            </a>
          </div>

          <p className="mt-7 hidden text-sm text-bb-slate sm:block">
            For plotted developments, villa communities and apartment projects.{" "}
            <Link
              href="/custom-real-estate-software"
              className="font-semibold text-ink underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              See everything we build
            </Link>
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-4 w-[560px] max-w-none sm:-right-56 sm:-top-36 sm:w-[680px]">
            <div className="bg-grid-pattern absolute -inset-20 [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <GlassShapes />
          </div>
          <div className="relative lg:-mr-10 xl:-mr-20">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
