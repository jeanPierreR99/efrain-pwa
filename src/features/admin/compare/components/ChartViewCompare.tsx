import { CardHeader, CardTitle } from '@/shared/ui/card';
import React from 'react';
import { ChartCompare } from './ChartCompare';
import { TrendingUp } from 'lucide-react';

interface IpropChartViewCompare {
    title: string;
    chartData: any,
    averageOne: number,
    averageTwo: number,
    sensor: string
}

const ChartViewCompare: React.FC<IpropChartViewCompare> = ({ title, chartData, averageOne, averageTwo, sensor }) => {
    return (
        <div>
            <CardHeader className='px-0'>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <div className='grid md:grid-cols-2 mt-6 gap-6'>
                <ChartCompare chartData={chartData} sensor={sensor}></ChartCompare>
                <ChartCompare chartData={chartData} sensor={sensor}></ChartCompare>
            </div>
            <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Promedio: {averageOne} <TrendingUp className="h-4 w-4" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Promedio: {averageTwo} <TrendingUp className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartViewCompare;