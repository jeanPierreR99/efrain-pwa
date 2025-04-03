import { Card, CardDescription } from '@/shared/ui/card';
import { ArrowBigUpIcon, Frown, Meh, Skull, Smile } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CardQualityProps {
    data: number;
    thresholds: number[];
    categories: string[];
    unit: string;
}

const CardQualityPast: React.FC<CardQualityProps> = ({ data, thresholds, categories, unit }) => {
    const [evaluation, setEvaluation] = useState("s/e");

    const getCategory = (value: number, thresholds: number[]) => {
        if (value < 0 || value > thresholds[2]) return 4; // Peligrosa
        if (value <= thresholds[0]) return 1; // Buena
        if (value <= thresholds[1]) return 2; // Moderada
        return 3; // Pobre
    }

    const getCategoryLabel = (value: number) => {
        const score = getCategory(value, thresholds);
        return categories[score - 1];
    }

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
            case 'Pobre':
                return {
                    bgColor: 'bg-orange-200',
                    bgIcon: 'bg-orange-300',
                    textColor: 'text-orange-500',
                    icon: <Frown size={60} />,
                    shadow: 'shadow-orange-200'
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
    }

    useEffect(() => {
        setEvaluation(getCategoryLabel(data));
    }, [thresholds, data]);

    const { bgColor, textColor, icon, bgIcon, shadow } = getCardStyles(evaluation);

    return (
        <Card className={`border-none shadow-lg ${shadow} py-0`}>
            <CardDescription className={`${bgColor} rounded-md text-lg text-center overflow-hidden`}>
                <div className={`grid grid-cols-3 place-items-center ${textColor}`}>
                    <div className={`${bgIcon} w-full h-full flex justify-center items-center p-4`}>
                        {icon}
                    </div>
                    <div className='col-span-2 p-4'>
                        <div className='flex gap-2 items-end justify-center'>
                            <span className="text-5xl">{data} {unit}</span>
                        </div>
                        <span className={`${textColor} mt-2 text-end font-bold flex justify-end gap-2`}><ArrowBigUpIcon></ArrowBigUpIcon> {evaluation}</span>

                    </div>
                </div>

            </CardDescription>
        </Card>
    );
};

export default CardQualityPast;
