import { getDailyResultsCounts } from "@/lib/dal/queries";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching daily results:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily results" },
      { status: 500 }
    );
  }
}
