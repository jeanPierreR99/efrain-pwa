
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simulación de autenticación
        if (email === "admin@example.com" && password === "admin123") {
            // Usuario administrador
            localStorage.setItem("userRole", "admin");
            localStorage.setItem("isAuthenticated", "true");
            window.location.assign("/admin");
        } else if (email === "user@example.com" && password === "user123") {
            // Usuario normal
            localStorage.setItem("userRole", "user");
            localStorage.setItem("isAuthenticated", "true");
            window.location.assign("/map");
        } else {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="correo@ejemplo.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 pb-4">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-sm font-medium text-red-500">
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button type="submit" className="w-full">Iniciar sesión</Button>
                        <Button type="button" className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => navigate("/")}>Volver al inicio</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
export default Login;
