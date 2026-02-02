import type { Metadata } from "next";
import StoriesViewer from "./StoriesViewer";

export const metadata: Metadata = {
  title: "Stories | NexGen Developer",
  description: "View our latest stories",
  robots: { index: false, follow: true },
};

export default function StoriesPage() {
  return <StoriesViewer />;
}
