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

export default function AboutSection() {
  const { open: openContactModal } = useContactModal();

  return (
    <section id="about" className="relative overflow-hidden py-14 sm:py-16 lg:py-20" data-aos="fade-up">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header: Where Innovation Meets Excellence ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <span className="eyebrow">
              <span className="h-3.5 w-1 rounded-full bg-teal-400" />
              Our Expertise
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Where Innovation
              <br />
              Meets <span className="text-gradient-teal">Excellence</span>
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />

            <p className="mt-6 text-lg text-silver-light">
              A creative platform to <strong className="font-bold text-white">build</strong>,{" "}
              <strong className="font-bold text-white">launch</strong>, and{" "}
              <strong className="font-bold text-white">grow</strong> your business.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-silver sm:text-base">
              We help startups and local brands with AI/ML, chatbots, web &amp; app development, and
              digital marketing — crafting digital experiences that stand out and deliver results.
              NexGen Developers is a collective of engineering professionals united to deliver premium
              services.
            </p>
          </div>

          {/* Decorative graphic */}
          <div className="relative hidden h-[460px] lg:block" data-aos="fade-left" aria-hidden>
            {/* concentric circles */}
            <span className="absolute right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/[0.06] animate-spin-slow" />
            <span className="absolute right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-teal-400/15 animate-spin-slow-rev" />
            {/* dotted grid */}
            <span className="absolute right-0 top-0 h-32 w-32 text-teal-400/40" style={DOTS} />
            {/* floating chips */}
            <span className="absolute right-64 top-8 h-16 w-16 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur animate-float" />
            <span className="absolute right-60 bottom-8 h-16 w-16 rounded-2xl border border-teal-400/20 bg-teal-400/[0.06] backdrop-blur animate-float-delayed" />
            {/* dashed connector */}
            <svg className="absolute inset-0 h-full w-full text-teal-400/30" fill="none" aria-hidden>
              <path d="M250 70 C 300 130, 240 220, 300 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M245 390 C 290 340, 270 270, 300 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
            </svg>
            {/* main code orb */}
            <span className="absolute right-20 top-1/2 flex h-48 w-48 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_80px_-10px_rgba(20,184,166,0.4)] backdrop-blur ring-1 ring-teal-400/10">
              <span className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/80 to-teal-800 text-white shadow-inner">
                <Code2 className="h-16 w-16" />
              </span>
            </span>
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
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-teal-300 transition-all duration-300 group-hover:border-teal-400/30 group-hover:bg-teal-400/15 group-hover:text-teal-200">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                    {s.num}
                    <span className="h-px w-5 bg-teal-400/50" />
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-silver">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                    Explore Services
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-400/40 transition-all duration-300 group-hover:border-teal-400 group-hover:bg-teal-400 group-hover:text-black">
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
              Insights &amp; Growth
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Insights &amp; <span className="text-gradient-teal">Growth</span>
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-silver sm:text-base">
            Explore our blogs for ideas and insights, or get in touch to build, launch, and grow your
            business with us.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Blogs & Articles - teal feature */}
            <Link
              href="/blogs"
              data-aos="fade-up"
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-teal-400/20 bg-gradient-to-br from-teal-600/25 via-teal-800/10 to-black p-8 text-white transition-all duration-300 hover:border-teal-400/40 hover:shadow-[0_30px_70px_-30px_rgba(20,184,166,0.5)]"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full text-teal-300 opacity-20" style={DOTS} />
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                <BookOpen className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold">Blogs &amp; Articles</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver-light">
                  Read articles, guides, and the latest industry updates on development, digital
                  trends, and marketing.
                </p>
                <span className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-white">
                  Read Blogs
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-all duration-300 group-hover:bg-white group-hover:text-teal-700">
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
                <TrendingUp className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold text-white">Grow your brand</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver">
                  Let&apos;s build something that stands out. Get in touch and let&apos;s scale your
                  brand to new heights.
                </p>
                <button
                  type="button"
                  onClick={openContactModal}
                  className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-teal-300"
                >
                  Get in touch
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-400/40 transition-all duration-300 group-hover:border-teal-400 group-hover:bg-teal-400 group-hover:text-black">
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
