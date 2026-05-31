import ContactUsHero from "./components/ContactUsHero";
import ContactUsContent from "./components/ContactUsContent";
import ContactSection from "@/app/home/ContactSection";
import { getContactUsSEO } from "@/lib/seo/page-seo";

export const metadata = getContactUsSEO();

export default function ContactUsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ContactUsHero />
        <ContactUsContent />
        <ContactSection />
      </div>
    </div>
  );
}
