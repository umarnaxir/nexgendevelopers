import { Metadata } from "next";
import { getPostSEO } from "@/lib/seo/page-seo";

interface PostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Since posts are stored in localStorage, we can't access them during SSR
  // We'll generate basic metadata and the client-side page will handle the actual post data
  return getPostSEO({
    title: "Community Post",
    description: "View this post from NexGen Developers community.",
    slug: slug,
    publishedDate: new Date().toISOString(),
  });
}

export default async function PostLayout({ children, params }: PostLayoutProps) {
  return <>{children}</>;
}
