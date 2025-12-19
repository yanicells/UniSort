import { getPostComments } from "@/lib/dal/queries";
import { CommentItem } from "./comment-item";

export default async function CommentThread({
  parentId,
  postId,
  depth = 0,
}: {
  parentId: string;
  postId: string;
  depth?: number;
}) {
  const comments = await getPostComments(parentId);

  if (!comments.length) return null;

  // Limit depth to prevent too much nesting
  const maxDepth = 5;
  const nextDepth = Math.min(depth + 1, maxDepth);

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} postId={postId} depth={nextDepth} />
          {comment.id && nextDepth < maxDepth && (
            <div className="ml-8 mt-3 pl-4 border-l-2 border-slate-300">
              <CommentThread
                parentId={comment.id}
                postId={postId}
                depth={nextDepth}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
