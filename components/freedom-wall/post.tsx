"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReactionModal } from "./reaction-modal";
import { PostContent } from "./PostContent";

interface PostProps {
  id: string;
  content: string;
  tags: string[];
  imageUrl?: string | null;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  createdAt: Date;
}

export function Post({
  id,
  content,
  tags,
  imageUrl,
  reactions,
  createdAt,
}: PostProps) {
  const [showReactionModal, setShowReactionModal] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Tags */}
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Content */}
      <PostContent content={content} />

      {/* Image */}
      {imageUrl && (
        <div className="w-full">
          <img
            src={imageUrl}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(imageUrl, "_blank")}
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
        <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>

        {/* Reactions */}
        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            {Object.entries(reactions).map(
              ([reaction, count]) =>
                count > 0 && (
                  <span key={reaction} className="flex items-center gap-1">
                    <span className="text-gray-600">
                      {getReactionEmoji(reaction)}
                    </span>
                    <span className="text-xs">{count}</span>
                  </span>
                )
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowReactionModal(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
              title="Add reaction"
            >
              😊
            </button>
            {showReactionModal && (
              <ReactionModal
                postId={id}
                onClose={() => setShowReactionModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getReactionEmoji(reaction: string): string {
  const emojis: Record<string, string> = {
    like: "👍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    sad: "😢",
    angry: "😠",
  };
  return emojis[reaction] || "";
}
