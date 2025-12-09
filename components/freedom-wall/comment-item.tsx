"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReplyModal } from "./reply-form";
import { PostComment } from "./comment-types";

type CommentItemProps = {
  comment: PostComment;
  canReply?: boolean;
};

export function CommentItem({ comment, canReply = true }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);

  const createdAt =
    comment.createdAt instanceof Date
      ? comment.createdAt
      : new Date(comment.createdAt);

  return (
    <article className="border rounded-lg p-3 bg-white shadow-sm">
      <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
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
