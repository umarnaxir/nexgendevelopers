"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  MapPin,
  Plus,
  Settings,
  User,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { getActivePosts, initializePosts, type Post } from "@/services/postsService";
import { useAuth } from "@/contexts/AuthContext";
import PostsSidebar from "./components/PostsSidebar";
import PostsMobileNav from "./components/PostsMobileNav";
import LoginModal from "@/components/modals/LoginModal";
import SignupModal from "@/components/modals/SignupModal";
import Footer from "@/components/Footer/Footer";

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

export default function PostsFeed() {
  const { user, isAuthenticated, canAccessAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Listen for modal events
  useEffect(() => {
    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    const handleOpenSignupModal = () => setIsSignupModalOpen(true);

    window.addEventListener("openLoginModal", handleOpenLoginModal);
    window.addEventListener("openSignupModal", handleOpenSignupModal);
    
    return () => {
      window.removeEventListener("openLoginModal", handleOpenLoginModal);
      window.removeEventListener("openSignupModal", handleOpenSignupModal);
    };
  }, []);

  useEffect(() => {
    initializePosts();
    setPosts(getActivePosts());
    setSavedIds(getSavedPosts());
    setLikedIds(getLikedPosts());
  }, []);

  const isAdmin = user && canAccessAdmin();

  const handleAddPostCTA = () => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      return;
    }
    if (isAdmin) {
      window.location.href = "/admin/posts";
    } else {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
    }
  };

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = toggleLikedPost(postId);
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (isLiked) next.add(postId);
      else next.delete(postId);
      return next;
    });
  };

  const handleSave = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const isSaved = toggleSavedPost(postId);
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isSaved) next.add(postId);
      else next.delete(postId);
      return next;
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Posts</h1>
                <p className="text-xs text-gray-500">Community feed</p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={handleAddPostCTA}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 pb-24 lg:pb-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <button
              onClick={handleAddPostCTA}
              className="flex-1 text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              {isAuthenticated ? "What's on your mind?" : "Log in to create a post"}
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No posts yet</h2>
            <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
              Be the first to share. Add a post from the Admin panel if you have access.
            </p>
            {isAuthenticated && isAdmin && (
              <button
                onClick={handleAddPostCTA}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                <Settings className="w-4 h-4" />
                Add post in Admin
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Post Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                        {post.authorName ? (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {post.authorName.charAt(0).toUpperCase()}
                          </div>
                        ) : (
                          <User className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {post.authorName || "Anonymous"}
                          </p>
                          {post.location && (
                            <>
                              <span className="text-gray-400">·</span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {post.location}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(post.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-900 leading-relaxed line-clamp-3 group-hover:text-black transition-colors">
                    {post.description}
                  </p>
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.hashtags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.hashtags.length > 4 && (
                        <span className="text-xs px-2 py-1 text-gray-500">+{post.hashtags.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="relative w-full h-64 sm:h-80 bg-gray-100 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.description.slice(0, 50)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button
                        onClick={(e) => toggleLike(e, post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          likedIds.has(post.id)
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                        aria-label="Like"
                      >
                        <Heart className={`w-5 h-5 ${likedIds.has(post.id) ? "fill-current" : ""}`} />
                        <span className="text-sm font-medium">Like</span>
                      </button>
                      <Link
                        href={`/posts/${post.slug}#comments`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Comment</span>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSave(e, post.id);
                      }}
                      className={`flex items-center gap-2 transition-colors shrink-0 ${
                        savedIds.has(post.id)
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-500 hover:text-yellow-500"
                      }`}
                      aria-label="Save post"
                    >
                      <Bookmark className={`w-5 h-5 ${savedIds.has(post.id) ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">Save</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
          </div>

          {/* Sidebar */}
          <PostsSidebar 
            onLoginClick={() => setIsLoginModalOpen(true)}
            onSignupClick={() => setIsSignupModalOpen(true)}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Navigation */}
      <PostsMobileNav
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
        onCreatePostClick={handleAddPostCTA}
      />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setTimeout(() => setIsSignupModalOpen(true), 100);
        }}
      />
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setTimeout(() => setIsLoginModalOpen(true), 100);
        }}
      />
    </div>
  );
}
