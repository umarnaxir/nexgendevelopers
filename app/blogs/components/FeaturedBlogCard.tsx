"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FeaturedBlogCardProps {
  blog: {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
  };
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-2xl overflow-hidden"
      data-aos="zoom-in"
    >
      <article className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[320px] overflow-hidden rounded-2xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="100vw"
          priority
        />
        {/* Strong gradient so text always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
          <span className="inline-block w-fit px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider mb-4">
            {blog.category}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 max-w-4xl">
            {blog.title}
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl line-clamp-2 mb-4">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-sm text-white/70 uppercase tracking-widest">
              {blog.date}
            </time>
            <span className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all duration-200">
              Read story
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
