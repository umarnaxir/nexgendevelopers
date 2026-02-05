"use client";

import { blogs } from "../data";
import BlogCard from "./BlogCard";
import FeaturedBlogCard from "./FeaturedBlogCard";

export default function BlogsGrid() {
  const [featured, ...rest] = blogs;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
      data-aos="fade-up"
    >
      <div className="lg:col-span-3">
        <FeaturedBlogCard blog={featured} />
      </div>
      {rest.map((blog, index) => (
        <BlogCard key={blog.slug} blog={blog} index={index} />
      ))}
    </div>
  );
}
