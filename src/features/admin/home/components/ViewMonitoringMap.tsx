import { Chart } from '@/components/chart/Chart';
import { RadialChartView } from '@/components/chart/RadialChartView';
import { Card, CardDescription, CardTitle } from '@/shared/ui/card';
import { ChartConfig } from '@/shared/ui/chart';
import { ArrowBigUpIcon, Smile } from 'lucide-react';
import React from 'react';

interface ViewMonitoringMapProps {
    position: [number, number] | null;
}

//dato1
const chartData1 = [
    { month: "January", humedad: 186 },
    { month: "February", humedad: 305 },
    { month: "March", humedad: 237 },
    { month: "April", humedad: 73 },
    { month: "May", humedad: 209 },
    { month: "June", humedad: 214 },
    { month: "July", humedad: 14 },
    { month: "AUG", humedad: 102 },
    { month: "Desc", humedad: 73 },
    { month: "NOv", humedad: 200 },
]


const chartConfig1 = {
    humedad: {
        label: "Humedad",
        color: "#d6d827",
    },
} satisfies ChartConfig


const chartDataRadial1 = [
    { humedad: "safari", value: 45, fill: "var(--color-safari)" },
]

const chartConfigRadial1 = {
    value: {
        label: "Value",
    },
    safari: {
        label: "Safari",
        color: "#d6d827",
    },
} satisfies ChartConfig

//datao 2
const chartData2 = [
    { month: "January", humedad: 186 },
    { month: "February", humedad: 305 },
    { month: "March", humedad: 237 },
    { month: "April", humedad: 73 },
    { month: "May", humedad: 209 },
    { month: "June", humedad: 214 },
    { month: "July", humedad: 14 },
    { month: "AUG", humedad: 102 },
    { month: "Desc", humedad: 73 },
    { month: "NOv", humedad: 200 },
]


const chartConfig2 = {
    humedad: {
        label: "Humedad",
        color: "#1fc059",
    },
} satisfies ChartConfig


const chartDataRadial2 = [
    { humedad: "safari", value: 52, fill: "var(--color-safari)" },
]

const chartConfigRadial2 = {
    value: {
        label: "Value",
    },
    safari: {
        label: "Safari",
        color: "#1fc059",
    },
} satisfies ChartConfig

//datao 3
const chartData3 = [
    { month: "January", humedad: 186 },
    { month: "February", humedad: 305 },
    { month: "March", humedad: 237 },
    { month: "April", humedad: 73 },
    { month: "May", humedad: 209 },
    { month: "June", humedad: 214 },
    { month: "July", humedad: 14 },
    { month: "AUG", humedad: 102 },
    { month: "Desc", humedad: 73 },
    { month: "NOv", humedad: 200 },
]


const chartConfig3 = {
    humedad: {
        label: "Humedad",
        color: "#1f43c0",
    },
} satisfies ChartConfig


const chartDataRadial3 = [
    { humedad: "safari", value: 65, fill: "var(--color-safari)" },
]

const chartConfigRadial3 = {
    value: {
        label: "Value",
    },
    safari: {
        label: "Safari",
        color: "#1f43c0",
    },
} satisfies ChartConfig

//datao 4
const chartData4 = [
    { month: "January", humedad: 186 },
    { month: "February", humedad: 305 },
    { month: "March", humedad: 237 },
    { month: "April", humedad: 73 },
    { month: "May", humedad: 209 },
    { month: "June", humedad: 214 },
    { month: "July", humedad: 14 },
    { month: "AUG", humedad: 102 },
    { month: "Desc", humedad: 73 },
    { month: "NOv", humedad: 200 },
]


const chartConfig4 = {
    humedad: {
        label: "Humedad",
        color: "#db2e2e",
    },
} satisfies ChartConfig


const chartDataRadial4 = [
    { humedad: "safari", value: 20, fill: "var(--color-safari)" },
]

const chartConfigRadial4 = {
    value: {
        label: "Value",
    },
    safari: {
        label: "Safari",
        color: "#db2e2e",
    },
} satisfies ChartConfig

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
                <Chart chartConfig={chartConfig1} chartData={chartData1}></Chart>
                <RadialChartView chartConfig={chartConfigRadial1} chartData={chartDataRadial1} name={"Temp"}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart chartConfig={chartConfig2} chartData={chartData2}></Chart>
                <RadialChartView chartConfig={chartConfigRadial2} chartData={chartDataRadial2} name={"Humedad"}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart chartConfig={chartConfig3} chartData={chartData3}></Chart>
                <RadialChartView chartConfig={chartConfigRadial3} chartData={chartDataRadial3} name={"PM.1.0"}></RadialChartView>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Chart chartConfig={chartConfig4} chartData={chartData4}></Chart>
                <RadialChartView chartConfig={chartConfigRadial4} chartData={chartDataRadial4} name={"PM2.5"}></RadialChartView>
            </div>

        </div>
    );
};

export default ViewMonitoringMap;