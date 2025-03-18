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
import {  ChartContainer } from "@/shared/ui/chart"

export function RadialChartView({ chartConfig, chartData, name }: any) {
  return (
    <Card className="shadow-none border-none flex items-center justify-center">
      <CardContent className="h-[100px] px-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[100px] w-[100px]"
        >
          <RadialBarChart
            data={chartData}
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
            <RadialBar dataKey="value" background />
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()} %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {name}
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
