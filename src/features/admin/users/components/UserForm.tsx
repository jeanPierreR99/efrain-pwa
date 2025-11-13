import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

const schema = z.object({
  name: z.string().min(1, { message: "Requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  role: z.string().min(1, { message: "Requerido" }),
  status: z.enum(["Activo", "Inactivo"]),
});

type FormValues = z.infer<typeof schema>;

interface UserFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ defaultValues, onSubmit, onCancel }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "Administrador",
      status: "Activo",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormDescription>Nombre y apellido del usuario.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="usuario@ejemplo.com" {...field} />
              </FormControl>
              <FormDescription>Correo de acceso al sistema.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Técnico">Técnico</SelectItem>
                    <SelectItem value="Invitado">Invitado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button type="submit" className="w-full">Guardar</Button>
          <Button type="button" variant="outline" className="w-full" onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;