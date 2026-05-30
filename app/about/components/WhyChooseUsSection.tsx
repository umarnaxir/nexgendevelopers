"use client";

import { Users, Layers, Wallet, Rocket, ArrowUpRight } from "lucide-react";
import { whyChooseUsCards } from "../data";

const cardMeta = [
  {
    icon: Users,
    tile: "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
    arrow: "text-teal-500",
    ring: "hover:border-teal-400",
    bar: "bg-teal-500",
  },
  {
    icon: Layers,
    tile: "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white",
    arrow: "text-orange-500",
    ring: "hover:border-orange-400",
    bar: "bg-orange-500",
  },
  {
    icon: Wallet,
    tile: "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
    arrow: "text-amber-500",
    ring: "hover:border-amber-400",
    bar: "bg-amber-500",
  },
  {
    icon: Rocket,
    tile: "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
    arrow: "text-teal-500",
    ring: "hover:border-teal-400",
    bar: "bg-teal-500",
  },
];

export default function WhyChooseUsSection() {
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
            const meta = cardMeta[index % cardMeta.length];
            const Icon = meta.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${meta.ring}`}
              >
                {/* top accent bar grows on hover */}
                <span
                  className={`absolute inset-x-0 top-0 h-1 w-0 transition-all duration-300 group-hover:w-full ${meta.bar}`}
                />

                {/* slide-in arrow */}
                <ArrowUpRight
                  className={`absolute right-5 top-5 h-5 w-5 -translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${meta.arrow}`}
                />

                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${meta.tile}`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <div className="mt-5 text-xs font-bold tracking-wider text-gray-400">
                  {card.number}
                </div>
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
