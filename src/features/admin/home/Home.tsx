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
            <Map
                edit={false}
                title="Manama"
                description={`${(data && lastData) ? `Última actualización ${formatDateToWords(lastData.date)} - ${lastData.hour} (Hora local)` : 'no hay datos disponibles'}`}
            />

        </div>
    );
};

export default Home;
