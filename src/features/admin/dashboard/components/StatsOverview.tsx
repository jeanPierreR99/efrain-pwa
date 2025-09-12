import { useDataStore } from "@/store/UseDataStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const StatsOverview = () => {
    const { data } = useDataStore();
    const lastTenData = data.slice(-10);

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Resumen de Mediciones</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lastTenData}>
                            <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="temperature"
                                stroke="#f43f5e"
                                fill="#f43f5e"
                                fillOpacity={0.2}
                                name="Temperatura"
                            />
                            <Area
                                type="monotone"
                                dataKey="humidity"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.2}
                                name="Humedad"
                            />
                            <Area
                                type="monotone"
                                dataKey="pm2_5"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.2}
                                name="PM2.5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsOverview;