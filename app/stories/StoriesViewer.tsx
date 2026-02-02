"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogIn,
  Settings,
  Image as ImageIcon,
  Clock,
  Plus,
  Info,
  MousePointer,
  Hand,
  Square,
  ChevronsLeftRight,
} from "lucide-react";
import { getActiveStories, initializeStories, type Story } from "@/services/storiesService";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/types/auth";
import Modal from "@/components/ui/Modal";

const STORY_DURATION_MS = 5000;

const HOVER_OPEN_DELAY_MS = 500;

export default function StoriesViewer() {
  const { user, isAuthenticated, canAccessAdmin: userCanAccessAdmin } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewing, setIsViewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const hoverOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initializeStories();
    setStories(getActiveStories());
  }, []);

  const currentStory = stories[currentIndex];
  const hasNext = currentIndex < stories.length - 1;
  const hasPrev = currentIndex > 0;
  const isAdmin = user && userCanAccessAdmin();

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
  };

  const handleAddStoryCTA = () => {
    if (isAdmin) {
      window.location.href = "/admin/stories";
    } else {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
    }
  };

  const openInstructionsModal = () => {
    setShowInstructionsModal(true);
  };

  const closeInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  const clearHoverTimer = () => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
  };

  const handleInfoMouseEnter = () => {
    clearHoverTimer();
    hoverOpenTimerRef.current = setTimeout(openInstructionsModal, HOVER_OPEN_DELAY_MS);
  };

  const handleInfoMouseLeave = () => {
    clearHoverTimer();
  };

  useEffect(() => {
    return () => clearHoverTimer();
  }, []);

  if (stories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📖</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">No stories yet</h1>
          <p className="text-gray-600 mb-6">
            Add your first story from the Admin panel and promote your business here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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

        {/* Latest stories - above the rest */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-900">Latest stories</h2>
            <button
              type="button"
              onClick={openInstructionsModal}
              onMouseEnter={handleInfoMouseEnter}
              onMouseLeave={handleInfoMouseLeave}
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1"
              aria-label="How to use Stories"
              title="How to use Stories"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Tap a story to view. Swipe or use arrows to move between stories.
          </p>

          <div className="flex items-start gap-6 overflow-x-auto overflow-y-visible pb-4 pt-1 -mx-4 px-4 scrollbar-hide">
            {/* Add story circle - first */}
            <button
              type="button"
              onClick={handleAddStoryCTA}
              className="flex-shrink-0 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-100 group-hover:scale-105 group-active:scale-95 shrink-0">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 group-hover:text-gray-900 transition-colors" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 max-w-[80px] sm:max-w-[96px] truncate text-center group-hover:text-gray-900 transition-colors">
                Add story
              </span>
            </button>

            {/* Story circles - proper circles, no clipping */}
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => openStory(index)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 transition-all duration-200 group-hover:border-gray-900 group-hover:scale-105 group-active:scale-95 shrink-0 box-border">
                  <img
                    src={story.imageUrl}
                    alt={story.caption || "Story"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {story.caption && (
                  <span className="text-xs sm:text-sm text-gray-600 max-w-[80px] sm:max-w-[96px] truncate text-center group-hover:text-gray-900 transition-colors">
                    {story.caption}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Hero / Promo section */}
        <section className="mb-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-white/10">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Add your business promotion
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Promote yourself on our platform. You can promote your business, offers, or updates here — once you’re logged in and add a story, it reaches our audience. Share your story for up to 24 hours (or set your own duration).
              </p>
            </div>
          </div>
          <button
            onClick={handleAddStoryCTA}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            {isAdmin ? (
              <>
                <Settings className="w-4 h-4" />
                Add your story in Admin
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login to add your story
              </>
            )}
          </button>
          {!isAdmin && isAuthenticated && (
            <p className="text-gray-400 text-xs mt-3">
              Only team members can add stories. Contact us if you’d like to promote here.
            </p>
          )}
        </section>

      </div>

      {/* How to use Stories - instructions modal */}
      <Modal
        isOpen={showInstructionsModal}
        onClose={closeInstructionsModal}
        title="How to use Stories"
        size="xl"
      >
        <div className="text-gray-700 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-gray-600">
            Use the stories page to view and add short-lived updates. Here’s how everything works:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <li className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <MousePointer className="w-3.5 h-3.5 text-gray-700" />
              </span>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 text-sm">View a story</span>
                <p className="text-xs text-gray-600 mt-0.5">Tap any story circle to open full-screen; it auto-advances.</p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <ChevronsLeftRight className="w-3.5 h-3.5 text-gray-700" />
              </span>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 text-sm">Navigate</span>
                <p className="text-xs text-gray-600 mt-0.5">Tap left/right or use arrows; swipe on touch.</p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <Square className="w-3.5 h-3.5 text-gray-700" />
              </span>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 text-sm">Close viewer</span>
                <p className="text-xs text-gray-600 mt-0.5">Click X at the top to exit.</p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <Hand className="w-3.5 h-3.5 text-gray-700" />
              </span>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 text-sm">Progress bars</span>
                <p className="text-xs text-gray-600 mt-0.5">Bars at top show progress; next story opens when full.</p>
              </div>
            </li>
            <li className="flex gap-2 items-start sm:col-span-2 lg:col-span-1">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-gray-700" />
              </span>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 text-sm">Add your story</span>
                <p className="text-xs text-gray-600 mt-0.5">Use "Add story" or Admin → Stories; upload image, caption, link. 24h.</p>
              </div>
            </li>
          </ul>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-600" />
              How to add your story on our platform
            </h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 text-sm">Log in</span>
                  <p className="text-xs text-gray-600 mt-0.5">Login button in header or footer.</p>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 text-sm">Go to Admin</span>
                  <p className="text-xs text-gray-600 mt-0.5">Profile menu → “Admin Panel” (if you have access).</p>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 text-sm">Add story</span>
                  <p className="text-xs text-gray-600 mt-0.5">Sidebar: “Stories” → “Add Story”. Image/URL, caption, link.</p>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                  <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900 text-sm">24 hours</span>
                    <p className="text-xs text-gray-600 mt-0.5">(or custom expiry). Visible to logged-in users.</p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </Modal>

      {/* Full-screen story viewer */}
      {isViewing && currentStory && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
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

          {/* Close / nav */}
          <div className="absolute top-12 left-0 right-0 flex justify-between items-center px-4 z-10">
            <button
              onClick={goPrev}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-0 disabled:pointer-events-none"
              disabled={!hasPrev}
              aria-label="Previous story"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={closeViewer}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
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

          {/* Caption + link at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/80 to-transparent">
            {currentStory.caption && (
              <p className="text-white text-sm sm:text-base mb-2">
                {currentStory.caption}
              </p>
            )}
            {currentStory.link && (
              <a
                href={currentStory.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                View link
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
