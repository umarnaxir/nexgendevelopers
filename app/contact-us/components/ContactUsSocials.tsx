"use client";

import React from "react";
import { MessageCircle, Facebook, Linkedin, Instagram, Github } from "lucide-react";

const socialLinks = [
  { icon: MessageCircle, href: "https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0", label: "WhatsApp" },
  { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==", label: "Instagram" },
  { icon: Github, href: "https://github.com/Nexgendevelopers", label: "GitHub" },
];

export default function ContactUsSocials() {
  return (
    <section className="py-8 sm:py-12 border-t border-gray-200" data-aos="fade-up">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black mb-2 sm:mb-3">Connect with us</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
          Follow us on social media or drop a message. We&apos;re here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white transition-all duration-200 hover:bg-teal-600 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
