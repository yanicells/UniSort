"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReactionModal } from "./reaction-modal";
import { ReactionSummaryModal } from "./reaction-summary-modal";
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
  hideCommentCount?: boolean;
  onReactionAdded?: () => void;
}

const REACTION_EMOJIS: Record<string, string> = {
  like: "👍",
  love: "❤️",
  haha: "😆",
  wow: "😮",
  sad: "😢",
  angry: "😠",
};

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
  hideCommentCount = false,
  onReactionAdded,
}: PostProps) {
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
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
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type);

  return (
    <>
      <div
        className="bg-white border-2 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition cursor-pointer"
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
        <div className="mb-4">
          <PostContent
            content={content}
            className="text-lg leading-relaxed font-serif text-slate-800"
          />
        </div>

        {/* Image */}
        {imageUrl && (
          <div
            className="mb-4"
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

        {/* Footer (Facebook Style) */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 mt-2 gap-y-2">
          {/* LEFT: Reaction Summary & Comments */}
          <div className="flex items-center gap-3">
            {/* Reaction Summary (Clickable) */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                setShowSummaryModal(true);
              }}
            >
              {/* Top 3 Emojis */}
              {topReactions.length > 0 ? (
                <div className="flex items-center pl-1">
                  {topReactions.map((type, idx) => (
                    <div
                      key={type}
                      className={`text-[16px] md:text-[18px] leading-none ${
                        idx > 0 ? "-ml-2.5" : ""
                      }`}
                      style={{ zIndex: 3 - idx, position: "relative" }}
                    >
                      {REACTION_EMOJIS[type]}
                    </div>
                  ))}
                </div>
              ) : null}
              {/* Total Count */}
              <span className="text-xs font-bold text-slate-500 group-hover:underline decoration-slate-400 underline-offset-2">
                {totalReactions > 0 ? totalReactions : "No reactions"}
              </span>
            </div>

            {/* Comment Count */}
            {!hideCommentCount && commentCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick) onClick();
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition group"
              >
                <span className="text-slate-300 text-xs mr-1"> | </span>
                <MessageCircle size={16} className="group-hover:fill-current" />
                <span className="text-xs font-bold hover:underline decoration-slate-400 underline-offset-2">
                  {commentCount}
                </span>
              </button>
            )}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1">
            {/* React Trigger */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReactionModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition text-slate-600 font-bold text-xs uppercase tracking-wider"
              >
                <Heart size={16} />
                <span>React</span>
              </button>
              {showReactionModal && (
                <ReactionModal
                  postId={id}
                  onClose={() => setShowReactionModal(false)}
                  onReactionAdded={onReactionAdded}
                />
              )}
            </div>

            {/* Reply Trigger */}
            {onReply && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReply();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition text-slate-600 font-bold text-xs uppercase tracking-wider"
              >
                <MessageCircle size={16} />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showSummaryModal && (
        <ReactionSummaryModal
          reactions={reactions}
          onClose={() => setShowSummaryModal(false)}
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
    </>
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
