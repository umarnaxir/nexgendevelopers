"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Bookmark,
  TrendingUp,
  User,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getActivePosts } from "@/services/postsService";
import type { Post } from "@/services/postsService";
import { canAccessAdmin } from "@/types/auth";

const SAVED_POSTS_KEY = "nexgen_saved_posts";

function getSavedPosts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SAVED_POSTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

interface PostsSidebarProps {
  currentPostSlug?: string;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export default function PostsSidebar({ currentPostSlug, onLoginClick, onSignupClick }: PostsSidebarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedIds = getSavedPosts();
    setSavedPostIds(savedIds);
    
    if (savedIds.length > 0) {
      const allPosts = getActivePosts();
      const saved = allPosts.filter((post) => savedIds.includes(post.id)).slice(0, 5);
      setSavedPosts(saved);
    }
  }, []);

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/posts", label: "Posts", icon: MessageSquare },
    { href: "/blogs", label: "Blogs", icon: BookOpen },
    { href: "/stories", label: "Stories", icon: ImageIcon },
  ];

  const isActive = (href: string) => {
    if (href === "/posts") {
      return pathname === "/posts" || pathname?.startsWith("/posts/");
    }
    return pathname === href;
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 space-y-6 pb-8">
        {/* Navigation Menu */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Section */}
        {isAuthenticated && user ? (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg overflow-hidden shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            {canAccessAdmin(user.role) && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Link
                  href="/admin/posts"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Admin Panel</span>
                </Link>
              </div>
            )}
            <div className="mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Get Started
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  if (onLoginClick) {
                    onLoginClick();
                  } else {
                    window.dispatchEvent(new CustomEvent("openLoginModal"));
                  }
                }}
                className="w-full px-4 py-2.5 border-2 border-black rounded-lg text-black hover:bg-black hover:text-white transition-colors text-sm font-bold uppercase tracking-wide"
              >
                Login
              </button>
              <button
                onClick={() => {
                  if (onSignupClick) {
                    onSignupClick();
                  } else {
                    window.dispatchEvent(new CustomEvent("openSignupModal"));
                  }
                }}
                className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-bold uppercase tracking-wide"
              >
                Sign Up
              </button>
              <Link
                href="/"
                className="block w-full px-4 py-2.5 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-bold uppercase tracking-wide"
              >
                Get Started
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Join our community to create posts, save favorites, and connect with others.
            </p>
          </div>
        )}

        {/* Saved Posts */}
        {savedPosts.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Saved Posts
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              {savedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className={`block p-2 rounded-lg transition-colors ${
                    currentPostSlug === post.slug
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className="text-xs font-medium line-clamp-2 mb-1">
                    {post.description.slice(0, 60)}...
                  </p>
                  <div className="flex items-center gap-1 text-xs opacity-70">
                    <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </Link>
              ))}
              {savedPostIds.length > 5 && (
                <Link
                  href="/posts?tab=saved"
                  className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-black transition-colors pt-2"
                >
                  View all saved
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {isAuthenticated && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-4">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {canAccessAdmin(user?.role) && (
                <Link
                  href="/admin/posts"
                  className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Create Post
                </Link>
              )}
              <Link
                href="/blogs"
                className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200"
              >
                <BookOpen className="w-4 h-4" />
                Read Blogs
              </Link>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
