"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Send,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  // column header icons
  LayoutGrid,
  FileText,
  Code2,
  Megaphone,
  // quick links
  Home,
  User,
  FolderKanban,
  Settings,
  Tag,
  // other pages
  Users,
  PenLine,
  Shield,
  ScrollText,
  // dev services
  Globe,
  Smartphone,
  Sparkles,
  Bot,
  Wrench,
  // digital marketing
  Search,
  Share2,
  Palette,
  BarChart3,
  Target,
} from "lucide-react";
import FooterSocials from "./FooterSocials";
import {
  getDevelopmentServicesForFooter,
  getDigitalMarketingServicesForFooter,
} from "@/app/services/config";

type LinkItem = { label: string; href: string; icon: React.ElementType };

const quickLinks: LinkItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: User },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Services", href: "/services", icon: Settings },
  { label: "Pricing", href: "/pricing", icon: Tag },
];

const otherPages: LinkItem[] = [
  { label: "Team", href: "/team", icon: Users },
  { label: "Blogs", href: "/blogs", icon: PenLine },
  { label: "Contact Us", href: "/contact-us", icon: Mail },
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Terms of Service", href: "/terms", icon: ScrollText },
];

const devIcon = (href: string): React.ElementType =>
  href.includes("website") ? Globe
  : href.includes("app-development") ? Smartphone
  : href.includes("ai-ml") ? Sparkles
  : href.includes("chatbot") ? Bot
  : Wrench;

const dmIcon = (href: string): React.ElementType =>
  href.includes("seo") ? Search
  : href.includes("social-media") ? Share2
  : href.includes("graphic") ? Palette
  : href.includes("google-ads") ? BarChart3
  : Target;

