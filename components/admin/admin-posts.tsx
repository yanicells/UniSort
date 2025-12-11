import { getPosts } from "@/lib/dal/queries";
import { DeletePostButton } from "./delete-post-button";

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin - All Posts</h1>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-sm">
              <p className="mb-2">{post.content}</p>
              <p className="text-sm text-gray-500">
                Tags: {post.tags.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(post.createdAt).toLocaleString()}
              </p>
              <DeletePostButton postId={post.id} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
