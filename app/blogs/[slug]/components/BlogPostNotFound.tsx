"use client";

import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
        <p className="text-silver mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blogs" className="text-teal-300 font-bold hover:text-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
