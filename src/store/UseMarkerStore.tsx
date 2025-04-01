import { create } from "zustand";

interface Marker {
    position: [number, number];
    title: string;
    description: string;
    create_at: string;
}

interface MarkerStore {
    markers: Marker[];
    addMarker: (marker: Marker) => void;
    removeMarker: (index: number) => void;
}

export const useMarkerStore = create<MarkerStore>((set) => ({
    markers: [
        {
            position: [-12.589805, -69.173021],
            title: "Manama",
            description: "Descripcion de Manama",
            create_at: "2021-10-10"
        },
        {
            position: [-12.571653760254948, -69.16408538818361],
            title: "El triunfo",
            description: "Descripcion de triunfo",
            create_at: "2021-10-10"
        },
        {
            position: [-12.628612981187759, -69.21455383300783],
            title: "Diamante",
            description: "Descripcion de Diamante",
            create_at: "2021-10-10"
        },
    ],
    addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
    removeMarker: (index) => set((state) => ({
        markers: state.markers.filter((_, i) => i !== index)
    }))
}));
