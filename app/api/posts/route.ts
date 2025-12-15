import { NextResponse } from "next/server";
import { getWallPosts } from "@/lib/dal/queries";

export async function GET(request: Request) {
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

  return NextResponse.json({ posts });
}


