import { ScrollArea } from "@/shared/ui/scroll-area"
import { DropdownMenuSeparator } from "@/shared/ui/dropdown-menu"
import { useMarkerStore } from "@/store/UseMarkerStore"
import { DeleteIcon } from "lucide-react"

export function ListPoint() {
    const { markers, removeMarker } = useMarkerStore()
    return (
        <ScrollArea className="h-40 w-48 rounded-md border bg-white">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Puntos Registrados</h4>
                {markers.map((data, index) => (
                    <>
                        <div key={index} className="text-sm flex gap-2 justify-between">
                            {data.title}
                            <button className="text-red-400" onClick={() => removeMarker(index)}><DeleteIcon></DeleteIcon></button>
                        </div>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}
