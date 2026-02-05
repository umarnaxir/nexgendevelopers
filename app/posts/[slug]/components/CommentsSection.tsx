"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, User, Trash2, Edit2, Reply, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorId?: string;
  content: string;
  createdAt: string;
  parentId?: string;
  updatedAt?: string;
}

interface CommentWithReplies extends Comment {
  replies?: Comment[];
}

const COMMENTS_STORAGE_KEY = "nexgen_post_comments";

function getCommentsForPost(postId: string): CommentWithReplies[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return [];
    const allComments: Comment[] = JSON.parse(stored);
    const postComments = allComments.filter((c) => c.postId === postId);
    // Separate top-level comments and replies
    const topLevel = postComments.filter((c) => !c.parentId);
    const replies = postComments.filter((c) => c.parentId);
    
    // Sort top-level by date (newest first)
    topLevel.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Attach replies to their parents and sort replies by date (oldest first)
    const commentsWithReplies: CommentWithReplies[] = topLevel.map((comment) => {
      const commentReplies = replies
        .filter((r) => r.parentId === comment.id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return { ...comment, replies: commentReplies };
    });
    
    return commentsWithReplies;
  } catch {
    return [];
  }
}

function saveComment(comment: Comment): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    allComments.push(comment);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
  } catch {
    // ignore
  }
}

function deleteComment(commentId: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return;
    const allComments: Comment[] = JSON.parse(stored);
    // Delete comment and all its replies
    const filtered = allComments.filter((c) => c.id !== commentId && c.parentId !== commentId);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

function updateComment(commentId: string, newContent: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return;
    const allComments: Comment[] = JSON.parse(stored);
    const updated = allComments.map((c) =>
      c.id === commentId ? { ...c, content: newContent, updatedAt: new Date().toISOString() } : c
    );
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

interface CommentsSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComments(getCommentsForPost(postId));
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || loading) return;

    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      return;
    }

    const comment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      postId,
      authorName: user?.name || "Anonymous",
      authorId: user?.id,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    saveComment(comment);
    setComments(getCommentsForPost(postId));
    setNewComment("");
  };

  const handleReply = (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || loading) return;

    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      return;
    }

    const reply: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      postId,
      parentId,
      authorName: user?.name || "Anonymous",
      authorId: user?.id,
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
    };

    saveComment(reply);
    setComments(getCommentsForPost(postId));
    setReplyContent("");
    setReplyingTo(null);
  };

  const handleEdit = (commentId: string, currentContent: string) => {
    setEditingId(commentId);
    setEditContent(currentContent);
  };

  const handleUpdate = (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    updateComment(commentId, editContent.trim());
    setComments(getCommentsForPost(postId));
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = (commentId: string, authorId?: string) => {
    if (!isAuthenticated) return;
    if (authorId && user?.id !== authorId && user?.role !== "admin") return;
    
    deleteComment(commentId);
    setComments(getCommentsForPost(postId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="pt-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
          </div>
          <div className="flex-1 flex gap-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "Write a comment..." : "Log in to comment"}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 placeholder-gray-400 text-sm"
              rows={2}
              disabled={!isAuthenticated}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || loading || !isAuthenticated}
              className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const canEdit = isAuthenticated && user?.id === comment.authorId;
            const canDelete = isAuthenticated && (user?.id === comment.authorId || user?.role === "admin");
            const isEditing = editingId === comment.id;
            const isReplying = replyingTo === comment.id;

            return (
              <div key={comment.id} className="space-y-2">
                <div className="flex gap-3 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{comment.authorName}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(comment.updatedAt || comment.createdAt)}
                            {comment.updatedAt && comment.updatedAt !== comment.createdAt && " (edited)"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {canEdit && !isEditing && (
                            <button
                              onClick={() => handleEdit(comment.id, comment.content)}
                              className="p-1 hover:bg-blue-100 rounded text-blue-600"
                              aria-label="Edit comment"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => handleDelete(comment.id, comment.authorId)}
                              className="p-1 hover:bg-red-100 rounded text-red-600"
                              aria-label="Delete comment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      {isEditing ? (
                        <form onSubmit={(e) => handleUpdate(comment.id, e)} className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 text-sm"
                            rows={2}
                            autoFocus
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(null);
                                setEditContent("");
                              }}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => {
                                if (!isAuthenticated) {
                                  window.dispatchEvent(new CustomEvent("openLoginModal"));
                                  return;
                                }
                                setReplyingTo(isReplying ? null : comment.id);
                                setReplyContent("");
                              }}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Reply className="w-3.5 h-3.5" />
                              Reply
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {isReplying && (
                  <div className="ml-13 flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs overflow-hidden">
                        {isAuthenticated && user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <form onSubmit={(e) => handleReply(comment.id, e)} className="flex-1 flex gap-2">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 placeholder-gray-400 text-sm"
                        rows={2}
                        autoFocus
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          type="submit"
                          disabled={!replyContent.trim() || loading}
                          className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs font-medium shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent("");
                          }}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs font-medium shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-13 space-y-2">
                    {comment.replies.map((reply: Comment) => {
                      const canEditReply = isAuthenticated && user?.id === reply.authorId;
                      const canDeleteReply = isAuthenticated && (user?.id === reply.authorId || user?.role === "admin");
                      const isEditingReply = editingId === reply.id;

                      return (
                        <div key={reply.id} className="flex gap-2 group">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-xs">
                              {reply.authorName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <p className="font-semibold text-gray-900 text-xs">{reply.authorName}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(reply.updatedAt || reply.createdAt)}
                                    {reply.updatedAt && reply.updatedAt !== reply.createdAt && " (edited)"}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {canEditReply && !isEditingReply && (
                                    <button
                                      onClick={() => handleEdit(reply.id, reply.content)}
                                      className="p-1 hover:bg-blue-100 rounded text-blue-600"
                                      aria-label="Edit reply"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                  )}
                                  {canDeleteReply && (
                                    <button
                                      onClick={() => handleDelete(reply.id, reply.authorId)}
                                      className="p-1 hover:bg-red-100 rounded text-red-600"
                                      aria-label="Delete reply"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              {isEditingReply ? (
                                <form onSubmit={(e) => handleUpdate(reply.id, e)} className="space-y-2">
                                  <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 text-xs"
                                    rows={2}
                                    autoFocus
                                  />
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="submit"
                                      className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                                    >
                                      Update
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingId(null);
                                        setEditContent("");
                                      }}
                                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-xs font-medium"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              ) : (
                                <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap">
                                  {reply.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
