import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function createPost(data: {
  content: string;
  tags: string[];
  parentId?: string | null;
}) {
  const [newPost] = await db
    .insert(posts)
    .values({
      content: data.content,
      tags: data.tags,
      parentId: data.parentId || null,
    })
    .returning();

  return newPost;
}

export async function getPosts() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return allPosts;
}