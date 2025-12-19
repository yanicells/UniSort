"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReactionModal } from "./reaction-modal";
import { PostContent } from "./PostContent";
import { ImageLightbox } from "./image-lightbox";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

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
  commentCount?: number;
  onClick?: () => void;
  onReply?: () => void;
}

export function Post({
  id,
  content,
  tags,
  imageUrl,
  reactions,
  createdAt,
  commentCount = 0,
  onClick,
  onReply,
}: PostProps) {
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const totalReactions =
    reactions.like +
    reactions.love +
    reactions.haha +
    reactions.wow +
    reactions.sad +
    reactions.angry;

  // Get top 3 reactions
  const topReactions = Object.entries(reactions)
    .filter(([_, count]) => count > 0)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type);

  return (
    <div
      className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => {
            const config = getTagConfig(tag);
            return (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] font-black uppercase text-white"
                style={{ backgroundColor: config.bgColor }}
              >
                #{tag}
              </span>
            );
          })}
          <span className="text-xs font-mono text-slate-400 uppercase">
            • {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-slate-400 hover:text-black"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <PostContent
          content={content}
          className="text-lg leading-relaxed font-serif text-slate-800"
        />
      </div>

      {/* Image */}
      {imageUrl && (
        <div
          className="mb-6"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img
            src={imageUrl}
            alt="Post image"
            className="w-full max-h-[400px] object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity border border-slate-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowReactionModal(true);
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-pink-600 transition group"
          >
            <Heart size={18} className="group-hover:fill-current" />
            <span className="text-xs font-bold">{totalReactions}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onReply) onReply();
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition group"
          >
            <MessageCircle size={18} className="group-hover:fill-current" />
            <span className="text-xs font-bold">{commentCount}</span>
          </button>
        </div>
        <div className="flex gap-1">
          {topReactions.includes("haha") && (
            <span className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-xs border border-yellow-300">
              😂
            </span>
          )}
          {topReactions.includes("love") && (
            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs border border-red-300">
              ❤️
            </span>
          )}
          {topReactions.includes("like") && (
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs border border-blue-300">
              👍
            </span>
          )}
          {topReactions.includes("wow") && (
            <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs border border-purple-300">
              😮
            </span>
          )}
          {topReactions.includes("sad") && (
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs border border-slate-300">
              😢
            </span>
          )}
          {topReactions.includes("angry") && (
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs border border-orange-300">
              😠
            </span>
          )}
        </div>
      </div>

      {showReactionModal && (
        <ReactionModal
          postId={id}
          onClose={() => setShowReactionModal(false)}
        />
      )}

      {imageUrl && (
        <ImageLightbox
          src={imageUrl}
          alt="Post image"
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}

function getTagConfig(tag: string): { bgColor: string; textColor: string } {
  const configs: Record<string, { bgColor: string; textColor: string }> = {
    admu: { bgColor: "#001196", textColor: "#ffffff" },
    dlsu: { bgColor: "#00703c", textColor: "#ffffff" },
    up: { bgColor: "#7b1113", textColor: "#ffffff" },
    ust: { bgColor: "#fdb71a", textColor: "#000000" },
    general: { bgColor: "#64748b", textColor: "#ffffff" },
  };
  return configs[tag.toLowerCase()] || configs.general;
}
