"use client";

import { Check } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getPricingForService, type PricingPlan, type PricingServiceType } from "../data";

const accentStyles = {
  green: {
    name: "text-teal-300",
    button:
      "border border-white/15 bg-white/[0.06] text-white hover:border-teal-400/50 hover:bg-white/[0.1]",
  },
  blue: {
    name: "text-teal-300",
    button:
      "border border-white/15 bg-white/[0.06] text-white hover:border-teal-400/50 hover:bg-white/[0.1]",
  },
  purple: {
    name: "text-teal-300",
    button:
      "border border-white/15 bg-white/[0.06] text-white hover:border-teal-400/50 hover:bg-white/[0.1]",
  },
} as const;

function PlanCard({ plan, styles }: { plan: PricingPlan; styles: (typeof accentStyles)[keyof typeof accentStyles] }) {
  const { open: openContactModal } = useContactModal();

  return (
    <>
      <div
        className={`glass-card relative rounded-2xl p-6 sm:p-8 flex flex-col h-full ${plan.popular ? "beam-border ring-1 ring-teal-400/30" : ""}`}
        data-aos="fade-up"
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-teal-500/25">
            Most Popular
          </div>
        )}
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${styles.name}`}>
          {plan.name}
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{plan.price}</p>
        <p className="text-silver text-sm mb-4">{plan.description}</p>
        <p className="text-silver-dark text-xs mb-6">Best for: {plan.bestFor}</p>
        <ul className="space-y-3 flex-1 mb-6">
          {plan.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-silver-light">
              <Check className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-silver text-sm italic mb-6">&ldquo;{plan.quote}&rdquo;</p>
        <button
          onClick={openContactModal}
          className={`w-full py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25"
              : styles.button
          }`}
        >
          {plan.ctaLabel}
        </button>
      </div>
    </>
  );
}

interface PricingCardsProps {
  service: PricingServiceType;
}

export default function PricingCards({ service }: PricingCardsProps) {
  const { plans } = getPricingForService(service);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
      {plans.map((plan) => (
        <PlanCard
          key={`${service}-${plan.id}`}
          plan={plan}
          styles={accentStyles[plan.accent as keyof typeof accentStyles]}
        />
      ))}
    </div>
  );
}
