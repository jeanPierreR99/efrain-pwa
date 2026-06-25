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
import { useDataStoreMonitoring } from "@/store/UseDataStoreMonitoring";

export function TabsView() {
  const { data } = useDataStore();
  const { monitoringData } = useDataStoreMonitoring();
  const tabsPath = [
    {
      label: "Temperatura",
      value: "temperature",
      content: (
        <ViewCharts
          title="Temperatura"
          data={data}
          dataKey={colorConfig[0].dataKey}
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[0].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[0].dataKey] || 0}
          ranges={{
            good: { min: 18, max: 24 },
            moderate: { min: 24.1, max: 27 }
          }}
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
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[1].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[1].dataKey] || 0}
          ranges={{
            good: { min: 30, max: 60 },
            moderate: { min: 60.1, max: 70 }
          }}
          unit="%"
        />
      ),
    },

    {
      label: "PM2.5",
      value: "pm25",
      content: (
        <ViewCharts
          title="PM2.5"
          data={data}
          dataKey={colorConfig[3].dataKey}
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[3].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[3].dataKey] || 0}
          ranges={{
            good: { min: 0, max: 15 },
            moderate: { min: 15.1, max: 50 }
          }}
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
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[4].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[4].dataKey] || 0}
          ranges={{
            good: { min: 0, max: 45 },
            moderate: { min: 45.1, max: 100 }
          }}
          unit="µg/m³"
        />
      ),
    },

    {
      label: "CO₂",
      value: "co2",
      content: (
        <ViewCharts
          title="CO₂"
          data={data}
          dataKey={colorConfig[5].dataKey}
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[5].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[5].dataKey] || 0}
          ranges={{
            good: { min: 400, max: 700 },
            moderate: { min: 701, max: 1000 }
          }}
          unit="ppm"
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
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[6].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[6].dataKey] || 0}
          ranges={{
            good: { min: 0, max: 3.5 },
            moderate: { min: 3.6, max: 9 }
          }}
          unit="ppm"
        />
      ),
    },

    {
      label: "TVOC",
      value: "tvoc",
      content: (
        <ViewCharts
          title="TVOC"
          data={data}
          dataKey={colorConfig[7].dataKey}
          lastWeekValue={monitoringData?.oneWeekAgo?.average?.[colorConfig[7].dataKey] || 0}
          yesterdayValue={monitoringData?.oneDayAgo?.average?.[colorConfig[7].dataKey] || 0}
          ranges={{
            good: { min: 0, max: 200 },
            moderate: { min: 201, max: 500 }
          }}
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
