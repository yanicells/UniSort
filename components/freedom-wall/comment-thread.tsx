import { getPostComments } from "@/lib/dal/queries";
import { CommentItem } from "./comment-item";

export default async function CommentThread({
  parentId,
}: {
  parentId: string;
}) {
  const comments = await getPostComments(parentId);

  if (!comments.length) return null;

  return (
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
  );
}
