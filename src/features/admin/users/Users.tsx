import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle } from "lucide-react";
import UsersList, { type User } from "./components/UsersList";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/shared/ui/sheet";
import UserForm from "./components/UserForm";

const Users = () => {
    const initialUsers: User[] = [
        { id: 1, name: "Admin", email: "admin@example.com", role: "Administrador", status: "Activo" },
        { id: 2, name: "Usuario Técnico", email: "tecnico@example.com", role: "Técnico", status: "Activo" },
        { id: 3, name: "Usuario Invitado", email: "invitado@example.com", role: "Invitado", status: "Inactivo" },
    ];

    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem("adminUsers");
        return saved ? JSON.parse(saved) as User[] : initialUsers;
    });
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);

    useEffect(() => {
        localStorage.setItem("adminUsers", JSON.stringify(users));
    }, [users]);

    const handleNew = () => {
        setEditing(null);
        setOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditing(user);
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        const ok = window.confirm("¿Eliminar este usuario?");
        if (!ok) return;
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    const handleSubmit = (data: Omit<User, "id">) => {
        if (editing) {
            setUsers(prev => prev.map(u => u.id === editing.id ? { ...u, ...data } : u));
        } else {
            const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers(prev => [...prev, { id: nextId, ...data }]);
        }
        setOpen(false);
    };

    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
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
                        <UsersList users={users} onEdit={handleEdit} onDelete={handleDelete} />
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
                        />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Users;