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
  onClick?: () => void;
}

export function Post({
  id,
  content,
  tags,
  imageUrl,
  reactions,
  createdAt,
  onClick,
}: PostProps) {
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <div
      className={`card space-y-3 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-xs text-foreground/60 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 font-medium ${
              tagColorClasses[tag as keyof typeof tagColorClasses] ||
              "bg-gray-200 text-gray-800"
            }`}
          >
            {tag.toUpperCase()}
          </span>
        ))}
        <span>• {formatDistanceToNow(createdAt, { addSuffix: true })}</span>
      </div>

      <PostContent content={content} />

      {imageUrl && (
        <div className="w-full">
          <img
            src={imageUrl}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setOpenImage(imageUrl);
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-foreground/70 pt-2 border-t border-border">
        <div className="flex items-center gap-3">
          {Object.entries(reactions).map(
            ([reaction, count]) =>
              count > 0 && (
                <span key={reaction} className="flex items-center gap-1">
                  <span>{getReactionEmoji(reaction)}</span>
                  <span className="text-xs">{count}</span>
                </span>
              )
          )}
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowReactionModal(true);
            }}
            className="rounded-full px-3 py-1 text-sm hover:bg-gray-100 transition"
            aria-label="React to post"
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

      {openImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation();
            setOpenImage(null);
          }}
        >
          <img
            src={openImage}
            alt="Post full image"
            className="max-h-[80vh] max-w-5xl rounded-xl shadow-2xl"
          />
        </div>
      )}
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

const tagColorClasses = {
  admu: "bg-[var(--admu-blue)] text-white",
  dlsu: "bg-[var(--dlsu-green)] text-white",
  up: "bg-[var(--up-maroon)] text-white",
  ust: "bg-[var(--ust-gold)] text-black",
  general: "bg-gray-200 text-gray-800",
};
