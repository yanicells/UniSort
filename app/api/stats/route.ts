import { NextResponse } from "next/server";
import {
  getQuizSummary,
  getOverallResultsDistribution,
  getAverageUniversityScores,
} from "@/lib/dal/queries";

// ISR: cache stats response for up to 2 minutes
export const revalidate = 120;

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
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=240",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
