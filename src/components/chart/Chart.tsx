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
  } satisfies ChartConfig

  return (
    <Card className="shadow-none border-none py-2">
      <CardContent className="h-[100px] px-0">
        <ChartContainer className="h-[100px] w-full" config={chartConfig}>
          <BarChart margin={{
            left: 15,
          }}
            accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickMargin={10}
              axisLine={false}
              interval={3}
              fontSize={11}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={colorConfig.dataKey} fill={colorConfig.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
