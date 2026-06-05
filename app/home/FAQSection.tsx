"use client";

import React, { useState } from "react";
import { FAQSchema } from "@/lib/seo/faq-schema";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does NexGen Developers offer?",
      answer: "We're a service-based team of freelance developers and designers offering web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, deployment & DevOps, and ongoing maintenance & support. We work with startups and local businesses to build, launch, and grow their products."
    },
    {
      question: "How do I get started or request a quote?",
      answer: "Reach out through our contact page or send us an email with a short description of what you need. We'll get back to you to discuss your requirements, scope, timeline, and pricing, and share a proposal before any work begins."
    },
    {
      question: "Do you work with startups and small businesses?",
      answer: "Yes. We specialize in helping startups and local brands. Whether you need a single landing page, a full web or mobile app, or ongoing marketing and support, we tailor our services to your goals and budget."
    },
    {
      question: "Do you share resources or insights?",
      answer: "Yes, we publish articles and guides on our blog covering technology, development, and business topics. It's a free resource — no account or sign-up needed — to help startups and businesses learn and stay updated."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing options including project-based pricing (fixed price for complete projects), hourly rates (pay for actual time worked), and monthly retainers (dedicated support & maintenance). Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive maintenance and support services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements. We offer both one-time support and monthly retainer packages depending on your needs."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 sm:py-10 md:py-10 lg:py-8">
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 px-4">
            <span className="text-gradient-light">Frequently Asked</span>{" "}
            <span className="text-gradient-teal">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-silver max-w-3xl mx-auto px-4">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-l-2 border-l-teal-400 !border-teal-400/20" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
                >
                  <h3 className={`text-lg sm:text-xl font-bold pr-4 transition-colors duration-300 ${isOpen ? "text-white" : "text-silver-light"}`}>
                    {faq.question}
                  </h3>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-180 border-teal-400/40 bg-teal-400/10 text-teal-300" : "border-white/10 text-silver"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-6 sm:px-8 pb-4 sm:pb-6">
                      <p className="text-silver leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
