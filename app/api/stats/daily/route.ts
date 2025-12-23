import { NextRequest, NextResponse } from "next/server";
import { getDailyResultsCounts } from "@/lib/dal/queries";

// Disable all caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "30");
    const filter = searchParams.get("filter") as
      | "admu"
      | "dlsu"
      | "up"
      | "ust"
      | "all"
      | null;

    const data = await getDailyResultsCounts(days, filter || "all");

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error fetching daily results:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily results" },
      { status: 500 }
    );
  }
}
