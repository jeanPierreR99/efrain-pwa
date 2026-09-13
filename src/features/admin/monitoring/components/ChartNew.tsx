"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Activity, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
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
      label: "Temperatura",
    },
    humidity: {
      color: colorConfig[1].color,
      label: "Humedad",
    },
    pm2: {
      color: colorConfig[2].color,
      label: "PM2",
    },
    pm2_5: {
      color: colorConfig[3].color,
      label: "PM2.5",
    },
    pm10: {
      color: colorConfig[4].color,
      label: "PM10",
    },
    co2: {
      color: colorConfig[5].color,
      label: "CO₂",
    },
    co: {
      color: colorConfig[6].color,
      label: "CO",
    },
    tvoc: {
      color: colorConfig[7].color,
      label: "TVOC",
    },
  } satisfies ChartConfig

  const currentConfig = chartConfig[sensor as keyof typeof chartConfig]

  const sensorLabel = currentConfig?.label || sensor
  const sensorColor = currentConfig?.color || "#64748b"

  const values = Array.isArray(data)
    ? data
      .map((item: any) => Number(item?.[sensor]))
      .filter((value: number) => !Number.isNaN(value))
    : []

  const currentValue = values.length > 0 ? values[values.length - 1] : null

  const minValue = values.length > 0 ? Math.min(...values) : null
  const maxValue = values.length > 0 ? Math.max(...values) : null

  return (
    <Card className="overflow-hidden rounded-2xl border-none border-gray-200 bg-white shadow-none">
      <CardHeader className="border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${sensorColor}15`,
                color: sensorColor,
              }}
            >
              <Activity className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                Evolución de {sensorLabel}
              </CardTitle>

              <p className="mt-0.5 text-xs text-gray-500">
                Comportamiento de las últimas 20 mediciones registradas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Actual
              </p>

              <p
                className="text-xl font-bold tracking-tight"
                style={{ color: sensorColor }}
              >
                {currentValue !== null ? currentValue : "--"}
              </p>
            </div>

            <div className="hidden h-9 w-px bg-gray-200 sm:block" />

            <div className="hidden items-center gap-2 sm:flex">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${sensorColor}15`,
                  color: sensorColor,
                }}
              >
                <TrendingUp className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Registros
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  {values.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: sensorColor }}
            />

            <span className="text-xs font-medium text-gray-500">
              {sensorLabel}
            </span>
          </div>

          {minValue !== null && maxValue !== null && (
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                Mín.{" "}
                <strong className="font-semibold text-gray-600">
                  {minValue}
                </strong>
              </span>

              <span className="h-3 w-px bg-gray-200" />

              <span>
                Máx.{" "}
                <strong className="font-semibold text-gray-600">
                  {maxValue}
                </strong>
              </span>
            </div>
          )}
        </div>

        <ChartContainer
          config={chartConfig}
          className="h-[280px] w-full sm:h-[340px] md:h-[400px]"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              top: 10,
              right: 12,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id={`fill-${sensor}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={sensorColor}
                  stopOpacity={0.28}
                />

                <stop
                  offset="70%"
                  stopColor={sensorColor}
                  stopOpacity={0.08}
                />

                <stop
                  offset="100%"
                  stopColor={sensorColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              className="stroke-gray-100"
            />

            <YAxis
              tickMargin={10}
              axisLine={false}
              tickLine={false}
              fontSize={11}
              width={45}
              tick={{ fill: "#9ca3af" }}
            />

            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={4}
              fontSize={11}
              tick={{ fill: "#9ca3af" }}
            />

            <ChartTooltip
              cursor={{
                stroke: sensorColor,
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelClassName="font-semibold text-gray-800"
                  className="rounded-xl border-gray-200 bg-white shadow-lg"
                />
              }
            />

            <Area
              dataKey={sensor}
              type="monotone"
              stroke={sensorColor}
              strokeWidth={2.5}
              fill={`url(#fill-${sensor})`}
              fillOpacity={1}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#ffffff",
                fill: sensorColor,
              }}
            />
          </AreaChart>
        </ChartContainer>

        {values.length === 0 && (
          <div className="flex h-20 items-center justify-center text-sm text-gray-400">
            No hay mediciones disponibles para mostrar.
          </div>
        )}
      </CardContent>
    </Card>
  )
}