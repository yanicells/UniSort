import { notFound } from "next/navigation";
import { getPostById } from "@/lib/dal/queries";
import SinglePostView from "@/components/freedom-wall/post-view";
import PostComments from "@/components/freedom-wall/comments";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolved = await params;
  const post = await getPostById(paramsResolved.id);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto space-y-6">
      <SinglePostView post={post} />
      <PostComments parentId={post.id} />
    </main>
  );
}
