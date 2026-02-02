"use client";

export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  hashtags: string[];
  location?: string;
  authorId?: string;
  authorName?: string;
  status: "active" | "deleted";
  createdAt: string;
  updatedAt: string;
}

const POSTS_STORAGE_KEY = "nexgen_posts";

const DEFAULT_POSTS: Post[] = [
  {
    id: "nexgen-default-post-1",
    imageUrl: "/images/blogs/dummy-img.jpeg",
    description:
      "Welcome to NexGen Developer — your platform to share thoughts, updates, and ideas. We build digital excellence: websites, apps, AI solutions, and digital marketing. Connect with our community and stay inspired. 🚀",
    hashtags: ["#NexGen", "#WebDevelopment", "#DigitalAgency", "#TechCommunity", "#Innovation"],
    location: "Kashmir, India",
    authorId: "nexgen",
    authorName: "NexGen Developer",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "nexgen-default-post-2",
    imageUrl: "/images/blogs/website-blog.jpg",
    description:
      "Web Development at NexGen — modern, responsive websites that scale. From landing pages to full web apps. Clean code, fast performance. 🌐",
    hashtags: ["#WebDevelopment", "#NexGen", "#Website", "#Frontend", "#Responsive"],
    location: "Kashmir, India",
    authorId: "nexgen",
    authorName: "NexGen Developer",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "nexgen-default-post-3",
    imageUrl: "/images/blogs/app.jpg",
    description:
      "App Development — native & cross-platform mobile apps. iOS, Android, React Native. Build the app your users love. 📱",
    hashtags: ["#AppDevelopment", "#MobileApp", "#NexGen", "#ReactNative", "#iOS", "#Android"],
    location: "Kashmir, India",
    authorId: "nexgen",
    authorName: "NexGen Developer",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "nexgen-default-post-4",
    imageUrl: "/images/blogs/ai-blog.jpg",
    description:
      "AI & ML solutions — chatbots, automation, custom models. Leverage AI to grow your business. Smart, scalable, secure. 🤖",
    hashtags: ["#AI", "#MachineLearning", "#NexGen", "#Chatbot", "#Automation", "#Tech"],
    location: "Kashmir, India",
    authorId: "nexgen",
    authorName: "NexGen Developer",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function initializePosts(): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(POSTS_STORAGE_KEY);
  if (!existing || existing === "[]") {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
    return;
  }
  // Migrate: Lahore → Kashmir, and seed missing default posts (web, app, AI)
  try {
    const parsed = JSON.parse(existing) as Post[];
    if (!Array.isArray(parsed)) return;
    let updated = parsed.map((p: Post) =>
      p.id === "nexgen-default-post-1" && p.location === "Lahore, Pakistan"
        ? { ...p, location: "Kashmir, India", updatedAt: new Date().toISOString() }
        : p
    );
    // Update default posts 2–4 to use blog images if they still have service images
    const blogImageByPostId: Record<string, string> = {
      "nexgen-default-post-2": "/images/blogs/website-blog.jpg",
      "nexgen-default-post-3": "/images/blogs/app.jpg",
      "nexgen-default-post-4": "/images/blogs/ai-blog.jpg",
    };
    updated = updated.map((p) => {
      const blogUrl = blogImageByPostId[p.id];
      if (blogUrl && p.imageUrl?.includes("/images/services/")) {
        return { ...p, imageUrl: blogUrl, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    const existingIds = new Set(updated.map((p) => p.id));
    const toAdd = DEFAULT_POSTS.filter((p) => !existingIds.has(p.id));
    if (toAdd.length > 0) {
      updated = [...toAdd, ...updated];
    }
    if (JSON.stringify(updated) !== existing) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // ignore
  }
}

export function getPosts(): Post[] {
  if (typeof window === "undefined") return [];
  initializePosts();
  const json = localStorage.getItem(POSTS_STORAGE_KEY);
  if (!json) return DEFAULT_POSTS;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function savePosts(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function getPostById(id: string): Post | undefined {
  return getPosts().find((p) => p.id === id);
}

export function getActivePosts(): Post[] {
  return getPosts()
    .filter((p) => p.status === "active")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createPost(
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "status">
): Post {
  const posts = getPosts();
  const newPost: Post = {
    ...data,
    id: `post-${Date.now()}`,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}

export function updatePost(id: string, updates: Partial<Post>): Post | null {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  savePosts(posts);
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  savePosts(posts);
  return true;
}
