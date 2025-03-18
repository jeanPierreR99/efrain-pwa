import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import SheetDataView from "./SheedDataView";
import { useMarkerStore } from "@/store/UseMarkerStore";
import MARKER_RED from "@/assets/images/marker-red.png";
import L from "leaflet";
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

    return (
        <div className="relative">
            <button
                onClick={() => setMapType(mapType === "satellite" ? "street" : "satellite")}
                className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded shadow-lg cursor-pointer"
            >
                {mapType === "satellite" ? "Mapa Plano 🗺️" : "Mapa Satelital 🌎"}
            </button>

            <MapContainer zoomControl={false} center={[-12.589805, -69.173021]} zoom={9} maxZoom={17} className="h-[calc(100vh-70px)] w-full z-0">
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
                {markers.map((marker, index) => (
                    <CircleMarker
                        key={index}
                        center={marker.position as any}
                        radius={20}
                        color={index + 5 * 9 < 46 ? "red" : "green"}
                        fillColor={index + 5 * 9 < 46 ? "red" : "green"}
                        fillOpacity={0.7}
                        eventHandlers={{ click: () => (!edit ? setOpen(true) : setOpen(false)) }}
                    >
                        <Tooltip direction="center" permanent >
                            <span className={"text-white font-bold text-lg"}>{index + 5 * 9}</span>
                        </Tooltip>
                        <Popup>
                            <div className="pb-2">
                                <div className="font-bold">{marker.title}</div>
                                <div>{marker.description}</div>
                                <div className="text-gray-500 float-right">{marker.create_at}</div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            <SheetDataView edit={edit} title={title} description={description} open={open} setOpen={setOpen} position={position} />
        </div>
    );
};

export default Map;
