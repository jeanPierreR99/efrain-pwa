"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover"

interface PropFormDateExport {
    date: any;
    setDate: any;
}

const FormDateExport: React.FC<PropFormDateExport> = ({ date, setDate }) => {
    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {date.from.toLocaleDateString("es-ES", { year: 'numeric', month: 'short', day: 'numeric' })}
                                    {" - "}
                                    {date.to.toLocaleDateString("es-ES", { year: 'numeric', month: 'short', day: 'numeric' })}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Seleccione las fechas</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => {
                            if (!range) {
                                setDate({});
                                return;
                            }

                            if (range.from && !range.to) {
                                setDate({
                                    from: range.from,
                                    to: range.from,
                                });
                                return;
                            }

                            setDate(range);
                        }}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
export default FormDateExport