import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/dal/queries";
import { Post } from "@/components/freedom-wall/post";

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post</h1>
        <Link
          href="/freedom-wall"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to wall
        </Link>
      </div>

      <Post
        id={post.id}
        content={post.content}
        tags={post.tags}
        reactions={post.reactions}
        createdAt={post.createdAt}
      />
    </main>
  );
}
