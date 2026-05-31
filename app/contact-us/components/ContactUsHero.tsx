"use client";

import Image from "next/image";

export default function ContactUsHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 lg:mb-16" data-aos="fade-up">
      <div className="relative aspect-[21/9] min-h-[180px] sm:min-h-[220px] md:min-h-[280px]">
        <Image
          src="/images/blogs/dummy-img.jpeg"
          alt="Contact us - Get in touch with our team"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-6 sm:pb-8 md:pb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 sm:mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl">
            We work remotely with a team of freelancers. Reach out—we&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}
