"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  BrainCircuit,
  MessageSquare,
  Infinity as InfinityIcon,
  Wrench,
  TrendingUp,
  Search,
  Share2,
  PenTool,
  MousePointerClick,
  ArrowRight,
  Sparkles,
  Send,
  Rocket,
  Smile,
  Star,
  Headphones,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";

const services = [
  { title: "Website Development", description: "We build fast, responsive, and SEO-friendly websites that deliver exceptional user experiences.", icon: Globe, href: "/services/website-development" },
  { title: "App Development", description: "High-performance mobile and web applications tailored to your business goals.", icon: Smartphone, href: "/services/app-development" },
  { title: "AI & ML Solutions", description: "Intelligent solutions that automate processes and drive smart business decisions.", icon: BrainCircuit, href: "/services/ai-ml" },
  { title: "Chatbot Development", description: "AI-powered chatbots that engage customers and provide 24/7 support effortlessly.", icon: MessageSquare, href: "/services/chatbot-development" },
  { title: "Deployment & DevOps", description: "Streamlined CI/CD, cloud deployments, and infrastructure management for reliability and scalability.", icon: InfinityIcon, href: "/services/deployment-devops" },
  { title: "Maintenance & Support", description: "Ongoing maintenance, updates, and technical support to keep your systems running smoothly.", icon: Wrench, href: "/services/maintenance-support" },
  { title: "Digital Marketing", description: "Result-driven marketing strategies to boost visibility, engage audiences, and grow your brand.", icon: TrendingUp, href: "/services/digital-marketing" },
  { title: "SEO Services", description: "Data-driven SEO strategies to rank higher, increase traffic, and generate quality leads.", icon: Search, href: "/services/digital-marketing/seo" },
  { title: "Social Media Marketing", description: "Build your brand presence and engage your audience across all major social media platforms.", icon: Share2, href: "/services/digital-marketing/social-media-marketing" },
  { title: "Graphic Designing", description: "Creative designs that communicate your brand message and leave a lasting impression.", icon: PenTool, href: "/services/digital-marketing/graphic-designing" },
  { title: "Google Ads", description: "Targeted Google Ads campaigns that drive qualified traffic and maximize your ROI.", icon: MousePointerClick, href: "/services/digital-marketing/google-ads" },
  { title: "Meta Ads", description: "High-converting Facebook and Instagram ad campaigns to reach, engage, and convert your audience.", icon: InfinityIcon, href: "/services/digital-marketing/meta-ads" },
];

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered" },
  { icon: Smile, value: "30+", label: "Happy Clients" },
  { icon: Star, value: "98%", label: "Client Satisfaction" },
  { icon: Headphones, value: "24/7", label: "Support Available" },
];

const ctaFeatures = ["Free Consultation", "On-Time Delivery", "Transparent Process", "Scalable Solutions"];

export default function ServicesSection() {
  const { open: openContactModal } = useContactModal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8; // gap-5 = 20px
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const carouselServices = services;

  return (
    <section id="services" className="relative overflow-hidden py-14 sm:py-16 lg:py-20" data-aos="fade-up">
      {/* subtle dotted decoration */}
      <div
        className="pointer-events-none absolute right-8 top-8 hidden h-28 w-28 opacity-40 lg:block"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <div className="relative mb-10 text-center" data-aos="zoom-in">
          {/* decorative icons */}
          <span className="absolute left-0 top-6 hidden h-14 w-14 items-center justify-center rounded-full border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 shadow-lg shadow-teal-500/20 backdrop-blur lg:flex">
            <Sparkles className="h-6 w-6" />
          </span>
          <Send className="absolute right-2 top-2 hidden h-9 w-9 rotate-12 text-teal-400/60 lg:block" />

          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            What We Do
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white light:text-gray-900 sm:text-4xl md:text-5xl">
            Build, Launch. <span className="text-gradient-teal">Succeed</span> Online
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-silver light:text-gray-600 sm:text-base">
            We build digital solutions that are powerful, scalable, and future-ready — helping you grow
            your business and stay ahead of the competition.
          </p>
        </div>

        {/* ===== Stats strip ===== */}
        <div className="glass mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-y-6 rounded-2xl px-4 py-5 sm:grid-cols-4 sm:divide-x sm:divide-white/[0.06] light:sm:divide-gray-200">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="group flex items-center justify-center gap-3 sm:px-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-extrabold text-white light:text-gray-900">{value}</p>
                <p className="text-[11px] text-silver-dark light:text-gray-500 sm:text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Service carousel ===== */}
        <div className="relative">
          {/* controls */}
          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous services"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-silver-light light:text-gray-700 backdrop-blur transition-all hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-300 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next services"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-400 hover:to-teal-500 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {carouselServices.map((service, index) => {
              const Icon = service.icon;
              const number = String(index + 1).padStart(2, "0");
              return (
                <Link
                  key={service.title}
                  data-card
                  href={service.href}
                  className="glass-card beam-border group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl p-6 sm:w-[300px]"
                >
                  {/* number badge */}
                  <span className="absolute right-5 top-5 text-xs font-bold text-silver-dark/60 light:text-gray-400">{number}</span>
                  {/* faint watermark */}
                  <Icon className="pointer-events-none absolute -right-4 top-6 h-24 w-24 text-white/[0.04] light:text-gray-900/[0.04] transition-transform duration-500 group-hover:scale-110" />

                  {/* icon tile */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/20">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-white light:text-gray-900">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-silver light:text-gray-600">{service.description}</p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 light:text-teal-700">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ===== Bottom CTA bar ===== */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-teal-400/15 light:border-teal-200 bg-gradient-to-br from-teal-600/15 via-white/[0.02] to-black light:from-teal-50 light:via-white light:to-white p-6 sm:p-8" data-aos="fade-up">
          <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/30">
                <Rocket className="h-7 w-7" />
              </span>
              <div>
                <p className="text-lg font-bold text-white light:text-gray-900 sm:text-xl">Have a project in mind?</p>
                <p className="text-lg font-bold text-white light:text-gray-900 sm:text-xl">
                  Let&apos;s build something <span className="text-gradient-teal">amazing</span> together.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={openContactModal}
              className="group inline-flex w-full justify-between lg:w-auto lg:justify-start shrink-0 items-center gap-2.5 self-start rounded-full border border-white/15 light:border-gray-200 bg-white/[0.06] light:bg-white light:shadow-sm py-1.5 pl-6 pr-1.5 text-sm font-bold text-white light:text-gray-900 backdrop-blur transition-all duration-300 hover:border-teal-400/50 hover:bg-white/[0.1] hover:scale-105 active:scale-95 lg:self-auto"
            >
              Let&apos;s Talk
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          <div className="relative mt-6 flex flex-col gap-y-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 border-t border-white/[0.08] light:border-gray-200 pt-5">
            {ctaFeatures.map((feature) => (
              <span key={feature} className="inline-flex items-center gap-2 text-sm font-medium text-silver-light light:text-gray-700">
                <Check className="h-4 w-4 text-teal-300 light:text-teal-700" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
