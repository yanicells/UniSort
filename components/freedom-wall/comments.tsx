import { CommentItem } from "./comment-item";
import CommentThread from "./comment-thread";
import { PostComment } from "./comment-types";

type CommentProps = {
  comments: PostComment[];
  totalCount?: number;
};

export default function PostComments({ comments, totalCount }: CommentProps) {
  const displayCount = totalCount ?? comments.length;

  if (!comments.length) {
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Comments</h2>
        <p className="text-sm text-foreground/50">No comments yet. Be the first to reply!</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments</h2>
        <span className="text-sm font-medium text-foreground/60">
          {displayCount} {displayCount === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} />
            <div className="mt-3 ml-6 pl-4 border-l-2 border-border/40 space-y-3">
              <CommentThread parentId={comment.id} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
