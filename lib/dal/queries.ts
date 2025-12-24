import { db } from "@/db/drizzle";
import { posts, quizResults } from "@/db/schema";
import { desc, eq, and, count, sql, gte, isNull } from "drizzle-orm";

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

// Get all nested comments recursively for a post
export async function getAllNestedComments(postId: string) {
  const allComments = await db
    .select()
    .from(posts)
    .where(eq(posts.isDeleted, false));

  // Build parent-to-children map
  const childrenMap = new Map<string, typeof allComments>();
  allComments.forEach((comment) => {
    if (comment.parentId) {
      if (!childrenMap.has(comment.parentId)) {
        childrenMap.set(comment.parentId, []);
      }
      childrenMap.get(comment.parentId)!.push(comment);
    }
  });

  // Recursively collect all descendants
  function collectDescendants(id: string): typeof allComments {
    const children = childrenMap.get(id) || [];
    let descendants = [...children];
    children.forEach((child) => {
      descendants = descendants.concat(collectDescendants(child.id));
    });
    return descendants;
  }

  return collectDescendants(postId);
}

export async function getPosts() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(and(eq(posts.isDeleted, false), isNull(posts.parentId)))
    .orderBy(desc(posts.createdAt));
  return allPosts;
}

export async function getAllPosts() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.isDeleted, false))
    .orderBy(desc(posts.createdAt));
  return allPosts;
}

export async function getRecentPosts(limit = 4) {
  const recent = await db
    .select()
    .from(posts)
    .where(and(eq(posts.isDeleted, false), isNull(posts.parentId)))
    .orderBy(desc(posts.createdAt))
    .limit(limit);
  return recent;
}

type WallUniversity = "general" | "admu" | "dlsu" | "up" | "ust";
type WallSort = "latest" | "most-liked" | "most-discussed";
type WallTime = "all" | "week" | "month";

// Efficient batch function to get comment counts for multiple posts
async function getCommentCountsForPosts(postIds: string[]): Promise<Map<string, number>> {
  if (postIds.length === 0) {
    return new Map();
  }

  // Get all comments (at any level) that are descendants of any of these posts
  const allComments = await db
    .select({ id: posts.id, parentId: posts.parentId })
    .from(posts)
    .where(eq(posts.isDeleted, false));

  // Build a map of parent -> children
  const childrenMap = new Map<string, string[]>();
  allComments.forEach((comment) => {
    if (comment.parentId) {
      if (!childrenMap.has(comment.parentId)) {
        childrenMap.set(comment.parentId, []);
      }
      childrenMap.get(comment.parentId)!.push(comment.id);
    }
  });

  // Recursively count all descendants
  function countDescendants(id: string): number {
    const children = childrenMap.get(id) || [];
    let count = children.length;
    children.forEach((childId) => {
      count += countDescendants(childId);
    });
    return count;
  }

  // Calculate counts for all requested posts
  const counts = new Map<string, number>();
  postIds.forEach((postId) => {
    counts.set(postId, countDescendants(postId));
  });

  return counts;
}

export async function getWallPosts({
  page = 1,
  limit = 10,
  universities = [],
  sortBy = "latest",
  timeRange = "all",
}: {
  page?: number;
  limit?: number;
  universities?: WallUniversity[];
  sortBy?: WallSort;
  timeRange?: WallTime;
}) {
  const offset = (page - 1) * limit;

  const conditions = [eq(posts.isDeleted, false), isNull(posts.parentId)];

  const safeUniversities = universities.filter((u) =>
    ["general", "admu", "dlsu", "up", "ust"].includes(u)
  ) as WallUniversity[];

  if (safeUniversities.length > 0) {
    const arrayLiteral = safeUniversities.map((u) => `'${u}'`).join(",");
    conditions.push(
      sql`${posts.tags} && ${sql.raw(`ARRAY[${arrayLiteral}]::text[]`)}`
    );
  }

  if (timeRange === "week") {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    conditions.push(gte(posts.createdAt, weekAgo));
  } else if (timeRange === "month") {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    conditions.push(gte(posts.createdAt, monthAgo));
  }

  const reactionsTotal = sql<number>`
    COALESCE(( ${posts.reactions} ->> 'like')::int, 0) +
    COALESCE(( ${posts.reactions} ->> 'love')::int, 0) +
    COALESCE(( ${posts.reactions} ->> 'haha')::int, 0) +
    COALESCE(( ${posts.reactions} ->> 'wow')::int, 0) +
    COALESCE(( ${posts.reactions} ->> 'sad')::int, 0) +
    COALESCE(( ${posts.reactions} ->> 'angry')::int, 0)
  `;

  let orderExpression;
  switch (sortBy) {
    case "most-liked":
      orderExpression = desc(reactionsTotal);
      break;
    case "most-discussed":
      // For most-discussed, we'll need to sort after calculating counts
      orderExpression = desc(posts.createdAt);
      break;
    default:
      orderExpression = desc(posts.createdAt);
  }

  const result = await db
    .select({
      id: posts.id,
      content: posts.content,
      parentId: posts.parentId,
      tags: posts.tags,
      imageUrl: posts.imageUrl,
      reactions: posts.reactions,
      createdAt: posts.createdAt,
      isDeleted: posts.isDeleted,
      reactionsTotal,
    })
    .from(posts)
    .where(and(...conditions))
    .orderBy(orderExpression, desc(posts.createdAt))
    .limit(sortBy === "most-discussed" ? limit * 3 : limit) // Fetch more for sorting
    .offset(offset);

  // Get comment counts for all posts in a single batch query
  const postIds = result.map((post) => post.id);
  const commentCounts = await getCommentCountsForPosts(postIds);

  // Add comment counts to each post
  const postsWithCommentCounts = result.map((post) => ({
    ...post,
    commentCount: commentCounts.get(post.id) || 0,
  }));

  // Sort by comment count if needed and limit again
  if (sortBy === "most-discussed") {
    postsWithCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
    return postsWithCommentCounts.slice(0, limit);
  }

  return postsWithCommentCounts;
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

export async function getQuizSummary() {
  const totals = await db.select({ count: count() }).from(quizResults);
  const distribution = await getOverallResultsDistribution();

  const totalsByUni = distribution.reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.uni] = row.count;
      return acc;
    },
    {}
  );

  return {
    total: totals[0]?.count ? Number(totals[0].count) : 0,
    admu: totalsByUni["admu"] || 0,
    dlsu: totalsByUni["dlsu"] || 0,
    up: totalsByUni["up"] || 0,
    ust: totalsByUni["ust"] || 0,
  };
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

export async function getAverageUniversityScores() {
  const result = await db
    .select({
      admu: sql<number>`avg((${quizResults.scores}->>'admu')::int)`,
      dlsu: sql<number>`avg((${quizResults.scores}->>'dlsu')::int)`,
      up: sql<number>`avg((${quizResults.scores}->>'up')::int)`,
      ust: sql<number>`avg((${quizResults.scores}->>'ust')::int)`,
    })
    .from(quizResults);

  return {
    admu: result[0]?.admu ? Number(result[0].admu) : 0,
    dlsu: result[0]?.dlsu ? Number(result[0].dlsu) : 0,
    up: result[0]?.up ? Number(result[0].up) : 0,
    ust: result[0]?.ust ? Number(result[0].ust) : 0,
  };
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
