"use client";

import HeroDecor from "@/components/HeroDecor";

export default function ServicesHero() {
  return (
    <header
      className="relative hero-grid left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-12 sm:mb-16 md:mb-20"
      data-aos="fade-up"
    >
      <HeroDecor />
      <div className="relative z-10 w-full container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          What We Offer
        </span>
        <h1
          id="services-heading"
          className="text-gradient-light mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight"
        >
          Our <span className="text-gradient-teal">Services</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-silver light:text-gray-600 max-w-5xl mx-auto leading-relaxed px-4">
          The goal is not just to build a website or an app, but to{" "}
          <span className="font-bold text-white light:text-gray-900">grow your business</span>.
          {" "}
          Explore our full range of development, digital marketing, and support services.
        </p>
      </div>
    </header>
  );
}
