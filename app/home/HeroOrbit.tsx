"use client";

import React from "react";
import { Code2, Bot, Smartphone, Megaphone } from "lucide-react";

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const serviceCards: ServiceCard[] = [
  { icon: Code2, title: "Web Development", desc: "Fast, responsive & scalable websites" },
  { icon: Bot, title: "AI/ML & Chatbots", desc: "Smart automation for your business" },
  { icon: Smartphone, title: "Mobile App Development", desc: "Powerful apps for iOS & Android" },
  { icon: Megaphone, title: "Digital Marketing", desc: "Strategies that drive real growth" },
];

function ServiceCardBox({ icon: Icon, title, desc }: ServiceCard) {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-teal-900/5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <Icon className="h-5 w-5" />
        </span>
        <h4 className="text-sm font-bold leading-tight text-gray-900">{title}</h4>
      </div>
      <p className="mt-2 text-xs leading-snug text-gray-500">{desc}</p>
    </div>
  );
}

/** The "Let's grow together" growth card. */
function GrowthCard() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-teal-900/5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold leading-tight text-gray-900">
            Turning Ideas Into Impactful
            <br className="hidden sm:block" /> Digital Solutions
          </p>
          <p className="mt-1.5 text-xs font-semibold text-teal-600">Let&apos;s grow together</p>
        </div>
        <svg viewBox="0 0 120 50" className="h-12 w-28 shrink-0 text-teal-500" fill="none">
          <path
            d="M2 44 C20 40 28 34 40 30 C54 25 60 32 74 22 C88 12 100 16 116 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="116" cy="4" r="4" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/** Glowing glass sphere with the brand "N". */
function Sphere({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* outer glow rings */}
      <span className="absolute inset-0 -m-8 rounded-full border border-teal-200/50" />
      <span className="absolute inset-0 -m-16 rounded-full border border-teal-100/40" />
      {/* sphere */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white bg-gradient-to-br from-teal-100/90 via-teal-50/80 to-teal-200/50 shadow-[0_0_70px_rgba(20,184,166,0.35)] backdrop-blur">
        <span className="select-none bg-gradient-to-br from-teal-400 to-teal-700 bg-clip-text font-black leading-none text-transparent">
          N
        </span>
        {/* glossy highlight */}
        <span className="absolute left-[18%] top-[14%] h-[22%] w-[34%] rounded-full bg-white/60 blur-md" />
      </div>
    </div>
  );
}

export default function HeroOrbit() {
  return (
    <div data-aos="fade-left" data-aos-delay="150">
      {/* ===== Desktop: absolute orbit layout ===== */}
      <div className="relative mx-auto hidden h-[500px] w-full max-w-[600px] lg:block">
        {/* dashed connectors */}
        <svg
          className="absolute inset-0 h-full w-full text-teal-300"
          viewBox="0 0 620 560"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6">
            <path d="M310 280 C230 200 200 170 175 150" />
            <path d="M310 280 C400 200 430 175 455 155" />
            <path d="M310 280 C220 320 180 350 150 360" />
            <path d="M310 280 C410 320 450 350 480 365" />
            <path d="M310 280 C320 380 320 420 320 470" />
          </g>
          <g fill="#14b8a6">
            <circle cx="240" cy="208" r="4" />
            <circle cx="392" cy="206" r="4" />
            <circle cx="222" cy="322" r="4" />
            <circle cx="408" cy="322" r="4" />
          </g>
        </svg>

        {/* center sphere */}
        <Sphere className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 text-[128px]" />

        {/* cards */}
        <div className="absolute left-[2%] top-[8%] w-52">
          <ServiceCardBox {...serviceCards[0]} />
        </div>
        <div className="absolute right-[0%] top-[14%] w-52">
          <ServiceCardBox {...serviceCards[1]} />
        </div>
        <div className="absolute left-[-1%] top-[50%] w-52">
          <ServiceCardBox {...serviceCards[2]} />
        </div>
        <div className="absolute right-[-1%] top-[54%] w-52">
          <ServiceCardBox {...serviceCards[3]} />
        </div>
        <div className="absolute bottom-[1%] left-1/2 w-[60%] -translate-x-1/2">
          <GrowthCard />
        </div>
      </div>

      {/* ===== Mobile / tablet: stacked layout ===== */}
      <div className="lg:hidden">
        <div className="relative flex justify-center">
          {/* soft glow behind sphere */}
          <span className="absolute top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-teal-100/50 blur-2xl" />
          <Sphere className="relative h-32 w-32 text-[72px]" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {serviceCards.map((card) => (
            <ServiceCardBox key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-3">
          <GrowthCard />
        </div>
      </div>
    </div>
  );
}
