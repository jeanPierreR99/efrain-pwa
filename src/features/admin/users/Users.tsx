import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle } from "lucide-react";
import UsersList from "./components/UsersList";

const Users = () => {
    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                        <p className="text-muted-foreground">Administra los usuarios del sistema.</p>
                    </div>
                    <Button className="flex items-center gap-2">
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
                        <UsersList />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Users;