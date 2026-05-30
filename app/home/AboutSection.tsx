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
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 shadow-lg">
              <span className="h-3.5 w-1 rounded-full bg-teal-500" />
              Our Expertise
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
              Where Innovation
              <br />
              Meets <span className="text-teal-600">Excellence</span>
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-teal-500" />

            <p className="mt-6 text-lg text-gray-700">
              A creative platform to <strong className="font-bold text-gray-900">build</strong>,{" "}
              <strong className="font-bold text-gray-900">launch</strong>, and{" "}
              <strong className="font-bold text-gray-900">grow</strong> your business.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
              We help startups and local brands with AI/ML, chatbots, web &amp; app development, and
              digital marketing — crafting digital experiences that stand out and deliver results.
              NexGen Developers is a collective of engineering professionals united to deliver premium
              services.
            </p>
          </div>

          {/* Decorative graphic */}
          <div className="relative hidden h-[460px] lg:block" data-aos="fade-left" aria-hidden>
            {/* concentric circles */}
            <span className="absolute right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-teal-100" />
            <span className="absolute right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-teal-100" />
            {/* dotted grid */}
            <span className="absolute right-0 top-0 h-32 w-32 text-teal-400 opacity-40" style={DOTS} />
            {/* floating chips */}
            <span className="absolute right-64 top-8 h-16 w-16 rounded-2xl border border-teal-100 bg-teal-50/70 shadow-md" />
            <span className="absolute right-60 bottom-8 h-16 w-16 rounded-2xl border border-teal-100 bg-teal-50/70 shadow-md" />
            {/* dashed connector */}
            <svg className="absolute inset-0 h-full w-full text-teal-300" fill="none" aria-hidden>
              <path d="M250 70 C 300 130, 240 220, 300 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M245 390 C 290 340, 270 270, 300 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
            </svg>
            {/* main code orb */}
            <span className="absolute right-20 top-1/2 flex h-48 w-48 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl ring-[12px] ring-teal-50">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-inner">
                <Code2 className="h-20 w-20" />
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
                className="group flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-all duration-300 group-hover:bg-teal-500 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-600">
                    {s.num}
                    <span className="h-px w-5 bg-teal-300" />
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
                    Explore Services
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-300 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white">
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
            <span className="h-0.5 w-8 bg-teal-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              Insights &amp; Growth
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Insights &amp; <span className="text-teal-600">Growth</span>
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-teal-500" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Explore our blogs for ideas and insights, or get in touch to build, launch, and grow your
            business with us.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Blogs & Articles - dark gradient */}
            <Link
              href="/blogs"
              data-aos="fade-up"
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-teal-900 p-8 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full text-white opacity-20" style={DOTS} />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <BookOpen className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold">Blogs &amp; Articles</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-teal-50/90">
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

            {/* Grow your brand - white */}
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full text-teal-400 opacity-25" style={DOTS} />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <TrendingUp className="h-7 w-7" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-bold text-gray-900">Grow your brand</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                  Let&apos;s build something that stands out. Get in touch and let&apos;s scale your
                  brand to new heights.
                </p>
                <button
                  type="button"
                  onClick={openContactModal}
                  className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-teal-600"
                >
                  Get in touch
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-300 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white">
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
