"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Star, User, Rocket, Smile, Globe } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import HeroOrbit from "./HeroOrbit";

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered" },
  { icon: Smile, value: "30+", label: "Happy Clients" },
  { icon: Star, value: "98%", label: "Client Satisfaction" },
  { icon: Globe, value: "12+", label: "Countries Served" },
];

export default function HeroSection() {
  const { open: openContactModal } = useContactModal();

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20 pb-8 sm:pt-24 lg:pt-16 lg:pb-10">
      {/* Subtle decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-10 top-24 h-40 w-40 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(20,184,166,0.35) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-teal-50/60 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-teal-50/50 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* LEFT */}
          <div className="text-center lg:text-left" data-aos="fade-right">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              Team of Freelancers
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              We build digital products that{" "}
              <span className="relative whitespace-nowrap text-teal-600">
                drive growth
                <svg
                  className="absolute -bottom-2 left-0 w-full text-teal-400"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8 C50 2 150 2 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>

            {/* Description */}
            <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base lg:mx-0 lg:text-lg">
              We help startups and local brands with{" "}
              <span className="font-semibold text-teal-600">AI/ML</span>,{" "}
              <span className="font-semibold text-teal-600">chatbots</span>,{" "}
              <span className="font-semibold text-teal-600">web &amp; app development</span>, and{" "}
              <span className="font-semibold text-teal-600">digital marketing</span> — crafting
              digital experiences that stand out and deliver results.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <button
                onClick={openContactModal}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 hover:bg-teal-500 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-400/40 sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition-all duration-300 hover:border-teal-400 hover:text-teal-600 hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                <LayoutGrid className="h-4 w-4 text-teal-500" />
                Explore Services
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-3">
                {[
                  "from-teal-400 to-teal-600",
                  "from-gray-500 to-gray-700",
                  "from-teal-500 to-teal-700",
                  "from-gray-400 to-gray-600",
                ].map((grad, i) => (
                  <span
                    key={i}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${grad} ring-2 ring-white`}
                  >
                    <User className="h-5 w-5 text-white" />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-teal-500" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-0.5 text-sm font-medium text-gray-600">
                  Trusted by 30+ clients worldwide
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <HeroOrbit />
        </div>

        {/* Stats bar */}
        <div
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-gray-100 bg-white/80 px-5 py-5 shadow-md backdrop-blur sm:px-8 lg:grid-cols-4"
          data-aos="fade-up"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 sm:gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-teal-600">{value}</p>
                <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
