"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import { ArrowRight } from "lucide-react";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import Hamburger from "./Hamburger";
import type { NavLinkItem } from "./Navbar";

interface MobileNavProps {
  isOpen: boolean;
  links: NavLinkItem[];
  onLinkClick: () => void;
  onClose: () => void;
  onGetInTouch: () => void;
}

export default function MobileNav({
  isOpen,
  links,
  onLinkClick,
  onClose,
  onGetInTouch,
}: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => AOS.refresh(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-[99] min-h-svh bg-white overflow-y-auto animate-mobile-nav-in"
    >
      {/* Top bar with logo and close button */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 sm:px-6 bg-white shrink-0">
        <div onClick={onClose}>
          <NavLogo />
        </div>
        <Hamburger isOpen={true} onClick={onClose} spinOnMount />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-8 pt-2 space-y-1">
        <NavLinks links={links} isMobile onLinkClick={onLinkClick} />

        <div className="pt-4 mt-2" data-aos="fade-up" data-aos-duration="600">
          <button
            type="button"
            onClick={onGetInTouch}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 py-3 px-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:from-teal-500 hover:to-teal-600 hover:scale-[1.02] active:scale-[0.98]"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
