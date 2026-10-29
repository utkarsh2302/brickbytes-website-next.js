import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-bb-paper pb-24 pt-36">
      <div
        aria-hidden
        className="bg-grid-pattern absolute inset-y-0 right-0 w-2/3 [mask-image:radial-gradient(closest-side,black,transparent)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <BrandIcon name="pin" className="h-14 w-14" />
          <p className="mt-8 font-mono text-sm text-bb-slate">404</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold leading-[1] tracking-[-0.035em] text-ink sm:text-6xl">
            This page isn&apos;t on the map
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bb-slate">
            The link may be old or mistyped. Go back to the homepage, or contact us if you expected something here.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonPrimary}>
              Back to the homepage
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className={buttonSecondary}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
