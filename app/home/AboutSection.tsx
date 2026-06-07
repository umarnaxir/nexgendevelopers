"use client";

import React from "react";
import Link from "next/link";
import { Code2, BrainCircuit, Bot, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";

const DOTS = {
  backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
  backgroundSize: "12px 12px",
} as const;

const services = [
  {
    num: "01",
    title: "Web & App Development",
    desc: "Crafting responsive websites and scalable applications that drive business growth.",
    icon: Code2,
    href: "/services/website-development",
  },
  {
    num: "02",
    title: "AI & Machine Learning",
    desc: "Implementing intelligent solutions that automate processes and generate valuable insights.",
    icon: BrainCircuit,
    href: "/services/ai-ml",
  },
  {
    num: "03",
    title: "Chatbot Development",
    desc: "Building intelligent conversational interfaces that enhance customer experience.",
    icon: Bot,
    href: "/services/chatbot-development",
  },
  {
    num: "04",
    title: "Digital Marketing",
    desc: "Developing comprehensive strategies to increase your online presence and drive customer engagement.",
    icon: TrendingUp,
    href: "/services/digital-marketing",
  },
];

/** Animated orbit graphic with the central code orb (shared by desktop & mobile). */
function ExpertiseOrbit() {
  return (
    <div className="relative flex h-[30rem] w-[30rem] items-center justify-center">
      {/* rotating conic glow halo */}
      <span
        className="absolute inset-6 rounded-full opacity-50 blur-3xl animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(45,212,191,0.5) 70deg, transparent 150deg, transparent 230deg, rgba(45,212,191,0.4) 310deg, transparent 360deg)",
        }}
      />

      {/* concentric orbit rings */}
      <span className="absolute inset-0 rounded-full border border-white/[0.07] animate-spin-slow" />
      <span className="absolute inset-[12%] rounded-full border border-dashed border-teal-400/25 animate-spin-slow-rev" />
      <span className="absolute inset-[26%] rounded-full border border-teal-400/15 animate-spin-slow" />

      {/* revolving glowing particles */}
      <span className="absolute inset-0 animate-orbit">
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.95)]" />
      </span>
      <span className="absolute inset-[12%] animate-orbit-rev">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-200 shadow-[0_0_12px_rgba(45,212,191,0.85)]" />
      </span>
      <span className="absolute inset-[26%] animate-orbit-slow">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
      </span>

      {/* floating tech-icon chips */}
      <span className="absolute left-2 top-12 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-teal-300 backdrop-blur animate-float">
        <BrainCircuit className="h-7 w-7" />
      </span>
      <span className="absolute bottom-14 left-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/[0.06] text-teal-200 backdrop-blur animate-float-delayed">
        <Bot className="h-6 w-6" />
      </span>
      <span className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-teal-300 backdrop-blur animate-float">
        <TrendingUp className="h-6 w-6" />
      </span>

      {/* central code orb (BIG) */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur animate-hero-float">
        {/* pulsing teal shadow halo */}
        <span className="absolute inset-0 rounded-full animate-sphere-pulse" />
        {/* teal core */}
        <span className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-teal-600 to-teal-800 text-white shadow-[inset_0_3px_24px_rgba(255,255,255,0.28)] ring-1 ring-teal-300/30">
          <Code2 className="h-24 w-24" strokeWidth={2.2} />
          {/* glossy highlight */}
          <span className="absolute left-[22%] top-[18%] h-10 w-16 -rotate-12 rounded-full bg-white/30 blur-md" />
        </span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { open: openContactModal } = useContactModal();

  return (
    <section id="about" className="relative overflow-hidden py-14 sm:py-16 lg:py-20" data-aos="fade-up">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <span className="absolute right-0 top-1/4 h-[520px] w-[520px] rounded-full bg-teal-500/[0.07] blur-[150px] animate-glow-pulse" />
        <span className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-teal-700/[0.06] blur-[130px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header: Where Innovation Meets Excellence ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <span className="eyebrow">
              <span className="h-3.5 w-1 rounded-full bg-teal-400" />
              Our Expertise
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white light:text-gray-900 sm:text-5xl">
              Where Innovation
              <br />
              Meets <span className="text-gradient-teal">Excellence</span>
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />

            <p className="mt-6 text-lg text-silver-light light:text-gray-700">
              A creative platform to <strong className="font-bold text-white light:text-gray-900">build</strong>,{" "}
              <strong className="font-bold text-white light:text-gray-900">launch</strong>, and{" "}
              <strong className="font-bold text-white light:text-gray-900">grow</strong> your business.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-silver light:text-gray-600 sm:text-base">
              We help startups and local brands with AI/ML, chatbots, web &amp; app development, and
              digital marketing — crafting digital experiences that stand out and deliver results.
              NexGen Developers is a collective of engineering professionals united to deliver premium
              services.
            </p>

            {/* Mobile: scaled-down animated graphic below the content */}
            <div className="mt-10 flex justify-center lg:hidden" aria-hidden>
              <div className="flex h-[320px] w-[300px] items-center justify-center">
                <div className="scale-[0.6] sm:scale-[0.7]">
                  <ExpertiseOrbit />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative animated graphic (desktop) */}
          <div className="relative hidden h-[520px] items-center justify-center lg:flex" data-aos="fade-left" aria-hidden>
            {/* dotted grid accent */}
            <span className="absolute right-0 top-2 h-32 w-32 text-teal-400/40" style={DOTS} />
            <ExpertiseOrbit />
          </div>
        </div>

        {/* ===== Service cards ===== */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                data-aos="fade-up"
                data-aos-delay={(i % 2) * 80}
                className="glass-card group flex items-start gap-5 rounded-2xl p-6"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 light:border-teal-200 bg-white/[0.04] light:bg-teal-50 text-teal-300 light:text-teal-700 transition-all duration-300 group-hover:border-teal-400/30 group-hover:bg-teal-400/15 group-hover:text-teal-200">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-300 light:text-teal-700">
                    {s.num}
                    <span className="h-px w-5 bg-teal-400/50" />
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white light:text-gray-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-silver light:text-gray-600">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 light:text-teal-700">
                    Explore Services
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-400/40 light:border-teal-200 transition-all duration-300 group-hover:border-teal-400 group-hover:bg-teal-400 group-hover:text-black">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ===== Insights & Growth ===== */}
        <div className="mt-16 lg:mt-20">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-0.5 w-8 bg-teal-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300 light:text-teal-700">
              Insights &amp; Growth
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white light:text-gray-900 sm:text-4xl md:text-5xl">
            Insights &amp; <span className="text-gradient-teal">Growth</span>
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-silver light:text-gray-600 sm:text-base">
            Explore our blogs for ideas and insights, or get in touch to build, launch, and grow your
            business with us.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Blogs & Articles - teal feature */}
            <Link
              href="/blogs"
              data-aos="fade-up"
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-teal-400/20 light:border-teal-200 bg-gradient-to-br from-teal-600/25 via-teal-800/10 to-black light:from-teal-50 light:via-white light:to-white p-8 text-white light:text-gray-900 transition-all duration-300 hover:border-teal-400/40 hover:shadow-[0_30px_70px_-30px_rgba(20,184,166,0.5)]"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full text-teal-300 opacity-20" style={DOTS} />
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 light:border-teal-200 bg-white/10 light:bg-teal-50 text-white light:text-teal-700">
                <BookOpen className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold light:text-gray-900">Blogs &amp; Articles</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver-light light:text-gray-700">
                  Read articles, guides, and the latest industry updates on development, digital
                  trends, and marketing.
                </p>
                <span className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-white light:text-teal-700">
                  Read Blogs
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 light:border-teal-200 transition-all duration-300 group-hover:bg-white group-hover:text-teal-700">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>

            {/* Grow your brand - glass */}
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              className="glass-card group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl p-8"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full text-teal-400 opacity-20" style={DOTS} />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700">
                <TrendingUp className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold text-white light:text-gray-900">Grow your brand</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver light:text-gray-600">
                  Let&apos;s build something that stands out. Get in touch and let&apos;s scale your
                  brand to new heights.
                </p>
                <button
                  type="button"
                  onClick={openContactModal}
                  className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-teal-300 light:text-teal-700"
                >
                  Get in touch
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-400/40 light:border-teal-200 transition-all duration-300 group-hover:border-teal-400 group-hover:bg-teal-400 group-hover:text-black">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
