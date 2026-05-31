"use client";

import { useState, useEffect } from "react";
import { servicesForListing } from "../data";
import type { ServiceListingItem, ServiceCategory } from "../config";
import ServiceCard from "./ServiceCard";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  development: "Development",
  "digital-marketing": "Digital Marketing",
  support: "Support & Operations",
};

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("development");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredServices = servicesForListing.filter(
    (s) => s.category === activeTab
  );

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section aria-labelledby="services-heading" className="space-y-12 md:space-y-16">
      {/* Enhanced Tabbed Navigation */}
      <div className="flex justify-center">
        {/* Background Container with Subtle Shadow */}
        <div
          className="glass w-full max-w-xl rounded-2xl p-3 sm:p-2"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {(["development", "digital-marketing", "support"] as const).map(
              (category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeTab === category}
                  aria-controls={`tabpanel-${category}`}
                  id={`tab-${category}`}
                  onClick={() => setActiveTab(category)}
                  className={`
                    relative w-full sm:w-auto px-5 py-2.5 font-semibold text-sm sm:text-base rounded-xl
                    transition-all duration-300 ease-out
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40
                    ${
                      activeTab === category
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25"
                        : "bg-transparent text-silver-light hover:bg-white/[0.06] hover:text-white"
                    }
                  `}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Service Cards Grid - Same layout on mobile and desktop */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {filteredServices.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index}
            category={activeTab}
          />
        ))}
      </div>
    </section>
  );
}
