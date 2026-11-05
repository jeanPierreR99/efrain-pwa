import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle } from "lucide-react";
import UsersList, { type User } from "./components/UsersList";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/shared/ui/sheet";
import UserForm from "./components/UserForm";
import { userService } from "@/services/userService";
import { toast } from "sonner";

const roleToLabel = (role: string) =>
    role === 'administrador' ? 'Administrador' : role === 'colaborador' ? 'Colaborador' : role;
const roleToApi = (role: string) =>
    role === 'Administrador' ? 'administrador' : role === 'Colaborador' ? 'colaborador' : role;

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const list = await userService.list();
                const mapped: User[] = list.map(u => ({
                    id: u.id,
                    name: u.fullName,
                    email: u.email,
                    role: roleToLabel(u.role),
                    status: u.isActive ? 'Activo' : 'Inactivo',
                }));
                setUsers(mapped);
            } catch (e: any) {
                toast.error(e?.message || 'Error cargando usuarios');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleNew = () => {
        setEditing(null);
        setOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditing(user);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        const ok = window.confirm("¿Eliminar este usuario?");
        if (!ok) return;
        try {
            await userService.remove(id);
            setUsers(prev => prev.filter(u => u.id !== id));
            toast.success('Usuario eliminado');
        } catch (e: any) {
            toast.error(e?.message || 'Error eliminando usuario');
        }
    };

    const handleSubmit = async (data: { name: string; email: string; role: string; status: 'Activo' | 'Inactivo'; password?: string }) => {
        try {
            if (editing) {
                const payload: any = {
                    fullName: data.name,
                    email: data.email,
                    role: roleToApi(data.role),
                    isActive: data.status === 'Activo',
                };
                if (data.password && data.password.length >= 6) {
                    payload.password = data.password;
                }
                const updated = await userService.update(editing.id, payload);
                setUsers(prev => prev.map(u => u.id === editing.id ? {
                    id: updated.id,
                    name: updated.fullName,
                    email: updated.email,
                    role: roleToLabel(updated.role),
                    status: updated.isActive ? 'Activo' : 'Inactivo',
                } : u));
                toast.success('Usuario actualizado');
            } else {
                const created = await userService.create({
                    fullName: data.name,
                    email: data.email,
                    password: data.password || '',
                    role: roleToApi(data.role),
                    isActive: data.status === 'Activo',
                });
                setUsers(prev => [...prev, {
                    id: created.id,
                    name: created.fullName,
                    email: created.email,
                    role: roleToLabel(created.role),
                    status: created.isActive ? 'Activo' : 'Inactivo',
                }]);
                toast.success('Usuario creado');
            }
            setOpen(false);
        } catch (e: any) {
            toast.error(e?.message || 'Error guardando usuario');
        }
    };

    return (
        <div className="py-10 max-w-[1425px] mx-auto lg:px-0 px-4">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                        <p className="text-muted-foreground">Administra los usuarios del sistema.</p>
                    </div>
                    <Button className="flex items-center gap-2" onClick={handleNew}>
                        <PlusCircle size={16} />
                        <span>Nuevo Usuario</span>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>Lista de usuarios registrados en el sistema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="py-6 text-sm text-muted-foreground">Cargando usuarios...</div>
                        ) : (
                            <UsersList users={users} onEdit={handleEdit} onDelete={handleDelete} />
                        )}
                    </CardContent>
                </Card>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="right" className="w-full sm:max-w-md p-6">
                        <SheetHeader>
                            <SheetTitle>{editing ? "Editar Usuario" : "Nuevo Usuario"}</SheetTitle>
                            <SheetDescription>Completa los datos del usuario.</SheetDescription>
                        </SheetHeader>
                        <UserForm
                            defaultValues={editing ? {
                                name: editing.name,
                                email: editing.email,
                                role: editing.role,
                                status: editing.status,
                            } : undefined}
                            onSubmit={handleSubmit}
                            onCancel={() => setOpen(false)}
                            mode={editing ? 'edit' : 'create'}
                        />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Users;