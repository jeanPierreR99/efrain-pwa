import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const Settings = () => {
    return (
        <div className="py-10 max-w-[1225px] mx-auto lg:px-0 px-4">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
                    <p className="text-muted-foreground">Administra la configuración del sistema.</p>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                        <TabsTrigger value="api">API</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración General</CardTitle>
                                <CardDescription>
                                    Configura los parámetros generales del sistema.  
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Nombre del Sitio</Label>
                                    <Input id="siteName" defaultValue="Sistema de Monitoreo Ambiental" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="apiUrl">URL de la API</Label>
                                    <Input id="apiUrl" defaultValue="https://nest-iot-server.onrender.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="refreshRate">Tasa de Actualización (segundos)</Label>
                                    <Input id="refreshRate" type="number" defaultValue="60" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Guardar Cambios</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración de Notificaciones</CardTitle>
                                <CardDescription>
                                    Configura cómo y cuándo recibir notificaciones.  
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="emailNotifications" className="h-4 w-4" />
                                    <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="pushNotifications" className="h-4 w-4" />
                                    <Label htmlFor="pushNotifications">Notificaciones Push</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="alertNotifications" className="h-4 w-4" checked />
                                    <Label htmlFor="alertNotifications">Alertas de Umbrales Críticos</Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Guardar Cambios</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="api" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración de API</CardTitle>
                                <CardDescription>
                                    Administra las claves y permisos de la API.  
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="apiKey">Clave de API</Label>
                                    <div className="flex gap-2">
                                        <Input id="apiKey" defaultValue="sk_test_123456789" readOnly />
                                        <Button variant="outline">Regenerar</Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="webhookUrl">URL de Webhook</Label>
                                    <Input id="webhookUrl" placeholder="https://ejemplo.com/webhook" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Guardar Cambios</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Settings;