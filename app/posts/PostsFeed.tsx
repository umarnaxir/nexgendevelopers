"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Plus,
  Settings,
  User,
  Calendar,
  Heart,
  MessageCircle,
} from "lucide-react";
import { getActivePosts, initializePosts, type Post } from "@/services/postsService";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";

const DESCRIPTION_PREVIEW_LENGTH = 80;

export default function PostsFeed() {
  const { user, isAuthenticated, canAccessAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    initializePosts();
    setPosts(getActivePosts());
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
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const descriptionPreview = (text: string) =>
    text.length <= DESCRIPTION_PREVIEW_LENGTH
      ? text
      : `${text.slice(0, DESCRIPTION_PREVIEW_LENGTH).trim()}…`;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-10 md:py-10 lg:py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>

        {/* Header - constrained width to match card below */}
        <header className="mb-6 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Posts
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            A place to share thoughts, updates, and ideas...
          </p>
        </header>

        {/* Add post CTA - same width as header text; dummy profile for guests; small button */}
        <div className="mb-6 max-w-xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                {isAuthenticated && user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate text-sm">
                  {isAuthenticated ? user?.name : "Profile"}
                </p>
                <p className="text-xs text-gray-500">
                  {isAuthenticated
                    ? isAdmin
                      ? "Add a post from Admin"
                      : "Viewing community feed"
                    : "Log in to add a post"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddPostCTA}
              className="flex items-center gap-1 px-2 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-xs font-medium shrink-0 w-fit"
              aria-label={isAuthenticated && isAdmin ? "Add post" : "Add post (login required)"}
            >
              <Plus className="w-5 h-5" />
              Add Post
            </button>
          </div>
        </div>

        {/* Posts grid - small cards, scalable */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.length === 0 ? (
            <div className="col-span-full rounded-xl bg-white border border-gray-200 p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-2">No posts yet</h2>
              <p className="text-gray-600 text-sm mb-4 max-w-sm mx-auto">
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
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={handleAddPostCTA}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Log in to add a post
                </button>
              )}
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.location && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      {post.location}
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-gray-900 text-xs leading-snug line-clamp-2">
                    {descriptionPreview(post.description)}
                  </p>
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {post.hashtags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-blue-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.hashtags.length > 3 && (
                        <span className="text-[10px] text-gray-400">+{post.hashtags.length - 3}</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 min-w-0">
                      {post.authorName && (
                        <span className="truncate flex items-center gap-0.5">
                          <User className="w-3 h-3 shrink-0" />
                          {post.authorName}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => toggleLike(e, post.id)}
                        className={`p-1 rounded-full transition-colors ${
                          likedIds.has(post.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                        }`}
                        aria-label="Like"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedIds.has(post.id) ? "fill-current" : ""}`} />
                      </button>
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                        aria-label="Comment"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>

      {/* Full post modal - interactive detail view */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title=""
        size="md"
      >
        {selectedPost && (
          <div className="p-2">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-3">
              <img
                src={selectedPost.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap mb-2">
              {selectedPost.description}
            </p>
            {selectedPost.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedPost.hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-blue-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
              {selectedPost.authorName && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedPost.authorName}
                </span>
              )}
              {selectedPost.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedPost.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(selectedPost.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={(e) => toggleLike(e, selectedPost.id)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  likedIds.has(selectedPost.id) ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${likedIds.has(selectedPost.id) ? "fill-current" : ""}`} />
                Like
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Comment
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
