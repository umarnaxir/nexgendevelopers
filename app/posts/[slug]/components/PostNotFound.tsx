"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function PostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Post Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The post you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </Link>
      </div>
    </div>
  );
}
