"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  MapPin,
  Building2,
  FileText,
  User,
  Phone,
  Briefcase,
  Send,
} from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";
import FAQ from "./FAQ";
import { WHATSAPP_URL } from "@/lib/contact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 },
  },
};

const springUp: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 12, duration: 0.9 },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const projectTypes = [
  "Plotted Layout",
  "Township",
  "High-Rise",
  "Villa Community",
  "Commercial",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

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

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative bg-bb-paper text-ink pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.4} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl text-left"
          >
            <motion.div
              variants={fadeUp}
              className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3"
            >
              Contact
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-ink mb-6"
            >
              Let&apos;s build something{" "}
              <span className="">extraordinary</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-bb-slate leading-relaxed font-sans font-light max-w-xl"
            >
              Whether you&apos;re ready for a demo or just exploring — we&apos;d love to hear about your project. Reach out through any channel below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Methods ─── */}
      <section className="relative bg-white text-ink py-16 sm:py-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.3} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* WhatsApp Card */}
            <motion.a
              variants={slideInLeft}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border border-line/60 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm hover:border-bb-available/25 hover:shadow-luxury-deep card-hover-accent accent-radius-3xl text-left"
              style={{ "--accent-hover-color": "#22c55e" } as React.CSSProperties}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-bb-available/8 border border-bb-available/10 mb-6">
                <MessageCircle className="w-6 h-6 text-bb-available" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-ink mb-2 group-hover:text-bb-available transition-colors">
                WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light mb-6">
                Get a quick response. Chat directly with our sales team on WhatsApp — we typically reply within minutes.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-bb-available group-hover:text-bb-available transition-colors">
                <span>Open WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>

            {/* Email Card */}
            <motion.a
              variants={slideInRight}
              href="mailto:business@brickbytes.in"
              className="group relative bg-white border border-line/60 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm hover:border-bb-orange/40 hover:shadow-luxury-deep card-hover-accent accent-radius-3xl text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-bb-sand/30 border border-bb-sand/50 mb-6">
                <Mail className="w-6 h-6 text-bb-orange" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-ink mb-2 group-hover:text-bb-orange transition-colors">
                Email
              </h3>
              <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light mb-6">
                Send us a detailed inquiry. We&apos;ll get back to you within one business day with a tailored response.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-bb-orange group-hover:text-bb-orange/80 transition-colors">
                <span>business@brickbytes.in</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section className="relative bg-bb-paper text-ink py-16 sm:py-24 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.3} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-2xl mb-10 sm:mb-14 text-left">
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
                Request a Demo
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.2] text-ink mb-4">
                Tell us about your project
              </h2>
              <p className="text-xs sm:text-sm text-bb-slate leading-relaxed font-sans font-light">
                Fill out the form below and our team will reach out with a custom walkthrough tailored to your development.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-bb-available/12 rounded-3xl p-10 sm:p-14 text-center shadow-sm"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bb-available/8 border border-bb-available/10 mx-auto mb-6">
                  <Send className="w-7 h-7 text-bb-available" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink mb-3">
                  Request received
                </h3>
                <p className="text-sm text-bb-slate font-sans font-light max-w-md mx-auto">
                  Thank you for reaching out. Our team will review your details and get back to you within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={springUp}
                onSubmit={handleSubmit}
                className="bg-white border border-line/60 rounded-3xl p-5 sm:p-10 shadow-sm"
              >
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-xs sm:text-sm text-red-600 text-left">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      disabled={isSending}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans placeholder:text-bb-slate focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-company" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" />
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      required
                      disabled={isSending}
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans placeholder:text-bb-slate focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      disabled={isSending}
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans placeholder:text-bb-slate focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      disabled={isSending}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans placeholder:text-bb-slate focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label htmlFor="contact-project-type" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3" />
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    required
                    disabled={isSending}
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label htmlFor="contact-message" className="text-[10px] font-mono font-bold tracking-widest text-bb-slate uppercase flex items-center gap-1.5">
                    <FileText className="w-3 h-3" />
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    disabled={isSending}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project — number of plots, location, timeline..."
                    className="w-full px-4 py-3 rounded-xl border border-line bg-bb-paper text-sm text-ink font-sans placeholder:text-bb-slate focus:outline-none focus:border-bb-orange/50 focus:ring-1 focus:ring-bb-orange/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-bb-orange hover:bg-bb-orange/95 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 shadow-xl shadow-bb-orange/20 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <span>Sending...</span>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Request Demo</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Office Information ─── */}
      <section className="relative bg-white text-ink py-14 sm:py-20 overflow-hidden border-b border-line/50">
        <InteractiveGrid opacity={0.25} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8 text-left">
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-bb-orange mb-3">
                Office
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-extrabold tracking-tight text-ink">
                Company Information
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {/* Address */}
              <motion.div 
                variants={slideInLeft}
                className="flex items-start gap-3 bg-bb-paper border border-line/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-bb-sand/30 border border-bb-sand/30 shrink-0">
                  <MapPin className="w-4 h-4 text-bb-orange" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-widest text-bb-slate uppercase mb-1">
                    Registered Office
                  </div>
                  <p className="text-xs sm:text-sm text-bb-slate font-sans font-light leading-relaxed">
                    Khushi Sansar, Lakshmi Nikunj,
                    <br />
                    Rampura Road, Mohanpura,
                    <br />
                    Jaipur, Rajasthan 302020, India
                  </p>
                </div>
              </motion.div>

              {/* CIN */}
              <motion.div 
                variants={springUp}
                className="flex items-start gap-3 bg-bb-paper border border-line/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-bb-sand/30 border border-bb-sand/30 shrink-0">
                  <Building2 className="w-4 h-4 text-bb-orange" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-widest text-bb-slate uppercase mb-1">
                    CIN
                  </div>
                  <p className="text-xs sm:text-sm text-bb-slate font-mono font-light leading-relaxed">
                    U62011RJ2026PTC113544
                  </p>
                </div>
              </motion.div>

              {/* GSTIN */}
              <motion.div 
                variants={slideInRight}
                className="flex items-start gap-3 bg-bb-paper border border-line/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-bb-sand/30 border border-bb-sand/30 shrink-0">
                  <FileText className="w-4 h-4 text-bb-orange" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-widest text-bb-slate uppercase mb-1">
                    GSTIN
                  </div>
                  <p className="text-xs sm:text-sm text-bb-slate font-mono font-light leading-relaxed">
                    08AAOCB6672J1Z2
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ Section (reused) ─── */}
      <FAQ />
    </>
  );
}
