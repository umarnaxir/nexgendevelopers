"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";

export default function ContactCTA() {
  const { open: openContactModal } = useContactModal();

  return (
    <div className="pb-12 sm:pb-16" data-aos="fade-up">
      <div className="relative overflow-hidden rounded-3xl bg-silver border border-teal-700/15 px-6 py-10 sm:px-10 sm:py-14 text-center shadow-xl">
        {/* Subtle teal glow accents */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-teal-600/10 blur-3xl" />

        <div className="relative z-10">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-700/25 bg-teal-700/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700 mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Let&apos;s Build Together
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3 sm:mb-4 px-2">
            Ready to Start Your <span className="text-teal-700">Project?</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 mb-7 sm:mb-9 max-w-2xl mx-auto px-2 leading-relaxed">
            Get in touch with us today for a free consultation and custom quote. Let&apos;s discuss how we can help bring your digital vision to life.
          </p>

          <button
            onClick={openContactModal}
            className="group inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-teal-700/30 hover:from-teal-500 hover:to-teal-600 hover:scale-[1.03] transition-all duration-300 uppercase tracking-wide active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/40"
          >
            Contact Us Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
