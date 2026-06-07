import { useDataStore } from "@/store/UseDataStore";
import { useSocketStore } from "@/store/UseSocketStore";
import { useMarkerStore } from "@/store/UseMarkerStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { BarChart3, MapPin, Users, Settings } from "lucide-react";
import StatsOverview from "./components/StatsOverview";
import RecentActivity from "./components/RecentActivity";

const Dashboard = () => {
  const { data } = useDataStore();
  const { markers } = useMarkerStore();
  const { isConnected } = useSocketStore();

  return (
    <div className="py-10 max-w-[1425px] mx-auto lg:px-0 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona todos los aspectos de tu aplicación desde aquí.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Puntos de Monitoreo</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{markers.length}</div>
              <p className="text-xs text-muted-foreground">Puntos registrados en el sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mediciones</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
              <p className="text-xs text-muted-foreground">Datos recolectados recientemente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Usuarios activos en el sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado del Sistema</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`relative flex h-3 w-3 ${isConnected ? "text-green-500" : "text-red-500"}`}>
                  {isConnected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
                </div>
                <div className={`text-2xl font-bold ${isConnected ? "text-green-500" : "text-red-500"}`}>
                  {isConnected ? "Conectado" : "Desconectado"}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isConnected ? "Todos los servicios funcionando" : "Servicios no disponibles"}
              </p>
            </CardContent>
          </Card>
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
