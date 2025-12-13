"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface DailyResultsBarChartProps {
  days?: number;
}

type FilterType = "all" | "admu" | "dlsu" | "up" | "ust";

export function DailyResultsBarChart({ days = 30 }: DailyResultsBarChartProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [data, setData] = useState<
    { date: string; admu: number; dlsu: number; up: number; ust: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/stats/daily?days=${days}&filter=${filter}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch daily results:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [days, filter]);

  const filterLabels: Record<FilterType, string> = {
    all: "All Universities",
    admu: "ADMU",
    dlsu: "DLSU",
    up: "UP",
    ust: "UST",
  };

  const chartTitle = `Daily Results Trends - ${filterLabels[filter]}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{chartTitle}</CardTitle>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by university" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              <SelectItem value="admu">ADMU</SelectItem>
              <SelectItem value="dlsu">DLSU</SelectItem>
              <SelectItem value="up">UP</SelectItem>
              <SelectItem value="ust">UST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
