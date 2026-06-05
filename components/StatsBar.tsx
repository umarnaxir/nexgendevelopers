"use client";

import { Star, Rocket, Smile, Globe } from "lucide-react";

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered" },
  { icon: Smile, value: "30+", label: "Happy Clients" },
  { icon: Star, value: "98%", label: "Client Satisfaction" },
  { icon: Globe, value: "12+", label: "Countries Served" },
];

export default function StatsBar() {
  return (
    <section className="py-10 lg:py-12" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl px-5 py-5 sm:px-8 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="group flex items-center gap-3 sm:gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/10 text-teal-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/20">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs text-silver-dark sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
