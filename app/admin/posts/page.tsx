import type { Metadata } from "next";
import PostsManagement from "./components/PostsManagement";

export const metadata: Metadata = {
  title: "Posts | Admin | NexGen Developer",
  description: "Manage posts for the community feed",
  robots: { index: false, follow: false },
};

export default function AdminPostsPage() {
  return <PostsManagement />;
}
