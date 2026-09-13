import { useDataStore } from "@/store/UseDataStore";
import { useSocketStore } from "@/store/UseSocketStore";
import { useMarkerStore } from "@/store/UseMarkerStore";
import { Card, CardContent } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { BarChart3, MapPin, Users, WifiOff, Wifi, Activity, ArrowUpRight } from "lucide-react";
import StatsOverview from "./components/StatsOverview";
import RecentActivity from "./components/RecentActivity";

const Dashboard = () => {
  const { data } = useDataStore();
  const { markers } = useMarkerStore();
  const { isConnected } = useSocketStore();

  const stats = [
    {
      title: "Puntos de monitoreo",
      value: markers.length,
      description: "Puntos registrados",
      icon: MapPin,
      iconClass: "bg-blue-50 text-blue-600",
      valueClass: "text-gray-900",
    },
    {
      title: "Mediciones",
      value: data.length,
      description: "Datos recolectados",
      icon: BarChart3,
      iconClass: "bg-violet-50 text-violet-600",
      valueClass: "text-gray-900",
    },
    {
      title: "Usuarios",
      value: 3,
      description: "Usuarios activos",
      icon: Users,
      iconClass: "bg-emerald-50 text-emerald-600",
      valueClass: "text-gray-900",
    },
    {
      title: "Estado del sistema",
      value: isConnected ? "Online" : "Offline",
      description: isConnected
        ? "Servicios funcionando correctamente"
        : "Verifique la conexión",
      icon: isConnected ? Wifi : WifiOff,
      iconClass: isConnected
        ? "bg-emerald-50 text-emerald-600"
        : "bg-red-50 text-red-600",
      valueClass: isConnected ? "text-emerald-600" : "text-red-600",
    },
  ];

  return (
    <div className="py-10 max-w-[1425px] mx-auto lg:px-0 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">
                Monitoreo
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Panel de Administración
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Consulta el estado de tus puntos de monitoreo y las mediciones registradas en el sistema.
            </p>
          </div> <div className={`flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium ${isConnected ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`} >
            <span className="relative flex h-2.5 w-2.5">
              {isConnected &&
                (<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />)}
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"}`} />
            </span>
            {isConnected ? "Sistema conectado" : "Sistema desconectado"}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="group p-0 overflow-hidden border-gray-200/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`} >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-medium text-gray-500"> {stat.title} </p>
                    <div className={`mt-1 text-2xl font-bold tracking-tight ${stat.valueClass}`} >
                      {stat.value}
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>);
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <StatsOverview />
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <RecentActivity />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Dashboard;
