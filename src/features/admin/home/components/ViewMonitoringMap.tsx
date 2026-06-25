import { Chart } from "@/components/chart/Chart";
import { RadialChartView } from "@/components/chart/RadialChartView";
import { Card, CardDescription, CardTitle } from "@/shared/ui/card";
import { useDataStore } from "@/store/UseDataStore";
import { ArrowBigUpIcon, Meh, Skull, Smile } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ViewMonitoringMapProps {
  position: [number, number] | null;
}

export type SensorKey =
  | "temperature"
  | "humidity"
  | "pm2"
  | "pm2_5"
  | "pm10"
  | "co2"
  | "co"
  | "tvoc";

export const colorConfig: IColor[] = [
  {
    sensor: "temperatura",
    dataKey: "temperature",
    color: "#d6d827",
    medida: "°C",
  },
  {
    sensor: "humedad",
    dataKey: "humidity",
    color: "#1fc059",
    medida: "%",
  },
  {
    sensor: "pm2",
    dataKey: "pm2",
    color: "#1f43c0",
    medida: "µg/m³",
  },
  {
    sensor: "pm2.5",
    dataKey: "pm2_5",
    color: "#db2e2e",
    medida: "µg/m³",
  },
  {
    sensor: "pm10",
    dataKey: "pm10",
    color: "#8d3392",
    medida: "µg/m³",
  },
  {
    sensor: "co2",
    dataKey: "co2",
    color: "#6694e3",
    medida: "ppm",
  },
  {
    sensor: "co",
    dataKey: "co",
    color: "#90d2f3",
    medida: "mg/m³",
  },
  {
    sensor: "tvoc",
    dataKey: "tvoc",
    color: "#431111",
    medida: "ppb",
  },
];

export interface IColor {
  sensor: string;
  dataKey: SensorKey;
  color: string;
  medida: string;
}

const ViewMonitoringMap: React.FC<ViewMonitoringMapProps> = ({ position }) => {
  const { getLastTenData, getLastData } = useDataStore();
  const [evaluation, setEvaluation] = useState("s/e");
  console.log(position);

  type Category = 'Buena' | 'Moderada' | 'Peligrosa';

  const getCategory = (
    value: number,
    ranges: {
      good: { min: number; max: number };
      moderate: { min: number; max: number };
    }
  ): Category => {

    if (
      value >= ranges.good.min &&
      value <= ranges.good.max
    ) {
      return 'Buena';
    }

    if (
      value >= ranges.moderate.min &&
      value <= ranges.moderate.max
    ) {
      return 'Moderada';
    }

    return 'Peligrosa';
  };

  const getAirQualityCategory = (values: {
    pm25: number;
    pm10: number;
    co2: number;
  }) => {

    const pm25Ranges = {
      good: { min: 0, max: 15 },
      moderate: { min: 15.1, max: 50 }
    };
    const pm10Ranges = {
      good: { min: 0, max: 45 },
      moderate: { min: 45.1, max: 100 }
    };
    const co2Ranges = {
      good: { min: 400, max: 700 },
      moderate: { min: 701, max: 1000 }
    };

    const qualities: Category[] = [
      getCategory(values.pm25, pm25Ranges),
      getCategory(values.pm10, pm10Ranges),
      getCategory(values.co2, co2Ranges),
    ];

    const worst = qualities.includes('Peligrosa')
      ? 'Peligrosa'
      : qualities.includes('Moderada')
        ? 'Moderada'
        : 'Buena';

    return worst;
  };

  const getCardStyles = (evaluation: string) => {
    switch (evaluation) {
      case "Buena":
        return {
          bgColor: "bg-green-200",
          bgIcon: "bg-green-300",
          textColor: "text-green-500",
          icon: <Smile size={60} />,
        };
      case "Moderada":
        return {
          bgColor: "bg-yellow-200",
          bgIcon: "bg-yellow-300",
          textColor: "text-yellow-500",
          icon: <Meh size={60} />,
        };
      case "Peligrosa":
        return {
          bgColor: "bg-red-200",
          bgIcon: "bg-red-300",
          textColor: "text-red-500",
          icon: <Skull size={60} />,
        };
      default:
        return {
          bgColor: "bg-gray-200",
          bgIcon: "bg-gray-300",
          textColor: "text-gray-500",
          icon: <Smile size={60} />,
        };
    }
  };

  useEffect(() => {
    const lastData = getLastData();
    if (lastData) {
      setEvaluation(
        getAirQualityCategory({
          pm25: lastData.pm2_5,
          pm10: lastData.pm10,
          co2: lastData.co2,
        })
      );
    }
  }, [getLastData]);

  const { bgColor, textColor, icon, bgIcon } = getCardStyles(evaluation);

  return (
    <div className="grid px-4 pb-4">
      <Card className=" border-none shadow-none py-2">
        <CardTitle>Calidad del aire</CardTitle>
        <div className="text-xs text-red-400 px-4">
          <li className="text-green-600">Buena: Aire limpio y saludable.</li>
          <li className="text-orange-400">Moderada: Aceptable, pero puede afectar a personas sensibles.</li>
          <li>
            Peligrosa: Muy dañina, se debe evitar actividades al aire libre.
          </li>
        </div>
        <CardDescription
          className={`${bgColor} rounded-md text-lg text-center overflow-hidden`}
        >
          <div className={`grid grid-cols-3 place-items-center ${textColor}`}>
            <div
              className={`${bgIcon} w-full h-full flex justify-center items-center p-4`}
            >
              {icon}
            </div>
            <div className="flex flex-col col-span-2 p-4">
              <div className="flex gap-2 items-end justify-center">
                <span className="text-5xl"><span className="font-bold text-lg">CO2:</span> {getLastData()?.co2}</span>
                <span className="text-lg">ppm</span>
              </div>
              <span className="bg-white p-1 text-lg text-center">
                <span className="font-bold">pm2.5: </span>
                {getLastData()?.pm2_5} µg/m³
              </span>
              <span className="bg-white p-1 text-lg text-center mt-1">
                <span className="font-bold">pm10: </span>
                {getLastData()?.pm10} µg/m³
              </span>
            </div>
          </div>
        </CardDescription>
        <span
          className={`${textColor} text-end font-bold flex justify-end gap-2`}
        >
          <ArrowBigUpIcon></ArrowBigUpIcon> {evaluation}
        </span>
      </Card>

      <CardTitle>Otros</CardTitle>

      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[0]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[0]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[1]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[1]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>

      {/* <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[2]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[2]}
          chartData={getLastData()}
        ></RadialChartView>
      </div> */}

      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[3]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[3]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[4]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[4]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[5]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[5]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[6]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[6]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Chart
          colorConfig={colorConfig[7]}
          chartData={getLastTenData()}
        ></Chart>
        <RadialChartView
          colorConfig={colorConfig[7]}
          chartData={getLastData()}
        ></RadialChartView>
      </div>
    </div>
  );
};

export default ViewMonitoringMap;
