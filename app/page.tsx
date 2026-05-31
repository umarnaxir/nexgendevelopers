import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import WhyChooseUsSection from "./about/components/WhyChooseUsSection";
import FeaturedWorkSection from "./home/FeaturedWorkSection";
import ServicesSection from "./home/ServicesSection";
import ClientReviewsSection from "./home/ClientReviewsSection";
import FAQSection from "./home/FAQSection";
import { getHomeSEO } from "@/lib/seo/page-seo";

export const metadata = getHomeSEO();
  
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection dark />
      <AboutSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ClientReviewsSection />
      <FAQSection />
    </>
  );
}