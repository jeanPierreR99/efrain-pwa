"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { z } from "zod"

import { Button } from "@/shared/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useMarkerStore } from "@/store/UseMarkerStore"

const formSchema = z.object({
    latitude: z.string().min(1, { message: "Este campo no puede quedar vacío" }),
    longitude: z.string().min(1, { message: "Este campo no puede quedar vacío" }),
    title: z.string().min(1, { message: "Este campo no puede quedar vacío" }),
    description: z.string().min(1, { message: "Este campo no puede quedar vacío" }),
});

interface FormPointProps {
    position: [number, number] | null;
}

const FormPoint: React.FC<FormPointProps> = ({ position }) => {
    const [loading, setLoading] = useState(false);
    const { addMarker } = useMarkerStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            latitude: "",
            longitude: "",
            title: "",
            description: "",
        },
    });

    useEffect(() => {
        if (position) {
            form.reset({
                latitude: position[0].toString(),
                longitude: position[1].toString(),
                title: "",
                description: "",
            });
        }
    }, [position, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
            addMarker({
                position: [parseFloat(values.latitude), parseFloat(values.longitude)],
                title: values.title,
                description: values.description,
                create_at: new Date().toISOString(),
            });
            toast("Registro Existoso", {
                description: "Se registro un nuevo punto - " + values.title,
                duration: 5000,

            })
        }, 3000);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitud</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitud</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">{loading && <Loader2 className="animate-spin"></Loader2>} Enviar</Button>
            </form>
        </Form>
    );
}

export default FormPoint;
