import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import React, { useMemo } from "react";
import { ChartCompare } from "./ChartCompare";
import { format, parse, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, GitCompareArrows } from "lucide-react";

interface IpropChartViewCompare {
  title: string;
  chartData: any;
  dateFirst: any;
  dateSecond: any;
  sensor: string;
}

const ChartViewCompare: React.FC<IpropChartViewCompare> = ({
  title,
  chartData,
  dateFirst,
  dateSecond,
  sensor,
}) => {
  const filteredDataFirst = useMemo(() => {
    if (!Array.isArray(chartData) || !dateFirst) return [];

    return chartData.filter((item: any) => item.date === dateFirst);
  }, [chartData, dateFirst]);

  const filteredDataSecond = useMemo(() => {
    if (!Array.isArray(chartData) || !dateSecond) return [];

    return chartData.filter((item: any) => item.date === dateSecond);
  }, [chartData, dateSecond]);

  const convertDateToWords = (date: string) => {
    if (!date) return "Fecha no disponible";

    const parsedDate = parse(date, "dd/MM/yy", new Date());

    if (!isValid(parsedDate)) return date;

    return format(parsedDate, "d 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  };

  const firstDateLabel = convertDateToWords(dateFirst);
  const secondDateLabel = convertDateToWords(dateSecond);

  if (filteredDataFirst.length === 0 && filteredDataSecond.length === 0) {
    return (
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
            <GitCompareArrows className="h-6 w-6 text-gray-400" />
          </div>

          <p className="font-medium text-gray-700">
            No hay datos para comparar
          </p>

          <p className="mt-1 max-w-md text-sm text-gray-400">
            No se encontraron mediciones para las fechas seleccionadas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GitCompareArrows className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                {title}
              </CardTitle>

              <CardDescription className="mt-0.5 text-xs text-gray-500">
                Comparación de mediciones entre los períodos seleccionados
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/40">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Primer período
                    </p>

                    <p className="truncate text-sm font-semibold capitalize text-gray-800">
                      {firstDateLabel}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                  {filteredDataFirst.length} registros
                </span>
              </div>

              <div className="p-3 sm:p-4">
                {filteredDataFirst.length > 0 ? (
                  <ChartCompare
                    chartData={filteredDataFirst}
                    sensor={sensor}
                  />
                ) : (
                  <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
                    <div className="text-center">
                      <CalendarDays className="mx-auto mb-2 h-6 w-6 text-gray-300" />

                      <p className="text-sm font-medium text-gray-500">
                        Sin mediciones
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        No existen datos para esta fecha.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/40">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Segundo período
                    </p>

                    <p className="truncate text-sm font-semibold capitalize text-gray-800">
                      {secondDateLabel}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-600">
                  {filteredDataSecond.length} registros
                </span>
              </div>

              <div className="p-3 sm:p-4">
                {filteredDataSecond.length > 0 ? (
                  <ChartCompare
                    chartData={filteredDataSecond}
                    sensor={sensor}
                  />
                ) : (
                  <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
                    <div className="text-center">
                      <CalendarDays className="mx-auto mb-2 h-6 w-6 text-gray-300" />

                      <p className="text-sm font-medium text-gray-500">
                        Sin mediciones
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        No existen datos para esta fecha.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartViewCompare;
