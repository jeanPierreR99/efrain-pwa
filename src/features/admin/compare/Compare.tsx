import { Button } from '@/shared/ui/button';
import { FormDateCompare } from './components/FormDateCompare';
import { useState } from 'react';
import { format } from 'date-fns';
import { useMarkerStore } from '@/store/UseMarkerStore';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Loader2 } from 'lucide-react';
import ChartViewCompare from './components/ChartViewCompare';

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
            <div className='flex flex-col gap-8 mt-8'>
                <ChartViewCompare title='Humedad' chartData={chartData} averageOne={20} averageTwo={10} sensor='humedad'></ChartViewCompare>
                <ChartViewCompare title='Temperatura' chartData={chartData} averageOne={20} averageTwo={10} sensor='temperatura'></ChartViewCompare>
                <ChartViewCompare title='PM2' chartData={chartData} averageOne={20} averageTwo={10} sensor='pm2'></ChartViewCompare>
                <ChartViewCompare title='PM2.5' chartData={chartData} averageOne={20} averageTwo={10} sensor='pm2_5'></ChartViewCompare>
                <ChartViewCompare title='PM10' chartData={chartData} averageOne={20} averageTwo={10} sensor='pm10'></ChartViewCompare>
                <ChartViewCompare title='CO2' chartData={chartData} averageOne={20} averageTwo={10} sensor='co2'></ChartViewCompare>
            </div>
        </div>
    );
};

export default Compare;