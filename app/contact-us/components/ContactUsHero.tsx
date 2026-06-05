"use client";

import { Clock, Globe, Users } from "lucide-react";
import HeroDecor from "@/components/HeroDecor";

const chips = [
  { icon: Clock, label: "Replies within 1 business day" },
  { icon: Globe, label: "Serving 12+ countries" },
  { icon: Users, label: "Remote-first team" },
];

export default function ContactUsHero() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-6 sm:mb-10"
      data-aos="fade-up"
    >
      {/* Interactive decorative layer */}
      <HeroDecor />

      <div className="relative z-10 w-full container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <span className="eyebrow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          Contact Us
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-gradient-light">Let&apos;s start a</span>{" "}
          <span className="text-gradient-teal">conversation</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver sm:text-base lg:text-lg">
          We work remotely with a team of freelancers. Reach out — we&apos;d love to hear about your
          idea and help bring it to life.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {chips.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-silver-light transition-colors duration-300 hover:border-teal-400/40 hover:text-white sm:text-sm"
            >
              <Icon className="h-4 w-4 text-teal-300" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
