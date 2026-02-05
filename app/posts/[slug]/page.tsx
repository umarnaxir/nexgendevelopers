"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug } from "@/services/postsService";
import type { Post } from "@/services/postsService";
import { ArticleSchema } from "@/lib/seo/structured-data";
import { seoConfig } from "@/lib/seo/config";
import PostHero from "./components/PostHero";
import PostContent from "./components/PostContent";
import PostActions from "./components/PostActions";
import CommentsSection from "./components/CommentsSection";
import RelatedPosts from "./components/RelatedPosts";
import PostNotFound from "./components/PostNotFound";
import PostsSidebar from "../components/PostsSidebar";
import PostsMobileNav from "../components/PostsMobileNav";
import LoginModal from "@/components/modals/LoginModal";
import SignupModal from "@/components/modals/SignupModal";
import Footer from "@/components/Footer/Footer";

export default function PostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Listen for modal events
  useEffect(() => {
    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    const handleOpenSignupModal = () => setIsSignupModalOpen(true);

    window.addEventListener("openLoginModal", handleOpenLoginModal);
    window.addEventListener("openSignupModal", handleOpenSignupModal);
    
    return () => {
      window.removeEventListener("openLoginModal", handleOpenLoginModal);
      window.removeEventListener("openSignupModal", handleOpenSignupModal);
    };
  }, []);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost || null);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) {
    return <PostNotFound />;
  }

  const postUrl = `${seoConfig.siteUrl}/posts/${post.slug}`;
  const postImage = post.imageUrl.startsWith("http") 
    ? post.imageUrl 
    : `${seoConfig.siteUrl}${post.imageUrl}`;

  return (
    <>
      <ArticleSchema
        title={post.description.slice(0, 100)}
        description={post.description}
        url={postUrl}
        image={postImage}
        publishedDate={post.createdAt}
        author={post.authorName}
        publisher={seoConfig.publisher}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Above Sidebar */}
        <PostHero post={post} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-24 lg:pb-0">
          <div className="flex gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {/* Post Content */}
              <PostContent post={post} />
              
              {/* Actions Bar */}
              <PostActions post={post} />
              
              {/* Comments */}
              <div id="comments" className="mt-4">
                <CommentsSection postId={post.id} />
              </div>

              {/* Related Posts */}
              <div className="mt-8 pb-8">
                <RelatedPosts currentPostId={post.id} />
              </div>
            </article>

            {/* Sidebar - Right Side */}
            <PostsSidebar 
              currentPostSlug={post.slug}
              onLoginClick={() => setIsLoginModalOpen(true)}
              onSignupClick={() => setIsSignupModalOpen(true)}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Navigation */}
        <PostsMobileNav
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
        />

        {/* Modals */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToSignup={() => {
            setIsLoginModalOpen(false);
            setTimeout(() => setIsSignupModalOpen(true), 100);
          }}
        />
        <SignupModal 
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          onSwitchToLogin={() => {
            setIsSignupModalOpen(false);
            setTimeout(() => setIsLoginModalOpen(true), 100);
          }}
        />
      </div>
    </>
  );
}
