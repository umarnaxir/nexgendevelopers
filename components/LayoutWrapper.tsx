"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ContactModalProvider from "@/components/modals/ContactModalProvider";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <ContactModalProvider>
      <div id="layout-root" className="page-bg relative min-h-screen text-gray-800">
        <div className="relative z-10">
          <Navbar />
          <main className="flex-1 pt-20 lg:pt-0">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </div>
    </ContactModalProvider>
  );
}
