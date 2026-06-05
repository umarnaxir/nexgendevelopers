"use client";

import HeroDecor from "@/components/HeroDecor";

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden min-h-[50vh] flex items-center justify-center pb-12" data-aos="fade-up">
      <HeroDecor />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div
          className="text-center"
          data-aos="zoom-in"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gradient-light mb-4 leading-tight">
            Our <span className="text-gradient-teal">Projects</span>
          </h1>
          <p className="text-xl sm:text-2xl text-silver max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions across healthcare, hospitality, nonprofit, and enterprise sectors
          </p>
        </div>
      </div>
    </section>
  );
}
