"use client";

import type { Post } from "@/services/postsService";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="pt-2 sm:pt-3 pb-2 sm:pb-3">
      {/* Description */}
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-900 text-base sm:text-lg leading-relaxed whitespace-pre-wrap mb-3 sm:mb-4">
          {post.description}
        </p>
      </div>

      {/* Hashtags */}
      {post.hashtags && post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
