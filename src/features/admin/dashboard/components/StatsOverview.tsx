import { useDataStore } from "@/store/UseDataStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { Activity, BarChart3 } from "lucide-react";

const StatsOverview = () => {
  const { data } = useDataStore();

  const lastTenData = data.slice(-10);

  const metricColors = [
    {
      key: "temperature",
      stroke: "#f43f5e",
      fill: "#f43f5e",
      name: "Temperatura",
    },
    {
      key: "humidity",
      stroke: "#3b82f6",
      fill: "#3b82f6",
      name: "Humedad",
    },
    {
      key: "pm2_5",
      stroke: "#10b981",
      fill: "#10b981",
      name: "PM2.5",
    },
    {
      key: "pm10",
      stroke: "#1c9fb6",
      fill: "#1c9fb6",
      name: "PM10",
    },
    {
      key: "co2",
      stroke: "#8b5cf6",
      fill: "#8b5cf6",
      name: "CO₂",
    },
    {
      key: "co",
      stroke: "#f59e0b",
      fill: "#f59e0b",
      name: "CO",
    },
    {
      key: "tvoc",
      stroke: "#ef4444",
      fill: "#ef4444",
      name: "TVOC",
    },
  ];

  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                Resumen de mediciones
              </CardTitle>

              <p className="mt-0.5 text-xs text-gray-500">
                Evolución de los principales parámetros ambientales
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-medium text-gray-600">
              Últimas {lastTenData.length} mediciones
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {lastTenData.length > 0 ? (
          <>
            <div className="mb-5 flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-400" />

              <span className="text-xs font-medium text-gray-500">
                Comportamiento de los sensores
              </span>
            </div>

            <div className="h-[320px] w-full sm:h-[360px] lg:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={lastTenData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <defs>
                    {metricColors.map((metric) => (
                      <linearGradient
                        key={`gradient - ${metric.key} `}
                        id={`gradient - ${metric.key} `}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={metric.fill}
                          stopOpacity={0.16}
                        />

                        <stop
                          offset="100%"
                          stopColor={metric.fill}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    ))}
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="4 4"
                    stroke="#f1f5f9"
                  />

                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={11}
                    tick={{ fill: "#9ca3af" }}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={11}
                    tick={{ fill: "#9ca3af" }}
                    width={40}
                  />

                  <Tooltip
                    cursor={{
                      stroke: "#cbd5e1",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                      padding: "10px 12px",
                    }}
                    labelStyle={{
                      color: "#374151",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  />

                  {metricColors.map((metric) => (
                    <Area
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.key}
                      stroke={metric.stroke}
                      fill={metric.fill}
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name={metric.name}
                      activeDot={{
                        r: 4,
                        strokeWidth: 2,
                        stroke: "#ffffff",
                        fill: metric.stroke,
                      }}
                      connectNulls
                      dot={false}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>

            <p className="font-medium text-gray-700">
              No hay mediciones disponibles
            </p>

            <p className="mt-1 max-w-sm text-sm text-gray-400">
              Las mediciones de los sensores aparecerán aquí cuando estén
              disponibles.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsOverview;