"use client";

import React, { useState } from "react";
import { FAQSchema } from "@/lib/seo/faq-schema";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does NexGen Developers offer?",
      answer: "We offer a comprehensive range of services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, deployment & DevOps, and ongoing maintenance & support. We also provide a platform where you can share ideas, post stories, publish blogs, and promote your brand to reach startups and local businesses."
    },
    {
      question: "How can I share my ideas and promote my project on your platform?",
      answer: "You can share your ideas, tips, updates, and insights through our posts feature. Simply visit the posts section to view existing content or create your own post to promote your project or business. This helps you connect with our community of startups, developers, and local brands while gaining visibility for your work."
    },
    {
      question: "What are stories and how can I use them for promotion?",
      answer: "Stories are short, visual content pieces perfect for launching products, events, or promotions. They're quick and engaging, designed to capture attention quickly. You can post stories to share time-sensitive updates, behind-the-scenes content, or promotional announcements. Stories are ideal for creating urgency and driving immediate engagement with your audience."
    },
    {
      question: "Can I write and publish blogs on your platform?",
      answer: "Yes! Our platform allows you to read and write articles, guides, and thought leadership content. You can publish blogs to share your expertise, promote your brand, and contribute to the community. Quality blog content helps you establish authority, gain backlinks, and reach startups and local brands looking for valuable insights."
    },
    {
      question: "How can I promote my brand through your platform?",
      answer: "You can promote your brand through multiple channels: share ideas via posts, create engaging stories for quick promotions, publish detailed blogs and articles, and leverage our community to reach startups and local brands. Quality content on our platform provides visibility, backlinks, and helps establish your brand as a thought leader in your industry."
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
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p 
            className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-xl border-2 transition-all duration-300 overflow-hidden ${openIndex === index ? "border-gray-200 border-l-4 border-l-teal-400" : "border-transparent"}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 
                  className="text-lg sm:text-xl font-bold text-black pr-4"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6)' }}
                >
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-black flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-6 sm:px-8 pb-4 sm:pb-6">
                    <p 
                      className="text-gray-700 leading-relaxed text-sm sm:text-base"
                      style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
