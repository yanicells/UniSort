"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { PostModal } from "./post-modal";
import { ReactionModal } from "./reaction-modal";
import { PostComment } from "./comment-types";
import { PostContent } from "./PostContent";
import { ImageLightbox } from "./image-lightbox";
import { Heart, MessageCircle } from "lucide-react";

type CommentItemProps = {
  comment: PostComment;
  postId: string;
  depth?: number;
};

export function CommentItem({ comment, postId, depth = 0 }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);
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

  // Calculate sizes based on depth
  const padding = depth === 0 ? "p-4" : "p-3";
  const textSize =
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
                    className="px-2 py-0.5 text-[9px] font-black uppercase text-white"
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
            className={`${textSize} leading-relaxed font-serif text-slate-800`}
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
          <div className="flex gap-3">
            <button
              onClick={() => setShowReactionModal(true)}
              className="flex items-center gap-1 text-slate-500 hover:text-pink-600 transition group"
            >
              <Heart size={14} className="group-hover:fill-current" />
              <span className="text-[10px] font-bold">{totalReactions}</span>
            </button>
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition group"
            >
              <MessageCircle size={14} className="group-hover:fill-current" />
              <span className="text-[10px] font-bold">Reply</span>
            </button>
          </div>
          <div className="flex gap-1 items-center">
            {comment.reactions.like > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] border border-blue-300">
                  👍
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.like}
                </span>
              </div>
            )}
            {comment.reactions.love > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-[10px] border border-red-300">
                  ❤️
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.love}
                </span>
              </div>
            )}
            {comment.reactions.haha > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center text-[10px] border border-yellow-300">
                  😂
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.haha}
                </span>
              </div>
            )}
            {comment.reactions.wow > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px] border border-purple-300">
                  😮
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.wow}
                </span>
              </div>
            )}
            {comment.reactions.sad > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] border border-slate-300">
                  😢
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.sad}
                </span>
              </div>
            )}
            {comment.reactions.angry > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[10px] border border-orange-300">
                  😠
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.reactions.angry}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReactionModal && (
        <ReactionModal
          postId={comment.id}
          onClose={() => setShowReactionModal(false)}
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
