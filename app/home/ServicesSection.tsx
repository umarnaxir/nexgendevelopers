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
                    className="group flex flex-col items-start text-left bg-white p-5 rounded-[32px] shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)] transition-all duration-300 border border-transparent hover:border-teal-50 focus:outline-none focus:ring-0 min-h-[280px] md:min-h-[260px]"
                  >
                    {/* Icon at top */}
                    <div className="w-12 h-12 rounded-full bg-teal-50 shadow-[0_10px_25px_rgba(15,23,42,0.12)] flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-teal-500" />
                    </div>
                    
                    {/* Spacer to push content down */}
                    <div className="flex-1 min-h-[60px]" />
                    
                    {/* Title and Description grouped at bottom */}
                    <div className="flex flex-col gap-2 mb-4 w-full">
                      <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Read more button at bottom */}
                    <span className="inline-flex items-center text-sm font-semibold text-teal-600 group-hover:text-black transition-colors duration-300">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* Carousel Navigation - centered arrows only */}
          <div className="flex items-center justify-center mt-6 px-2">
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-8 xl:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative flex flex-col items-start text-left bg-white pt-12 px-7 pb-7 lg:pt-14 lg:px-8 lg:pb-8 rounded-[32px] shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)] transition-all duration-300 border border-transparent hover:border-teal-50 focus:outline-none focus:ring-0 min-h-[260px] justify-between"
                data-aos="zoom-in"
                data-aos-delay="0"
              >
                <div className="absolute left-7 lg:left-8 top-0 -translate-y-1/2 lg:-translate-y-1/2">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-teal-50 shadow-[0_10px_25px_rgba(15,23,42,0.12)] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-teal-500" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col mt-auto">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] md:text-base text-slate-500 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                <span className="inline-flex items-center text-sm md:text-[15px] font-semibold text-teal-600 group-hover:text-black transition-colors duration-300">
                  Read more
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
