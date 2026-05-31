"use client";

export default function AboutHero() {
  return (
    <div
      className="text-start mb-8 sm:mb-10 md:mb-12"
      data-aos="fade-up"
    >
      {/* Subheading */}
      <p
        className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-teal-300 mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider"
      >
        {/* Team of Freelancers */}
      </p>

      {/* Main Headline */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient-light mb-4 sm:mb-6 tracking-tighter"
      >
        About NexGen <span className="text-gradient-teal">Developers</span>
      </h1>

      {/* Hero-aligned description */}
      <div className="max-w-4xl mt-6 sm:mt-8">
        <p
          className="text-base sm:text-lg md:text-xl text-silver-light leading-relaxed mb-3"
        >
          A creative platform to <strong className="text-white">build</strong>, <strong className="text-white">launch</strong>, and <strong className="text-white">grow</strong> your business.
        </p>
        <p
          className="text-base sm:text-lg md:text-xl text-silver leading-relaxed"
        >
          We help startups and local brands with <span className="font-semibold text-white">AI/ML</span>, <span className="font-semibold text-white">chatbots</span>, <span className="font-semibold text-white">web & app development</span>, and <span className="font-semibold text-white">digital marketing</span> — crafting digital experiences that stand out and deliver results.
        </p>
      </div>
    </div>
  );
}
