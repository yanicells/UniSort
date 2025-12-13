import { DailyResultsBarChart } from "@/components/charts/DailyResultsBarChart";
import { OverallResultsPieChart } from "@/components/charts/OverallResultsPieChart";
import { Suspense } from "react";

export default function StatsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Quiz Statistics</h1>
        <p className="text-muted-foreground">
          View trends and distributions of all quiz results
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense
          fallback={
            <div className="border rounded-lg p-6 animate-pulse">
              <div className="h-[400px] bg-muted rounded" />
            </div>
          }
        >
          <OverallResultsPieChart />
        </Suspense>

        <Suspense
          fallback={
            <div className="border rounded-lg p-6 animate-pulse">
              <div className="h-[400px] bg-muted rounded" />
            </div>
          }
        >
          <DailyResultsBarChart days={30} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="border rounded-lg p-6 animate-pulse">
            <div className="h-[400px] bg-muted rounded" />
          </div>
        }
      >
        <DailyResultsBarChart days={7} />
      </Suspense>
    </div>
  );
}
