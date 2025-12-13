import { getOverallResultsDistribution } from "@/lib/dal/queries";
import { OverallResultsPieChartClient } from "./OverallResultsPieChartClient";

export async function OverallResultsPieChart() {
  const data = await getOverallResultsDistribution();
  return <OverallResultsPieChartClient data={data} />;
}
