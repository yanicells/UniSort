import { getWallPosts } from "@/lib/dal/queries";
import { WallClient } from "@/components/freedom-wall/wall-client";

export const metadata = {
  title: "Freedom Wall - UniSort",
  description:
    "Read and share anonymous thoughts about university life at ADMU, DLSU, UP, and UST.",
};

export default async function FreedomWall() {
  const posts = await getWallPosts({ page: 1, limit: 10 });

  return (
    <WallClient initialPosts={posts} />
  );
}
