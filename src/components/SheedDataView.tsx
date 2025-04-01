import ViewMonitoringMap from "@/features/admin/home/components/ViewMonitoringMap"
import FormPoint from "@/features/admin/new-point/components/FormPoint"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/shared/ui/sheet"
import { LocateFixedIcon } from "lucide-react"
import React from "react"

interface SheetDataViewProps {
    edit: boolean
    title: string
    description: string
    open: boolean
    setOpen: (open: boolean) => void
    position: [number, number] | null
}
const SheetDataView: React.FC<SheetDataViewProps> = ({ edit, title, description, open, setOpen, position }) => {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="z-[1000] pb-10 bg-white shadow-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex gap-2"> <LocateFixedIcon></LocateFixedIcon>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {edit ? <FormPoint position={position} /> : (<ViewMonitoringMap position={position}></ViewMonitoringMap>)}

            </SheetContent>
        </Sheet>
    )
}

export default SheetDataView