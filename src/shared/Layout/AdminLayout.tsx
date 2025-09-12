import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
                <Toaster />
            </div>
        </div>
    );
};

export default AdminLayout;