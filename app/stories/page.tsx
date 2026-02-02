import StoriesViewer from "./StoriesViewer";
import { getStoriesSEO } from "@/lib/seo/page-seo";

export const metadata = getStoriesSEO();

export default function StoriesPage() {
  return <StoriesViewer />;
}
