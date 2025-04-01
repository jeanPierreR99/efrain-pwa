import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select"; // Asegúrate de importar desde ShadCN
import { TabsView } from "./components/TabsView";
import { useMarkerStore } from "@/store/UseMarkerStore";

const Monitoring = () => {
    const { markers } = useMarkerStore()
    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
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
            <TabsView />
        </div>
    );
};

export default Monitoring;
