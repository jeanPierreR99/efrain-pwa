import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select"; // Asegúrate de importar desde ShadCN
import { TabsView } from "./components/TabsView";

const Review = () => {

    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccione un punto" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Puntos Registrados</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <TabsView />
        </div>
    );
};

export default Review;
