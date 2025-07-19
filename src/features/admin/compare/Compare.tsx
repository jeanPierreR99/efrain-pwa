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
    { "temperature": 23.5, "humidity": 45, "pm2": 12, "pm2_5": 15, "pm10": 25, "co2": 400, co: 100, "date": "02/04/25", "hour": "17:17:03" },

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