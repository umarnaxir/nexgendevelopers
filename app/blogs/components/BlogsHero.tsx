"use client";

export default function BlogsHero() {
  return (
    <div 
      className="text-center mb-10 pt-8"
      data-aos="fade-up"
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
        Our Blog
      </span>
      <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gradient-light mb-4">
        Our <span className="text-gradient-teal">Blog</span>
      </h1>
      <p className="text-xl text-silver max-w-3xl mx-auto">
        Insights, tips, and updates from the NexGen Developers team
      </p>
    </div>
  );
}
