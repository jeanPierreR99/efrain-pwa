import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, Home, MapPin, Users, LayoutDashboard, FileDown, LogOut, Menu, X } from "lucide-react";
import LOGO from "../../assets/images/logo.webp";
import { Button } from "@/shared/ui/button";
import { logout } from "@/services/session";

const AdminSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const isAdmin = localStorage.getItem('userRole') === 'admin';

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
        { icon: <Home size={20} />, label: "Mapa", path: "/map" },
        ...(isAdmin ? [
            { icon: <MapPin size={20} />, label: "Nuevo Punto", path: "/new-point" }
            { icon: <Users size={20} />, label: "Usuarios", path: "/users" },
        ] : []),
        { icon: <BarChart3 size={20} />, label: "Monitoreo", path: "/monitoring" },
        { icon: <FileDown size={20} />, label: "Comparaciones", path: "/compare" },
        { icon: <FileDown size={20} />, label: "Exportar", path: "/export" },
    ];

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [location.pathname, isMobile]);

    const handleLogout = () => {
        logout();
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b shadow-sm p-4 flex items-center justify-between">
                <div className="h-[40px] w-[120px]">
                    <img className="w-full h-full object-cover" src={LOGO} alt="logo.png" />
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`fixed md:relative top-0 left-0 h-full w-64 bg-white border-r shadow-sm z-40 transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b h-16 flex items-center py-15">
                    <div className="h-[70px] w-full mx-auto">
                        <img className="w-full h-full object-cover" src={LOGO} alt="logo.png" />
                        <p className="text-sm text-blue-900 font-bold text-center">Sistema de Monitoreo</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto md:hidden"
                        onClick={toggleSidebar}
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </Button>
                </div>
                <nav className="p-4 h-[calc(100%-9rem)] flex flex-col">
                    <ul className="space-y-2 flex-1">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4 border-t">
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
        </>
    );
};

export default AdminSidebar;