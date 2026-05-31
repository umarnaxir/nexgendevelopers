"use client";

import Link from "next/link";
import { Home, ArrowLeft, Compass, Briefcase, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-12rem)] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-teal-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-teal-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-teal-400/10 blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Animated 404 */}
          <div className="mb-6 sm:mb-8">
            <h1
              className="font-extrabold select-none animate-float-404"
              style={{
                fontSize: "clamp(6rem, 20vw, 12rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              <span className="inline-block text-gradient-light" style={{ animationDelay: "0s" }}>4</span>
              <span className="inline-block text-gradient-teal" style={{ animationDelay: "0.1s" }}>0</span>
              <span className="inline-block text-gradient-light" style={{ animationDelay: "0.2s" }}>4</span>
            </h1>
          </div>

          {/* Message */}
          <div className="mb-8 sm:mb-10 space-y-3">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Oops! This page took a wrong turn
            </p>
            <p className="text-base sm:text-lg text-silver max-w-xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>
          </div>

          {/* Primary CTA - Home */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-12">
            <Link
              href="/"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-[0_20px_50px_-20px_rgba(20,184,166,0.6)] hover:from-teal-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
            >
              <Home className="w-5 h-5 group-hover:animate-pulse" />
              Go Home
            </Link>
            <Link
              href="/"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white border border-white/15 bg-white/[0.06] rounded-lg hover:border-teal-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Safety
            </Link>
          </div>

          {/* Quick links */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm font-semibold text-silver-dark uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Explore instead
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-silver-light border border-white/10 bg-white/[0.04] rounded-lg hover:border-teal-400/50 hover:text-teal-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
              >
                <Compass className="w-4 h-4" />
                Services
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-silver-light border border-white/10 bg-white/[0.04] rounded-lg hover:border-teal-400/50 hover:text-teal-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
              >
                <Briefcase className="w-4 h-4" />
                Projects
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-silver-light border border-white/10 bg-white/[0.04] rounded-lg hover:border-teal-400/50 hover:text-teal-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
