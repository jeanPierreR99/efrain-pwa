import { Download, X, Smartphone, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
    }>;
}

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    const [visible, setVisible] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const isStandalone = window.matchMedia(
            "(display-mode: standalone)"
        ).matches;

        if (isStandalone) return;

        const handler = (e: Event) => {
            e.preventDefault();

            setDeferredPrompt(
                e as BeforeInstallPromptEvent
            );

            setVisible(true);

            setTimeout(() => {
                setShowButton(true);
            }, 1000);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handler
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handler
            );
        };
    }, []);

    const handleClose = () => {
        setVisible(false);

        setShowButton(false);

        localStorage.setItem(
            "hide-pwa-install",
            "true"
        );
    };

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();

        const choice =
            await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            setVisible(false);
            setShowButton(false);
        }

        setDeferredPrompt(null);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-5 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-500 sm:bottom-6 ${showButton
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-8 opacity-0"
                }`}
        >
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-[#00C9A3] to-teal-400" />

                <button
                    onClick={handleClose}
                    aria-label="Cerrar"
                    className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100/80 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-700 active:scale-95"
                >
                    <X size={16} />
                </button>

                <div className="px-5 pb-5 pt-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm">
                            <img
                                src="./icon.png"
                                alt="Icono de la aplicación"
                                className="h-full w-full object-contain p-2"
                            />
                        </div>

                        <div className="min-w-0 pr-8">
                            <div className="mb-1 flex items-center gap-1.5">
                                <Zap
                                    size={13}
                                    className="fill-emerald-500 text-emerald-500"
                                />

                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                    Acceso rápido
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-gray-900">
                                Instala la aplicación
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Accede rápidamente desde tu escritorio, nóvil o
                                menú de inicio.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                            <Smartphone
                                size={15}
                                className="shrink-0 text-gray-400"
                            />

                            <span className="text-[10px] font-medium text-gray-500">
                                Acceso directo
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                            <Zap
                                size={15}
                                className="shrink-0 text-gray-400"
                            />

                            <span className="text-[10px] font-medium text-gray-500">
                                Inicio rápido
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleInstall}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00B894] to-[#00C9A3] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25 active:translate-y-0 active:scale-[0.98]"
                    >
                        <Download size={17} />
                        <span>Instalar ahora</span>
                    </button>

                    <button
                        onClick={handleClose}
                        className="mt-2 w-full py-1 text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
                    >
                        Ahora no
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPWAButton;