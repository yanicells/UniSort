"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReplyModal } from "./reply-form";
import { ReactionModal } from "./reaction-modal";
import { PostComment } from "./comment-types";

type CommentItemProps = {
  comment: PostComment;
  canReply?: boolean;
};

export function CommentItem({ comment, canReply = true }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);

  const createdAt =
    comment.createdAt instanceof Date
      ? comment.createdAt
      : new Date(comment.createdAt);

  return (
    <article className="border rounded-lg p-3 bg-white shadow-sm">
      <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
        <div className="flex items-center gap-2">
          {comment.tags?.length ? (
            <div className="flex gap-1">
              {comment.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Reactions Display */}
      <div className="mt-2 flex items-center gap-3">
        <div className="flex gap-2">
          {Object.entries(comment.reactions).map(
            ([reaction, count]) =>
              count > 0 && (
                <span
                  key={reaction}
                  className="flex items-center gap-1 text-xs"
                >
                  <span>{getReactionEmoji(reaction)}</span>
                  <span className="text-gray-600">{count}</span>
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
              postId={comment.id}
              onClose={() => setShowReactionModal(false)}
            />
          )}
        </div>
      </div>
      <div className="mt-2">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setShowReply(true)}
        >
          Reply
        </button>
        {showReply && canReply && (
          <ReplyModal
            parentId={comment.id}
            onClose={() => setShowReply(false)}
          />
        )}
      </div>
    </article>
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
