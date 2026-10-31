import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon from "./BrandIcon";
import HeroProductShot from "./HeroProductShot";
import { buttonPrimary, buttonSecondary } from "./ui/button";

const facts = [
  {
    icon: "pin",
    title: "A live map of your project",
    body: "Your layout plan becomes an interactive 3D map that buyers open in any browser.",
  },
  {
    icon: "layout",
    title: "Real-time availability",
    body: "Mark plots available, reserved or sold. Buyers and brokers see the change at once.",
  },
  {
    icon: "home",
    title: "A portal for your brokers",
    body: "Brokers share plots, log site visits and track their own leads in one place.",
  },
] as const;

// The glass-system shapes from /brand/glass-shapes.svg, inlined. As an <img>
// this decoration was the page's Largest Contentful Paint element; an inline
// SVG never is, so LCP measures the headline instead.
function GlassShapes() {
  const plot = "M40 60H360A150 150 0 0 1 360 360H40Z";
  const pin = "M210 380A170 170 0 1 1 380 550H210Z";
  return (
    <svg viewBox="0 0 600 600" className="relative h-auto w-full">
      <defs>
        <clipPath id="hero-glass-plot">
          <path d={plot} />
        </clipPath>
      </defs>
      <circle cx="380" cy="380" r="232" fill="none" stroke="#1c1a17" strokeOpacity="0.16" strokeDasharray="4 6" />
      <path d={plot} fill="#e6d3bc" />
      <path d={pin} fill="#ff5a1f" />
      <path d={pin} fill="#e2531c" clipPath="url(#hero-glass-plot)" />
      <path d="M372 380h16M380 372v16" stroke="#1c1a17" strokeOpacity="0.25" />
    </svg>
  );
}

// Homepage hero: the brand statement, then the product itself (laptop + phone,
// Guidelines p. 26) over flat glass-system shapes cropped off the edge (p. 20).
export default function BrandHero() {
  return (
    <section className="relative overflow-hidden bg-bb-paper pt-28 sm:pt-36">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[88px]">
            Every plot, <span className="block">in plain sight.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-bb-slate sm:text-xl sm:leading-relaxed">
            BrickBytes builds custom software for real estate developers, from bookings, payments and broker commissions
            to a live, interactive plot map that buyers and brokers explore in any browser.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={`${buttonPrimary} py-4`}>
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="#live-map" className={`${buttonSecondary} py-4`}>
              Try the live map
            </a>
          </div>

          <p className="mt-7 text-sm text-bb-slate">
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
          <HeroProductShot />
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 pb-20 sm:mt-20 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-8">
          {facts.map((fact) => (
            <li key={fact.title} className="flex flex-col gap-4">
              <BrandIcon name={fact.icon} className="h-10 w-10" />
              <h2 className="font-display text-xl font-semibold text-ink">{fact.title}</h2>
              <p className="max-w-xs text-base leading-relaxed text-bb-slate">{fact.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
