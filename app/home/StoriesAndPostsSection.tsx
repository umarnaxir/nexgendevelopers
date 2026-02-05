"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Play, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Blogs",
    description: "Read articles, guides, and insights. Learn and stay updated with tips and ideas.",
    icon: BookOpen,
    href: "/blogs",
    cta: "Read blogs",
  },
  {
    title: "Posts",
    description: "Share ideas, tips, and updates. Post about your project or promote your business.",
    icon: FileText,
    href: "/posts",
    cta: "View & post",
  },
  {
    title: "Stories",
    description: "Add or watch short stories. Promote your business, launch, or event in a visual way.",
    icon: Play,
    href: "/stories",
    cta: "Stories",
  },
];

export default function StoriesAndPostsSection() {
  return (
    <section
      id="stories-posts"
      className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden"
      data-aos="fade-up"
    >
      {/* Same grid background as other sections */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="zoom-in">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4"
            style={{
              textShadow:
                "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)",
            }}
          >
            Blogs · Posts · Stories
          </h2>
          <p
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            Read, share, and connect. Blogs for insights, posts for ideas, stories for quick updates.
          </p>
        </div>

        {/* Cards Grid - interactive hover: scale, teal border/glow, icon bounce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Link
                  href={item.href}
                  className="flex flex-col h-full bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-500 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black flex items-center justify-center text-white transition-all duration-300 group-hover:bg-teal-500">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 group-hover:text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center font-bold text-black group-hover:text-teal-600 transition-colors duration-300 text-sm sm:text-base">
                    {item.cta}
                    <ArrowRight className="w-5 h-5 ml-2 transition-colors duration-300" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick links - interactive hover */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-3">Quick links</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/blogs"
              className="text-sm font-medium text-black hover:text-teal-600 underline underline-offset-2 transition-colors duration-300 inline-block"
            >
              Blogs
            </Link>
            <Link
              href="/posts"
              className="text-sm font-medium text-black hover:text-teal-600 underline underline-offset-2 transition-colors duration-300 inline-block"
            >
              Posts
            </Link>
            <Link
              href="/stories"
              className="text-sm font-medium text-black hover:text-teal-600 underline underline-offset-2 transition-colors duration-300 inline-block"
            >
              Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
