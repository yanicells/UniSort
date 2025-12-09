import { formatDistanceToNow } from "date-fns";
import { getPostComments } from "@/lib/dal/queries";

type CommentProps = {
  parentId: string;
};

export default async function PostComments({ parentId }: CommentProps) {
  const comments = await getPostComments(parentId);

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
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border rounded-lg p-3 bg-white shadow-sm"
          >
            <p className="text-gray-800 whitespace-pre-wrap">
              {comment.content}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
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
          </li>
        ))}
      </ul>
    </section>
  );
}
