import SinglePostPage from "@/components/freedom-wall/single-post-page";
import {
  getPostById,
  getPostComments,
  getAllNestedComments,
} from "@/lib/dal/queries";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolved = await params;
  const post = await getPostById(paramsResolved.id);
  const comments = await getPostComments(paramsResolved.id);
  const allNestedComments = await getAllNestedComments(paramsResolved.id);
  const totalCommentCount = allNestedComments.length;

  return (
    <SinglePostPage
      postId={paramsResolved.id}
      post={post}
      comments={comments}
      allComments={allNestedComments}
      totalCommentCount={totalCommentCount}
    />
  );
}
