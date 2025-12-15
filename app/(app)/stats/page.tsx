import { DailyResultsBarChart } from "@/components/charts/DailyResultsBarChart";
import { OverallResultsPieChart } from "@/components/charts/OverallResultsPieChart";
import { OverallResultsBarChart } from "@/components/charts/OverallResultsBarChart";
import { Suspense } from "react";
import { getQuizSummary } from "@/lib/dal/queries";

export const metadata = {
  title: "Quiz Statistics - UniSort",
  description: "View trends and distributions of all quiz results.",
};

export default async function StatsPage() {
  const summary = await getQuizSummary();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Quiz Statistics</h1>
        <p className="text-foreground/70">
          View trends and distributions of all quiz results
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <SummaryCard label="Total Quizzes" value={summary.total} />
        <SummaryCard label="ADMU Matches" value={summary.admu} color="#001196" />
        <SummaryCard label="DLSU Matches" value={summary.dlsu} color="#00703C" />
        <SummaryCard label="UP Matches" value={summary.up} color="#7B1113" />
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Overall Match Distribution</h2>
        <OverallResultsBarChart />
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

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="card">
      <p
        className="text-3xl font-bold"
        style={{ color: color ?? "var(--foreground)" }}
      >
        {value}
      </p>
      <p className="text-sm text-foreground/70 mt-1">{label}</p>
    </div>
  );
}
