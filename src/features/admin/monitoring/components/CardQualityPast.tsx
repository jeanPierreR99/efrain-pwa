import { Card } from "@/shared/ui/card";

import {
    AlertTriangle,
    CheckCircle2,
    Skull,
    Minus,
} from "lucide-react";

interface CardQualityPastProps {
    data: number;

    ranges: {
        good: {
            min: number;
            max: number;
        };

        moderate: {
            min: number;
            max: number;
        };
    };

    unit: string;
}

const CardQualityPast: React.FC<CardQualityPastProps> = ({
    data,
    ranges,
    unit,
}) => {
    const getCategory = (
        value: number,
        ranges: CardQualityPastProps["ranges"]
    ): "Buena" | "Moderada" | "Peligrosa" | "s/e" => {
        if (data === undefined || data === null || Number.isNaN(value)) {
            return "s/e";
        }

        if (
            value >= ranges.good.min &&
            value <= ranges.good.max
        ) {
            return "Buena";
        }

        if (
            value >= ranges.moderate.min &&
            value <= ranges.moderate.max
        ) {
            return "Moderada";
        }

        return "Peligrosa";
    };

    const evaluation = getCategory(data, ranges);

    const getCardStyles = (evaluation: string) => {
        switch (evaluation) {
            case "Buena":
                return {
                    container:
                        "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50",
                    iconContainer:
                        "bg-emerald-100 text-emerald-600",
                    text:
                        "text-emerald-700",
                    badge:
                        "bg-emerald-100 text-emerald-700 border-emerald-200",
                    icon: <CheckCircle2 size={28} strokeWidth={2.2} />,
                    label: "Dentro del rango recomendado",
                };

            case "Moderada":
                return {
                    container:
                        "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50",
                    iconContainer:
                        "bg-amber-100 text-amber-600",
                    text:
                        "text-amber-700",
                    badge:
                        "bg-amber-100 text-amber-700 border-amber-200",
                    icon: <AlertTriangle size={28} strokeWidth={2.2} />,
                    label: "Requiere atención",
                };

            case "Peligrosa":
                return {
                    container:
                        "border-red-200 bg-gradient-to-br from-red-50 via-white to-red-50",
                    iconContainer:
                        "bg-red-100 text-red-600",
                    text:
                        "text-red-700",
                    badge:
                        "bg-red-100 text-red-700 border-red-200",
                    icon: <Skull size={28} strokeWidth={2.2} />,
                    label: "Nivel fuera de rango",
                };

            default:
                return {
                    container:
                        "border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50",
                    iconContainer:
                        "bg-gray-100 text-gray-500",
                    text:
                        "text-gray-600",
                    badge:
                        "bg-gray-100 text-gray-600 border-gray-200",
                    icon: <Minus size={28} strokeWidth={2.2} />,
                    label: "Sin información disponible",
                };
        }
    };

    const {
        container,
        iconContainer,
        text,
        badge,
        icon,
        label,
    } = getCardStyles(evaluation);

    return (
        <Card
            className={`overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${container}`}
        >
            <div className="p-5">

                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Medición histórica
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                            Calidad registrada
                        </p>
                    </div>

                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconContainer}`}
                    >
                        {icon}
                    </div>
                </div>

                {/* Value */}
                <div className="mt-6 flex items-end gap-2">
                    <span
                        className={`text-4xl font-bold tracking-tight ${text}`}
                    >
                        {!Number.isNaN(data) && data !== undefined && data !== null
                            ? data
                            : "--"}
                    </span>

                    <span className="mb-1.5 text-sm font-medium text-gray-500">
                        {unit}
                    </span>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center justify-between gap-3">
                    <div
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${badge}`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {evaluation}
                    </div>

                    <span className="text-right text-xs text-gray-400">
                        {label}
                    </span>
                </div>

                {/* Range */}
                {evaluation !== "s/e" && (
                    <div className="mt-5 border-t border-gray-200/70 pt-4">
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span>
                                Rango recomendado
                            </span>

                            <span className="font-medium text-gray-500">
                                {ranges.good.min} - {ranges.good.max} {unit}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default CardQualityPast;
