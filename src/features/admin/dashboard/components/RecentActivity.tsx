import { useDataStore } from "@/store/UseDataStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";

const RecentActivity = () => {
    const { data } = useDataStore();
    const lastFiveData = data.slice(-5).reverse();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                        {lastFiveData.map((item, index) => (
                            <div key={index} className="flex items-center border-b pb-4">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Nueva medición registrada
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.date} - {item.hour}
                                    </p>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="font-semibold">Temperatura:</span> {item.temperature}°C
                                        </div>
                                        <div>
                                            <span className="font-semibold">Humedad:</span> {item.humidity}%
                                        </div>
                                        <div>
                                            <span className="font-semibold">PM2.5:</span> {item.pm2_5} µg/m³
                                        </div>
                                        <div>
                                            <span className="font-semibold">CO2:</span> {item.co2} ppm
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RecentActivity;