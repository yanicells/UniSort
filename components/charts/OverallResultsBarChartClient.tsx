"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
    <ChartContainer
      config={chartConfig}
      className="h-[250px] sm:h-[300px] w-full max-w-full"
    >
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="uni"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={35}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
