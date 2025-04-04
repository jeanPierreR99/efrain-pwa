import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartNew } from './ChartNew';
import React from 'react';
import CardQuality from './CardQuality';
import CardQualityPast from './CardQualityPast';

interface ViewChartsProps {
    title: string;
    data: any;
    dataKey: any;
    lastWeekValue: number;
    yesterdayValue: number;
    thresholds: number[];
    categories: string[];
    unit: string;
}

const ViewCharts: React.FC<ViewChartsProps> = ({ title, data, dataKey, lastWeekValue, yesterdayValue, thresholds, categories, unit }) => {
    return (
        <Card className='border-none bg-gray-50 shadow-none'>
            <CardHeader className='px-0'>
                <CardTitle>{title}</CardTitle>
                <div className='flex md:flex-row flex-col justify-between gap-4'>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500s text-center font-bold text-sm'>Hoy</span>
                        <CardQuality dataKey={dataKey} thresholds={thresholds} categories={categories} unit={unit}></CardQuality>
                    </div>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500s text-center font-bold text-sm'>Ayer</span>
                        <CardQualityPast data={yesterdayValue} thresholds={thresholds} categories={categories} unit={unit}></CardQualityPast>
                    </div>
                    <div className='flex flex-col gap-2 md:w-fit'>
                        <span className='text-gray-500s text-center font-bold text-sm'>Semana pasada</span>
                        <CardQualityPast data={lastWeekValue} thresholds={thresholds} categories={categories} unit={unit}></CardQualityPast>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='p-0'>
                <CardDescription className='mb-4'>Ultimas 5 horas</CardDescription>
                <ChartNew data={data} sensor={dataKey}></ChartNew>
            </CardContent>
        </Card>
    );
};

export default ViewCharts;