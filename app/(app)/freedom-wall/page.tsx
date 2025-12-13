import Wall from "@/components/freedom-wall/wall";
import { getPosts } from "@/lib/dal/queries";

export default async function FreedomWall() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Freedom Wall</h1>
      <Wall posts={posts} />
    </main>
  );
}
