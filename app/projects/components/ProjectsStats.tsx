"use client";

import { stats } from "../data";
import { LucideIcon } from "lucide-react";

export default function ProjectsStats() {
  return (
    <section className="py-16 lg:py-24" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon as LucideIcon;
            return (
              <div
                key={index}
                className="group flex flex-col md:flex-col items-center justify-center text-center p-6 md:p-4 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] cursor-default"
                data-aos="zoom-in"
                data-aos-delay={index * 80}
              >
                <div className="inline-flex items-center justify-center w-36 h-36 md:w-28 md:h-28 lg:w-24 lg:h-24 border border-teal-400/20 bg-teal-400/10 text-teal-300 rounded-2xl mb-6 md:mb-5 shadow-lg shadow-teal-500/10 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-teal-500/20 group-active:scale-95">
                  <IconComponent className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12" />
                </div>
                <div className="text-5xl sm:text-6xl lg:text-6xl font-extrabold text-white mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg lg:text-lg text-silver-dark font-semibold">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
