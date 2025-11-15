import { Button } from "@/shared/ui/button";
import { FormDateCompare } from "./components/FormDateCompare";
import { useState } from "react";
import { format } from "date-fns";
import { useMarkerStore } from "@/store/UseMarkerStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Loader2 } from "lucide-react";
import ChartViewCompare from "./components/ChartViewCompare";
import { Data } from "@/store/UseDataStore";
import { compareService } from "@/services/compareService";

const Compare = () => {
  const { markers } = useMarkerStore();
  const [selectedPoint, setSelectedPoint] = useState<string>("");
  const [dateFirst, setDateFirst] = useState<Date>();
  const [dateSecond, setDateSecond] = useState<Date>();
  const [dateFirstAux, setDateFirstAux] = useState<string>();
  const [dateSecondAux, setDateSecondAux] = useState<string>();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<Data[]>([]);

  const formatDate = (date?: Date): string => {
    if (!date) return "";
    return format(date, "dd/MM/yy");
  };

  const handleClick = async () => {
    // Validaciones
    if (!dateFirst || !dateSecond) {
      setError("Seleccione ambas fechas");
      return;
    }

    setError("");
    setLoad(true);

    const dateAuxFirst = formatDate(dateFirst);
    const dateAuxSecond = formatDate(dateSecond);

    try {
      // Llamada a la API
      const responseData = await compareService.getDataBySpecificDate({
        dateFirst: dateAuxFirst,
        dateSecond: dateAuxSecond,
      });

      if (responseData.length === 0) {
        setError("No se encontraron datos para las fechas seleccionadas");
        setData([]);
      } else {
        setData(responseData);
        setDateFirstAux(dateAuxFirst);
        setDateSecondAux(dateAuxSecond);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al obtener los datos. Intente nuevamente."
      );
      setData([]);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
      <div>
        <Select value={selectedPoint} onValueChange={setSelectedPoint}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Seleccione un punto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Puntos Registrados</SelectLabel>
              {markers.map((data, index) => (
                <SelectItem key={index} value={data.title}>
                  {data.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <FormDateCompare date={dateFirst} setDate={setDateFirst} />
          <FormDateCompare date={dateSecond} setDate={setDateSecond} />
          <Button className="w-fit" onClick={handleClick} disabled={load}>
            {load && <Loader2 className="animate-spin mr-2" />}
            Comparar
          </Button>
        </div>

        {error && (
          <span className="text-red-500 text-sm mt-2 block">{error}</span>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex flex-col gap-8 mt-8">
          <ChartViewCompare
            title="Temperatura"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="temperature"
          />
          <ChartViewCompare
            title="Humedad"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="humidity"
          />
          <ChartViewCompare
            title="PM2"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="pm2"
          />
          <ChartViewCompare
            title="PM2.5"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="pm2_5"
          />
          <ChartViewCompare
            title="PM10"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="pm10"
          />
          <ChartViewCompare
            title="CO2"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="co2"
          />
          <ChartViewCompare
            title="CO"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="co"
          />
          <ChartViewCompare
            title="Tvoc"
            chartData={data}
            dateFirst={dateFirstAux}
            dateSecond={dateSecondAux}
            sensor="tvoc"
          />
        </div>
      )}
    </div>
  );
};

export default Compare;
