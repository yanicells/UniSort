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

interface DailyResultsBarChartClientProps {
  data: { date: string; admu: number; dlsu: number; up: number; ust: number }[];
  days: number;
}

export function DailyResultsBarChartClient({
  data,
  days,
}: DailyResultsBarChartClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Results Trends (Past {days} Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <RechartsPrimitive.BarChart accessibilityLayer data={data}>
            <RechartsPrimitive.CartesianGrid vertical={false} />
            <RechartsPrimitive.XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <RechartsPrimitive.YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: "Number of Results",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <RechartsPrimitive.Bar
              dataKey="admu"
              fill="var(--color-admu)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <RechartsPrimitive.Bar
              dataKey="dlsu"
              fill="var(--color-dlsu)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <RechartsPrimitive.Bar
              dataKey="up"
              fill="var(--color-up)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <RechartsPrimitive.Bar
              dataKey="ust"
              fill="var(--color-ust)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </RechartsPrimitive.BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
