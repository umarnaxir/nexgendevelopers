"use client";

import { useContactModal } from "@/components/modals/ContactModalProvider";

export default function BlogPostCTA() {
  const { open: openContactModal } = useContactModal();

  return (
    <div
      className="mt-12 p-8 bg-gray-50 rounded-xl border-2 border-black shadow-md text-center"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-black mb-4">Ready to Start Your Project?</h2>
      <p className="text-gray-700 mb-6">
        Let's discuss how we can help bring your ideas to life.
      </p>
      <button
        onClick={openContactModal}
        className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide hover:scale-105 active:scale-95"
      >
        Get in Touch
      </button>
    </div>
  );
}
