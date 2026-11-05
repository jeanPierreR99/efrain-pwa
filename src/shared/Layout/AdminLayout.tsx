import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import AdminSidebar from "./AdminSidebar";
import { useDataStoreMonitoring } from "@/store/UseDataStoreMonitoring";
import { useEffect } from "react";
import { monitoringService } from "@/services/monitoringService";
import { userService } from "@/services/userService";
import { logout } from "@/services/session";
import { toast } from "sonner";

const AdminLayout = () => {
    const { setLoading, setMonitoringData, isLoading } = useDataStoreMonitoring();

    const fetchMonitoringData = async (date: string) => {
        setLoading(true);
        try {
            const data: any = await monitoringService.getMonitoringData(date);
            setMonitoringData(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            logout();
            return;
        }
        userService.checkStatus(userId)
            .then(({ active, role }) => {
                if (!active) {
                    toast.error('Tu cuenta fue desactivada');
                    setTimeout(logout, 1500);
                    return;
                }
                const mapped = role === 'administrador' ? 'admin' : role;
                if (mapped && mapped !== localStorage.getItem('userRole')) {
                    localStorage.setItem('userRole', mapped);
                    window.location.reload();
                }
            })
            .catch(() => { /* error de red/servidor: no cerrar sesión */ });
    }, []);

    useEffect(() => {
        fetchMonitoringData('2025-09-23');
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-900"></div>
                        <span className="font-medium">Estableciendo conexión...</span>
                    </div>
                </div>
            )}
            <AdminSidebar />
            <div className="flex-1 overflow-auto md:ml-0">
                <main className="pt-16 md:pt-0 p-4 md:p-6">
                    <Outlet />
                </main>
                <Toaster />
            </div>
        </div>
    );
};

export default AdminLayout;