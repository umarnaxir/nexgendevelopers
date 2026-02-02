"use client";

import {
  Users,
  FileText,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Newspaper,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getUsers } from "@/services/authService";
import { getPosts } from "@/services/postsService";
import { getStories } from "@/services/storiesService";
import { useEffect, useState } from "react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

export default function AdminContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    const users = getUsers();
    const blogsData = localStorage.getItem("nexgen_blogs");
    const blogs = blogsData ? JSON.parse(blogsData) : [];
    const publishedBlogs = blogs.filter((b: { status?: string }) => b.status === "published");
    const posts = getPosts();
    const stories = getStories();

    setStats([
      {
        title: "Total Users",
        value: users.length,
        change: `${users.filter((u: { isActive: boolean }) => u.isActive).length} active`,
        trend: "up",
        icon: Users,
      },
      {
        title: "Total Blogs",
        value: blogs.length || 0,
        change: `${publishedBlogs.length} published`,
        trend: "up",
        icon: BookOpen,
      },
      {
        title: "Total Posts",
        value: posts.length || 0,
        change: `${posts.filter((p: { status: string }) => p.status === "active").length} active`,
        trend: "up",
        icon: Newspaper,
      },
      {
        title: "Total Stories",
        value: stories.length || 0,
        change: `${stories.filter((s: { status: string }) => s.status === "active").length} active`,
        trend: "up",
        icon: ImageIcon,
      },
    ]);
  }, []);

  const quickLinks = [
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Manage Blogs", href: "/admin/blogs", icon: BookOpen },
    { name: "Manage Posts", href: "/admin/posts", icon: Newspaper },
    { name: "Manage Stories", href: "/admin/stories", icon: ImageIcon },
    { name: "Manage Pages", href: "/admin/pages", icon: FileText },
  ];

  const recentActivity = [
    { action: "New user registered", time: "2 hours ago", type: "user" },
    { action: "Blog post published", time: "4 hours ago", type: "blog" },
    { action: "Privacy page updated", time: "1 day ago", type: "page" },
    { action: "New blog draft saved", time: "2 days ago", type: "blog" },
    { action: "New post published", time: "3 days ago", type: "post" },
    { action: "Story added to feed", time: "4 days ago", type: "story" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your website today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-black rounded-xl shadow-sm p-6 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-teal-400" : "text-red-400"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-gray-300 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="p-2 bg-black rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "user" ? "bg-blue-500" :
                    activity.type === "blog" ? "bg-green-500" :
                    activity.type === "page" ? "bg-purple-500" :
                    activity.type === "post" ? "bg-amber-500" :
                    "bg-cyan-500"
                  }`} />
                  <span className="text-gray-700">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">Website</p>
              <p className="text-sm text-green-600">Online & Running</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">Database</p>
              <p className="text-sm text-green-600">Connected (Local Storage)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-800">Auth Service</p>
              <p className="text-sm text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
