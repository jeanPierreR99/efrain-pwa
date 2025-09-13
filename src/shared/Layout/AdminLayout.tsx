import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-auto md:ml-0">
                {/* Añadimos padding-top solo en móviles para el header fijo */}
                <main className="pt-16 md:pt-0 p-4 md:p-6">
                    <Outlet />
                </main>
                <Toaster />
            </div>
        </div>
    );
};

export default AdminLayout;