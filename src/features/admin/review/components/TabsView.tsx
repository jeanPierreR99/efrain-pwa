import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import ViewCharts from "./ViewCharts";

const tabsPath = [
    { label: "Temperatura", value: "temperature", content: <ViewCharts title="Datos de Temperatura" color={"#d6d827"} /> },
    { label: "Humedad", value: "humidity", content: <ViewCharts title="Datos de Humedad" color={"#1fc059"} /> },
    { label: "PM2", value: "pm2", content: <ViewCharts title="Datos de PM2" color={"#1f43c0"} /> },
    { label: "PM2.5", value: "pm2.5", content: <ViewCharts title="Datos de PM2.5" color={"#db2e2e"} /> },
    { label: "PM10", value: "pm10", content: <ViewCharts title="Datos de PM10" color={"#d6d827"} /> }
];

export function TabsView() {
    const [selectedTab, setSelectedTab] = useState(tabsPath[0].value);

    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full mt-4">
            {/* Dropdown en móviles con ShadCN */}
            <div className="md:hidden mb-2">
                <Select onValueChange={setSelectedTab} value={selectedTab}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {tabsPath.map((tab) => (
                            <SelectItem key={tab.value} value={tab.value}>
                                {tab.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Tabs en pantallas grandes con scroll en móviles */}
            <TabsList className="hidden md:flex w-full overflow-x-auto gap-2 whitespace-nowrap scrollbar-hide">
                {tabsPath.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {/* Contenido: Ahora cambia dinámicamente según `selectedTab` */}
            {tabsPath.map((tab) =>
                tab.value === selectedTab ? (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.content}
                    </TabsContent>
                ) : null
            )}
        </Tabs>
    );
}
