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
      className="glass-card beam-border group relative rounded-2xl overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 60}
    >
      {/* Split Layout: Image Left, Content Right - Works on Mobile and Desktop */}
      <div className="flex flex-col sm:flex-row h-full sm:min-h-[300px]">
        {/* Image Section - Takes 40% on desktop, full width on mobile */}
        <div className="relative h-72 sm:h-auto sm:min-h-[280px] sm:w-2/5 overflow-hidden bg-black">
          <Image
            src={service.image}
            alt={`${service.title} - NexGen Developers`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, 40vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60" />

          {/* Icon Badge - Top Right: subtle teal tint, brighter on hover */}
          {service.icon && (
            <div className="absolute top-4 right-4 w-12 h-12 rounded-lg border border-teal-400/20 bg-teal-400/10 text-teal-300 backdrop-blur flex items-center justify-center shadow-lg group-hover:border-teal-400/40 group-hover:bg-teal-400/20 group-hover:scale-110 transition-all duration-300">
              <ServiceIcon name={service.icon} className="w-6 h-6 text-teal-300 group-hover:text-teal-200 transition-colors" />
            </div>
          )}
        </div>

        {/* Content Section - Takes 60% on desktop, full width on mobile */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col min-h-[280px] sm:min-h-0">
          {/* Title */}
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-silver-light transition-colors"
          >
            <Link
              href={service.href}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded"
            >
              {service.title}
            </Link>
          </h2>

          {/* Description */}
          <p
            className="text-silver text-sm sm:text-base leading-relaxed mb-5 flex-grow"
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
              className="flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200 transition-colors"
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
                    className="flex items-start text-silver text-sm"
                  >
                    <span className="text-teal-300 mr-2 font-bold mt-0.5">✓</span>
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-teal-500 transition-all duration-300 group/btn"
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
