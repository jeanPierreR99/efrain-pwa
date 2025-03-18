import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AppLayout from "@/shared/Layout/AppLayout";
import Home from "@/features/admin/home/Home";
import NewPoint from "@/features/admin/new-point/NewPoint";
import Login from "@/features/auth/Login/Login";
import Review from "@/features/admin/review/Review";

const LoadingFallback = () => <div className="absolute left-0 w-full h-full bg-gray-100/70 z-10 flex justify-center items-center"><Loader2 className="animate-spin text-blue-500" /></div>;

const withSuspense = (Component: React.ReactNode) => (
    <Suspense fallback={<LoadingFallback />}>{Component}</Suspense>
);

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <div>Oops! Something went wrong.</div>,
        children: [
            {
                path: "map",
                element: withSuspense(<Home />),
            },
            {
                path: "new-point",
                element: withSuspense(<NewPoint />),
            },
            {
                path: "review",
                element: withSuspense(<Review />),
            }
        ],
    },
];

export const routesLogin: RouteObject[] = [
    {
        path: "/",
        element: withSuspense(<Login />),
        errorElement: <div>Failed to load Login page.</div>,
    },
];