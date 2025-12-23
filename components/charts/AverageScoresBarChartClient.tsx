"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { MIN_SCORES, MAX_SCORES } from "@/lib/quiz/quiz-constants";

const chartConfig = {
  admu: { label: "ADMU", color: "#001196" },
  dlsu: { label: "DLSU", color: "#00703C" },
  up: { label: "UP", color: "#7B1113" },
  ust: { label: "UST", color: "#FDB71A" },
} satisfies ChartConfig;

export function AverageScoresBarChartClient({
  data,
}: {
  data: { admu: number; dlsu: number; up: number; ust: number };
}) {
  const chartData = [
    { uni: "admu", raw: data.admu, min: MIN_SCORES.admu, max: MAX_SCORES.admu },
    { uni: "dlsu", raw: data.dlsu, min: MIN_SCORES.dlsu, max: MAX_SCORES.dlsu },
    { uni: "up", raw: data.up, min: MIN_SCORES.up, max: MAX_SCORES.up },
    { uni: "ust", raw: data.ust, min: MIN_SCORES.ust, max: MAX_SCORES.ust },
  ].map((item) => {
    const range = item.max - item.min;
    // Clamping the value to ensure it stays within 0-100 logical bounds even if raw scores are slightly off bounds somehow
    // though ideally raw scores fit.
    const rawAdjusted = Math.max(item.min, Math.min(item.raw, item.max));
    const normalized = range > 0
        ? Math.round(((rawAdjusted - item.min) / range) * 100)
        : 0;

    return {
        uni: item.uni.toUpperCase(),
        normalized,
        fill: chartConfig[item.uni as keyof typeof chartConfig].color,
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[250px] sm:h-[300px] md:h-[350px] w-full min-w-0"
    >
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="uni"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
          width={30}
          domain={[0, 100]}
        />
        <ChartTooltip 
            content={<ChartTooltipContent hideLabel />} 
            formatter={(value: number | string, _name: string, item: { payload?: { uni: string } }) => [`${value}% Match`, item.payload?.uni ?? '']}
        />
        <Bar dataKey="normalized" radius={[8, 8, 0, 0]}>
             <LabelList dataKey="normalized" position="top" formatter={(value: number | string) => `${value}%`} style={{ fontSize: 12, fontWeight: 'bold' }} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
