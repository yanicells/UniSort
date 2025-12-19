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
    <Card className="overflow-hidden border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-lg sm:text-xl sr-only">
          All Quiz Results Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden p-0">
        <ChartContainer
          config={chartConfig}
          className="h-[280px] sm:h-[350px] md:h-[400px] w-full min-w-0"
        >
          <RechartsPrimitive.PieChart
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            width={undefined}
            height={undefined}
          >
            <ChartTooltip
              content={<ChartTooltipContent nameKey="uni" hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="uni" />}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <RechartsPrimitive.Pie
              data={chartData}
              dataKey="count"
              nameKey="uni"
              innerRadius="40%"
              outerRadius="80%"
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
                          className="fill-foreground text-xl sm:text-2xl md:text-3xl font-bold"
                        >
                          {totalResults}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs sm:text-sm"
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
