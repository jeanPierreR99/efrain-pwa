import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { RadialChart2 } from './ChartRadial2';
import { ChartNew } from './ChartNew';
import { TrendingUp } from 'lucide-react';
import React from 'react';
interface ViewChartsProps {
    title: string;
    color: string;
}
const ViewCharts: React.FC<ViewChartsProps> = ({ title, color }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Mostrando Cambios en tiempo real
                </CardDescription>
            </CardHeader>
            <CardContent className='grid md:grid-cols-2 gap-4'>
                <RadialChart2 color={color}></RadialChart2>
                <ChartNew color={color}></ChartNew>

            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {new Date().toLocaleDateString("es-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ViewCharts;