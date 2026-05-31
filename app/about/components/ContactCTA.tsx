"use client";

import { useContactModal } from "@/components/modals/ContactModalProvider";

export default function ContactCTA() {
  const { open: openContactModal } = useContactModal();

  return (
    <div
      className="text-center pb-12 sm:pb-16"
      data-aos="fade-up"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gradient-light mb-3 sm:mb-4 px-2">Ready to Start Your <span className="text-gradient-teal">Project?</span></h2>
      <p className="text-base sm:text-lg text-silver mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
        Get in touch with us today for a free consultation and custom quote. Let's discuss how we can help bring your digital vision to life.
      </p>
      <button
        onClick={openContactModal}
        className="inline-block mt-2 mb-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm sm:text-base font-bold rounded-lg shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-teal-500 transition-all duration-300 uppercase tracking-wide active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
      >
        Contact Us Now
      </button>
    </div>
  );
}
