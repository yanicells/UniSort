import { NextResponse } from "next/server";
import { getPostById, getPostComments, getAllNestedComments } from "@/lib/dal/queries";

// Disable all caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const [post, comments, allNestedComments] = await Promise.all([
      getPostById(id),
      getPostComments(id),
      getAllNestedComments(id),
    ]);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        post,
        comments,
        allComments: allNestedComments,
        totalCommentCount: allNestedComments.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
