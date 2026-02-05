"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import type { Post } from "@/services/postsService";
import { useAuth } from "@/contexts/AuthContext";

interface PostHeroProps {
  post: Post;
}

export default function PostHero({ post }: PostHeroProps) {
  const { user } = useAuth();
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { 
      year: "numeric",
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Image with Buttons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative w-full h-80 sm:h-96 md:h-[32rem] lg:h-[36rem] overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
          <Image
            src={post.imageUrl}
            alt={post.description.slice(0, 50)}
            fill
            className="object-cover"
            priority
          />

          {/* Back Button - Top Left */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Back</span>
            </Link>
          </div>

          {/* User Avatar - Top Right */}
          {user && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg border-2 border-white/50 relative overflow-hidden">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          )}

          {/* Location Badge - Bottom Left */}
          {post.location && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs sm:text-sm font-medium rounded-lg shadow-lg">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                {post.location}
              </span>
            </div>
          )}
        </div>

        {/* Author Info - Below Hero Image */}
        <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base sm:text-lg shrink-0">
            {post.authorName ? post.authorName.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900 text-base sm:text-lg">
              {post.authorName || "Anonymous"}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-0.5">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {formatTimeAgo(post.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
