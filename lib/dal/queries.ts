import { db } from "@/db/drizzle";
import { posts, quizResults } from "@/db/schema";
import { desc, eq, and, isNull } from "drizzle-orm";

export async function createPost(data: {
  content: string;
  tags: string[];
  parentId?: string | null;
  imageUrl?: string;
}) {
  const [newPost] = await db
    .insert(posts)
    .values({
      content: data.content,
      tags: data.tags,
      parentId: data.parentId || null,
      imageUrl: data.imageUrl || null,
    })
    .returning();

  return newPost;
}

export async function getPostById(id: string) {
  const post = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, id), eq(posts.isDeleted, false)))
    .limit(1);
  return post[0];
}

export async function getPostComments(parentId: string) {
  const comments = await db
    .select()
    .from(posts)
    .where(and(eq(posts.parentId, parentId), eq(posts.isDeleted, false)))
    .orderBy(desc(posts.createdAt));
  return comments;
}

export async function getPosts() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.isDeleted, false))
    .orderBy(desc(posts.createdAt));
  return allPosts;
}

export async function addReaction(postId: string, reaction: string) {
  const post = await getPostById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const currentReactions = post.reactions || {
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  const updatedReactions = {
    ...currentReactions,
    [reaction]:
      (currentReactions[reaction as keyof typeof currentReactions] || 0) + 1,
  };

  const result = await db
    .update(posts)
    .set({ reactions: updatedReactions })
    .where(eq(posts.id, postId));

  return result;
}

export async function deletePost(postId: string) {
  const result = await db
    .update(posts)
    .set({ isDeleted: true })
    .where(eq(posts.id, postId));
  return result;
}

export async function saveQuizResult(data: {
  name: string;
  topMatch: "admu" | "dlsu" | "up" | "ust";
  scores: {
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  };
}) {
  const [result] = await db
    .insert(quizResults)
    .values({
      name: data.name,
      topMatch: data.topMatch,
      scores: data.scores,
    })
    .returning();

  return result;
}
