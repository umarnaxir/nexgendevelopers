import { Metadata } from "next";
import StoriesManagement from "./components/StoriesManagement";

export const metadata: Metadata = {
  title: "Stories Management - NexGen Admin",
  robots: { index: false, follow: false },
};

export default function AdminStoriesPage() {
  return <StoriesManagement />;
}
