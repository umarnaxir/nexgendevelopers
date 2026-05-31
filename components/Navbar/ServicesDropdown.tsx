"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavServiceItem } from "@/app/services/config";

interface ServicesDropdownProps {
  label: string;
  href: string;
  items: NavServiceItem[];
  isMobile?: boolean;
  isHome?: boolean;
  onLinkClick?: () => void;
}

export default function ServicesDropdown({
  label,
  href,
  items,
  isMobile = false,
  isHome = false,
  onLinkClick,
}: ServicesDropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState<string | null>(null);
  const isServicesActive =
    pathname === href || pathname.startsWith("/services/");

  if (isMobile) {
    return (
      <div className="relative group" data-aos="zoom-in" data-aos-duration="600">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-between w-full py-3 px-4 text-sm font-extrabold tracking-wide rounded-xl transition-all duration-300 ${
            isServicesActive
              ? "text-white bg-white/[0.06]"
              : "text-silver-light hover:bg-white/[0.04] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {label}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="mt-1 pl-4 space-y-1 border-l-2 border-white/10">
            <Link
              href={href}
              onClick={onLinkClick}
              className={`block py-2.5 px-3 text-sm font-bold rounded-lg transition-colors ${
                pathname === href ? "text-white bg-white/[0.06]" : "text-silver hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              All Services
            </Link>
            {[...items]
              .sort((a, b) => {
                const order = [
                  "website-development",
                  "app-development",
                  "ai-ml",
                  "chatbot-development",
                  "maintenance-support",
                  "deployment-devops",
                  "digital-marketing",
                ];
                const aSlug = a.href.split("/").pop() ?? "";
                const bSlug = b.href.split("/").pop() ?? "";
                return order.indexOf(aSlug) - order.indexOf(bSlug);
              })
              .map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() =>
                      setNestedOpen(nestedOpen === item.href ? null : item.href)
                    }
                    className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-bold text-silver rounded-lg hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${nestedOpen === item.href ? "rotate-90" : ""}`}
                    />
                  </button>
                  {nestedOpen === item.href && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-white/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onLinkClick}
                          className={`block py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                            pathname === child.href
                              ? "text-white bg-white/10"
                              : "text-silver hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`block py-2.5 px-3 text-sm font-bold rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-white bg-white/[0.06]"
                      : "text-silver hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop: hover dropdown — wide, 2-column grid, interactive
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setNestedOpen(null);
      }}
    >
      <Link
        href={href}
        className={`relative flex items-center gap-0.5 text-sm font-semibold tracking-wide py-4 px-2 transition-all duration-300 rounded-md ${
          isServicesActive
            ? isHome
              ? "text-teal-300"
              : "text-teal-600"
            : isHome
              ? "text-silver-light hover:text-white"
              : "text-gray-700 hover:text-teal-600"
        }`}
        aria-current={isServicesActive ? "page" : undefined}
      >
        {label}
        <ChevronDown className="w-4 h-4 opacity-70" />
      </Link>
      <span
        className={`absolute bottom-2 left-1/2 h-[2px] rounded-full -translate-x-1/2 transition-all duration-300 ease-in-out ${
          isHome ? "bg-teal-400" : "bg-teal-500"
        } ${isServicesActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"}`}
      />
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="w-[720px] min-h-[320px] rounded-xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] overflow-hidden flex">
            {/* Left: headset/image panel + contact */}
            <div className="w-[200px] shrink-0 bg-white/[0.03] border-r border-white/[0.06] flex flex-col items-center justify-center p-6 gap-4">
              <Image
                src="/images/services/digital-marketing-dropdown-icon.png"
                alt="Digital Marketing"
                width={120}
                height={120}
                className="object-contain"
              />
              <a
                href="tel:+916006161726"
                className="inline-flex items-center gap-2 text-sm font-semibold text-silver-light hover:text-white transition-colors whitespace-nowrap underline underline-offset-2 decoration-white/30 hover:decoration-teal-400 decoration-1"
              >
                +91 600-616-1726
              </a>
            </div>
            {/* Right: 3 columns — col1: website/app/ai-ml | col2: chatbot/deploy/maintain | col3: digital-marketing */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="grid grid-cols-3 gap-6 p-4">
                {/* Column 1: Website Development, App Development, AI & ML */}
                <div className="flex flex-col gap-1">
                  {items
                    .filter(
                      (i) =>
                        i.href.includes("website-development") ||
                        i.href.includes("app-development") ||
                        i.href.includes("ai-ml")
                    )
                    .sort((a, b) => {
                      const order = ["website-development", "app-development", "ai-ml"];
                      return order.indexOf(a.href.split("/").pop() ?? "") - order.indexOf(b.href.split("/").pop() ?? "");
                    })
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                          pathname === item.href
                            ? "text-white bg-white/10"
                            : "text-silver-light hover:bg-white/[0.06] hover:text-white hover:scale-[1.02] active:scale-[0.99]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
                {/* Column 2: Chatbot, Deployment, Maintenance */}
                <div className="flex flex-col gap-1">
                  {items
                    .filter(
                      (i) =>
                        i.href.includes("chatbot-development") ||
                        i.href.includes("deployment-devops") ||
                        i.href.includes("maintenance-support")
                    )
                    .sort((a, b) => {
                      const order = ["chatbot-development", "deployment-devops", "maintenance-support"];
                      return order.indexOf(a.href.split("/").pop() ?? "") - order.indexOf(b.href.split("/").pop() ?? "");
                    })
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                          pathname === item.href
                            ? "text-white bg-white/10"
                            : "text-silver-light hover:bg-white/[0.06] hover:text-white hover:scale-[1.02] active:scale-[0.99]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
                {/* Column 3: Digital Marketing + sub-items */}
                <div
                  className="flex flex-col gap-1"
                  onMouseEnter={() => {
                    const dm = items.find((i) => i.href === "/services/digital-marketing");
                    if (dm) setNestedOpen(dm.href);
                  }}
                  onMouseLeave={() => setNestedOpen(null)}
                >
                  {items
                    .filter((i) => i.href === "/services/digital-marketing")
                    .map((item) =>
                      item.children ? (
                        <div key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                              pathname === item.href
                                ? "text-white bg-white/10"
                                : nestedOpen === item.href
                                  ? "text-white bg-white/[0.06]"
                                  : "text-silver-light hover:bg-white/[0.06] hover:text-white hover:scale-[1.02] active:scale-[0.99]"
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              className={`w-4 h-4 text-silver-dark shrink-0 ml-2 transition-transform ${
                                nestedOpen === item.href ? "rotate-180" : ""
                              }`}
                            />
                          </Link>
                          {nestedOpen === item.href && item.children?.length && (
                            <div className="mt-2 flex flex-col gap-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                    pathname === child.href
                                      ? "text-white bg-white/10"
                                      : "text-silver hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null
                    )}
                </div>
              </div>
              <div className="mt-auto border-t border-white/[0.06] px-4 py-3 bg-white/[0.02]">
                <Link
                  href={href}
                  className="text-sm font-semibold text-silver-light hover:text-white transition-colors inline-flex items-center gap-1.5 group/link"
                >
                  View all services
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
