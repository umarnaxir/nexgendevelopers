import PostsFeed from "./PostsFeed";
import { getPostsSEO } from "@/lib/seo/page-seo";

export const metadata = getPostsSEO();

export default function PostsPage() {
  return <PostsFeed />;
}
