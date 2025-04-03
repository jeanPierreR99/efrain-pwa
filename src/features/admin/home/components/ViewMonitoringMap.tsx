import { Chart } from '@/components/chart/Chart';
import { RadialChartView } from '@/components/chart/RadialChartView';
import { Card, CardDescription, CardTitle } from '@/shared/ui/card';
import { useDataStore } from '@/store/UseDataStore';
import { ArrowBigUpIcon, Frown, Meh, Skull, Smile } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ViewMonitoringMapProps {
    position: [number, number] | null;
}

export const colorConfig: IColor[] = [
    {
        sensor: "temperatura",
        dataKey: "temperature",
        color: "#d6d827",
        medida: "°C"
    },
    {
        sensor: "humedad",
        dataKey: "humidity",
        color: "#1fc059",
        medida: "%"
    },
    {
        sensor: "pm2",
        dataKey: "pm2",
        color: "#1f43c0",
        medida: "µg/m³"
    },
    {
        sensor: "pm2.5",
        dataKey: "pm2_5",
        color: "#db2e2e",
        medida: "µg/m³"
    },
    {
        sensor: "pm10",
        dataKey: "pm10",
        color: "#8d3392",
        medida: "µg/m³"
    },
    {
        sensor: "co2",
        dataKey: "co2",
        color: "#6694e3",
        medida: "ppm"
    },
]

interface IColor {
    sensor: string;
    color: string;
    dataKey: string;
    medida: string
}


const ViewMonitoringMap: React.FC<ViewMonitoringMapProps> = ({ position }) => {
    const { data, getLastData } = useDataStore();
    const [evaluation, setEvaluation] = useState("s/e");
    console.log(position)

    const getCategory = (value: number, thresholds: number[]) => {
        if (value <= thresholds[0]) return 1; // Buena
        if (value <= thresholds[1]) return 2; // Moderada
        if (value <= thresholds[2]) return 3; // Pobre
        return 4; // Peligrosa
    }

    const getAirQualityCategory = (pm2_5: number, pm10: number, co2: number) => {

        const pm2_5Score = getCategory(pm2_5, [15, 35, 75]);
        const pm10Score = getCategory(pm10, [45, 75, 150]);
        const co2Score = getCategory(co2, [1000, 2000, 5000]);

        const worstScore = Math.max(pm2_5Score, pm10Score, co2Score);

        const categories = ["Buena", "Moderada", "Pobre", "Peligrosa"];
        const finalDiagnosis = categories[worstScore - 1];

        return finalDiagnosis;

    }

    const getCardStyles = (evaluation: string) => {
        switch (evaluation) {
            case 'Buena':
                return {
                    bgColor: 'bg-green-200',
                    bgIcon: 'bg-green-300',
                    textColor: 'text-green-500',
                    icon: <Smile size={60} />,
                };
            case 'Moderada':
                return {
                    bgColor: 'bg-yellow-200',
                    bgIcon: 'bg-yellow-300',
                    textColor: 'text-yellow-500',
                    icon: <Meh size={60} />,
                };
            case 'Pobre':
                return {
                    bgColor: 'bg-orange-200',
                    bgIcon: 'bg-orange-300',
                    textColor: 'text-orange-500',
                    icon: <Frown size={60} />,
                };
            case 'Peligrosa':
                return {
                    bgColor: 'bg-red-200',
                    bgIcon: 'bg-red-300',
                    textColor: 'text-red-500',
                    icon: <Skull size={60} />,
                };
            default:
                return {
                    bgColor: 'bg-gray-200',
                    bgIcon: 'bg-gray-300',
                    textColor: 'text-gray-500',
                    icon: <Smile size={60} />,
                };
        }
    }

    useEffect(() => {
        const lastData = getLastData();
        if (lastData) {
            setEvaluation(getAirQualityCategory(lastData.pm2_5, lastData.pm10, lastData.co2));
        }
    }, [getLastData]);

    const { bgColor, textColor, icon, bgIcon } = getCardStyles(evaluation);


    return (
        <div className="grid px-4 pb-4">
            <Card className=' border-none shadow-none py-2'>
                <CardTitle>Calidad del aire</CardTitle>
                <div className='text-xs text-red-400'>
                    <li>Buena: Aire limpio y saludable.</li>
                    <li>Moderada: Aceptable, pero puede afectar a personas sensibles.</li>
                    <li>Pobre: Mala, afecta a grupos sensibles y puede irritar ojos o garganta.</li>
                    <li>Peligrosa: Muy dañina, se debe evitar actividades al aire libre.</li>
                </div>
                <CardDescription className={`${bgColor} rounded-md text-lg text-center overflow-hidden`}>
                    <div className={`grid grid-cols-3 place-items-center ${textColor}`}>
                        <div className={`${bgIcon} w-full h-full flex justify-center items-center p-4`}>
                            {icon}
                        </div>
                        <div className='flex flex-col col-span-2 p-4'>
                            <div className='flex gap-2 items-end justify-center'>
                                <span className="text-5xl">{getLastData()?.co2}</span>
                                <span className='text-lg'>ppm</span>
                            </div>
                            <span className='bg-white p-1 text-lg text-center'>
                                <span className='font-bold'>pm2.5: </span>{getLastData()?.pm2_5} µg/m³
                            </span>
                            <span className='bg-white p-1 text-lg text-center mt-1'>
                                <span className='font-bold'>pm10: </span>{getLastData()?.pm10} µg/m³
                            </span>
                        </div>
                    </div>
                </CardDescription>
                <span className={`${textColor} text-end font-bold flex justify-end gap-2`}><ArrowBigUpIcon></ArrowBigUpIcon> {evaluation}</span>
            </Card>

            <CardTitle>Otros</CardTitle>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[0]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[0]} chartData={getLastData()}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[1]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[1]} chartData={getLastData()}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[2]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[2]} chartData={getLastData()}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[3]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[3]} chartData={getLastData()}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[4]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[4]} chartData={getLastData()}></RadialChartView>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[5]} chartData={data}></Chart>
                <RadialChartView colorConfig={colorConfig[5]} chartData={getLastData()}></RadialChartView>
            </div>
        </div>
    );
};

export default ViewMonitoringMap;