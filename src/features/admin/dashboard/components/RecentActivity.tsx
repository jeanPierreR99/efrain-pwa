import { useDataStore } from "@/store/UseDataStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
    Activity,
    CalendarDays,
    Clock3,
    Droplets,
    Gauge,
    Thermometer,
    Wind,
} from "lucide-react";

const RecentActivity = () => {
    const { data } = useDataStore();

    const lastFiveData = data.slice(-5).reverse();

    const metrics = [
        {
            key: "temperature",
            label: "Temperatura",
            unit: "°C",
            icon: Thermometer,
            color: "text-rose-600",
            bg: "bg-rose-50",
        },
        {
            key: "humidity",
            label: "Humedad",
            unit: "%",
            icon: Droplets,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            key: "pm2_5",
            label: "PM2.5",
            unit: "µg/m³",
            icon: Wind,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            key: "pm10",
            label: "PM10",
            unit: "µg/m³",
            icon: Wind,
            color: "text-cyan-600",
            bg: "bg-cyan-50",
        },
        {
            key: "co",
            label: "CO",
            unit: "ppm",
            icon: Gauge,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            key: "co2",
            label: "CO₂",
            unit: "ppm",
            icon: Gauge,
            color: "text-violet-600",
            bg: "bg-violet-50",
        },
        {
            key: "tvoc",
            label: "TVOC",
            unit: "ppm",
            icon: Activity,
            color: "text-red-600",
            bg: "bg-red-50",
        },
    ];

    return (
        <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Activity className="h-5 w-5" />
                        </div>

                        <div>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Actividad reciente
                            </CardTitle>

                            <p className="mt-0.5 text-xs text-gray-500">
                                Últimas mediciones registradas
                            </p>
                        </div>
                    </div>

                    <span className="hidden rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 sm:inline-flex">
                        {lastFiveData.length} registros
                    </span>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {lastFiveData.length > 0 ? (
                    <ScrollArea className="h-[420px]">
                        <div className="divide-y divide-gray-100">
                            {lastFiveData.map((item: any, index) => (
                                <div
                                    key={`${item.date}-${item.hour}-${index}`}
                                    className="group px-5 py-5 transition-colors hover:bg-gray-50/70 sm:px-6"
                                >
                                    <div className="flex gap-4">
                                        <div className="relative flex shrink-0 flex-col items-center">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                                                <Activity className="h-4 w-4" />
                                            </div>

                                            {index !== lastFiveData.length - 1 && (
                                                <div className="absolute top-11 h-full w-px bg-gray-200" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        Nueva medición registrada
                                                    </p>

                                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <CalendarDays className="h-3.5 w-3.5" />
                                                            {item.date}
                                                        </span>

                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Clock3 className="h-3.5 w-3.5" />
                                                            {item.hour}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                                                    Registrado
                                                </span>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                                {metrics.map((metric) => {
                                                    const Icon = metric.icon;
                                                    const value = item[metric.key];

                                                    return (
                                                        <div
                                                            key={metric.key}
                                                            className="rounded-xl border border-gray-100 bg-white p-3 transition-colors group-hover:border-gray-200"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${metric.bg} ${metric.color}`}
                                                                >
                                                                    <Icon className="h-3.5 w-3.5" />
                                                                </div>

                                                                <span className="truncate text-[10px] font-medium text-gray-400">
                                                                    {metric.label}
                                                                </span>
                                                            </div>

                                                            <div className="mt-2 flex items-baseline gap-1">
                                                                <span className="text-sm font-bold text-gray-800">
                                                                    {value ?? "--"}
                                                                </span>

                                                                <span className="text-[10px] text-gray-400">
                                                                    {metric.unit}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex h-[320px] flex-col items-center justify-center px-6 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                            <Activity className="h-6 w-6 text-gray-400" />
                        </div>

                        <p className="font-medium text-gray-700">
                            No hay actividad reciente
                        </p>

                        <p className="mt-1 max-w-sm text-sm text-gray-400">
                            Las nuevas mediciones de los sensores aparecerán aquí.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentActivity;