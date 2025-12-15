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
        <span className="text-sm text-gray-500">{displayCount}</span>
      </div>

      <ul className="space-y-3">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} />
            <div className="mt-4 ml-4 pl-4 border-l border-gray-200">
              <CommentThread parentId={comment.id} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
