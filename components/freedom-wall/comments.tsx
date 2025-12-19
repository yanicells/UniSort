"use client";

import { CommentItem } from "./comment-item";
import CommentThread from "./comment-thread";
import { PostComment } from "./comment-types";

type CommentProps = {
  postId: string;
  comments: PostComment[];
  totalCount?: number;
  allComments: PostComment[];
};

export function Comments({
  postId,
  comments,
  totalCount,
  allComments,
}: CommentProps) {
  const displayCount = totalCount ?? comments.length;

  if (!comments.length) {
    return (
      <section className="space-y-3">
        <h2 className="text-2xl font-black uppercase tracking-tight border-b-2 border-black pb-2">
          Comments
        </h2>
        <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">
          No comments yet. Be the first to reply!
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <h2 className="text-2xl font-black uppercase tracking-tight">
          Comments
        </h2>
        <span className="text-sm font-bold font-mono uppercase text-slate-600 bg-slate-100 px-3 py-1 border border-black">
          {displayCount} {displayCount === 1 ? "comment" : "comments"}
        </span>
      </div>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} postId={postId} depth={0} />
            {comment.id && (
              <div className="ml-8 mt-3 pl-4 border-l-2 border-slate-300">
                <CommentThread
                  parentId={comment.id}
                  postId={postId}
                  depth={1}
                  allComments={allComments}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
