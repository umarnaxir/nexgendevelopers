"use client";

import React from "react";
import { MessageCircle, Facebook, Linkedin, Instagram } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    href: "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.",
    ariaLabel: "WhatsApp"
  },
  {
    icon: <XIcon className="w-4 h-4" />,
    href: "https://x.com/nexgendv",
    ariaLabel: "X"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/company/105880683/",
    ariaLabel: "LinkedIn"
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==",
    ariaLabel: "Instagram"
  },
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F",
    ariaLabel: "Facebook"
  },
];

export default function FooterSocials() {
  return (
    <div className="flex flex-nowrap items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.ariaLabel}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-silver transition-all duration-200 hover:border-teal-400/50 hover:text-teal-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
