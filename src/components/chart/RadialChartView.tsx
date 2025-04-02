"use client"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
} from "@/shared/ui/card"
import { ChartConfig, ChartContainer } from "@/shared/ui/chart"

export function RadialChartView({ colorConfig, chartData }: any) {
  const data = [{ ...chartData, fill: colorConfig.color }];
  const chartConfig = {
    temperature: {
      label: colorConfig.sensor,
      color: colorConfig.color,
    },
  } satisfies ChartConfig

  return (
    <Card className="shadow-none border-none flex items-center justify-center py-2">
      <CardContent className="h-[100px] px-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[100px] w-[100px]"
        >
          <RadialBarChart
            data={data}
            endAngle={1000}
            innerRadius={55}
            outerRadius={35}
          >
            <PolarGrid
              gridType="circle"
              radialLines={true}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="temperature" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
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
                          className="fill-foreground text-lg font-bold"
                        >
                          {data[0][colorConfig.dataKey] + " " + colorConfig.medida}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {colorConfig.sensor}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
