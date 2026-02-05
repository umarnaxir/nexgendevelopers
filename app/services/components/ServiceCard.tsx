"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import type { ServiceListingItem, ServiceCategory } from "../config";

interface ServiceCardProps {
  service: ServiceListingItem;
  index: number;
  category?: ServiceCategory;
}

export default function ServiceCard({ service, index, category }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="group relative bg-black rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)',
      }}
      data-aos="fade-up"
      data-aos-delay={index * 60}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 20px rgba(13, 148, 136, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Split Layout: Image Left, Content Right - Works on Mobile and Desktop */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section - Takes 40% on desktop, full width on mobile */}
        <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden bg-gray-900">
          <Image
            src={service.image}
            alt={`${service.title} - NexGen Developers`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, 40vw"
            loading="lazy"
          />
          
          {/* Subtle Teal Overlay on Hover */}
          <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/10 transition-all duration-500" />
          
          {/* Icon Badge - Top Right */}
          {service.icon && (
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:bg-teal-600 group-hover:scale-110 transition-all duration-300">
              <ServiceIcon name={service.icon} className="w-6 h-6 text-black group-hover:text-white transition-colors" />
            </div>
          )}
        </div>

        {/* Content Section - Takes 60% on desktop, full width on mobile */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col bg-black">
          {/* Title */}
          <h2 
            className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-teal-600 transition-colors"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)' }}
          >
            <Link
              href={service.href}
              className="focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded"
            >
              {service.title}
            </Link>
          </h2>

          {/* Description */}
          <p 
            className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5 flex-grow"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.05)' }}
          >
            {service.shortDescription}
          </p>

          {/* Expandable Features */}
          <div className="space-y-3 mb-5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-teal-600 transition-colors"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Hide features" : "View key features"}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-300" />
              )}
            </button>
            
            {/* Features List */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul
                className="space-y-2 pt-2"
                role="region"
                aria-label="Key features"
              >
                {service.features.slice(0, 5).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-300 text-sm"
                  >
                    <span className="text-teal-600 mr-2 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 mt-auto">
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 group/btn shadow-lg hover:shadow-xl"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
