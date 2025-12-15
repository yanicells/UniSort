"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  admu: { label: "ADMU", color: "#001196" },
  dlsu: { label: "DLSU", color: "#00703C" },
  up: { label: "UP", color: "#7B1113" },
  ust: { label: "UST", color: "#FDB71A" },
} satisfies ChartConfig;

export function OverallResultsBarChartClient({
  data,
}: {
  data: { uni: string; count: number }[];
}) {
  const chartData = data.map((item) => ({
    uni: item.uni.toUpperCase(),
    count: item.count,
    fill: chartConfig[item.uni as keyof typeof chartConfig].color,
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} barSize={48}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="uni" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}


