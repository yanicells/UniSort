import { getPosts } from "@/lib/dal/queries";
import { Post } from "./post";
import Link from "next/link";

export default async function Wall() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Freedom Wall</h1>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No posts yet. Be the first to post!
          </p>
        ) : (
          posts.map(
            (post) =>
              post.parentId === null && (
                <Link key={post.id} href={`/freedom-wall/${post.id}`}>
                  <Post
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    tags={post.tags}
                    reactions={post.reactions}
                    createdAt={post.createdAt}
                  />
                </Link>
              )
          )
        )}
      </div>
    </main>
  );
}
