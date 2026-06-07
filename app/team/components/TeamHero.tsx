"use client";

import HeroDecor from "@/components/HeroDecor";

export default function TeamHero() {
  return (
    <section
      className="relative hero-grid overflow-hidden min-h-[50vh] flex items-center justify-center py-12"
      data-aos="fade-up"
    >
      <HeroDecor />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center" data-aos="zoom-in">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white light:text-gray-900 mb-4 sm:mb-6"
        >
          Meet the NexGen Team
        </h1>
        <p
          className="text-sm sm:text-base md:text-lg text-gray-300 light:text-gray-600 leading-relaxed max-w-3xl mx-auto px-2"
        >
          Meet the talented professionals behind NexGen Developer — a collaborative group of engineers, designers, AI specialists, and SEO experts working across leading companies and contributing part-time as a unified freelance team to build innovative digital solutions.
        </p>
      </div>
    </section>
  );
}
