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
    <Card>
      <CardHeader>
        <CardTitle>Your Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <RechartsPrimitive.PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="uni" hideLabel />}
            />
            <RechartsPrimitive.Pie
              data={chartData}
              dataKey="score"
              nameKey="uni"
              innerRadius={60}
              strokeWidth={5}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalScore}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Points
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </RechartsPrimitive.Pie>
          </RechartsPrimitive.PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
