import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
            const res = await userService.login(email, password);
            if (res.success) {
                const role = res.user?.role || 'usuario';
                const mappedRole = role === 'administrador' ? 'admin' : role;
                localStorage.setItem("userRole", mappedRole);
                localStorage.setItem("isAuthenticated", "true");
                
                // Mostrar toast de éxito
                toast.success("¡Inicio de sesión exitoso!", {
                    description: `Bienvenido de vuelta`,
                    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
                });

                // Pequeño delay para que se vea el toast
                setTimeout(() => {
                    if (mappedRole === 'admin') {
                        window.location.assign("/admin");
                    } else {
                        window.location.assign("/map");
                    }
                }, 500);
                
            } else {
                const errorMsg = res.message || "Credenciales incorrectas";
                setError(errorMsg);
                toast.error("Error de autenticación", {
                    description: errorMsg,
                    icon: <XCircle className="h-4 w-4 text-red-500" />,
                });
            }
        } catch (e: any) {
            const msg = e?.message || 'Error de red';
            setError(msg);
            toast.error("Error de conexión", {
                description: msg,
                icon: <XCircle className="h-4 w-4 text-red-500" />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Iniciar sesión
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Ingresa tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-4">
                        {/* Alert de error mejorado */}
                        {error && (
                            <div className="animate-in fade-in-50 slide-in-from-top-3 duration-300">
                                <div className="flex items-start gap-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-red-800">Error de autenticación</p>
                                        <p className="text-sm text-red-600 mt-1">{error}</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setError("")}
                                        className="text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Correo electrónico
                            </Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="correo@ejemplo.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`transition-all duration-200 ${
                                    error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
                                }`}
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Contraseña
                            </Label>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`transition-all duration-200 ${
                                    error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
                                }`}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Enlace de recuperación de contraseña */}
                        <div className="text-right">
                            <button 
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                onClick={() => navigate("/forgot-password")}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col gap-3 pt-2">
                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </Button>
                        
                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">o</span>
                            </div>
                        </div>
                        
                        <Button 
                            type="button" 
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                            onClick={() => navigate("/")}
                            disabled={isLoading}
                        >
                            Volver al inicio
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default Login;