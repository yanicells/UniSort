import { NextResponse } from "next/server";
import {
  getQuizSummary,
  getOverallResultsDistribution,
  getAverageUniversityScores,
} from "@/lib/dal/queries";

// ISR: cache stats response for up to 60 seconds
export const revalidate = 60;

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
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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
