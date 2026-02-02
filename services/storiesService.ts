"use client";

export interface Story {
  id: string;
  imageUrl: string;
  caption?: string;
  link?: string;
  status: "active" | "expired";
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

const STORIES_STORAGE_KEY = "nexgen_stories";
const DEFAULT_STORY_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const DEFAULT_STORIES: Story[] = [
  {
    id: "nexgen-default-1",
    imageUrl: "/images/common/NDLogo2.svg",
    caption: "NexGen Developers — Building digital excellence. Websites, apps, AI & digital marketing.",
    link: "/services",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
  },
];

export function getDefaultExpiresAt(): string {
  return new Date(Date.now() + DEFAULT_STORY_DURATION_MS).toISOString();
}

export function initializeStories(): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(STORIES_STORAGE_KEY);
  if (!existing || existing === "[]") {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(DEFAULT_STORIES));
  }
}

export function getStories(): Story[] {
  if (typeof window === "undefined") return [];
  initializeStories();
  const json = localStorage.getItem(STORIES_STORAGE_KEY);
  if (!json) return DEFAULT_STORIES;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STORIES;
  } catch {
    return DEFAULT_STORIES;
  }
}

export function saveStories(stories: Story[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories));
}

export function getStoryById(id: string): Story | undefined {
  return getStories().find((s) => s.id === id);
}

export function getActiveStories(): Story[] {
  const now = new Date().toISOString();
  return getStories().filter(
    (s) => s.status === "active" && s.expiresAt > now
  );
}

export function createStory(
  data: Omit<Story, "id" | "createdAt" | "updatedAt" | "status">
): Story {
  const stories = getStories();
  const newStory: Story = {
    ...data,
    id: Date.now().toString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: data.expiresAt || getDefaultExpiresAt(),
  };
  stories.unshift(newStory);
  saveStories(stories);
  return newStory;
}

export function updateStory(id: string, updates: Partial<Story>): Story | null {
  const stories = getStories();
  const index = stories.findIndex((s) => s.id === id);
  if (index === -1) return null;
  stories[index] = {
    ...stories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveStories(stories);
  return stories[index];
}

export function deleteStory(id: string): boolean {
  const stories = getStories();
  const index = stories.findIndex((s) => s.id === id);
  if (index === -1) return false;
  stories.splice(index, 1);
  saveStories(stories);
  return true;
}

export function isStoryExpired(story: Story): boolean {
  return story.status === "expired" || new Date(story.expiresAt) <= new Date();
}
