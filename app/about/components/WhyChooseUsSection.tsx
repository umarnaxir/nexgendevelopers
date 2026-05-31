"use client";

import { Users, Layers, Wallet, Rocket, ArrowUpRight } from "lucide-react";
import { whyChooseUsCards } from "../data";

const cardIcons = [Users, Layers, Wallet, Rocket];

const lightMeta = [
  { tile: "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white", arrow: "text-teal-500", ring: "hover:border-teal-400", bar: "bg-teal-500" },
  { tile: "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white", arrow: "text-orange-500", ring: "hover:border-orange-400", bar: "bg-orange-500" },
  { tile: "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white", arrow: "text-amber-500", ring: "hover:border-amber-400", bar: "bg-amber-500" },
  { tile: "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white", arrow: "text-teal-500", ring: "hover:border-teal-400", bar: "bg-teal-500" },
];

export default function WhyChooseUsSection({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <section className="py-14 md:py-20" data-aos="fade-up">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center md:mb-14" data-aos="zoom-in">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Why Us
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Why Choose <span className="text-gradient-teal">NexGen Developers</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-silver sm:text-base">
              A team built to help you build, launch, and grow — with the speed, skill, and care your
              business deserves.
            </p>
          </div>

          {/* Interactive cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUsCards.map((card, index) => {
              const Icon = cardIcons[index % cardIcons.length];
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="glass-card beam-border group relative flex flex-col overflow-hidden rounded-2xl p-6"
                >
                  <span className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-500 group-hover:w-full" />
                  <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 -translate-y-1 text-teal-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-silver-light transition-all duration-300 group-hover:scale-110 group-hover:border-teal-400/30 group-hover:bg-teal-400/10 group-hover:text-teal-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="mt-5 text-xs font-bold tracking-[0.2em] text-silver-dark">{card.number}</div>
                  <h3 className="mt-1.5 text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 text-center md:mb-12" data-aos="zoom-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-600">
            Why Us
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
            Why Choose NexGen Developers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            A team built to help you build, launch, and grow — with the speed, skill, and care your
            business deserves.
          </p>
        </div>

        {/* Interactive cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUsCards.map((card, index) => {
            const meta = lightMeta[index % lightMeta.length];
            const Icon = cardIcons[index % cardIcons.length];
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${meta.ring}`}
              >
                <span className={`absolute inset-x-0 top-0 h-1 w-0 transition-all duration-300 group-hover:w-full ${meta.bar}`} />
                <ArrowUpRight className={`absolute right-5 top-5 h-5 w-5 -translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${meta.arrow}`} />
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${meta.tile}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-5 text-xs font-bold tracking-wider text-gray-400">{card.number}</div>
                <h3 className="mt-1 text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
