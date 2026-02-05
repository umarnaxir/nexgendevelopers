"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  MessageCircle, 
  TrendingUp, 
  Palette,
  Search,
  Share2,
  MousePointerClick,
  Facebook,
  Server,
  Wrench,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const TOTAL_SLIDES = 12;

export default function ServicesSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL_SLIDES - 1));
    setActiveSlide(clamped);
    const el = scrollRef.current;
    if (el) {
      const slideWidth = el.offsetWidth + 16; // 16px = gap-4
      el.scrollTo({ left: clamped * slideWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const slideWidth = el.offsetWidth + 16;
      const slide = Math.round(el.scrollLeft / slideWidth);
      setActiveSlide(Math.min(slide, TOTAL_SLIDES - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const goPrev = () => goToSlide(activeSlide - 1);
  const goNext = () => goToSlide(activeSlide + 1);

  const services = [
    { title: "Website Development", description: "We build modern, responsive, and high-performance websites tailored to your business needs.", icon: Globe, href: "/services/website-development" },
    { title: "App Development", description: "We develop powerful mobile and web applications using the latest technologies.", icon: Smartphone, href: "/services/app-development" },
    { title: "AI & ML Solutions", description: "We integrate AI and Machine Learning to automate processes and create smart applications.", icon: Cpu, href: "/services/ai-ml" },
    { title: "Chatbot Development", description: "Enhance customer engagement with AI-powered chatbots that provide intelligent support.", icon: MessageCircle, href: "/services/chatbot-development" },
    { title: "Deployment & DevOps", description: "Cloud deployment, CI/CD pipelines, and infrastructure management for reliable scaling.", icon: Server, href: "/services/deployment-devops" },
    { title: "Maintenance & Support", description: "Ongoing updates, bug fixes, security patches, and 24/7 technical support.", icon: Wrench, href: "/services/maintenance-support" },
    { title: "Digital Marketing", description: "Full-service digital marketing: SEO, paid ads, social media, and content strategy.", icon: TrendingUp, href: "/services/digital-marketing" },
    { title: "SEO", description: "On-page, off-page, and technical SEO to rank higher and grow organic traffic.", icon: Search, href: "/services/digital-marketing/seo" },
    { title: "Social Media Marketing", description: "Social strategy, content creation, and community management across platforms.", icon: Share2, href: "/services/digital-marketing/social-media-marketing" },
    { title: "Graphic Designing", description: "Logos, brand identity, social graphics, and marketing materials that strengthen your brand.", icon: Palette, href: "/services/digital-marketing/graphic-designing" },
    { title: "Google Ads", description: "Search, Display, and YouTube campaigns to drive qualified traffic and conversions.", icon: MousePointerClick, href: "/services/digital-marketing/google-ads" },
    { title: "Meta Ads", description: "Facebook and Instagram ad campaigns to reach your target audience and drive leads.", icon: Facebook, href: "/services/digital-marketing/meta-ads" },
  ];

  return (
    <section id="services" className="relative overflow-hidden" data-aos="fade-up">
      {/* Subtle Grid Background - black/gray only */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div 
          className="text-center mb-10 sm:mb-12 md:mb-16"
          data-aos="zoom-in"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            Build, Launch, Succeed Online
          </h2>
          <p 
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            The goal is not just to build a website or an app, but to grow your business.
          </p>
        </div>

        {/* Mobile Carousel - visible only below md */}
        <div className="md:hidden">
          <div ref={scrollRef} className="overflow-x-auto snap-x snap-mandatory scroll-smooth flex gap-4 pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="flex-[0_0_100%] w-full min-w-0 snap-center">
                  <Link
                    href={service.href}
                    className="group flex flex-col items-center text-center bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 min-h-[280px] justify-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-black" style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))" }} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-3" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)" }}>
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-black group-hover:text-teal-600 font-bold text-base transition-colors duration-300" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7)" }}>
                      Read More
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))" }} />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* Carousel Navigation - pagination dots (left) + arrows (right) */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 shrink-0 ${
                    i === activeSlide
                      ? "w-6 h-2 rounded-full bg-black"
                      : "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={activeSlide === 0}
                aria-label="Previous slide"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  activeSlide === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                disabled={activeSlide >= TOTAL_SLIDES - 1}
                aria-label="Next slide"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  activeSlide >= TOTAL_SLIDES - 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid - visible from md and up */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group flex flex-col items-center text-center bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 min-h-[260px] justify-center"
                data-aos="zoom-in"
                data-aos-delay="0"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))" }} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)" }}>
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)" }}>
                  {service.description}
                </p>
                <span className="inline-flex items-center text-black group-hover:text-teal-600 font-bold text-base transition-colors duration-300" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7)" }}>
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))" }} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
