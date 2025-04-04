import { create } from "zustand";

export interface Data {
    temperature: number;
    humidity: number;
    pm2: number;
    pm2_5: number;
    pm10: number;
    co2: number;
    date: string;
    hour: string;
}

interface DataStore {
    data: Data[];
    addData: (data: Data) => void;
    getLastData: () => Data | null;
    getLastTenData: () => Data[];
}

export const useDataStore = create<DataStore>((set, get) => ({
    data: [
        { "temperature": 23.5, "humidity": 45, "pm2": 12, "pm2_5": 15, "pm10": 25, "co2": 400, "date": "02/04/25", "hour": "17:17:03" },
        { "temperature": 24.1, "humidity": 48, "pm2": 10, "pm2_5": 14, "pm10": 22, "co2": 420, "date": "02/04/25", "hour": "17:18:03" },
        { "temperature": 22.8, "humidity": 50, "pm2": 13, "pm2_5": 16, "pm10": 28, "co2": 410, "date": "02/04/25", "hour": "17:19:03" },
        { "temperature": 23.9, "humidity": 46, "pm2": 11, "pm2_5": 13, "pm10": 21, "co2": 430, "date": "02/04/25", "hour": "17:20:03" },
        { "temperature": 24.2, "humidity": 44, "pm2": 14, "pm2_5": 17, "pm10": 30, "co2": 440, "date": "02/04/25", "hour": "17:21:03" },
        { "temperature": 23.7, "humidity": 47, "pm2": 12, "pm2_5": 14, "pm10": 23, "co2": 425, "date": "02/04/25", "hour": "17:22:03" },
        { "temperature": 22.9, "humidity": 49, "pm2": 10, "pm2_5": 12, "pm10": 19, "co2": 415, "date": "02/04/25", "hour": "17:23:03" },
        { "temperature": 24.0, "humidity": 45, "pm2": 13, "pm2_5": 15, "pm10": 24, "co2": 435, "date": "02/04/25", "hour": "17:24:03" },
        { "temperature": 23.4, "humidity": 46, "pm2": 11, "pm2_5": 13, "pm10": 22, "co2": 420, "date": "02/04/25", "hour": "17:25:03" },
        { "temperature": 23.9, "humidity": 44, "pm2": 14, "pm2_5": 18, "pm10": 32, "co2": 445, "date": "02/04/25", "hour": "17:26:03" },
        { "temperature": 24.5, "humidity": 43, "pm2": 11, "pm2_5": 14, "pm10": 23, "co2": 425, "date": "02/04/25", "hour": "17:27:03" },
        { "temperature": 23.1, "humidity": 47, "pm2": 10, "pm2_5": 13, "pm10": 20, "co2": 410, "date": "02/04/25", "hour": "17:28:03" },
        { "temperature": 24.4, "humidity": 45, "pm2": 13, "pm2_5": 16, "pm10": 28, "co2": 430, "date": "02/04/25", "hour": "17:29:03" },
        { "temperature": 23.3, "humidity": 46, "pm2": 12, "pm2_5": 15, "pm10": 25, "co2": 420, "date": "02/04/25", "hour": "17:30:03" },
        { "temperature": 24.0, "humidity": 44, "pm2": 14, "pm2_5": 18, "pm10": 30, "co2": 440, "date": "02/04/25", "hour": "17:31:03" },
        { "temperature": 23.8, "humidity": 45, "pm2": 12, "pm2_5": 14, "pm10": 22, "co2": 425, "date": "02/04/25", "hour": "17:32:03" },
        { "temperature": 22.7, "humidity": 48, "pm2": 10, "pm2_5": 13, "pm10": 19, "co2": 415, "date": "02/04/25", "hour": "17:33:03" },
        { "temperature": 23.6, "humidity": 46, "pm2": 11, "pm2_5": 14, "pm10": 23, "co2": 430, "date": "02/04/25", "hour": "17:34:03" },
        { "temperature": 24.3, "humidity": 44, "pm2": 13, "pm2_5": 16, "pm10": 27, "co2": 440, "date": "02/04/25", "hour": "17:35:03" },
        { "temperature": 23.9, "humidity": 45, "pm2": 12, "pm2_5": 15, "pm10": 24, "co2": 425, "date": "02/04/25", "hour": "17:36:03" },
    ],
    addData: (newData) => set((state) => {
        const updatedData = [...state.data, newData];

        if (updatedData.length > 20) {
            updatedData.shift();
        }

        return { data: updatedData };
    }),
    getLastData: () => {
        const data = get().data;
        return data.length > 0 ? data[data.length - 1] : null;
    },
    getLastTenData: () => {
        const data = get().data;
        return data.slice(-10);
    }
}));
