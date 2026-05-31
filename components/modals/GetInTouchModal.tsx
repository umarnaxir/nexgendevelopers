"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  X,
  Phone,
  Mail,
  ArrowRight,
  User,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import XIcon from "@/components/icons/XIcon";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_DISPLAY = "+91 600-616-1726";
const PHONE_TEL = "+916006161726";
const EMAIL = "info@nexgendevelopers.in";

const socials = [
  { icon: MessageCircle, href: "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.", label: "WhatsApp" },
  { icon: XIcon, href: "https://x.com/nexgendv", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
];

export default function GetInTouchModal({ isOpen, onClose }: GetInTouchModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type");
      let data: { error?: string; details?: string; message?: string } = {};
      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        const msg = data.details ? `${data.error} (${data.details})` : data.error || "Something went wrong";
        throw new Error(msg);
      }

      toast.success("Request received!", {
        description: "We'll reach out within one business day.",
        duration: 4000,
      });
      setName("");
      setPhone("");
      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request took too long. Please try again."
            : error.message
          : "Please try again later.";
      toast.error("Couldn't send your request", { description: message, duration: 5000 });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch"
    >
      <div
        className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c0d] shadow-2xl md:grid-cols-2 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Left: form ===== */}
        <div className="p-6 sm:p-9">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-8 bg-teal-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
              Get Started
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Let&apos;s <span className="text-gradient-teal">connect!</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver sm:text-base">
            Drop your details and we&apos;ll reach out within one business day.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="git-name" className="mb-2 block text-sm font-bold text-silver-light">
                Your Name <span className="text-teal-400">*</span>
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-silver-dark" />
                <input
                  id="git-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. John Doe"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-silver-dark focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="git-phone" className="mb-2 block text-sm font-bold text-silver-light">
                Contact Number <span className="text-teal-400">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-silver-dark" />
                <input
                  id="git-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 600-616-1726"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-silver-dark focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:from-teal-400 hover:to-teal-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute left-2.5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
              {isSubmitting ? "Sending..." : "Request a Callback"}
            </button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-silver-dark">
            <ShieldCheck className="h-4 w-4 text-silver-dark" />
            We respect your privacy. Your information is safe with us.
          </p>
        </div>

        {/* ===== Right: reach us ===== */}
        <div className="relative bg-[#0b0d0e] p-6 text-white sm:p-9">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Reach Us</h3>
            <span className="mt-2 block h-0.5 w-8 bg-teal-500" />
          </div>

          <div className="mt-7 space-y-4">
            {/* Phone */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-teal-500/40 hover:bg-white/[0.06]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-400">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">Phone</span>
                <span className="block font-bold text-white">{PHONE_DISPLAY}</span>
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-teal-500/40 hover:bg-white/[0.06]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-400">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">Email</span>
                <span className="block break-all font-bold text-white">{EMAIL}</span>
              </span>
            </a>

            {/* Visit full contact page */}
            <Link
              href="/contact-us"
              onClick={onClose}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-teal-500/40 hover:bg-white/[0.06]"
            >
              <ExternalLink className="h-5 w-5 shrink-0 text-teal-400" />
              <span className="font-bold text-white">Visit full contact page</span>
              <ArrowRight className="ml-auto h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-7 border-t border-white/10 pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Follow Us</h4>
            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-all hover:border-teal-500 hover:bg-teal-500 hover:text-white hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
