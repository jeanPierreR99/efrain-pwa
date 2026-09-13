import { useMarkerStore } from "@/store/UseMarkerStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";
import FormDateExport from "./components/FormDateExport";
import { Button } from "@/shared/ui/button";
import { Download, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { TabsView } from "./components/TabsView";
import { compareService, formatDateForApi } from "@/services/compareService";
import { Data } from "@/store/UseDataStore";
import { API_BASE_URL } from "@/services/api";
import { toast } from "sonner";

const Export = () => {
    const { markers } = useMarkerStore()
    const [dataCompare, setDataCompare] = useState<Data[]>([])
    const [date, setDate] = useState<{ from?: Date; to?: Date }>({})
    const [error, setError] = useState("")
    const [load, setLoad] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<string>("");
    const [exportLoading, setExportLoading] = useState(false);

    const formatDate = (date?: Date): string => {
        if (!date) return '';
        return format(date, 'dd/MM/yy');
    };

    const handleClick = async () => {
        if (!date.from || !date?.to) {
            setError("Seleccione el rango de fechas")
            return
        }
        setLoad(true)
        const dateAuxFrom = formatDate(date.from)
        const dateAuxTo = formatDate(date.to)
        try {
            const responseData = await compareService.getCompareData({
                dateFirst: dateAuxFrom,
                dateSecond: dateAuxTo,
            });
            setError("");
            if (responseData.length === 0) {
                setError("No hay datos en esas fechas");
                setDataCompare([]);
            } else {
                setDataCompare(responseData);
            }
        } catch (e: any) {
            setError(e.message || "error");
            setDataCompare([]);
        } finally {
            setLoad(false);
        }
    }

    const handleExport = async () => {

        const dateAuxFrom = formatDate(date.from)
        const dateAuxTo = formatDate(date.to)

        setExportLoading(true)
        try {
            const response = await fetch(`${API_BASE_URL}/sensor/export-to-excel?from=${formatDateForApi(dateAuxFrom)}&to=${formatDateForApi(dateAuxTo)}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error exporting file');
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'measurements.xlsx';

            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setExportLoading(false)
        }
    };

    return (
        <div className="py-10 max-w-[1425px] mx-auto lg:px-0 px-4">
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
                    {(date.from && date.to) && <Button
                        className="w-fit"
                        onClick={handleExport}
                        disabled={exportLoading}
                    >
                        {exportLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Download />
                        )}
                        Exportar todo
                    </Button>}
                </div>
                {error && <span className='text-red-500 text-sm'>{error}</span>}
            </div>
            <div className='mt-8'>
                <TabsView compare dataCompare={dataCompare}></TabsView>
            </div>
        </div>
    );
};

export default Export;