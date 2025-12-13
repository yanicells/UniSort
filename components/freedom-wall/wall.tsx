"use client";

import { getPosts } from "@/lib/dal/queries";
import { Post } from "./post";
import { useRouter } from "next/navigation";

interface WallProps {
  posts: Awaited<ReturnType<typeof getPosts>>;
}

export default function Wall({ posts }: WallProps) {
  const router = useRouter();

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
                <Post
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  tags={post.tags}
                  reactions={post.reactions}
                  createdAt={post.createdAt}
                  imageUrl={post.imageUrl}
                  onClick={() => router.push(`/freedom-wall/${post.id}`)}
                />
              )
          )
        )}
      </div>
    </main>
  );
}
