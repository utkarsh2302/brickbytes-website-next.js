"use client";

import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-bb-paper pb-24 pt-36">
      <div
        aria-hidden
        className="bg-grid-pattern absolute inset-y-0 right-0 w-2/3 [mask-image:radial-gradient(closest-side,black,transparent)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <BrandIcon name="facing" className="h-14 w-14" />
          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1] tracking-[-0.035em] text-ink sm:text-6xl">
            Something went wrong
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bb-slate">
            This page didn&apos;t load as expected. Try again. If it keeps happening, email us at business@brickbytes.in.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => reset()} className={buttonPrimary}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Try again
            </button>
            <a href="mailto:business@brickbytes.in" className={buttonSecondary}>
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
