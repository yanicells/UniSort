import { getAverageUniversityScores } from "@/lib/dal/queries";
import { AverageScoresBarChartClient } from "./AverageScoresBarChartClient";

export async function AverageScoresBarChart() {
  const data = await getAverageUniversityScores();
  return <AverageScoresBarChartClient data={data} />;
}
