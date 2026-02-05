"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getActivePosts } from "@/services/postsService";
import type { Post } from "@/services/postsService";
import { Clock } from "lucide-react";

interface RelatedPostsProps {
  currentPostId: string;
}

export default function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const allPosts = getActivePosts();
    const related = allPosts
      .filter((post) => post.id !== currentPostId)
      .slice(0, 3);
    setRelatedPosts(related);
  }, [currentPostId]);

  if (relatedPosts.length === 0) return null;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">More Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="relative w-full h-48 overflow-hidden bg-gray-100">
              <Image
                src={post.imageUrl}
                alt={post.description.slice(0, 50)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-900 font-medium line-clamp-2 text-sm mb-2 group-hover:text-black transition-colors">
                {post.description.slice(0, 100)}...
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(post.createdAt)}
              </div>
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.hashtags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs text-blue-600 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
