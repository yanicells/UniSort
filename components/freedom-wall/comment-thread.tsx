import { getPostComments } from "@/lib/dal/queries";
import { CommentItem } from "./comment-item";

export default async function CommentThread({
  parentId,
  depth = 0,
}: {
  parentId: string;
  depth?: number;
}) {
  const comments = await getPostComments(parentId);

  if (!comments.length) return null;

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} depth={depth + 1} />
          <div className="mt-3 ml-6 pl-4 border-l-2 border-border/40 space-y-3">
            <CommentThread parentId={comment.id} depth={depth + 1} />
          </div>
        </li>
      ))}
    </ul>
  );
}
