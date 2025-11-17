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
} from "recharts";

const StatsOverview = () => {
  const { data } = useDataStore();
  const lastTenData = data.slice(-10);

  // Configuración de colores para cada métrica
  const metricColors = [
    { key: "temperature", stroke: "#f43f5e", fill: "#f43f5e", name: "Temperatura" }, // Rojo
    { key: "humidity", stroke: "#3b82f6", fill: "#3b82f6", name: "Humedad" }, // Azul
    { key: "pm2_5", stroke: "#10b981", fill: "#10b981", name: "PM2.5" }, // Verde
    { key: "co2", stroke: "#8b5cf6", fill: "#8b5cf6", name: "CO2" }, // Violeta
    { key: "co", stroke: "#f59e0b", fill: "#f59e0b", name: "CO" }, // Ámbar
    { key: "tvoc", stroke: "#ef4444", fill: "#ef4444", name: "TVOC" }, // Rojo intenso
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Resumen de Mediciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lastTenData}>
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip />
              <Legend />
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
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsOverview;
