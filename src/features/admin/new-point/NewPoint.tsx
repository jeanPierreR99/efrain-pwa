import Map from "@/components/Map";

const NewPoint = () => {
    return (
        <div>
            <Map edit={true} title="Nuevo punto" description="Marque un lugar en el mapa para registrar la coordenada." />
        </div>
    );
};

export default NewPoint;