"use client";

import { CommentItem } from "./comment-item";
import { PostComment } from "./comment-types";

export default function CommentThread({
  parentId,
  postId,
  depth = 0,
  allComments,
  onCommentAdded,
}: {
  parentId: string;
  postId: string;
  depth?: number;
  allComments: PostComment[];
  onCommentAdded?: () => void;
}) {
  // Filter comments that belong to this parent
  const comments = allComments.filter((c) => c.parentId === parentId);

  if (!comments.length) return null;

  // Limit depth to prevent too much nesting
  const maxDepth = 5;
  const nextDepth = Math.min(depth + 1, maxDepth);

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem 
            comment={comment} 
            postId={postId} 
            depth={nextDepth} 
            onReactionAdded={onCommentAdded}
          />
          {comment.id && nextDepth < maxDepth && (
            <div className="ml-8 mt-3 pl-4 border-l-2 border-slate-300">
              <CommentThread
                parentId={comment.id}
                postId={postId}
                depth={nextDepth}
                allComments={allComments}
                onCommentAdded={onCommentAdded}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
