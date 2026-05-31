"use client";

import { Check } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getPricingForService, type PricingServiceType } from "../data";

interface EnterpriseSectionProps {
  service: PricingServiceType;
}

export default function EnterpriseSection({ service }: EnterpriseSectionProps) {
  const { open: openContactModal } = useContactModal();
  const { enterprise: enterprisePlan } = getPricingForService(service);
  const mid = Math.ceil(enterprisePlan.deliverables.length / 2);
  const col1 = enterprisePlan.deliverables.slice(0, mid);
  const col2 = enterprisePlan.deliverables.slice(mid);

  return (
    <>
      <section
        className="glass-card relative rounded-2xl overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
        <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-teal-400 to-teal-600" />
        <div className="p-6 sm:p-8 lg:p-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300 mb-1">
            {enterprisePlan.name}
          </h3>
          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {enterprisePlan.price}
          </h4>
          <p className="text-silver text-sm mb-2">{enterprisePlan.description}</p>
          <p className="text-silver-dark text-xs mb-8">Best for: {enterprisePlan.bestFor}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8">
            <ul className="space-y-3">
              {col1.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-silver-light">
                  <Check className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {col2.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-silver-light">
                  <Check className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-silver text-sm italic max-w-xl">
              &ldquo;{enterprisePlan.quote}&rdquo;
            </p>
            <button
              onClick={openContactModal}
              className="flex-shrink-0 w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-300"
            >
              {enterprisePlan.ctaLabel}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
