"use client";

import type { PricingServiceType } from "../data";

interface PricingServiceSelectorProps {
  currentService: PricingServiceType;
  onSelect: (service: PricingServiceType) => void;
}

const services: PricingServiceType[] = ["website", "app", "other"];

const segmentLabels: Record<PricingServiceType, string> = {
  website: "Website",
  app: "App",
  other: "Other",
};

export default function PricingServiceSelector({
  currentService,
  onSelect,
}: PricingServiceSelectorProps) {
  return (
    <div className="flex justify-center mb-4 md:mb-6" data-aos="fade-up">
      <div className="glass inline-flex rounded-2xl p-1 gap-1">
        {services.map((service) => {
          const isActive = currentService === service;
          return (
            <button
              key={service}
              type="button"
              onClick={() => onSelect(service)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25"
                  : "border border-white/10 text-silver-light hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {segmentLabels[service]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
