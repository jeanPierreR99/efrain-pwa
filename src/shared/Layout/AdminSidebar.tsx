import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Home, MapPin, Users, Settings, LayoutDashboard, FileDown, LogOut } from "lucide-react";
import LOGO from "../../assets/images/logo.webp";
import { Button } from "@/shared/ui/button";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
        { icon: <Home size={20} />, label: "Mapa", path: "/map" },
        { icon: <MapPin size={20} />, label: "Nuevo Punto", path: "/new-point" },
        { icon: <BarChart3 size={20} />, label: "Monitoreo", path: "/monitoring" },
        { icon: <FileDown size={20} />, label: "Comparaciones", path: "/compare" },
        { icon: <FileDown size={20} />, label: "Exportar", path: "/export" },
        { icon: <Users size={20} />, label: "Usuarios", path: "/admin/users" },
        { icon: <Settings size={20} />, label: "Configuración", path: "/admin/settings" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
            <div className="p-4 border-b">
                <div className="h-[50px] w-[150px] mx-auto">
                    <img className="w-full h-full object-cover" src={LOGO} alt="logo.png" />
                </div>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 pt-4 border-t">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} className="mr-2" />
                        Cerrar sesión
                    </Button>
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;