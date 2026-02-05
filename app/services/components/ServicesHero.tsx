"use client";

export default function ServicesHero() {
  return (
    <header
      className="text-center mb-12 sm:mb-16 md:mb-20"
      data-aos="fade-up"
    >
      <h1
        id="services-heading"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-4 sm:mb-6 tracking-tight"
        style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.5)' }}
      >
        Our Services
      </h1>
      <p 
        className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed px-4"
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
      >
        The goal is not just to build a website or an app, but to{" "}
        <span className="font-bold text-black">grow your business</span>.
        {" "}
        Explore our full range of development, digital marketing, and support services.
      </p>
    </header>
  );
}
