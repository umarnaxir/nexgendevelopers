import type { Metadata } from "next";
import PostsFeed from "./PostsFeed";

export const metadata: Metadata = {
  title: "Posts | NexGen Developer",
  description: "Community feed — share thoughts and stay connected",
  robots: { index: false, follow: true },
};

export default function PostsPage() {
  return <PostsFeed />;
}
