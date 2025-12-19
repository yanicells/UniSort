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
  scores: {
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
  scores,
}: IndividualScoresPieChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        uni: "admu",
        score: scores.admu,
        fill: chartConfig.admu.color,
      },
      {
        uni: "dlsu",
        score: scores.dlsu,
        fill: chartConfig.dlsu.color,
      },
      {
        uni: "up",
        score: scores.up,
        fill: chartConfig.up.color,
      },
      {
        uni: "ust",
        score: scores.ust,
        fill: chartConfig.ust.color,
      },
    ];
  }, [scores]);

  const totalScore = useMemo(() => {
    return scores.admu + scores.dlsu + scores.up + scores.ust;
  }, [scores]);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full aspect-square mx-auto max-w-full"
    >
      <RechartsPrimitive.PieChart
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <ChartTooltip
          content={<ChartTooltipContent nameKey="uni" hideLabel />}
        />
        <RechartsPrimitive.Pie
          data={chartData}
          dataKey="score"
          nameKey="uni"
          innerRadius="45%"
          outerRadius="80%"
          strokeWidth={2}
        >
          <RechartsPrimitive.Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl sm:text-2xl md:text-3xl font-black font-serif"
                    >
                      {totalScore}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 18}
                      className="fill-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest"
                    >
                      Points
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
