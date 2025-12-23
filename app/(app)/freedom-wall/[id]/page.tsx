import SinglePostPage from "@/components/freedom-wall/single-post-page";
import {
  getPostById,
  getPostComments,
  getAllNestedComments,
} from "@/lib/dal/queries";
import { Metadata } from "next";

// Helper to strip HTML tags
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

// Dynamic metadata for individual posts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const paramsResolved = await params;
  const post = await getPostById(paramsResolved.id);

  if (!post) {
    return {
      title: "Post Not Found | Freedom Wall",
      description: "This freedom wall post could not be found.",
    };
  }

  const preview = stripHtml(post.content).slice(0, 80);
  const uniTag = post.tags[0] || "general";
  const uniName =
    uniTag === "admu"
      ? "Ateneo (ADMU)"
      : uniTag === "dlsu"
        ? "La Salle (DLSU)"
        : uniTag === "up"
          ? "UP Diliman"
          : uniTag === "ust"
            ? "UST"
            : "Big 4";

  return {
    title: `"${preview}..." | ${uniName} Freedom Wall Confession`,
    description: `Anonymous post about ${uniName} student life: ${preview}... Read more confessions and student experiences from ${uniName}.`,
    keywords: [
      `${uniTag} freedom wall`,
      `${uniTag} confessions`,
      `${uniName} student experiences`,
      "anonymous university posts",
      "college confessions philippines",
    ],
    openGraph: {
      title: `${uniName} Freedom Wall Post`,
      description: preview,
      type: "article",
      url: `https://unisort.ycells.com/freedom-wall/${paramsResolved.id}`,
    },
    alternates: {
      canonical: `https://unisort.ycells.com/freedom-wall/${paramsResolved.id}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolved = await params;
  const post = await getPostById(paramsResolved.id);
  const comments = await getPostComments(paramsResolved.id);
  const allNestedComments = await getAllNestedComments(paramsResolved.id);
  const totalCommentCount = allNestedComments.length;

  return (
    <SinglePostPage
      postId={paramsResolved.id}
      post={post}
      comments={comments}
      allComments={allNestedComments}
      totalCommentCount={totalCommentCount}
    />
  );
}
