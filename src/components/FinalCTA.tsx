import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { buttonPrimary, buttonSecondary } from "./ui/button";

// Closing section. Built from the glass system (Guidelines p. 20): the flat
// symbol at full scale, cropped off the edge, with a faint construction circle.
export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-bb-stone py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <svg className="absolute -right-24 top-1/2 h-[560px] w-[560px] -translate-y-1/2" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="#1c1a17" strokeOpacity="0.18" strokeWidth="0.2" strokeDasharray="1 1" />
        </svg>
        <Image
          src="/symbol.svg"
          alt=""
          width={300}
          height={500}
          className="absolute -bottom-24 right-[8%] h-[520px] w-auto lg:right-[14%]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-extrabold text-4xl leading-[1.05] text-ink sm:text-5xl">
            Put your next project online, plot by plot.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-bb-slate sm:text-lg">
            Send us your layout plan. We build the live map, set up your brokers and take you live in 10 to 14 business days.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonPrimary}>
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={WHATSAPP_URL} className={buttonSecondary}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              Message us on WhatsApp
            </a>
          </div>

          <p className="mt-16 font-display font-semibold text-lg text-ink/70">Technology that holds.</p>
        </div>
      </div>
    </section>
  );
}
