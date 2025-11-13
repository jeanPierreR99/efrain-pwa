import { Button } from "@/shared/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type User = { id: number; name: string; email: string; role: string; status: "Activo" | "Inactivo" };

interface UsersListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Nombre</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Rol</th>
                        <th className="text-left py-3 px-4 font-medium">Estado</th>
                        <th className="text-right py-3 px-4 font-medium">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.role}</td>
                            <td className="py-3 px-4">
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full ${user.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                                        <Edit size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(user.id)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;