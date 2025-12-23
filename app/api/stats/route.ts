import { NextResponse } from "next/server";
import { getQuizSummary, getOverallResultsDistribution, getAverageUniversityScores } from "@/lib/dal/queries";

// Disable all caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [summary, distribution, averageScores] = await Promise.all([
      getQuizSummary(),
      getOverallResultsDistribution(),
      getAverageUniversityScores(),
    ]);

    return NextResponse.json(
      {
        summary,
        distribution,
        averageScores,
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
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
