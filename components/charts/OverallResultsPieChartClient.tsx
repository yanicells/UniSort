"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useMemo } from "react";

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

interface OverallResultsPieChartClientProps {
  data: { uni: string; count: number }[];
}

export function OverallResultsPieChartClient({
  data,
}: OverallResultsPieChartClientProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      uni: item.uni,
      count: item.count,
      fill: chartConfig[item.uni as keyof typeof chartConfig].color,
    }));
  }, [data]);

  const totalResults = useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Quiz Results Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <RechartsPrimitive.PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="uni" hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent nameKey="uni" />} />
            <RechartsPrimitive.Pie
              data={chartData}
              dataKey="count"
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
                          {totalResults}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Results
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
