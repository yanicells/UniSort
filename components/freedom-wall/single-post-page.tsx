import { notFound } from "next/navigation";
import { getPostById, getPostComments } from "@/lib/dal/queries";
import SinglePostView from "./post-view";
import PostComments from "./comments";

type SinglePostPageProps = {
  postId: string;
};

export default async function SinglePostPage({ postId }: SinglePostPageProps) {
  const post = await getPostById(postId);

  if (!post) {
    return notFound();
  }
  
  const comments = await getPostComments(postId);

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto space-y-6">
      <SinglePostView post={post} />
      <PostComments comments={comments} />
    </main>
  );
}
