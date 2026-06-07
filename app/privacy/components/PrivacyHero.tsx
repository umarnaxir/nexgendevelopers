"use client";

import HeroDecor from "@/components/HeroDecor";

export default function PrivacyHero() {
  return (
    <div
      className="relative hero-grid left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-8 sm:mb-12 lg:mb-16"
      data-aos="fade-up"
    >
      <HeroDecor />
      <div className="relative z-10 w-full container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gradient-light mb-3 sm:mb-4">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-silver-dark light:text-gray-500">Last updated: February 2, 2026</p>
        <p className="text-sm sm:text-base text-silver-light light:text-gray-700 leading-relaxed mt-2 max-w-3xl mx-auto px-2">
          Your privacy is important to us. This policy explains how we collect, use, protect, and share your personal information when you browse our website, read our blog, or contact us about our services.
        </p>
      </div>
    </div>
  );
}
