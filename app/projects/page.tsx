import ProjectsHero from "./components/ProjectsHero";
import ProjectsList from "./components/ProjectsList";
import StatsBar from "@/components/StatsBar";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";
import { getProjectsSEO } from "@/lib/seo/page-seo";

export const metadata = getProjectsSEO();

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHero />
      <ProjectsList />
      <StatsBar />
      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}