function LinkColumn({
  title,
  icon: TitleIcon,
  links,
}: {
  title: string;
  icon: React.ElementType;
  links: LinkItem[];
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <TitleIcon className="h-6 w-6 text-teal-400 light:text-teal-700" />
        <div>
          <h3 className="text-base font-bold text-white light:text-gray-900">{title}</h3>
          <span className="mt-1 block h-0.5 w-8 rounded-full bg-teal-500 light:bg-teal-600" />
        </div>
      </div>
      <ul className="space-y-3">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-2.5 text-sm text-gray-400 light:text-gray-600 transition-colors hover:text-white light:hover:text-teal-700"
            >
              <Icon className="h-4 w-4 text-gray-500 light:text-gray-500 transition-colors group-hover:text-white light:group-hover:text-teal-700" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const developmentServices: LinkItem[] = getDevelopmentServicesForFooter()
    .filter((s) => !s.href.includes("deployment-devops"))
    .map((s) => ({ ...s, icon: devIcon(s.href) }));

  const digitalMarketingServices: LinkItem[] = getDigitalMarketingServicesForFooter()
    .filter((s) => s.href !== "/services/digital-marketing")
    .map((s) => ({
      ...s,
      label: s.href.includes("/seo") ? "SEO" : s.label,
      icon: dmIcon(s.href),
    }));

  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubscribing(true);
    setShowAlert(false);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: { error?: string; message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setEmail("");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again later.";
      toast.error("Couldn't subscribe", { description: message, duration: 5000 });
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t border-white/[0.06] light:border-gray-200 bg-[#050607] light:bg-white text-gray-300 light:text-gray-600 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-teal-500/40 before:to-transparent"
      data-aos="fade-up"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Link columns ===== */}
        <div className="mt-14 mb-2 glass rounded-3xl p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] light:shadow-[0_30px_80px_-45px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            <LinkColumn title="Quick Links" icon={LayoutGrid} links={quickLinks} />
            <LinkColumn title="Other Pages" icon={FileText} links={otherPages} />
            <LinkColumn title="Development" icon={Code2} links={developmentServices} />
            <LinkColumn title="Digital Marketing" icon={Megaphone} links={digitalMarketingServices} />
          </div>
        </div>

        {/* ===== Get in touch / Follow us / Newsletter ===== */}
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3">
          {/* Get in touch */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] light:border-gray-200 bg-gradient-to-br from-white/[0.04] to-transparent light:from-gray-50 light:to-white p-6">
            {/* dotted halftone pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-2/3 text-teal-400 opacity-[0.18] light:opacity-[0.10]"
              style={{
                backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "10px 10px",
                maskImage: "linear-gradient(to right, transparent, black)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black)",
              }}
            />
            <div className="relative">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white light:text-gray-900">Get in Touch</h3>
                <span className="mt-1 block h-0.5 w-8 rounded-full bg-teal-500 light:bg-teal-600" />
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+916006161726" className="flex items-center gap-2.5 text-gray-400 light:text-gray-600 transition-colors hover:text-white light:hover:text-teal-700">
                    <Phone className="h-4 w-4 text-teal-400 light:text-teal-700" />
                    +91 600-616-1726
                  </a>
                </li>
                <li>
                  <a href="mailto:info@nexgendevelopers.in" className="flex items-center gap-2.5 break-all text-gray-400 light:text-gray-600 transition-colors hover:text-white light:hover:text-teal-700">
                    <Mail className="h-4 w-4 text-teal-400 light:text-teal-700" />
                    info@nexgendevelopers.in
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-gray-400 light:text-gray-600">
                  <MapPin className="h-4 w-4 text-teal-400 light:text-teal-700" />
                  Srinagar, Jammu and Kashmir, India
                </li>
              </ul>
            </div>
          </div>

          {/* Follow us */}
          <div className="md:px-8">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white light:text-gray-900">Follow Us</h3>
              <span className="mt-1 block h-0.5 w-8 rounded-full bg-teal-500 light:bg-teal-600" />
            </div>
            <div>
              <FooterSocials />
            </div>
            <Link
              href="/contact-us"
              className="group mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.08] light:border-gray-200 bg-white/[0.03] light:bg-gray-50 px-4 py-3.5 transition-all hover:border-teal-400/50 light:hover:border-teal-600/40 hover:bg-white/[0.06] light:hover:bg-teal-50"
            >
              <Star className="h-5 w-5 shrink-0 text-teal-400 light:text-teal-700" />
              <span className="text-sm font-semibold leading-tight text-white light:text-gray-900">
                Let&apos;s build something
                <br />
                <span className="text-teal-400 light:text-teal-700">amazing</span> together
              </span>
              <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-gray-400 light:text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-teal-400 light:group-hover:text-teal-700" />
            </Link>
          </div>

          {/* Newsletter */}
          <div className="relative md:pl-8">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white light:text-gray-900">Stay Updated</h3>
              <span className="mt-1 block h-0.5 w-8 rounded-full bg-teal-500 light:bg-teal-600" />
            </div>
            <p className="mb-4 text-sm text-gray-400 light:text-gray-600">
              Subscribe to our newsletter for the latest updates, insights and offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <div className="relative w-full">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 light:text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubscribing}
                  className="w-full rounded-xl border border-white/15 light:border-gray-200 bg-white/5 light:bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-white light:text-gray-900 outline-none transition-all placeholder:text-gray-500 light:placeholder:text-gray-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                />
              </div>
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={isSubscribing}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white transition-all hover:bg-teal-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            {showAlert && (
              <div className="absolute left-0 right-0 mt-2 rounded-lg bg-teal-500 px-3 py-2 text-xs font-medium text-white shadow-lg">
                Thanks for subscribing! We&apos;ll keep you updated.
              </div>
            )}
          </div>
        </div>

        {/* ===== Bottom bar ===== */}
        <div className="flex flex-col items-center gap-4 border-t border-white/10 light:border-gray-200 py-5 sm:flex-row sm:justify-between">
          <p className="order-2 text-xs text-gray-500 light:text-gray-500 sm:order-1">
            © {currentYear} <span className="font-medium text-teal-400 light:text-teal-700">NexGen Developers</span>. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="order-1 inline-flex items-center gap-2 rounded-full border border-white/15 light:border-gray-200 px-4 py-2 text-xs font-bold text-gray-300 light:text-gray-600 transition-all hover:border-teal-400 hover:text-teal-400 light:hover:border-teal-600 light:hover:text-teal-700 hover:scale-105 active:scale-95 sm:order-2"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
