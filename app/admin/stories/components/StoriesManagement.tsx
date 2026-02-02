"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  X,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import {
  Story,
  getStories,
  createStory,
  updateStory,
  deleteStory,
  initializeStories,
  getDefaultExpiresAt,
  isStoryExpired,
} from "@/services/storiesService";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";

export default function StoriesManagement() {
  const { hasPermission } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    caption: "",
    link: "",
    expiresAt: "",
  });

  useEffect(() => {
    initializeStories();
    loadStories();
  }, []);

  const loadStories = () => {
    setStories(getStories());
  };

  const handleSaveStory = () => {
    if (!formData.imageUrl.trim()) {
      toast.error("Image URL is required");
      return;
    }
    const expiresAt = formData.expiresAt
      ? new Date(formData.expiresAt).toISOString()
      : getDefaultExpiresAt();
    if (selectedStory) {
      const updated = updateStory(selectedStory.id, {
        imageUrl: formData.imageUrl.trim(),
        caption: formData.caption.trim() || undefined,
        link: formData.link.trim() || undefined,
        expiresAt,
      });
      if (updated) {
        toast.success("Story updated successfully");
      } else {
        toast.error("Failed to update story");
      }
    } else {
      createStory({
        imageUrl: formData.imageUrl.trim(),
        caption: formData.caption.trim() || undefined,
        link: formData.link.trim() || undefined,
        expiresAt,
      });
      toast.success("Story created successfully");
    }
    loadStories();
    closeEditor();
  };

  const handleDeleteStory = () => {
    if (!selectedStory) return;
    const deleted = deleteStory(selectedStory.id);
    if (deleted) {
      loadStories();
      setIsDeleteModalOpen(false);
      setSelectedStory(null);
      toast.success("Story deleted successfully");
    } else {
      toast.error("Failed to delete story");
    }
  };

  const openNewStoryEditor = () => {
    setSelectedStory(null);
    setFormData({
      imageUrl: "",
      caption: "",
      link: "",
      expiresAt: "",
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

  const toLocalDateTimeString = (iso: string) => {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day}T${h}:${min}`;
  };

  const openEditStoryEditor = (story: Story) => {
    setSelectedStory(story);
    setFormData({
      imageUrl: story.imageUrl,
      caption: story.caption || "",
      link: story.link || "",
      expiresAt: toLocalDateTimeString(story.expiresAt),
    });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setSelectedStory(null);
  };

  const openDeleteModal = (story: Story) => {
    setSelectedStory(story);
    setIsDeleteModalOpen(true);
  };

  const canManageStories = hasPermission("manage_stories");

  if (isEditorOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedStory ? "Edit Story" : "Add New Story"}
            </h1>
            <p className="text-gray-600">
              {selectedStory
                ? "Update story image and details"
                : "Create a new story for logged-in users"}
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
              onClick={handleSaveStory}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {selectedStory ? "Update" : "Add Story"}
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
                Caption (optional)
              </label>
              <textarea
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Short caption for the story"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link (optional)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expires at (optional, default 24h)
              </label>
              <input
                type="datetime-local"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData({ ...formData, expiresAt: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            {formData.imageUrl ? (
              <div className="aspect-[9/16] max-h-[400px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={formData.imageUrl}
                  alt="Story preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="aspect-[9/16] max-h-[400px] rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Enter image URL</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
          <p className="text-gray-600">
            Add and manage stories visible to logged-in users
          </p>
        </div>
        {canManageStories && (
          <button
            onClick={openNewStoryEditor}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Story
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Story
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Caption / Link
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expires
                </th>
                {canManageStories && (
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stories.map((story) => {
                const expired = isStoryExpired(story);
                return (
                  <tr key={story.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={story.imageUrl}
                            alt={story.caption || "Story"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-500">ID: {story.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {story.caption && (
                          <p className="text-sm text-gray-900 truncate">
                            {story.caption}
                          </p>
                        )}
                        {story.link && (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                            <LinkIcon className="w-3 h-3" />
                            Link
                          </span>
                        )}
                        {!story.caption && !story.link && (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                          expired
                            ? "bg-gray-100 text-gray-600"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {expired ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                        {expired ? "Expired" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(story.expiresAt).toLocaleString()}
                    </td>
                    {canManageStories && (
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditStoryEditor(story)}
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit story"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(story)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete story"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {stories.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No stories yet</p>
            {canManageStories && (
              <button
                onClick={openNewStoryEditor}
                className="mt-4 text-black hover:underline font-medium"
              >
                Add your first story
              </button>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStory(null);
        }}
        title=""
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Story
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this story? This cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedStory(null);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteStory}
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
