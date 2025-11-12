import { CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import React, { useEffect, useState } from 'react';
import { ChartCompare } from './ChartCompare';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

interface IpropChartViewCompare {
  title: string;
  chartData: any;
  dateFirst: any;
  dateSecond: any;
  sensor: string;
}

const ChartViewCompare: React.FC<IpropChartViewCompare> = ({ title, chartData, dateFirst, dateSecond, sensor }) => {

  const [filteredDataFirst, setFilteredDataFirst] = useState<any[]>([]);
  const [filteredDataSecond, setFilteredDataSecond] = useState<any[]>([]);

  function filterByDate(date: string) {
    return chartData.filter((item: any) => item.date === date);
  }

  const handleSearch = () => {
    if (!chartData || chartData.length === 0) return;

    const filteredFirst = filterByDate(dateFirst);
    const filteredSecond = filterByDate(dateSecond);

    setFilteredDataFirst(filteredFirst);
    setFilteredDataSecond(filteredSecond);

  };

  useEffect(() => {
    handleSearch();
  }, [chartData, dateFirst, dateSecond]);


  if (filteredDataFirst.length === 0 && filteredDataSecond.length === 0) {
    return <div className='text-sm text-gray-400'>No hay datos para mostrar.</div>;
  }

  const convertDateToWords = (date: string) => {
    const parsedDate = parse(date, "dd/MM/yy", new Date());
    const formattedDate = format(parsedDate, "d 'de' MMMM 'de' yyyy", { locale: es });

    return formattedDate;
  };

  return (
    <div>
      <CardHeader className='px-0'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div className='grid md:grid-cols-2 mt-6 gap-6'>
        <div>
          <CardDescription className='mb-2'>{convertDateToWords(dateFirst)}</CardDescription>
          <ChartCompare chartData={filteredDataFirst} sensor={sensor} />
        </div>
        <div>
          <CardDescription className='mb-2'>{convertDateToWords(dateSecond)}</CardDescription>
          <ChartCompare chartData={filteredDataSecond} sensor={sensor} />
        </div>
      </div>
    </div>
  );
};

export default ChartViewCompare;
