"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import type { Post } from "@/services/postsService";
import { useAuth } from "@/contexts/AuthContext";

const SAVED_POSTS_KEY = "nexgen_saved_posts";
const LIKED_POSTS_KEY = "nexgen_liked_posts";

function getSavedPosts(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem(SAVED_POSTS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

function getLikedPosts(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const liked = localStorage.getItem(LIKED_POSTS_KEY);
    return liked ? new Set(JSON.parse(liked)) : new Set();
  } catch {
    return new Set();
  }
}

function toggleSavedPost(postId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = getSavedPosts();
    if (saved.has(postId)) {
      saved.delete(postId);
    } else {
      saved.add(postId);
    }
    localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(Array.from(saved)));
    return saved.has(postId);
  } catch {
    return false;
  }
}

function toggleLikedPost(postId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const liked = getLikedPosts();
    if (liked.has(postId)) {
      liked.delete(postId);
    } else {
      liked.add(postId);
    }
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(Array.from(liked)));
    return liked.has(postId);
  } catch {
    return false;
  }
}

interface PostActionsProps {
  post: Post;
}

export default function PostActions({ post }: PostActionsProps) {
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setSaved(getSavedPosts().has(post.id));
    setLiked(getLikedPosts().has(post.id));
  }, [post.id]);

  const postUrl = typeof window !== "undefined" ? `${window.location.origin}/posts/${post.slug}` : "";
  const postTitle = post.description.slice(0, 100);
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(postTitle);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleLike = () => {
    const isLiked = toggleLikedPost(post.id);
    setLiked(isLiked);
  };

  const handleSave = () => {
    const isSaved = toggleSavedPost(post.id);
    setSaved(isSaved);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === "facebook" || platform === "twitter" || platform === "linkedin") {
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white py-2 mt-3">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Actions Group */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors ${
              liked
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-red-500"
            }`}
            aria-label="Like"
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Like</span>
          </button>

          <a
            href="#comments"
            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">Comment</span>
          </a>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-medium">Share</span>
            </button>

            {showShareMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowShareMenu(false)}
                />
                <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-20">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium">Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Save Button - Right End on Desktop */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 transition-colors shrink-0 ${
            saved
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-gray-500 hover:text-yellow-500"
          }`}
          aria-label="Save post"
        >
          <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
          <span className="text-xs font-medium">Save</span>
        </button>
      </div>
    </div>
  );
}
