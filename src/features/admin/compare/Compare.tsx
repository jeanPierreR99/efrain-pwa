import { Button } from '@/shared/ui/button';
import { FormDateCompare } from './components/FormDateCompare';
import { useState } from 'react';
import { format } from 'date-fns';
import { useMarkerStore } from '@/store/UseMarkerStore';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Loader2 } from 'lucide-react';
import ChartViewCompare from './components/ChartViewCompare';
import { Data } from '@/store/UseDataStore';

const dataAux = [
    { "temperature": 23.5, "humidity": 45, "pm2": 12, "pm2_5": 15, "pm10": 25, "co2": 400, "date": "02/04/25", "hour": "17:17:03" },
    { "temperature": 24.1, "humidity": 48, "pm2": 10, "pm2_5": 14, "pm10": 22, "co2": 420, "date": "02/04/25", "hour": "17:18:03" },
    { "temperature": 22.8, "humidity": 50, "pm2": 13, "pm2_5": 16, "pm10": 28, "co2": 410, "date": "02/04/25", "hour": "17:19:03" },
    { "temperature": 23.9, "humidity": 46, "pm2": 11, "pm2_5": 13, "pm10": 21, "co2": 430, "date": "03/04/25", "hour": "17:20:03" },
    { "temperature": 24.2, "humidity": 44, "pm2": 14, "pm2_5": 17, "pm10": 30, "co2": 440, "date": "03/04/25", "hour": "17:21:03" },
    { "temperature": 23.7, "humidity": 47, "pm2": 12, "pm2_5": 14, "pm10": 23, "co2": 425, "date": "02/04/25", "hour": "17:22:03" },
    { "temperature": 22.9, "humidity": 49, "pm2": 10, "pm2_5": 12, "pm10": 19, "co2": 415, "date": "03/04/25", "hour": "17:23:03" },
    { "temperature": 24.0, "humidity": 45, "pm2": 13, "pm2_5": 15, "pm10": 24, "co2": 435, "date": "02/04/25", "hour": "17:24:03" },
    { "temperature": 23.4, "humidity": 46, "pm2": 11, "pm2_5": 13, "pm10": 22, "co2": 420, "date": "03/04/25", "hour": "17:25:03" },
    { "temperature": 23.9, "humidity": 44, "pm2": 14, "pm2_5": 18, "pm10": 32, "co2": 445, "date": "02/04/25", "hour": "17:26:03" },
    { "temperature": 24.5, "humidity": 43, "pm2": 11, "pm2_5": 14, "pm10": 23, "co2": 425, "date": "03/04/25", "hour": "17:27:03" },
    { "temperature": 23.1, "humidity": 47, "pm2": 10, "pm2_5": 13, "pm10": 20, "co2": 410, "date": "02/04/25", "hour": "17:28:03" },
    { "temperature": 24.4, "humidity": 45, "pm2": 13, "pm2_5": 16, "pm10": 28, "co2": 430, "date": "03/04/25", "hour": "17:29:03" },
    { "temperature": 23.3, "humidity": 46, "pm2": 12, "pm2_5": 15, "pm10": 25, "co2": 420, "date": "02/04/25", "hour": "17:30:03" },
    { "temperature": 24.0, "humidity": 44, "pm2": 14, "pm2_5": 18, "pm10": 30, "co2": 440, "date": "03/04/25", "hour": "17:31:03" },
    { "temperature": 23.8, "humidity": 45, "pm2": 12, "pm2_5": 14, "pm10": 22, "co2": 425, "date": "02/04/25", "hour": "17:32:03" },
    { "temperature": 22.7, "humidity": 48, "pm2": 10, "pm2_5": 13, "pm10": 19, "co2": 415, "date": "03/04/25", "hour": "17:33:03" },
    { "temperature": 23.6, "humidity": 46, "pm2": 11, "pm2_5": 14, "pm10": 23, "co2": 430, "date": "02/04/25", "hour": "17:34:03" },
    { "temperature": 24.3, "humidity": 44, "pm2": 13, "pm2_5": 16, "pm10": 27, "co2": 440, "date": "03/04/25", "hour": "17:35:03" },
    { "temperature": 23.9, "humidity": 45, "pm2": 12, "pm2_5": 15, "pm10": 24, "co2": 425, "date": "02/04/25", "hour": "17:36:03" },
]

const Compare = () => {
    const { markers } = useMarkerStore()
    const [dateFirst, setDateFirst] = useState<Date>()
    const [dateSecond, setDateSecond] = useState<Date>()
    const [dateFirstAux, setDateFirstAux] = useState<string>()
    const [dateSecondAux, setDateSecondAux] = useState<string>()
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false);
    const [data, setData] = useState<Data[]>([]);

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
            setData(dataAux)
            setDateFirstAux(dateAuxFirst)
            setDateSecondAux(dateAuxSecond)
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
                <ChartViewCompare title='Temperatura' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='temperature'></ChartViewCompare>
                <ChartViewCompare title='Humedad' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='humidity'></ChartViewCompare>
                <ChartViewCompare title='PM2' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='pm2'></ChartViewCompare>
                <ChartViewCompare title='PM2.5' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='pm2_5'></ChartViewCompare>
                <ChartViewCompare title='PM10' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='pm10'></ChartViewCompare>
                <ChartViewCompare title='CO2' chartData={data} dateFirst={dateFirstAux} dateSecond={dateSecondAux} sensor='co2'></ChartViewCompare>
            </div>
        </div>
    );
};

export default Compare;