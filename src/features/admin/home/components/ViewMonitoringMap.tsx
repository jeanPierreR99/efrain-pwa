import { Chart } from '@/components/chart/Chart';
import { RadialChartView } from '@/components/chart/RadialChartView';
import { Card, CardDescription, CardTitle } from '@/shared/ui/card';
import { useDataStore } from '@/store/UseDataStore';
import { ArrowBigUpIcon, Smile } from 'lucide-react';
import React from 'react';

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
    console.log(position)

    return (
        <div className="grid px-4 pb-4">
            <Card className=' border-none shadow-none py-2'>
                <CardTitle>Calidad del aire</CardTitle>
                <CardDescription className='bg-green-200  rounded-md  text-green-500 overflow-hidden'>
                    <div className='grid grid-cols-3 place-items-center'>
                        <div className='bg-green-300 w-full h-full flex justify-center items-center'><Smile size={60}></Smile></div>
                        <div className='flex flex-col col-span-2 p-4'>
                            <div className='flex gap-2 items-end justify-center'><span className='text-5xl'>{getLastData()?.co2}</span><span className='text-lg'>Co2</span></div>
                            <span className='bg-white p-1 text-lg text-center'>{getLastData()?.pm2_5} µg/m³</span>
                        </div>
                    </div>
                </CardDescription>
                <span className=' text-green-500 text-end font-bold flex justify-end gap-2'><ArrowBigUpIcon></ArrowBigUpIcon> Optimo</span>
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