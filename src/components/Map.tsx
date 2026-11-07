import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import SheetDataView from "./SheedDataView";
import { useMarkerStore } from "@/store/UseMarkerStore";
import MARKER_RED from "@/assets/images/marker-red.png";
import L from "leaflet";
import { ListPoint } from "@/features/admin/new-point/components/ListPoint";
import { useDataStore } from "@/store/UseDataStore";

interface MapProps {
    edit: boolean;
    title: string;
    description: string;
}

const Map: React.FC<MapProps> = ({ edit, title, description }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [mapType, setMapType] = useState<"satellite" | "street">("street");
    const [open, setOpen] = useState(false);
    const { markers } = useMarkerStore();
    const { getLastData } = useDataStore();

    const customIconRed = new L.Icon({
        iconUrl: MARKER_RED,
        iconSize: [35, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const LocationMarker = () => {
        edit &&
            useMapEvents({
                click(e) {
                    setPosition([e.latlng.lat, e.latlng.lng]);
                    setOpen(true);
                },
            });

        return position ? (
            <Marker position={position} icon={customIconRed} eventHandlers={{ click: () => setOpen(true) }}>
                <Popup>📍 Marcaste aquí {position}</Popup>
            </Marker>
        ) : null;
    };

    const getPM25Value = () => {
        const lastData = getLastData();
        return lastData?.pm2_5 || 0;
    };

    type Category = 'Buena' | 'Moderada' | 'Peligrosa';

    const getCategory = (
        value: number,
        ranges: {
            good: { min: number; max: number };
            moderate: { min: number; max: number };
        }
    ): Category => {

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

    const getAirQualityCategory = (values: {
        pm25: number;
    }) => {

        const pm25Ranges = {
            good: { min: 0, max: 15 },
            moderate: { min: 15.1, max: 50 }
        };

        const qualities: Category[] = [
            getCategory(values.pm25, pm25Ranges),
        ];

        const worst = qualities.includes('Peligrosa')
            ? 'Peligrosa'
            : qualities.includes('Moderada')
                ? 'Moderada'
                : 'Buena';

        return worst;
    };


    return (
        <div className="relative">
            <button
                onClick={() => setMapType(mapType === "satellite" ? "street" : "satellite")}
                className="absolute text-sm top-4 right-4 z-10 bg-white px-4 py-2 rounded shadow-lg cursor-pointer"
            >
                {mapType === "satellite" ? "Plano 🗺️" : "Satelital 🌎"}
            </button>

            <MapContainer zoomControl={false} center={[-12.589805, -69.173021]} zoom={14} maxZoom={17} className="h-screen w-full z-0">
                {mapType === "satellite" ? (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics'
                    />
                ) : (
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    />
                )}

                <LocationMarker />

                {markers.map((marker, index) => {
                    const pm25 = getPM25Value(); // ✅ OBTIENE EL VALOR CORRECTO
                    const airQuality = getAirQualityCategory({ pm25 });
                    const color =
                        airQuality === "Buena"
                            ? "#4CAF50"
                            : airQuality === "Moderada"
                                ? "#FF9800"
                                : "#FF5722";

                    return (
                        <CircleMarker
                            key={`${index}-${pm25}`} // 🔥 FORZAR RECREACIÓN
                            center={marker.position as any}
                            radius={20}
                            color={color}
                            fillColor={color}
                            fillOpacity={0.7}
                            weight={2}
                            eventHandlers={{ click: () => (!edit ? setOpen(true) : setOpen(false)) }}
                        >
                            <Tooltip direction="center" permanent >
                                <span className={"text-white font-bold text-lg"}>{pm25.toFixed(1)}</span>
                            </Tooltip>
                            <Popup>
                                <div className="pb-2">
                                    <div className="font-bold">{marker.title}</div>
                                    <div>{marker.description}</div>
                                    <div className="text-gray-500 float-right">{marker.create_at}</div>
                                    <div className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: `${airQuality === 'Buena' ? '#4CAF50' : airQuality === 'Moderada' ? '#FF9800' : '#FF5722'}` }}></div>
                                            <span className="font-semibold text-lg">PM2.5</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 mb-1">
                                            {pm25.toFixed(1)} µg/m³
                                        </div>
                                        <div className="text-sm font-medium text-gray-600">
                                            {airQuality}
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>

            {edit && <div className="absolute left-4 top-4"><ListPoint /></div>}
            <SheetDataView edit={edit} title={title} description={description} open={open} setOpen={setOpen} position={position} />
        </div>
    );
};

export default Map;
