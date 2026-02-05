"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  Plus,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/types/auth";

interface PostsMobileNavProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onCreatePostClick?: () => void;
}

export default function PostsMobileNav({
  onLoginClick,
  onSignupClick,
  onCreatePostClick,
}: PostsMobileNavProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-around h-16 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  active ? "text-black" : "text-gray-500"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-black" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-gray-500"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 lg:hidden max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Menu</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && user ? (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg overflow-hidden shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {canAccessAdmin(user.role) && (
                      <>
                        <button
                          onClick={() => {
                            if (onCreatePostClick) {
                              onCreatePostClick();
                            } else {
                              window.location.href = "/admin/posts";
                            }
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                          <span className="font-medium">Create Post</span>
                        </button>
                        <Link
                          href="/admin/posts"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Settings className="w-5 h-5" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
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
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg text-black hover:bg-black hover:text-white transition-colors font-bold uppercase tracking-wide text-sm"
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
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold uppercase tracking-wide text-sm"
                    >
                      Sign Up
                    </button>
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-bold uppercase tracking-wide text-sm"
                    >
                      Get Started
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Join our community to create posts, save favorites, and connect with others.
                  </p>
                </div>
              )}

              {/* Additional Links */}
              <div className="space-y-2">
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
