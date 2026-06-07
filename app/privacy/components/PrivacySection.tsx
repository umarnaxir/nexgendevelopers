"use client";

import { LucideIcon } from "lucide-react";

interface PrivacySectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
  altBg?: boolean;
}

export default function PrivacySection({ icon: Icon, title, children, delay = 0, dark = false, altBg = false }: PrivacySectionProps) {
  const bgClass = "glass p-4 sm:p-6 lg:p-8 rounded-2xl transition-all duration-300";
  // dark and altBg retained for compatibility; all variants now use the same premium glass surface.
  void dark;
  void altBg;
  return (
    <section
      className={bgClass}
      data-aos="zoom-in"
      data-aos-delay={delay * 100}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
        <div className="flex-shrink-0 rounded-lg border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 p-2 sm:p-3">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300 light:text-teal-700" />
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white light:text-gray-900">
            {title}
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-silver-light light:text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
