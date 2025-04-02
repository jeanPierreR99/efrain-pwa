import { Button } from '@/shared/ui/button';
import { FormDateCompare } from './components/FormDateCompare';
import { useState } from 'react';
import { format } from 'date-fns';
import { useMarkerStore } from '@/store/UseMarkerStore';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Loader2, TrendingUp } from 'lucide-react';
import { ChartCompare } from './components/ChartCompare';
import { CardHeader, CardTitle } from '@/shared/ui/card';

const chartData = [
    { month: "January", temperatura: 32, humedad: 40, pm2: 30, pm2_5: 50, pm10: 50, co2: 45 },
    { month: "February", temperatura: 12, humedad: 40, pm2: 35, pm2_5: 40, pm10: 50, co2: 45 },
    { month: "March", temperatura: 20, humedad: 40, pm2: 30, pm2_5: 30, pm10: 50, co2: 100 },
    { month: "April", temperatura: 3, humedad: 40, pm2: 35, pm2_5: 30, pm10: 50, co2: 45 },
    { month: "May", temperatura: 20, humedad: 40, pm2: 30, pm2_5: 30, pm10: 50, co2: 100 },
    { month: "June", temperatura: 21, humedad: 40, pm2: 35, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "January", temperatura: 41, humedad: 40, pm2: 30, pm2_5: 25, pm10: 0, co2: 45 },
    { month: "February", temperatura: 21, humedad: 40, pm2: 40, pm2_5: 10, pm10: 10, co2: 100 },
    { month: "March", temperatura: 42, humedad: 40, pm2: 30, pm2_5: 10, pm10: 30, co2: 45 },
    { month: "April", temperatura: 73, humedad: 40, pm2: 30, pm2_5: 10, pm10: 20, co2: 100 },
    { month: "May", temperatura: 42, humedad: 40, pm2: 30, pm2_5: 10, pm10: 30, co2: 100 },
    { month: "June", temperatura: 21, humedad: 40, pm2: 30, pm2_5: 10, pm10: 30, co2: 100 },
    { month: "January", temperatura: 25, humedad: 40, pm2: 10, pm2_5: 10, pm10: 50, co2: 45 },
    { month: "February", temperatura: 0, humedad: 40, pm2: 100, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "March", temperatura: 20, humedad: 34, pm2: 30, pm2_5: 10, pm10: 50, co2: 45 },
    { month: "April", temperatura: 73, humedad: 42, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "May", temperatura: 20, humedad: 12, pm2: 30, pm2_5: 10, pm10: 30, co2: 45 },
    { month: "June", temperatura: 32, humedad: 54, pm2: 30, pm2_5: 10, pm10: 10, co2: 100 },
    { month: "January", temperatura: 32, humedad: 42, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "February", temperatura: 32, humedad: 23, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "March", temperatura: 32, humedad: 21, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "April", temperatura: 23, humedad: 42, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "May", temperatura: 41, humedad: 30, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
    { month: "June", temperatura: 25, humedad: 21, pm2: 30, pm2_5: 10, pm10: 50, co2: 100 },
]

const Compare = () => {
    const { markers } = useMarkerStore()
    const [dateFirst, setDateFirst] = useState<Date>()
    const [dateSecond, setDateSecond] = useState<Date>()
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false);

    const formatDate = (date?: Date): string => {
        if (!date) return '';
        return format(date, 'dd/MM/yy');
    };

    const handleClick = () => {
        if (!dateFirst || !dateSecond) {
            setError(true)
            return
        }
        setError(false)
        setLoad(true)
        const dateAuxFirst = formatDate(dateFirst)
        const dateAuxSecond = formatDate(dateSecond)

        setTimeout(() => {
            console.log(dateAuxFirst, dateAuxSecond)
            setLoad(false)
        }, 3000);
    }
    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
            <div>
                <Select>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Seleccione un punto" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Puntos Registrados</SelectLabel>
                            {markers.map((data, index) => <SelectItem key={index} value={data.title}>{data.title}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    <FormDateCompare date={dateFirst} setDate={setDateFirst} />
                    <FormDateCompare date={dateSecond} setDate={setDateSecond} />
                    <Button className='w-fit' onClick={handleClick}>{load && <Loader2 className='animate-spin' />}Comparar</Button>
                </div>
                {error && <span className='text-red-500 text-sm'>Seleccione ambas fechas</span>}
            </div>
            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>Humedad</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="humedad"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="humedad"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>Temperatura</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="temperatura"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="temperatura"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>PM2</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="pm2"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="pm2"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </div>

            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>PM2.5</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="pm2_5"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="pm2_5"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>PM10</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="pm10"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="pm10"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <CardHeader className='px-0'>
                    <CardTitle>CO2</CardTitle>
                </CardHeader>
                <div className='grid md:grid-cols-2 mt-6 gap-6'>
                    <ChartCompare chartData={chartData} sensor="co2"></ChartCompare>
                    <ChartCompare chartData={chartData} sensor="co2"></ChartCompare>
                </div>
                <div className="grid grid-cols-2 w-full gap-6 text-sm mt-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Promedio: 30.4 <TrendingUp className="h-4 w-4" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compare;