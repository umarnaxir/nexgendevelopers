"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  MapPin,
  Hash,
  Upload,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Post,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  initializePosts,
} from "@/services/postsService";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";

function parseHashtags(input: string): string[] {
  const raw = input.trim();
  if (!raw) return [];
  return raw
    .split(/[\s,#]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.startsWith("#") ? s : `#${s}`));
}

function formatHashtagsForInput(hashtags: string[]): string {
  return hashtags.map((t) => (t.startsWith("#") ? t : `#${t}`)).join(", ");
}

export default function PostsManagement() {
  const { user, hasPermission } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    description: "",
    hashtagsInput: "",
    location: "",
  });

  useEffect(() => {
    initializePosts();
    loadPosts();
  }, []);

  const loadPosts = () => {
    setPosts(getPosts());
  };

  const handleSavePost = () => {
    if (!formData.imageUrl.trim()) {
      toast.error("Image is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    const hashtags = parseHashtags(formData.hashtagsInput);
    const authorName = user?.name ?? "Admin";
    const authorId = user?.id ?? "admin";

    if (selectedPost) {
      const updated = updatePost(selectedPost.id, {
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim(),
        hashtags,
        location: formData.location.trim() || undefined,
        authorName,
        authorId,
      });
      if (updated) {
        toast.success("Post updated successfully");
      } else {
        toast.error("Failed to update post");
      }
    } else {
      createPost({
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim(),
        hashtags,
        location: formData.location.trim() || undefined,
        authorName,
        authorId,
      });
      toast.success("Post created successfully");
    }
    loadPosts();
    closeEditor();
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;
    const deleted = deletePost(selectedPost.id);
    if (deleted) {
      loadPosts();
      setIsDeleteModalOpen(false);
      setSelectedPost(null);
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }
  };

  const openNewPostEditor = () => {
    setSelectedPost(null);
    setFormData({
      imageUrl: "",
      description: "",
      hashtagsInput: "",
      location: "",
    });
    setIsEditorOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, GIF, WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      toast.success("Image added");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openEditPostEditor = (post: Post) => {
    setSelectedPost(post);
    setFormData({
      imageUrl: post.imageUrl,
      description: post.description,
      hashtagsInput: formatHashtagsForInput(post.hashtags),
      location: post.location ?? "",
    });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setSelectedPost(null);
  };

  const openDeleteModal = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const canManagePosts = hasPermission("manage_posts");

  if (isEditorOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedPost ? "Edit Post" : "Add New Post"}
            </h1>
            <p className="text-gray-600">
              {selectedPost
                ? "Update post content and details"
                : "Create a new post for the community feed. Posts stay until deleted."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={closeEditor}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePost}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {selectedPost ? "Update" : "Add Post"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={formData.imageUrl.startsWith("data:") ? "" : formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Or enter image URL (e.g. /images/... or https://...)"
                />
                {formData.imageUrl.startsWith("data:") && (
                  <p className="text-xs text-green-600">Image uploaded. Preview on the right.</p>
                )}
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear image
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Share your thoughts, updates, or ideas..."
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4" />
                Hashtags (comma separated)
              </label>
              <input
                type="text"
                value={formData.hashtagsInput}
                onChange={(e) =>
                  setFormData({ ...formData, hashtagsInput: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="#NexGen, #WebDev, #Tech"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                Location (optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="e.g. Lahore, Pakistan"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            {formData.imageUrl ? (
              <div className="space-y-3">
                <div className="aspect-[4/3] max-h-[280px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={formData.imageUrl}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                {formData.description && (
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {formData.description}
                  </p>
                )}
                {parseHashtags(formData.hashtagsInput).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {parseHashtags(formData.hashtagsInput).slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {formData.location && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {formData.location}
                  </p>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] max-h-[280px] rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Add image and content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600">
            Manage community posts. Posts stay until you delete them.
          </p>
        </div>
        {canManagePosts && (
          <button
            onClick={openNewPostEditor}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Post
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description / Hashtags
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author / Date
                </th>
                {canManagePosts && (
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-500">ID: {post.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 line-clamp-2 mb-1">
                        {post.description}
                      </p>
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-blue-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.hashtags.length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{post.hashtags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.location ? (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <p>{post.authorName ?? "—"}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  {canManagePosts && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="View post"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditPostEditor(post)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(post)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {posts.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No posts yet</p>
            {canManagePosts && (
              <button
                onClick={openNewPostEditor}
                className="mt-4 text-black hover:underline font-medium"
              >
                Add your first post
              </button>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPost(null);
        }}
        title=""
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Post
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this post? This cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedPost(null);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePost}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
