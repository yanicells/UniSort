"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { PostModal } from "./post-modal";
import { ReactionModal } from "./reaction-modal";
import { ReactionSummaryModal } from "./reaction-summary-modal";
import { PostComment } from "./comment-types";
import { PostContent } from "./PostContent";
import { ImageLightbox } from "./image-lightbox";
import { Heart, MessageCircle } from "lucide-react";

type CommentItemProps = {
  comment: PostComment;
  postId: string;
  depth?: number;
};

const REACTION_EMOJIS: Record<string, string> = {
  like: "👍",
  love: "❤️",
  haha: "😆",
  wow: "😮",
  sad: "😢",
  angry: "😠",
};

export function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const createdAt =
    comment.createdAt instanceof Date
      ? comment.createdAt
      : new Date(comment.createdAt);

  const totalReactions =
    comment.reactions.like +
    comment.reactions.love +
    comment.reactions.haha +
    comment.reactions.wow +
    comment.reactions.sad +
    comment.reactions.angry;

  // Get top 3 reactions
  const topReactions = Object.entries(comment.reactions)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type);

  // Only reduce content text size, keep buttons/tags consistent
  const padding = depth === 0 ? "p-4" : "p-3";
  const contentTextSize =
    depth === 0 ? "text-base" : depth === 1 ? "text-sm" : "text-xs";

  return (
    <>
      <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] transition w-full">
        {/* Header */}
        <div
          className={`flex justify-between items-start border-b border-slate-200 ${padding} pb-2`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            {comment.tags &&
              comment.tags.length > 0 &&
              comment.tags.map((tag) => {
                const config = getTagConfig(tag);
                return (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-black uppercase text-white"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    #{tag}
                  </span>
                );
              })}
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              • {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`${padding} pt-2 pb-2`}>
          <PostContent
            content={comment.content}
            className={`${contentTextSize} leading-relaxed font-serif text-slate-800`}
          />
        </div>

        {/* Image */}
        {comment.imageUrl && (
          <div className={`${padding} pt-0`}>
            <img
              src={comment.imageUrl}
              alt="Comment image"
              className="w-full max-h-[250px] object-cover rounded cursor-pointer hover:opacity-95 transition-opacity border border-slate-200"
              onClick={() => setIsLightboxOpen(true)}
            />
          </div>
        )}

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t border-slate-200 ${padding} pt-2`}
        >
          {/* LEFT: Reaction Summary */}
          <div
            className="flex items-center gap-1.5 cursor-pointer group h-6"
            onClick={(e) => {
              e.stopPropagation();
              setShowSummaryModal(true);
            }}
          >
            {topReactions.length > 0 && (
              <div className="flex items-center pl-1">
                {topReactions.map((type, idx) => (
                  <div
                    key={type}
                    className={`text-[12px] leading-none ${
                      idx > 0 ? "-ml-2" : ""
                    }`}
                    style={{ zIndex: 3 - idx, position: "relative" }}
                  >
                    {REACTION_EMOJIS[type]}
                  </div>
                ))}
              </div>
            )}
            <span className="text-[10px] font-bold text-slate-500 group-hover:underline decoration-slate-400">
              {totalReactions > 0 ? totalReactions : ""}
            </span>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShowReactionModal(true)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition text-slate-500 hover:text-black font-bold text-[10px] uppercase tracking-wide"
              >
                <Heart size={14} />
                <span>React</span>
              </button>
              {showReactionModal && (
                <ReactionModal
                  postId={comment.id}
                  onClose={() => setShowReactionModal(false)}
                />
              )}
            </div>
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition text-slate-500 hover:text-blue-600 font-bold text-[10px] uppercase tracking-wide"
            >
              <MessageCircle size={14} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>

      {showSummaryModal && (
        <ReactionSummaryModal
          reactions={comment.reactions}
          onClose={() => setShowSummaryModal(false)}
        />
      )}

      {showReply && (
        <PostModal parentId={comment.id} onClose={() => setShowReply(false)} />
      )}

      {comment.imageUrl && (
        <ImageLightbox
          src={comment.imageUrl}
          alt="Comment image"
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
