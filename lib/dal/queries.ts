import { db } from "@/db/drizzle";
import { posts, quizResults } from "@/db/schema";
import { desc, eq, and, count, sql } from "drizzle-orm";

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

export async function getOverallResultsDistribution(): Promise<
  { uni: string; count: number }[]
> {
  const results = await db
    .select({
      uni: quizResults.topMatch,
      count: count(),
    })
    .from(quizResults)
    .groupBy(quizResults.topMatch);

  return results.map((row) => ({
    uni: row.uni,
    count: Number(row.count),
  }));
}

export async function getDailyResultsCounts(
  days: number,
  filterUni?: "admu" | "dlsu" | "up" | "ust" | "all"
): Promise<
  { date: string; admu: number; dlsu: number; up: number; ust: number }[]
> {
  const whereConditions = [
    sql`${quizResults.createdAt} >= NOW() - INTERVAL '${sql.raw(
      days.toString()
    )} days'`,
  ];

  // Add filter condition if a specific university is selected
  if (filterUni && filterUni !== "all") {
    whereConditions.push(eq(quizResults.topMatch, filterUni));
  }

  const results = await db
    .select({
      date: sql<string>`DATE(${quizResults.createdAt})`.as("date"),
      topMatch: quizResults.topMatch,
      count: count(),
    })
    .from(quizResults)
    .where(and(...whereConditions))
    .groupBy(sql`DATE(${quizResults.createdAt})`, quizResults.topMatch)
    .orderBy(sql`DATE(${quizResults.createdAt})`);

  // Transform the results into the desired format
  const dateMap = new Map<
    string,
    { date: string; admu: number; dlsu: number; up: number; ust: number }
  >();

  for (const row of results) {
    const dateKey = row.date;
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, {
        date: dateKey,
        admu: 0,
        dlsu: 0,
        up: 0,
        ust: 0,
      });
    }
    const entry = dateMap.get(dateKey)!;
    entry[row.topMatch as "admu" | "dlsu" | "up" | "ust"] = Number(row.count);
  }

  return Array.from(dateMap.values());
}
