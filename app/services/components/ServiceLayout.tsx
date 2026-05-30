"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import type { ServiceDefinition } from "../config";
import { getServiceHref } from "../config";
import { 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Shield, 
  Rocket,
  Star,
  Users,
  Clock,
  Target,
  Award,
  Code,
  Globe,
  Smartphone,
  Cpu,
  MessageCircle,
  Server,
  Wrench,
  BarChart3,
  Layers,
  FileText,
  Store,
  Building2,
  Layout,
  Briefcase,
  Heart,
  GraduationCap,
  ShoppingCart,
  Calendar,
  Sparkles,
  type LucideIcon
} from "lucide-react";

/** Map use case label to a Lucide icon (keyword-based) */
function getUseCaseIcon(label: string): LucideIcon {
  const lower = label.toLowerCase();
  if (lower.includes("e-commerce") || lower.includes("ecommerce") || lower.includes("marketplace")) return ShoppingCart;
  if (lower.includes("startup")) return Rocket;
  if (lower.includes("saas") || lower.includes("b2b")) return Building2;
  if (lower.includes("portfolio")) return Layout;
  if (lower.includes("enterprise") || lower.includes("corporate")) return Briefcase;
  if (lower.includes("health") || lower.includes("fitness")) return Heart;
  if (lower.includes("education") || lower.includes("learning")) return GraduationCap;
  if (lower.includes("booking") || lower.includes("scheduling") || lower.includes("event")) return Calendar;
  if (lower.includes("support") || lower.includes("chatbot") || lower.includes("lead")) return MessageCircle;
  if (lower.includes("analytics") || lower.includes("recommendation") || lower.includes("predictive")) return BarChart3;
  if (lower.includes("content") || lower.includes("social") || lower.includes("influencer")) return Sparkles;
  if (lower.includes("local") || lower.includes("store")) return Store;
  return Target;
}

interface ServiceLayoutProps {
  heading: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  relatedServices?: ServiceDefinition[];
  currentSlug?: string;
  image?: string;
  technologies?: string;
  faqs?: { question: string; answer: string }[];
  useCases?: string[];
  expectedResults?: string[];
}

