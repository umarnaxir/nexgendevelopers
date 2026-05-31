"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  LayoutGrid,
  MapPin,
  Lock,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import Select from "@/components/ui/Select";
import XIcon from "@/components/icons/XIcon";

const socialLinks = [
  { icon: XIcon, href: "https://x.com/nexgendv", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
];

const contactInfo = [
  { icon: Phone, label: "Call Us", value: "+91 600-616-1726", href: "tel:+916006161726" },
  { icon: Mail, label: "Email Us", value: "info@nexgendevelopers.in", href: "mailto:info@nexgendevelopers.in" },
  { icon: MapPin, label: "Our Location", value: "India", href: undefined as string | undefined },
];

/** Stylized paper-plane illustration for the contact card. */
function ContactArt() {
  return (
    <svg viewBox="0 0 440 320" className="h-auto w-full" fill="none" aria-hidden>
      <defs>
        <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#99f6e4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* sun glow */}
      <circle cx="318" cy="120" r="96" fill="url(#cs-sun)" />
      {/* hills */}
      <path d="M0 300 Q 110 250 220 286 T 440 272 L440 320 L0 320Z" fill="#0f172a" opacity="0.06" />
      <path d="M0 306 Q 140 272 270 302 T 440 296 L440 320 L0 320Z" fill="#0f172a" opacity="0.045" />
      {/* clouds */}
      <g fill="#ffffff">
        <ellipse cx="150" cy="116" rx="36" ry="16" opacity="0.95" />
        <ellipse cx="182" cy="125" rx="26" ry="12" opacity="0.9" />
        <ellipse cx="356" cy="196" rx="30" ry="13" opacity="0.8" />
      </g>
      {/* dashed trail */}
      <path
        d="M68 252 C 150 236 120 166 202 172 C 252 176 252 120 300 110"
        stroke="#2dd4bf"
        strokeWidth="2.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <circle cx="206" cy="150" r="18" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="1 9" opacity="0.75" />
      {/* paper plane */}
      <g transform="translate(298 64) rotate(-18)" className="animate-float">
        <polygon points="0,40 80,2 36,46" fill="url(#cs-plane)" />
        <polygon points="36,46 80,2 54,40" fill="#14b8a6" />
        <polygon points="36,46 54,40 42,62" fill="#0f172a" />
      </g>
      {/* leaves */}
      <g transform="translate(252 252)">
        <path d="M0 0 C -10 -30 6 -52 22 -58 C 18 -34 10 -12 0 0Z" fill="#0f172a" />
        <path d="M6 4 C 18 -22 44 -30 60 -28 C 44 -14 24 -2 6 4Z" fill="#14b8a6" />
        <path d="M-4 4 C -22 -10 -30 -34 -26 -52 C -12 -34 -4 -16 -4 4Z" fill="#5eead4" />
      </g>
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "app-development", label: "App Development" },
    { value: "ai-ml", label: "AI & ML Solutions" },
    { value: "chatbot", label: "Chatbot Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "other", label: "Other Services" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Please enter a valid name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");

    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!formData.service) {
      toast.error("Please select a service");
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(formData),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        website: "",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request timed out. Please try again."
            : error.message
          : "Something went wrong.";

      toast.error("Failed to send message", {
        description: message,
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  // Framed light field (icon + label + control)
  const fieldWrap =
    "group flex items-center gap-3 rounded-2xl border border-gray-300/70 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-gray-400/80 focus-within:border-teal-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]";
  const labelCls = "block text-[13px] font-bold text-gray-800";
  const inputCls =
    "w-full border-0 bg-transparent p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400";

  return (
    <section id="contact" className="py-6 sm:py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#f6f7f9] via-[#eceef1] to-[#dfe2e7] p-6 shadow-2xl sm:p-8 lg:p-10">
          {/* metallic top sheen */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

          <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-center lg:gap-12">
            {/* ===== LEFT: form (bigger) ===== */}
            <div>
              <div className="mb-6 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-600">
                  Let&apos;s Connect
                </span>
                <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-teal-500" />
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Contact <span className="text-teal-600">Us</span>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-gray-600 sm:text-base">
                  Ready to bring your ideas to life? We&apos;re here to help.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={fieldWrap}>
                    <User className="h-5 w-5 shrink-0 text-teal-600" />
                    <div className="min-w-0 flex-1">
                      <label htmlFor="cf-name" className={labelCls}>Your Name</label>
                      <input id="cf-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className={inputCls} />
                    </div>
                  </div>

                  <div className={fieldWrap}>
                    <Mail className="h-5 w-5 shrink-0 text-teal-600" />
                    <div className="min-w-0 flex-1">
                      <label htmlFor="cf-email" className={labelCls}>Your Email</label>
                      <input id="cf-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={fieldWrap}>
                    <Phone className="h-5 w-5 shrink-0 text-teal-600" />
                    <div className="min-w-0 flex-1">
                      <label htmlFor="cf-phone" className={labelCls}>Phone Number</label>
                      <input id="cf-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required className={inputCls} />
                    </div>
                  </div>

                  <div className={fieldWrap}>
                    <LayoutGrid className="h-5 w-5 shrink-0 text-teal-600" />
                    <div className="min-w-0 flex-1">
                      <span className={labelCls}>Select a Service</span>
                      <Select
                        options={serviceOptions}
                        value={formData.service}
                        onChange={(value) =>
                          setFormData((prev) => ({ ...prev, service: value }))
                        }
                        placeholder="Choose a service"
                        required
                        className="h-auto border-0 bg-transparent p-0 text-sm text-gray-900 shadow-none data-[placeholder]:text-gray-400 focus:ring-0 [&>svg]:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className={`${fieldWrap} items-start`}>
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="cf-message" className={labelCls}>Tell us about your project</label>
                    <textarea id="cf-message" name="message" value={formData.message} onChange={handleChange} placeholder="Write a few details about your project..." rows={3} required className={`${inputCls} resize-none`} />
                  </div>
                </div>

                {/* privacy left · send button right corner */}
                <div className="flex flex-col-reverse items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3.5 w-3.5" />
                    We respect your privacy. Your information is safe with us.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative ml-auto flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-gray-900 py-2 pl-2 pr-7 shadow-[0_18px_45px_-15px_rgba(20,184,166,0.55)] transition-all duration-300 hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal-400/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white transition-transform duration-300 group-hover:scale-105">
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="relative text-sm font-bold text-white">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* ===== RIGHT: illustration + contact + socials (smaller) ===== */}
            <div className="flex flex-col justify-center lg:border-l lg:border-black/10 lg:pl-12">
              <div className="relative mx-auto mb-6 hidden w-full max-w-[300px] sm:block lg:mx-0">
                <ContactArt />
              </div>

              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  Get in <span className="text-teal-600">Touch</span>
                </h3>
                <span className="mt-2 block h-1 w-12 rounded-full bg-gradient-to-r from-teal-500 to-teal-700" />

                <div className="mt-5 space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 text-teal-400 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900">{label}</p>
                          <p className="truncate text-sm text-gray-600">{value}</p>
                        </div>
                      </>
                    );
                    return href ? (
                      <a key={label} href={href} className="group flex items-center gap-4">
                        {inner}
                      </a>
                    ) : (
                      <div key={label} className="group flex items-center gap-4">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-900">Follow Us</h4>
                <div className="mt-3 flex items-center gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/40 text-teal-600 transition-all duration-300 hover:scale-110 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
