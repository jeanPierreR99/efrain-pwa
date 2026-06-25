"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { colorConfig } from "../../home/components/ViewMonitoringMap"

export function ChartNew({ data, sensor }: any) {

  const chartConfig = {
    temperature: {
      color: colorConfig[0].color,
    },
    humidity: {
      color: colorConfig[1].color,
    },
    pm2: {
      color: colorConfig[2].color,
    },
    pm2_5: {
      color: colorConfig[3].color,
    },
    pm10: {
      color: colorConfig[4].color,
    },
    co2: {
      color: colorConfig[5].color,
    },
    co: {
      color: colorConfig[6].color,
    },
    tvoc: {
      color: colorConfig[7].color,
    },
  } satisfies ChartConfig

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <ChartContainer className="md:h-[400px] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickMargin={10}
              axisLine={false}
              fontSize={11}
              tickLine={true}
            />
            <XAxis
              dataKey="hour"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              interval={4}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id={`fill${sensor}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`var(--color-${sensor})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${sensor})`}
                  stopOpacity={0.1}
                />
              </linearGradient>

            </defs>

            <Area
              dataKey={sensor}
              type="linear"
              fill={`url(#fill${sensor})`}
              fillOpacity={0.4}
              stroke={`var(--color-${sensor})`}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
