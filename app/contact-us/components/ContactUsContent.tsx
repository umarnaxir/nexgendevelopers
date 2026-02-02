"use client";

import React, { useState } from "react";
import { MapPin, Globe, Users, Zap } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    title: "Location",
    description: "We work remotely worldwide.",
    detail: "No fixed office—we collaborate from wherever we are, so your project gets attention across time zones.",
  },
  {
    icon: Globe,
    title: "Remote-first",
    description: "Fully distributed team.",
    detail: "Our entire workflow is built for remote collaboration. Fast communication, async updates, and flexible scheduling.",
  },
  {
    icon: Users,
    title: "Freelancer network",
    description: "Skilled experts on demand.",
    detail: "A curated team of freelancers in development, design, and marketing. Right skills, no long-term overhead.",
  },
  {
    icon: Zap,
    title: "Quick turnaround",
    description: "Agile and responsive.",
    detail: "Small, focused teams mean faster decisions and delivery. From idea to launch without the usual delays.",
  },
];

export default function ContactUsContent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-8 sm:py-12 lg:py-16" data-aos="fade-up">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3 sm:mb-4">
          Why work with us
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
          A remote team of freelancers ready to bring your ideas to life. Interactive, responsive, and focused on delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(isActive ? null : index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`text-left w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] p-6 sm:p-7 lg:p-8 rounded-2xl border-2 transition-[border-color,background-color,box-shadow] duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
                isActive
                  ? "border-teal-500 bg-teal-50/80 shadow-lg"
                  : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className={`p-2.5 sm:p-3 rounded-xl transition-colors duration-300 ${isActive ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </span>
                <h3 className="font-bold text-black text-base sm:text-lg">{item.title}</h3>
              </div>
              <p className="text-gray-700 text-sm sm:text-base font-medium mb-2">{item.description}</p>
              <p className={`text-gray-600 text-sm sm:text-base transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-80"}`}>
                {item.detail}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
