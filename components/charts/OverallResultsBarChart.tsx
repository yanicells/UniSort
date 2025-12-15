import { getOverallResultsDistribution } from "@/lib/dal/queries";
import { OverallResultsBarChartClient } from "./OverallResultsBarChartClient";

export async function OverallResultsBarChart() {
  const data = await getOverallResultsDistribution();
  return <OverallResultsBarChartClient data={data} />;
}


