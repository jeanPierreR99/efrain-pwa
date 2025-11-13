import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Home, MapPin, Users, Settings, LayoutDashboard, FileDown, LogOut, Menu, X } from "lucide-react";
import LOGO from "../../assets/images/logo.webp";
import { Button } from "@/shared/ui/button";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
        { icon: <Home size={20} />, label: "Mapa", path: "/admin/map" },
        { icon: <MapPin size={20} />, label: "Nuevo Punto", path: "/admin/new-point" },
        { icon: <BarChart3 size={20} />, label: "Monitoreo", path: "/admin/monitoring" },
        { icon: <FileDown size={20} />, label: "Comparaciones", path: "/admin/compare" },
        { icon: <FileDown size={20} />, label: "Exportar", path: "/admin/export" },
        { icon: <Users size={20} />, label: "Usuarios", path: "/admin/users" },
        { icon: <Settings size={20} />, label: "Configuración", path: "/admin/settings" },
    ];

    // Detectar cambios en el tamaño de la pantalla
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

    // Cerrar sidebar al cambiar de ruta en móviles
    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [location.pathname, isMobile]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        window.location.replace('/login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Header */}
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

            {/* Overlay para móviles */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative top-0 left-0 h-full w-64 bg-white border-r shadow-sm z-40 transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b h-16 flex items-center">
                    <div className="h-[40px] w-[120px]">
                        <img className="w-full h-full object-cover" src={LOGO} alt="logo.png" />
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
                <nav className="p-4 h-[calc(100%-4rem)] flex flex-col">
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