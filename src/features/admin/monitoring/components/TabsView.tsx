import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import ViewCharts from "./ViewCharts";
import { colorConfig } from "../../home/components/ViewMonitoringMap";
import { useDataStore } from "@/store/UseDataStore";

export function TabsView() {
  const { data } = useDataStore();

  const tabsPath = [
    {
      label: "Temperatura",
      value: "temperature",
      content: (
        <ViewCharts
          title="Temperatura"
          data={data}
          dataKey={colorConfig[0].dataKey}
          lastWeekValue={10}
          yesterdayValue={30}
          thresholds={[22, 28, 35]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="°C"
        />
      ),
    },
    {
      label: "Humedad",
      value: "humidity",
      content: (
        <ViewCharts
          title="Humedad"
          data={data}
          dataKey={colorConfig[1].dataKey}
          lastWeekValue={10}
          yesterdayValue={90}
          thresholds={[30, 60, 85]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="%"
        />
      ),
    },
    {
      label: "PM2",
      value: "pm2",
      content: (
        <ViewCharts
          title="PM2"
          data={data}
          dataKey={colorConfig[2].dataKey}
          lastWeekValue={40}
          yesterdayValue={2}
          thresholds={[12, 35, 75]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="µg/m³"
        />
      ),
    },
    {
      label: "PM2.5",
      value: "pm2.5",
      content: (
        <ViewCharts
          title="PM2.5"
          data={data}
          dataKey={colorConfig[3].dataKey}
          lastWeekValue={10}
          yesterdayValue={50}
          thresholds={[12, 35, 75]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="µg/m³"
        />
      ),
    },
    {
      label: "PM10",
      value: "pm10",
      content: (
        <ViewCharts
          title="PM10"
          data={data}
          dataKey={colorConfig[4].dataKey}
          lastWeekValue={10}
          yesterdayValue={120}
          thresholds={[50, 150, 250]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="µg/m³"
        />
      ),
    },
    {
      label: "CO2",
      value: "co2",
      content: (
        <ViewCharts
          title="CO2"
          data={data}
          dataKey={colorConfig[5].dataKey}
          lastWeekValue={300}
          yesterdayValue={2700}
          thresholds={[400, 1000, 2000]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="°C"
        />
      ),
    },
    {
      label: "CO",
      value: "co",
      content: (
        <ViewCharts
          title="CO"
          data={data}
          dataKey={colorConfig[6].dataKey}
          lastWeekValue={300}
          yesterdayValue={2700}
          thresholds={[400, 1000, 2000]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="ppm"
        />
      ),
    },
    {
      label: "tvoc",
      value: "tvoc",
      content: (
        <ViewCharts
          title="Tvoc"
          data={data}
          dataKey={colorConfig[7].dataKey}
          lastWeekValue={300}
          yesterdayValue={2700}
          thresholds={[400, 1000, 2000]}
          categories={["Buena", "Moderada", "Pobre", "Peligrosa"]}
          unit="ppb"
        />
      ),
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabsPath[0].value);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="w-full mt-4"
    >
      <div className="md:hidden mb-2">
        <Select onValueChange={setSelectedTab} value={selectedTab}>
          <SelectTrigger className="w-full bg-white">
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

      <TabsList className="hidden md:flex w-full overflow-x-auto gap-2 whitespace-nowrap scrollbar-hide">
        {tabsPath.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

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
