import { NextResponse } from "next/server";
import { getWallPosts } from "@/lib/dal/queries";

// Disable all caching for this API route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const universities = searchParams
      .getAll("university")
      .filter(Boolean) as ("admu" | "dlsu" | "up" | "ust")[];
    const sortBy = (searchParams.get("sortBy") ||
      "latest") as "latest" | "most-liked" | "most-discussed";
    const timeRange = (searchParams.get("timeRange") ||
      "all") as "all" | "week" | "month";

    const posts = await getWallPosts({
      page,
      limit,
      universities,
      sortBy,
      timeRange,
    });

    return NextResponse.json(
      { posts },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", posts: [] },
      { status: 500 }
    );
  }
}
