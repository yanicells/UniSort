import { getPosts } from "@/lib/dal/queries";
import { DeletePostButton } from "./delete-post-button";
import { Container } from "../layout/Container";
import { PostContent } from "../freedom-wall/PostContent";

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <Container className="space-y-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Admin - All Posts</h1>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-foreground/60 py-12">
              No posts available.
            </p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card space-y-3">
                <div className="flex items-center gap-2 text-xs text-foreground/60 flex-wrap">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background-subtle px-3 py-1 font-medium"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                  <span>• {new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <PostContent content={post.content} />
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>ID: {post.id}</span>
                  <DeletePostButton postId={post.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
