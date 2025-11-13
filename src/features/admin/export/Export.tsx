import { useMarkerStore } from "@/store/UseMarkerStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";
import FormDateExport from "./components/FormDateExport";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { TabsView } from "./components/TabsView";
import { compareService } from "@/services/compareService";
import { useDataStore } from "@/store/UseDataStore";

const Export = () => {
    const { markers } = useMarkerStore()
    const { setData } = useDataStore()
    const [date, setDate] = useState<{ from?: Date; to?: Date }>({})
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<string>("");

    const formatDate = (date?: Date): string => {
        if (!date) return '';
        return format(date, 'dd/MM/yy');
    };

    const handleClick = async () => {
        if (!date.from || !date?.to) {
            setError(true)
            return
        }
        setError(false)
        setLoad(true)
        const dateAuxFrom = formatDate(date.from)
        const dateAuxTo = formatDate(date.to)
        try {
            const responseData = await compareService.getCompareData({
                dateFirst: dateAuxFrom,
                dateSecond: dateAuxTo,
            });
            if (responseData.length === 0) {
                setError(true);
                setData([]);
            } else {
                setData(responseData);
            }
        } catch (e) {
            setError(true);
            setData([]);
        } finally {
            setLoad(false);
        }
    }

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
                            {markers.map((data, index) => <SelectItem key={index} value={data.title}>{data.title}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    <FormDateExport date={date} setDate={setDate} />
                    <Button className='w-fit' onClick={handleClick} disabled={load}>{load && <Loader2 className='animate-spin' />}Buscar</Button>
                </div>
                {error && <span className='text-red-500 text-sm'>Seleccione el rango de fechas</span>}
            </div>
            <div className='mt-8'>
                <TabsView></TabsView>
            </div>
        </div>
    );
};

export default Export;