export default function ServiceLayout({
  heading,
  description,
  benefits,
  process: processSteps,
  ctaHeading,
  ctaDescription,
  relatedServices = [],
  currentSlug,
  image,
  technologies,
  faqs = [],
  useCases = [],
  expectedResults = [],
}: ServiceLayoutProps) {
  const { open: openContactModal } = useContactModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Stats for the service page - black/white accents
  const stats = [
    { icon: Rocket, value: "20+", label: "Projects Completed" },
    { icon: Users, value: "10+", label: "Happy Clients" },
    { icon: Code, value: "30+", label: "Technologies Used" },
    { icon: Award, value: "2+", label: "Years Experience" },
  ];

  // Detailed content sections
  const detailedFeatures = [
    {
      title: "Comprehensive Solution",
      description: "We provide end-to-end services covering every aspect of your project from initial consultation to post-launch support. Our team handles design, development, testing, deployment, and maintenance.",
      icon: Layers,
    },
    {
      title: "Modern Technology Stack",
      description: "We use cutting-edge technologies and frameworks that ensure your project is built with the latest best practices, security standards, and performance optimizations.",
      icon: Code,
    },
    {
      title: "Scalable Architecture",
      description: "Every solution we build is designed to grow with your business. Our architecture supports seamless scaling from startup to enterprise-level operations.",
      icon: BarChart3,
    },
    {
      title: "Security First",
      description: "Security is built into every layer of our solutions. We implement industry-standard security practices, regular audits, and compliance with data protection regulations.",
      icon: Shield,
    },
  ];

  return (
    <div
      className="min-h-screen page-bg"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        backgroundColor: '#ffffff',
      }}
    >
      <section className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back to Services */}
          <div className="mb-8" data-aos="fade-up">
            <Link
              href="/services"
              className="inline-flex items-center text-black font-semibold"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Services
            </Link>
          </div>

          {/* Hero - Curved, padded, contained width, title centered */}
          <div className="relative mt-4 mb-6 min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-center items-center overflow-hidden rounded-2xl shadow-lg w-full" data-aos="fade-up">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={heading}
                  fill
                  className="object-cover animate-hero-image"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-black" />
            )}
            <div className="relative px-4 text-center" style={{ zIndex: 1 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                {heading}
              </h1>
            </div>
          </div>

          {/* Content below hero - fast yellow bg, center text, black border */}
          <div className="mb-16 rounded-2xl bg-amber-100 p-4 sm:p-6 shadow-md border-2 border-black" data-aos="fade-up">
            <p className="text-lg sm:text-xl text-gray-900 leading-loose sm:leading-8 text-center font-medium">
              {description}
            </p>
          </div>

          {/* Stats Section - No bg/border, less padding, big icons and font */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-16 justify-items-center">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="w-full max-w-[220px] px-2 py-3 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-0.5"
                  data-aos="zoom-in"
                  data-aos-delay={index * 80}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-3">
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                  </div>
                  <div className="text-6xl sm:text-7xl font-bold text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg sm:text-xl text-gray-700 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Overview Section */}
          <div id="overview" className="mb-16" data-aos="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 tracking-tight" data-aos="zoom-in">
                Service Overview
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We deliver complete solutions tailored to your business needs, combining technical expertise with strategic thinking to achieve your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {detailedFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-6 min-h-[180px] rounded-xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:border-gray-200 hover:-translate-y-0.5"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Benefits + Expected Results - Black bg, white content, teal border, interactive */}
          <div id="benefits" className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group rounded-2xl p-6 sm:p-8 min-h-[280px] bg-black shadow-xl border-2 border-teal-400 transition-all duration-300 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/30 group-hover:scale-105">
                  <Zap className="w-6 h-6 text-teal-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Key Benefits
                </h2>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-lg text-gray-200 text-sm sm:text-base font-medium leading-relaxed transition-all duration-200 hover:bg-white/5 hover:text-white hover:pl-4"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <span className="leading-loose">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {expectedResults.length > 0 && (
              <div className="group rounded-2xl p-6 sm:p-8 min-h-[280px] bg-black shadow-xl border-2 border-teal-400 transition-all duration-300 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/30 group-hover:scale-105">
                    <Target className="w-6 h-6 text-teal-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Expected Results
                  </h2>
                </div>
                <ul className="space-y-3">
                  {expectedResults.map((result, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-lg text-gray-200 text-sm sm:text-base font-medium leading-relaxed transition-all duration-200 hover:bg-white/5 hover:text-white hover:pl-4"
                    >
                      <div className="w-6 h-6 rounded-full border-2 border-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                      </div>
                      <span className="leading-loose">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detailed Process Section */}
          <div className="mb-16" data-aos="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 tracking-tight" data-aos="zoom-in">
                Development Process
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A proven methodology that ensures quality, transparency, and successful project delivery.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((item, index) => (
                <div
                  key={item.step}
                  className="p-6 min-h-[280px] rounded-xl bg-white shadow-md border border-teal-400 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:border-teal-500 hover:-translate-y-0.5 flex flex-col justify-end"
                  data-aos="zoom-in"
                  data-aos-delay={index * 80}
                >
                  <div className="w-14 h-14 rounded-lg bg-black flex items-center justify-center text-white text-2xl font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases / Industries - Black cards, white content, teal border, Lucide icons */}
          {useCases.length > 0 && (
            <div className="mb-16" data-aos="fade-up">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4 tracking-tight" data-aos="zoom-in">
                  Industries & Use Cases
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our solutions are tailored for various industries and use cases.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
                {useCases.map((useCase, idx) => {
                  const IconComponent = getUseCaseIcon(useCase);
                  return (
                    <div
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={idx * 60}
                      className={`
                        rounded-2xl border-2 border-teal-400 bg-black text-center transition-all duration-300
                        flex items-center justify-center gap-3 min-h-[72px] sm:min-h-[88px] px-4 py-3
                        hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5
                        ${idx === 0 ? "sm:col-span-2 sm:row-span-1" : ""}
                      `}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 flex-shrink-0" aria-hidden />
                      <span className={`font-semibold text-white ${idx === 0 ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
                        {useCase}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Why Choose Our Services */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4 tracking-tight">
                Why Choose Our {heading} Services?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
                With years of experience and a proven track record, we deliver solutions that exceed expectations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 min-h-[280px] bg-white shadow-md border border-teal-400 text-center min-w-0 w-full transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:border-teal-500 flex flex-col justify-end" data-aos="zoom-in" data-aos-delay="0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">Detailed Documentation</h3>
                  <p className="text-gray-600 text-base leading-relaxed">Comprehensive documentation for every project</p>
                </div>
              </div>
              <div className="rounded-xl p-6 min-h-[280px] bg-white shadow-md border border-teal-400 text-center min-w-0 w-full transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:border-teal-500 flex flex-col justify-end" data-aos="zoom-in" data-aos-delay="100">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">Expert Team</h3>
                  <p className="text-gray-600 text-base leading-relaxed">Skilled professionals with industry expertise</p>
                </div>
              </div>
              <div className="rounded-xl p-6 min-h-[280px] bg-white shadow-md border border-teal-400 text-center min-w-0 w-full transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:border-teal-500 flex flex-col justify-end" data-aos="zoom-in" data-aos-delay="200">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">Timely Delivery</h3>
                  <p className="text-gray-600 text-base leading-relaxed">Projects delivered on time and within budget</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion - Modern UI, larger typography and padding */}
          {faqs.length > 0 && (
            <div className="mb-16" data-aos="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 tracking-tight" data-aos="zoom-in">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to know about our {heading.toLowerCase()} services
                </p>
              </div>
              <div className="space-y-4 w-full">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                        isOpen
                          ? "bg-teal-50/50 border-teal-400 shadow-lg shadow-teal-500/10"
                          : "bg-white border-gray-200 hover:border-teal-300 hover:shadow-md"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                        id={`faq-question-${idx}`}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6 text-left font-bold text-lg sm:text-xl text-gray-900 transition-colors hover:bg-white/50 rounded-2xl"
                      >
                        <span className="pr-4 leading-snug">{faq.question}</span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOpen ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>
                      <div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-question-${idx}`}
                        aria-hidden={!isOpen}
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8 text-gray-700 text-base sm:text-lg leading-relaxed border-t border-teal-200/50">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Section - large fonts and spacing */}
          <div className="relative text-center pt-4 pb-12 sm:pb-16" data-aos="fade-up">
            <div className="p-8 sm:p-12">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-full mb-6">
                <Rocket className="w-5 h-5" />
                <span className="text-sm sm:text-base font-semibold">Ready to Get Started?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-6 tracking-tight">
                {ctaHeading}
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                {ctaDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openContactModal}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 bg-black text-white text-lg sm:text-xl font-bold rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20"
                >
                  <span>Contact Us Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 bg-white text-black text-lg sm:text-xl font-bold rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-black hover:shadow-lg hover:shadow-black/10"
                >
                  <span>Explore All Services</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
