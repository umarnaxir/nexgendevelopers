"use client";

import { LucideIcon } from "lucide-react";

interface TermsSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  /** @deprecated No longer used after removing motion animations */
  delay?: number;
  dark?: boolean;
  altBg?: boolean;
}

export default function TermsSection({ icon: Icon, title, children, dark = false, altBg = false }: TermsSectionProps) {
  const bgClass = "glass p-4 sm:p-6 lg:p-8 rounded-2xl transition-all duration-300";
  // dark and altBg retained for compatibility; all variants now use the same premium glass surface.
  void dark;
  void altBg;
  return (
    <section className={bgClass} data-aos="zoom-in">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
        <div className="flex-shrink-0 rounded-lg border border-teal-400/20 bg-teal-400/10 p-2 sm:p-3">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300" />
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">
            {title}
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-silver-light">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
