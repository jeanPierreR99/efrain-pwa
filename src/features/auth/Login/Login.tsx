import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        const role = res.user?.role || "usuario";
        const mappedRole = role === "administrador" ? "admin" : role;

        localStorage.setItem("userRole", mappedRole);
        localStorage.setItem("isAuthenticated", "true");

        toast.success("¡Inicio de sesión exitoso!", {
          description: "Bienvenido nuevamente",
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        });

        setTimeout(() => {
          if (mappedRole === "admin") {
            window.location.assign("/admin");
          } else {
            window.location.assign("/map");
          }
        }, 700);
      } else {
        const errorMsg = res.message || "Credenciales incorrectas";
        setError(errorMsg);

        toast.error("Error de autenticación", {
          description: errorMsg,
          icon: <XCircle className="h-4 w-4 text-red-500" />,
        });
      }
    } catch (e: any) {
      const msg = e?.message || "Error de conexión";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-white px-4">

      <Card className="relative z-10 w-full max-w-md border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/50">

        <CardHeader className="space-y-4 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Bienvenido
            </CardTitle>

            <CardDescription className="mt-2 text-slate-600">
              Inicia sesión para acceder al sistema
            </CardDescription>
          </div>

        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5">

            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />

                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Error de autenticación
                  </p>
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Correo electrónico
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Contraseña
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="*********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 bg-white border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-sky-600 hover:text-sky-700 transition-colors font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

          </CardContent>

          <CardFooter className="flex flex-col gap-4">

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 h-11 text-white font-medium shadow-lg shadow-sky-500/30"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-500">
                  o
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={isLoading}
              className="w-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Volver al inicio
            </Button>

          </CardFooter>
        </form>

      </Card>
    </div>
  );
};

export default Login;