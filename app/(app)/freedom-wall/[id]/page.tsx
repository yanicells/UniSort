import SinglePostPage from "@/components/freedom-wall/single-post-page";
import { getPostById } from "@/lib/dal/queries";
import { Metadata } from "next";

// Force dynamic - client will fetch fresh data
export const dynamic = "force-dynamic";

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
  
  // Only pass postId - client will fetch all data
  return <SinglePostPage postId={paramsResolved.id} />;
}
