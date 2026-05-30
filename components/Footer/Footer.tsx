"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
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
  // why choose us
  Gem,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Headphones,
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

const whyChooseUs = [
  { icon: ShieldCheck, label: "Reliable & Secure" },
  { icon: BadgeCheck, label: "Quality Assurance" },
  { icon: Zap, label: "On-Time Delivery" },
  { icon: Headphones, label: "24/7 Support" },
];

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
        <TitleIcon className="h-6 w-6 text-white" />
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <span className="mt-1 block h-0.5 w-8 rounded-full bg-white" />
        </div>
      </div>
      <ul className="space-y-3">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-2.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <Icon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-white" />
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-teal-950 text-gray-300" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Link columns ===== */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pb-12 pt-14 lg:grid-cols-4">
          <LinkColumn title="Quick Links" icon={LayoutGrid} links={quickLinks} />
          <LinkColumn title="Other Pages" icon={FileText} links={otherPages} />
          <LinkColumn title="Development" icon={Code2} links={developmentServices} />
          <LinkColumn title="Digital Marketing" icon={Megaphone} links={digitalMarketingServices} />
        </div>

        {/* ===== Get in touch / Why choose us / Newsletter ===== */}
        <div className="grid grid-cols-1 gap-8 border-t border-white/10 py-10 md:grid-cols-3 md:divide-x md:divide-white/10">
          {/* Get in touch */}
          <div className="md:pr-8">
            <div className="mb-4 flex items-center gap-3">
              <Phone className="h-6 w-6 text-white" />
              <h3 className="text-base font-bold text-white">Get in Touch</h3>
            </div>
            <ul className="space-y-3 border-l-2 border-teal-500/40 pl-4 text-sm">
              <li>
                <a href="tel:+916006161726" className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-teal-400" />
                  +91 600-616-1726
                </a>
              </li>
              <li>
                <a href="mailto:info@nexgendevelopers.in" className="flex items-center gap-2.5 break-all text-gray-400 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-teal-400" />
                  info@nexgendevelopers.in
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <MapPin className="h-4 w-4 text-teal-400" />
                Srinagar, Jammu and Kashmir, India
              </li>
            </ul>
          </div>

          {/* Why choose us */}
          <div className="md:px-8">
            <div className="mb-4 flex items-center gap-3">
              <Gem className="h-6 w-6 text-white" />
              <h3 className="text-base font-bold text-white">Why Choose Us?</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-l-2 border-teal-500/40 pl-4">
              {whyChooseUs.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon className="h-4 w-4 shrink-0 text-teal-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative md:pl-8">
            <div className="mb-4 flex items-center gap-3">
              <Send className="h-6 w-6 text-white" />
              <h3 className="text-base font-bold text-white">Stay Updated</h3>
            </div>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates, insights and offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white transition-all hover:bg-teal-400 active:scale-95"
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
        <div className="flex flex-col items-center gap-4 border-t border-white/10 py-5 sm:flex-row sm:justify-between">
          <p className="order-2 text-xs text-gray-500 sm:order-1">
            © {currentYear} NexGen Developers. All rights reserved.
          </p>
          <div className="order-1 sm:order-2">
            <FooterSocials />
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="order-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-gray-300 transition-all hover:border-teal-400 hover:text-teal-400 hover:scale-105 active:scale-95"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
