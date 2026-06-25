import { Download, X } from "lucide-react";
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
            className={`
                fixed
                bottom-6
                left-1/2
                z-[9999]
                flex
                min-w-50
                -translate-x-1/2
                flex-col
                items-center
                gap-2
                rounded-bl-4xl
                rounded-tr-4xl
                border-2
                border-[#00C9A3]
                bg-white
                px-5
                pb-3
                text-muted-foreground
                shadow-2xl
                backdrop-blur-md
                transition-all
                duration-1000
                hover:scale-95
                ${showButton
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0 pointer-events-none"
                }
            `}
        >
            <button
                onClick={handleClose}
                className="
                    absolute
                    right-3
                    top-3
                    z-10
                    rounded-full
                    p-1.5
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                "
            >
                <X size={16} />
            </button>

            <img
                className="h-30 w-40 object-contain p-2"
                src="./icon.png"
                alt=""
            />

            {/* Text */}
            <div className="relative text-center">

                <p
                    className="
                mt-1
                text-xs
                leading-5
                text-gray-500
            "
                >
                    Accede más rápido desde tu
                    escritorio o menú inicio.
                </p>
            </div>

            {/* Install button */}
            <button
                onClick={handleInstall}
                className="
            relative
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#00C9A3]/30
            to-[#00C9A3]
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:shadow-xl
            active:scale-[0.98]
        "
            >
                <Download size={18} />

                <span>Instalar ahora</span>
            </button>
        </div>
    );
};

export default InstallPWAButton;