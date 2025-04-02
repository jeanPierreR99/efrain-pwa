import Map from "@/components/Map";
import { useDataStore } from "@/store/UseDataStore";
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

const Home = () => {
    const { getLastData } = useDataStore();

    function formatDateToWords(dateString: any): string {
        const date = parse(dateString, 'dd/MM/yy', new Date())
        return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
    }

    return (
        <div>
            <Map edit={false} title="Manama" description={`Última actualización ${formatDateToWords(getLastData()?.date)} - ${getLastData()?.hour} (Hora local)`} />
        </div>
    );
};

export default Home;