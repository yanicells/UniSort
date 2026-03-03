import { NextRequest, NextResponse } from "next/server";
import { getDailyResultsCounts } from "@/lib/dal/queries";

// ISR: cache daily stats for up to 2 minutes
export const revalidate = 120;

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
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=240",
      },
    });
  } catch (error) {
    console.error("Error fetching daily results:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily results" },
      { status: 500 },
    );
  }
}
