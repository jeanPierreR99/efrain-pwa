import { Button } from "@/shared/ui/button";
import { Edit, Trash2, Mail, ShieldCheck } from "lucide-react";

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Activo" | "Inactivo";
};

interface UsersListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onEdit, onDelete }) => {
    const getInitials = (name: string) => {
        return name
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-100 text-blue-700",
            "bg-violet-100 text-violet-700",
            "bg-emerald-100 text-emerald-700",
            "bg-orange-100 text-orange-700",
            "bg-pink-100 text-pink-700",
            "bg-cyan-100 text-cyan-700",
        ];

        const index = name.charCodeAt(0) % colors.length;

        return colors[index];
    };

    return (
        <div className="overflow-hidden border-gray-200 bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/80">
                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Usuario
                            </th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Correo
                            </th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Rol
                            </th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Estado
                            </th>
                            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="group transition-colors hover:bg-gray-50/70"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${getAvatarColor(user.name)} `}
                                            >
                                                {getInitials(user.name)}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-gray-900">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail size={15} className="shrink-0 text-gray-400" />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                                            <ShieldCheck size={14} className="text-gray-500" />
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline - flex items - center gap - 1.5 rounded - full px - 2.5 py - 1 text - xs font - semibold ${user.status === "Activo"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-600"
                                                } `}
                                        >
                                            <span
                                                className={`h - 1.5 w - 1.5 rounded - full ${user.status === "Activo"
                                                        ? "bg-emerald-500"
                                                        : "bg-gray-400"
                                                    } `}
                                            />
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(user)}
                                                className="h-9 w-9 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                title="Editar usuario"
                                            >
                                                <Edit size={16} />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(user.id)}
                                                className="h-9 w-9 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                title="Eliminar usuario"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <ShieldCheck size={22} className="text-gray-400" />
                                        </div>

                                        <p className="font-medium text-gray-700">
                                            No hay usuarios registrados
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Los usuarios aparecerán aquí cuando sean registrados.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;