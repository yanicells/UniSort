import { getPosts } from "@/lib/dal/queries";
import { DeletePostButton } from "./delete-post-button";
import { Container } from "../layout/Container";
import { Post } from "../freedom-wall/post";

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <Container className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin - All Posts</h1>
        </div>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-foreground/60 py-12">
              No posts available.
            </p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="relative">
                <Post
                  id={post.id}
                  content={post.content}
                  tags={post.tags}
                  reactions={post.reactions}
                  createdAt={new Date(post.createdAt)}
                  imageUrl={post.imageUrl}
                  commentCount={post.commentCount}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-foreground/50 px-4">
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
