import { Chart } from '@/components/chart/Chart';
import { RadialChartView } from '@/components/chart/RadialChartView';
import { Card, CardDescription, CardTitle } from '@/shared/ui/card';
import { ArrowBigUpIcon, Smile } from 'lucide-react';
import React from 'react';

interface ViewMonitoringMapProps {
    position: [number, number] | null;
}

export const colorConfig: IColor[] = [
    {
        sensor: "temperatura",
        color: "#d6d827"
    },
    {
        sensor: "humedad",
        color: "#1fc059"
    },
    {
        sensor: "pm2",
        color: "#1f43c0"
    },
    {
        sensor: "pm2.5",
        color: "#db2e2e"
    },
    {
        sensor: "pm10",
        color: "#8d3392"
    },
    {
        sensor: "co2",
        color: "#6694e3"
    },
]

//dato1
const chartData1 = [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 73 },
    { month: "May", value: 209 },
    { month: "June", value: 214 },
    { month: "July", value: 14 },
    { month: "AUG", value: 102 },
    { month: "Desc", value: 73 },
    { month: "NOv", value: 200 },
]

const chartDataRadial1 = [
    { humedad: "safari", value: 45, fill: colorConfig[0].color },
]

//datao 2
const chartData2 = [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 73 },
    { month: "May", value: 209 },
    { month: "June", value: 214 },
    { month: "July", value: 14 },
    { month: "AUG", value: 102 },
    { month: "Desc", value: 73 },
    { month: "NOv", value: 200 },
]

const chartDataRadial2 = [
    { humedad: "safari", value: 52, fill: colorConfig[1].color },
]

//datao 3
const chartData3 = [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 73 },
    { month: "May", value: 209 },
    { month: "June", value: 214 },
    { month: "July", value: 14 },
    { month: "AUG", value: 102 },
    { month: "Desc", value: 73 },
    { month: "NOv", value: 200 },
]

const chartDataRadial3 = [
    { humedad: "safari", value: 65, fill: colorConfig[2].color },
]

//datao 4
const chartData4 = [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
    { month: "April", value: 73 },
    { month: "May", value: 209 },
    { month: "June", value: 214 },
    { month: "July", value: 14 },
    { month: "AUG", value: 102 },
    { month: "Desc", value: 73 },
    { month: "NOv", value: 200 },
]

const chartDataRadial4 = [
    { humedad: "safari", value: 20, fill: colorConfig[3].color },
]

interface IColor {
    sensor: string;
    color: string;
}


const ViewMonitoringMap: React.FC<ViewMonitoringMapProps> = ({ position }) => {
    console.log(position)
    return (
        <div className="grid px-4 pb-4">
            <Card className=' border-none shadow-none py-2'>
                <CardTitle>Calidad del aire</CardTitle>
                <CardDescription className='bg-green-200  rounded-md  text-green-500 overflow-hidden'>
                    <div className='grid grid-cols-3 place-items-center'>
                        <div className='bg-green-300 w-full h-full flex justify-center items-center'><Smile size={60}></Smile></div>
                        <div className='flex flex-col col-span-2 p-4'>
                            <div className='flex gap-2 items-end justify-center'><span className='text-5xl'>40</span><span className='text-lg'>Co2</span></div>
                            <span className='bg-white p-1 text-lg'>PM2.5 40 µg/m³</span>
                        </div>
                    </div>
                </CardDescription>
                <span className=' text-green-500 text-end font-bold flex justify-end gap-2'><ArrowBigUpIcon></ArrowBigUpIcon> Optimo</span>
            </Card>

            <CardTitle>Otros</CardTitle>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[0]} chartData={chartData1}></Chart>
                <RadialChartView colorConfig={colorConfig[0]} chartData={chartDataRadial1}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[1]} chartData={chartData2}></Chart>
                <RadialChartView colorConfig={colorConfig[1]} chartData={chartDataRadial2}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[2]} chartData={chartData3}></Chart>
                <RadialChartView colorConfig={colorConfig[2]} chartData={chartDataRadial3}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart colorConfig={colorConfig[3]} chartData={chartData4}></Chart>
                <RadialChartView colorConfig={colorConfig[3]} chartData={chartDataRadial4}></RadialChartView>
            </div>

        </div>
    );
};

export default ViewMonitoringMap;