"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown, Mail, MessageCircle } from "lucide-react";
import BrandIcon from "./BrandIcon";
import CompanyDetails from "./CompanyDetails";
import FAQ, { type Faq } from "./FAQ";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import { buttonPrimary, buttonSecondary } from "./ui/button";
import { inputClass } from "./ui/input";
import { SALES_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const demoFaqs: Faq[] = [
  {
    question: "What happens in a demo?",
    answer:
      "We walk you through a live project map, tailored to your layout: how buyers explore plots, how brokers hold them and how your team manages availability.",
  },
  {
    question: "How quickly will you reply?",
    answer: "Within one business day by email or the form. On WhatsApp we typically reply within minutes.",
  },
  {
    question: "What should we send before the demo?",
    answer:
      "Your layout plan, if you have it to hand. A PDF or CAD (.dwg) export is enough for us to show you what your project's map would look like.",
  },
  {
    question: "Do you work with projects outside Jaipur?",
    answer:
      "Yes. We build the map from your files and it runs in any browser, so your project can be anywhere in India.",
  },
  {
    question: "Which kinds of projects do you support?",
    answer: "Plotted developments, gated villa communities and apartment towers.",
  },
];

const projectTypes = ["Plotted layout", "Township", "High-rise", "Villa community", "Commercial", "Other"];

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
};

type FieldName = keyof typeof initialForm;

// Messages for the fields marked `required` (or typed) in the markup below.
const fieldMessages: { name: FieldName; missing: string; invalid?: string }[] = [
  { name: "name", missing: "Enter your name." },
  { name: "company", missing: "Enter your company name." },
  { name: "email", missing: "Enter your email address.", invalid: "Enter a valid email address, like you@company.com." },
  { name: "projectType", missing: "Choose a project type." },
];

// Uses the browser's own constraint checks (required, type="email") and shows
// the result next to each field instead of the native bubble.
function findFieldErrors(formElement: HTMLFormElement) {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of fieldMessages) {
    const element = formElement.elements.namedItem(field.name);
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    if (element.validity.valid) continue;
    errors[field.name] = element.validity.typeMismatch && field.invalid ? field.invalid : field.missing;
  }
  return errors;
}

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-bb-slate"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName;
    setForm({ ...form, [name]: e.target.value });
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    const errors = findFieldErrors(e.currentTarget);
    setFieldErrors(errors);
    const firstInvalid = fieldMessages.find((field) => errors[field.name]);
    if (firstInvalid) {
      const element = e.currentTarget.elements.namedItem(firstInvalid.name);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit demo request.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  const errorProps = (name: FieldName) =>
    fieldErrors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `contact-${name}-error` }
      : {};

  return (
    <>
      <PageHero
        title="Book a BrickBytes demo"
        lead="Tell us about your project. We reply within one business day and set up a walkthrough of a live project map, tailored to your layout."
        accent="pin"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#demo-form" className={buttonPrimary}>
            Request a demo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            Message us on WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="relative bg-bb-stone py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Talk to us directly" className="mb-12" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-line bg-white p-8 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <MessageCircle className="h-7 w-7 text-ink" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">WhatsApp</h3>
              <p className="mt-1 font-mono text-base text-ink">{SALES_PHONE_DISPLAY}</p>
              <p className="mt-3 text-base leading-relaxed text-bb-slate">
                Chat with our sales team. We typically reply within minutes.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Open WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>

            <a
              href="mailto:business@brickbytes.in"
              className="group flex flex-col rounded-2xl border border-line bg-white p-8 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Mail className="h-7 w-7 text-ink" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">Email</h3>
              <p className="mt-1 text-base font-medium text-ink">business@brickbytes.in</p>
              <p className="mt-3 text-base leading-relaxed text-bb-slate">
                Send us a detailed inquiry. We reply within one business day.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Write to us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="demo-form" className="relative scroll-mt-18 bg-bb-paper py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Tell us about your project"
            lead="Share a few details and we'll set up a walkthrough tailored to your project."
            className="mb-12"
          />

          <div className="max-w-3xl">
            {submitted ? (
              <div role="status" className="rounded-3xl border border-line bg-white p-10 sm:p-14">
                <BrandIcon name="pin" className="h-12 w-12" />
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Request received</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-bb-slate">
                  Thank you for reaching out. Our team will review your details and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgb(28_26_23/0.04),0_24px_48px_-32px_rgb(28_26_23/0.2)] sm:p-10"
              >
                {error && (
                  <div role="alert" className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field id="contact-name" label="Name" error={fieldErrors.name}>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      disabled={isSending}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      {...errorProps("name")}
                    />
                  </Field>

                  <Field id="contact-company" label="Company" error={fieldErrors.company}>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      autoComplete="organization"
                      required
                      disabled={isSending}
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className={inputClass}
                      {...errorProps("company")}
                    />
                  </Field>

                  <Field id="contact-phone" label="Phone" optional>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      disabled={isSending}
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="contact-email" label="Email" error={fieldErrors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      disabled={isSending}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={inputClass}
                      {...errorProps("email")}
                    />
                  </Field>

                  <Field id="contact-projectType" label="Project type" error={fieldErrors.projectType} className="sm:col-span-2">
                    <div className="relative">
                      <select
                        id="contact-projectType"
                        name="projectType"
                        required
                        disabled={isSending}
                        value={form.projectType}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none pr-11`}
                        {...errorProps("projectType")}
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
                        aria-hidden
                      />
                    </div>
                  </Field>

                  <Field id="contact-message" label="Message" optional className="sm:col-span-2">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      disabled={isSending}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Number of plots, location, timeline..."
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`${buttonPrimary} mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto`}
                >
                  {isSending ? (
                    <>
                      Sending…
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                      />
                    </>
                  ) : (
                    <>
                      Request a demo
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="company-heading" className="relative bg-bb-stone py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="company-heading" title="Company information" className="mb-12" />
          <CompanyDetails />
        </div>
      </section>

      <FAQ items={demoFaqs} />
    </>
  );
}
