import ContactUsHero from "./components/ContactUsHero";
import ContactUsContent from "./components/ContactUsContent";
import ContactSection from "@/app/home/ContactSection";
import { getContactUsSEO } from "@/lib/seo/page-seo";

export const metadata = getContactUsSEO();

export default function ContactUsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ContactUsHero />
        <ContactUsContent />
        <ContactSection />
      </div>
    </div>
  );
}
