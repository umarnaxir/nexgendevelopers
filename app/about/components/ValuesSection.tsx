"use client";

import { aboutValues } from "../data";

export default function ValuesSection() {
  return (
    <div className="mb-12 md:mb-16" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-light text-center mb-8 md:mb-12 px-2" data-aos="zoom-in">
        Our <span className="text-gradient-teal">Values</span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {aboutValues.map((value, index) => {
          const Icon = value.icon;
          const isFeatured = value.isFeatured;

          return (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
              className={`group flex flex-col items-center text-center p-4 sm:p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                isFeatured
                  ? "border border-teal-400/20 bg-gradient-to-br from-teal-600/25 via-teal-800/10 to-black hover:border-teal-400/40 hover:shadow-[0_24px_50px_-28px_rgba(20,184,166,0.6)]"
                  : "glass-card"
              }`}
            >
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/10 text-teal-300 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/20">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                {value.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-silver-dark">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
