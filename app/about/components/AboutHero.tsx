"use client";

export default function AboutHero() {
  return (
    <div 
      className="text-start mb-8 sm:mb-10 md:mb-12"
      data-aos="fade-up"
    >
      {/* Subheading */}
      <p 
        className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-teal-600 mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider"
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
      >
        {/* Team of Freelancers */}
      </p>
      
      {/* Main Headline */}
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-4 sm:mb-6 tracking-tighter"
        style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.5)' }}
      >
        About NexGen Developers
      </h1>
      
      {/* Hero-aligned description */}
      <div className="max-w-4xl mt-6 sm:mt-8">
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-3"
          style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
        >
          A creative platform to <strong className="text-black">build</strong>, <strong className="text-black">launch</strong>, and <strong className="text-black">grow</strong> your business.
        </p>
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
          style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
        >
          We help startups and local brands with <span className="font-semibold text-black">AI/ML</span>, <span className="font-semibold text-black">chatbots</span>, <span className="font-semibold text-black">web & app development</span>, and <span className="font-semibold text-black">digital marketing</span> — crafting digital experiences that stand out and deliver results.
        </p>
      </div>
    </div>
  );
}
