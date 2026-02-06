"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Plus, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getActiveStories, initializeStories, type Story } from "@/services/storiesService";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/types/auth";

const STORY_DURATION_MS = 5000;

export default function StoriesBar() {
  const { user, isAuthenticated, canAccessAdmin: userCanAccessAdmin } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewing, setIsViewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isAdmin = user && userCanAccessAdmin();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    initializeStories();
    setStories(getActiveStories());
  }, []);

  const currentStory = stories[currentIndex];
  const hasNext = currentIndex < stories.length - 1;
  const hasPrev = currentIndex > 0;

  const goNext = useCallback(() => {
    if (hasNext) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      setIsViewing(false);
      setProgress(0);
    }
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  }, [hasPrev]);

  // Auto-advance progress bar and story
  useEffect(() => {
    if (!isViewing || !currentStory) return;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / STORY_DURATION_MS) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        goNext();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isViewing, currentIndex, currentStory?.id, goNext]);

  const openStory = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsViewing(true);
  };

  const closeViewer = () => {
    setIsViewing(false);
    setProgress(0);
    document.body.style.overflow = "unset";
  };

  // Prevent body scroll when viewing stories
  useEffect(() => {
    if (isViewing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isViewing]);

  const handleAddStoryCTA = () => {
    if (isAdmin) {
      window.location.href = "/admin/stories";
    } else {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
    }
  };

  // Don't render if no stories and not admin
  if (stories.length === 0 && !isAdmin) {
    return null;
  }

  return (
    <>
      <div className="py-2 mb-6">
        <div className="flex items-start gap-3 overflow-x-auto overflow-y-visible px-4 py-2 scrollbar-hide">
          {/* Add story circle - first */}
          {(isAdmin || stories.length > 0) && (
            <button
              type="button"
              onClick={handleAddStoryCTA}
              className="flex-shrink-0 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full p-2"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-200 group-hover:bg-gray-100 group-hover:scale-105 group-active:scale-95 shrink-0 p-1">
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-gray-300 group-hover:border-gray-900 transition-colors duration-200" />
                <Plus className="w-6 h-6 sm:w-8 text-gray-500 group-hover:text-gray-900 transition-colors relative z-10" />
              </div>
              <span className="text-xs text-gray-600 max-w-[64px] sm:max-w-[80px] truncate text-center group-hover:text-gray-900 transition-colors">
                Add story
              </span>
            </button>
          )}

          {/* Story circles */}
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full p-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 transition-all duration-200 group-hover:border-gray-900 group-hover:scale-105 group-active:scale-95 shrink-0 box-border p-1">
                <img
                  src={story.imageUrl}
                  alt={story.caption || "Story"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {story.caption && (
                <span className="text-xs text-gray-600 max-w-[64px] sm:max-w-[80px] truncate text-center group-hover:text-gray-900 transition-colors">
                  {story.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen story viewer - rendered via portal */}
      {mounted && isViewing && currentStory && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black flex flex-col"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            zIndex: 9999
          }}
        >
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
            {stories.map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-75"
                  style={{
                    width:
                      i < currentIndex
                        ? "100%"
                        : i === currentIndex
                          ? `${progress}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Close button - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeViewer}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 z-10 -translate-y-1/2">
            <button
              onClick={goPrev}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-0 disabled:pointer-events-none"
              disabled={!hasPrev}
              aria-label="Previous story"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={goNext}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-0 disabled:pointer-events-none"
              disabled={!hasNext}
              aria-label="Next story"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Tap zones: left = prev, right = next */}
          <div className="absolute inset-0 flex z-0">
            <button
              className="flex-1 cursor-pointer"
              onClick={goPrev}
              aria-hidden
            />
            <button
              className="flex-1 cursor-pointer"
              onClick={goNext}
              aria-hidden
            />
          </div>

          {/* Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={currentStory.imageUrl}
              alt={currentStory.caption || "Story"}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
