import Map from "@/components/Map";
import { useDataStore } from "@/store/UseDataStore";

const Home = () => {
    const { getLastData, data } = useDataStore();

    function formatDateToWords(timestamp: string): string {
        const date = new Date(timestamp).toLocaleDateString();
        return date;
    }

    const lastData = getLastData();

    return (
        <div>
            {data.length === 0 || !lastData ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No hay datos disponibles
                </div>
            ) : (
                <Map
                    edit={false}
                    title="Manama"
                    description={`Última actualización ${formatDateToWords(lastData.date)} - ${lastData.hour} (Hora local)`}
                />
            )}
        </div>
    );
};

export default Home;
