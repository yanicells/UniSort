"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useMemo } from "react";

interface IndividualScoresPieChartProps {
  percentages: {
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  };
}

const chartConfig = {
  admu: {
    label: "ADMU",
    color: "#0033A0", // Blue
  },
  dlsu: {
    label: "DLSU",
    color: "#006747", // Green
  },
  up: {
    label: "UP",
    color: "#8B0000", // Maroon
  },
  ust: {
    label: "UST",
    color: "#FDB71A", // Gold/Yellow
  },
} satisfies ChartConfig;

export function IndividualScoresPieChart({
  percentages,
}: IndividualScoresPieChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        uni: "admu",
        value: percentages.admu,
        fill: chartConfig.admu.color,
      },
      {
        uni: "dlsu",
        value: percentages.dlsu,
        fill: chartConfig.dlsu.color,
      },
      {
        uni: "up",
        value: percentages.up,
        fill: chartConfig.up.color,
      },
      {
        uni: "ust",
        value: percentages.ust,
        fill: chartConfig.ust.color,
      },
    ].sort((a, b) => b.value - a.value);
  }, [percentages]);

  const maxPercentage = useMemo(() => {
    return Math.max(...Object.values(percentages));
  }, [percentages]);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full aspect-square mx-auto max-w-full"
    >
      <RechartsPrimitive.PieChart
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <ChartTooltip
          content={<ChartTooltipContent nameKey="uni" hideLabel formatter={(value) => `${value}%`} />}
        />
        <RechartsPrimitive.Pie
          data={chartData}
          dataKey="value"
          nameKey="uni"
          innerRadius="45%"
          outerRadius="80%"
          strokeWidth={2}
          startAngle={90}
          endAngle={-270}
        >
          <RechartsPrimitive.Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy ? viewBox.cy - 5 : 0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy ? viewBox.cy - 5 : 0}
                      className="fill-foreground text-xl sm:text-2xl md:text-3xl font-black font-serif"
                    >
                      {maxPercentage}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
                      className="fill-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest"
                    >
                      Match
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </RechartsPrimitive.Pie>
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  );
}
