"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogPostContentProps {
  blog: {
    title: string;
    images?: string[];
    sections: Array<{
      type: 'text' | 'image' | 'heading';
      content?: string;
      heading?: string;
      headingLevel?: 1 | 2 | 3;
      image?: string;
    }>;
    internalLink: { href: string; text: string };
    externalLink: { href: string; text: string };
  };
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white light:prose-headings:text-gray-900 prose-p:text-silver-light light:prose-p:text-gray-700 prose-a:text-teal-300 light:prose-a:text-teal-700 prose-strong:text-white light:prose-strong:text-gray-900 prose-li:text-silver-light light:prose-li:text-gray-700 prose-code:text-teal-200 light:prose-code:text-teal-700 prose-blockquote:text-silver-light light:prose-blockquote:text-gray-700 prose-blockquote:border-teal-400/50 light:prose-blockquote:border-teal-200 prose-hr:border-white/10 light:prose-hr:border-gray-200">
      {blog.sections.map((section, index) => {
        const aosDelay = Math.min(index * 50, 400);

        if (section.type === 'heading') {
          const HeadingTag = `h${section.headingLevel || 2}` as keyof React.JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              className={`font-bold text-white light:text-gray-900 mb-6 mt-12 ${
                section.headingLevel === 1 ? 'text-4xl' :
                section.headingLevel === 2 ? 'text-3xl' :
                'text-2xl'
              }`}
            >
              {section.heading}
            </HeadingTag>
          );
        }

        if (section.type === 'image') {
          return (
            <div
              key={index}
              className="relative w-full h-64 sm:h-96 my-12 rounded-xl overflow-hidden border border-white/10 light:border-gray-200"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              <Image
                src={section.image || blog.images?.[0] || "/images/blogs/ai-blog.jpg"}
                alt={`${blog.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        }

        if (section.type === 'text') {
          return (
            <p
              key={index}
              className="text-silver-light light:text-gray-700 leading-relaxed mb-6 text-base sm:text-lg"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              {section.content}
            </p>
          );
        }

        return null;
      })}

      {/* Internal + External links for SEO and UX */}
      <div
        className="glass-card mt-12 p-6 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-bold text-white light:text-gray-900 mb-4">Further reading</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href={blog.internalLink.href}
              className="text-teal-300 light:text-teal-700 font-semibold underline decoration-teal-400/40 underline-offset-2 hover:text-teal-200"
            >
              {blog.internalLink.text} →
            </Link>
            <span className="text-silver-dark light:text-gray-500 text-sm ml-1">(our services)</span>
          </li>
          <li>
            <a
              href={blog.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 light:text-teal-700 font-semibold underline decoration-teal-400/40 underline-offset-2 hover:text-teal-200"
            >
              {blog.externalLink.text} ↗
            </a>
            <span className="text-silver-dark light:text-gray-500 text-sm ml-1">(external)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
