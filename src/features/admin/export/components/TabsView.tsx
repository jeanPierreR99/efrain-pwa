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
import { Data, useDataStore } from "@/store/UseDataStore";


interface Props {
  compare?: boolean
  dataCompare?: Data[]
}

export function TabsView({ compare, dataCompare }: Props) {
  const { data } = useDataStore();

  const tabsPath = [
    {
      label: "Temperatura",
      value: "temperature",
      content: (
        <ViewCharts title="Temperatura" data={compare ? dataCompare : data} sensor={"temperature"} />
      ),
    },
    {
      label: "Humedad",
      value: "humidity",
      content: <ViewCharts title="Humedad" data={compare ? dataCompare : data} sensor={"humidity"} />,
    },
    // {
    //   label: "PM2",
    //   value: "pm2",
    //   content: <ViewCharts title="PM2" data={compare ? dataCompare : data} sensor={"pm2"} />,
    // },
    {
      label: "PM2.5",
      value: "pm2.5",
      content: <ViewCharts title="PM2.5" data={compare ? dataCompare : data} sensor={"pm2_5"} />,
    },
    {
      label: "PM10",
      value: "pm10",
      content: <ViewCharts title="PM10" data={compare ? dataCompare : data} sensor={"pm10"} />,
    },
    {
      label: "CO2",
      value: "co2",
      content: <ViewCharts title="CO2" data={compare ? dataCompare : data} sensor={"co2"} />,
    },
    {
      label: "CO",
      value: "co",
      content: <ViewCharts title="CO" data={compare ? dataCompare : data} sensor={"co"} />,
    },
    {
      label: "tvoc",
      value: "tvoc",
      content: <ViewCharts title="TVOC" data={compare ? dataCompare : data} sensor={"tvoc"} />,
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
