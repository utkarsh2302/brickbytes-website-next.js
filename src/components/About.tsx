import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const statements = [
  {
    title: "Our mission",
    body: "Make every plot visible, truthful and bookable, so land sells on clarity, not pressure.",
  },
  {
    title: "Our vision",
    body: "Every layout plan explorable online, with prices and availability that are always current.",
  },
  {
    title: "How we work",
    body: "Precise plot data, presented simply, and built around how developers actually sell.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-bb-stone py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Why BrickBytes exists."
            lead="BrickBytes is made by BrickNova Technologies in Jaipur. We build sales software for real estate developers and their brokers."
          />

          {/* Construction guides, as on a surveyor's table (Guidelines p. 20) */}
          <div className="mt-10 rounded-2xl border border-line bg-white p-6">
            <svg aria-hidden className="h-48 w-full md:h-56" viewBox="0 0 200 160" fill="none">
              <path
                d="M0 20H200M0 50H200M0 80H200M0 110H200M0 140H200M30 0V160M60 0V160M90 0V160M120 0V160M150 0V160M180 0V160"
                stroke="#ece6dd"
                strokeWidth="0.5"
              />
              <circle cx="100" cy="80" r="45" stroke="#1c1a17" strokeOpacity="0.2" strokeWidth="0.6" strokeDasharray="2 2" />
              <path d="M100 22V138M42 80H158" stroke="#1c1a17" strokeOpacity="0.15" strokeWidth="0.5" />
              <rect x="68.5" y="58.5" width="63" height="43" fill="#e6d3bc" stroke="#1c1a17" strokeWidth="0.6" />
              <circle cx="100" cy="80" r="3" fill="#ff5a1f" />
              <text x="146" y="75" fontSize="5" fontFamily="monospace" fill="#5a6272">
                R 45.00&apos;
              </text>
              <text x="104" y="32" fontSize="5" fontFamily="monospace" fill="#5a6272">
                N ↑
              </text>
            </svg>
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Talk to our team
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="flex flex-col lg:col-span-7 lg:pt-2">
          {statements.map((statement) => (
            <li key={statement.title} className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0 lg:first:pt-2">
              <h3 className="font-display text-lg font-semibold text-ink">{statement.title}</h3>
              <p className="mt-3 max-w-xl font-display text-2xl font-semibold leading-snug text-ink/85 sm:text-[28px]">
                {statement.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
