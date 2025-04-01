"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/shared/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart"


export function Chart({ colorConfig, chartData }: any) {
  const chartConfig = {
    value: {
      label: colorConfig.sensor,
      color: colorConfig.color,
    },
  } satisfies ChartConfig

  return (
    <Card className="shadow-none border-none">
      <CardContent className="h-[100px] px-0">
        <ChartContainer className="h-[100px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill={colorConfig.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
