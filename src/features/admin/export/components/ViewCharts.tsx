import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import React from 'react';
import { ChartExport } from './ChartExport';

interface ViewChartsProps {
    title: string;
    color: string;
}

const ViewCharts: React.FC<ViewChartsProps> = ({ title, color }) => {
    return (
        <Card className='border-none bg-gray-50 shadow-none'>
            <CardHeader className='px-0'>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
                <ChartExport color={color} />

            </CardContent>
        </Card>
    );
};

export default ViewCharts;