import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import AdminSidebar from "./AdminSidebar";
import { useDataStoreMonitoring } from "@/store/UseDataStoreMonitoring";
import { useEffect } from "react";
import { monitoringService } from "@/services/monitoringService";

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