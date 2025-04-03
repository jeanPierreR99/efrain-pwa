import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { RadialChart2 } from './ChartRadial2';
import { ChartNew } from './ChartNew';
import React from 'react';
import CardQuality from './CardQuality';
import CardQualityPast from './CardQualityPast';

interface ViewChartsProps {
    title: string;
    color: string;
    dataKey: any;
    lastWeekValue: number;
    yesterdayValue: number;
    thresholds: number[];
    categories: string[];
    unit: string;
}

const ViewCharts: React.FC<ViewChartsProps> = ({ title, color, dataKey, lastWeekValue, yesterdayValue, thresholds, categories, unit }) => {
    return (
        <Card className='border-none bg-gray-50 shadow-none'>
            <CardHeader className='px-0'>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <div> Mostrando cambios en tiempo real</div>
                </CardDescription>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500 font-bold text-sm'>Hoy</span>
                        <CardQuality dataKey={dataKey} thresholds={thresholds} categories={categories} unit={unit}></CardQuality>
                    </div>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500 font-bold text-sm'>Semana pasada</span>
                        <CardQualityPast data={lastWeekValue} thresholds={thresholds} categories={categories} unit={unit}></CardQualityPast>
                    </div>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500 font-bold text-sm'>Ayer</span>
                        <CardQualityPast data={yesterdayValue} thresholds={thresholds} categories={categories} unit={unit}></CardQualityPast>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid md:grid-cols-2 gap-6 p-0'>
                <RadialChart2 color={color}></RadialChart2>
                <ChartNew color={color}></ChartNew>
            </CardContent>
        </Card>
    );
};

export default ViewCharts;