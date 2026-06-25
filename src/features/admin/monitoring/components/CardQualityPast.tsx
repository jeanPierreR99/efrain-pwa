import { Card, CardDescription } from '@/shared/ui/card';
import { ArrowBigUpIcon, Meh, Skull, Smile } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    unit
}) => {
    const [evaluation, setEvaluation] = useState<
        'Buena' | 'Moderada' | 'Peligrosa' | 's/e'
    >('s/e');

    const getCategory = (
        value: number,
        ranges: {
            good: {
                min: number;
                max: number;
            };
            moderate: {
                min: number;
                max: number;
            };
        }
    ): 'Buena' | 'Moderada' | 'Peligrosa' => {

        if (
            value >= ranges.good.min &&
            value <= ranges.good.max
        ) {
            return 'Buena';
        }

        if (
            value >= ranges.moderate.min &&
            value <= ranges.moderate.max
        ) {
            return 'Moderada';
        }

        return 'Peligrosa';
    };

    const getCardStyles = (evaluation: string) => {
        switch (evaluation) {
            case 'Buena':
                return {
                    bgColor: 'bg-green-200',
                    bgIcon: 'bg-green-300',
                    textColor: 'text-green-500',
                    icon: <Smile size={60} />,
                    shadow: 'shadow-green-200'
                };

            case 'Moderada':
                return {
                    bgColor: 'bg-yellow-200',
                    bgIcon: 'bg-yellow-300',
                    textColor: 'text-yellow-500',
                    icon: <Meh size={60} />,
                    shadow: 'shadow-yellow-200'
                };

            case 'Peligrosa':
                return {
                    bgColor: 'bg-red-200',
                    bgIcon: 'bg-red-300',
                    textColor: 'text-red-500',
                    icon: <Skull size={60} />,
                    shadow: 'shadow-red-200'
                };

            default:
                return {
                    bgColor: 'bg-gray-200',
                    bgIcon: 'bg-gray-300',
                    textColor: 'text-gray-500',
                    icon: <Smile size={60} />,
                    shadow: 'shadow-gray-200'
                };
        }
    };

    useEffect(() => {
        if (data === undefined || data === null || isNaN(data)) return;

        setEvaluation(
            getCategory(data, ranges)
        );
    }, [data, ranges]);

    const { bgColor, textColor, icon, bgIcon, shadow } =
        getCardStyles(evaluation);

    return (
        <Card className={`border-none shadow-lg ${shadow} py-0`}>
            <CardDescription
                className={`${bgColor} rounded-md text-lg text-center overflow-hidden`}
            >
                <div className={`grid grid-cols-3 place-items-center ${textColor}`}>
                    <div
                        className={`${bgIcon} w-full h-full flex justify-center items-center p-4`}
                    >
                        {icon}
                    </div>

                    <div className="col-span-2 p-4">
                        <div className="flex gap-2 items-end justify-center">
                            <span className="text-5xl">
                                {data} {unit}
                            </span>
                        </div>

                        <span
                            className={`${textColor} mt-2 font-bold flex justify-end gap-2`}
                        >
                            <ArrowBigUpIcon />
                            {evaluation}
                        </span>
                    </div>
                </div>
            </CardDescription>
        </Card>
    );
};

export default CardQualityPast;