"use client";

import HeroDecor from "@/components/HeroDecor";

export default function TermsHero() {
  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-8 sm:mb-12 lg:mb-16"
      data-aos="fade-up"
    >
      <HeroDecor />
      <div className="relative z-10 w-full container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gradient-light mb-3 sm:mb-4">
          Terms of Service
        </h1>
        <p className="text-base sm:text-lg text-silver-dark">Last updated: February 2, 2026</p>
        <p className="text-sm sm:text-base text-silver-light leading-relaxed mt-2 max-w-3xl mx-auto px-2">
          Please read these terms carefully before using our services. By accessing or using NexGen, you agree to be bound by these terms.
        </p>
        <p className="text-sm sm:text-base text-silver-light leading-relaxed mt-2 max-w-3xl mx-auto px-2">
          NexGen is a service-based team of freelance developers and designers. We help startups and local brands with AI/ML, chatbots, web &amp; app development, and digital marketing — crafting digital experiences that stand out and deliver results.
        </p>
      </div>
    </div>
  );
}
