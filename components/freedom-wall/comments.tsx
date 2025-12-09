"use client"

import { formatDistanceToNow } from "date-fns";
import { ReplyModal } from "./reply-form";
import { useState } from "react";

type PostComment = {
  id: string;
  content: string;
  tags: string[];
  createdAt: Date | string;
};

type CommentProps = {
  comments: PostComment[];
};

export default function PostComments({ comments }: CommentProps) {
    const [showReply, setShowReply] = useState(false);
  if (!comments.length) {
    return (
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Comments</h2>
        <p className="text-sm text-gray-500">No comments yet.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Comments</h2>
        <span className="text-sm text-gray-500">{comments.length}</span>
      </div>

      <ul className="space-y-3">
        {comments.map((comment) => {
          const createdAt =
            comment.createdAt instanceof Date
              ? comment.createdAt
              : new Date(comment.createdAt);

          return (
            <li
              key={comment.id}
              className="border rounded-lg p-3 bg-white shadow-sm"
            >
              <p className="text-gray-800 whitespace-pre-wrap">
                {comment.content}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>
                  {formatDistanceToNow(createdAt, { addSuffix: true })}
                </span>
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
              <div>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setShowReply(true)}
                >
                  Reply
                </button>
                {showReply && (
                  <ReplyModal
                    parentId={comment.id}
                    onClose={() => setShowReply(false)}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
