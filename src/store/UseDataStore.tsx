import { create } from "zustand";

export interface Data {
  temperature: number;
  humidity: number;
  pm2: number;
  pm2_5: number;
  pm10: number;
  co2: number;
  co: number;
  tvoc: number;
  date: string;
  hour: string;
}

interface DataStore {
  data: Data[];
  addData: (data: Data) => void;
  setData: (data: Data[]) => void;
  getLastData: () => Data | null;
  getLastTenData: () => Data[];
  average10Data: () => any;
}

export const useDataStore = create<DataStore>((set, get) => ({
  data: [],
  addData: (newData) =>
    set((state) => {
      const updatedData = [...state.data, newData];

      if (updatedData.length > 20) {
        updatedData.shift();
      }

      return { data: updatedData };
    }),
  setData: (newDataArray) =>
    set(() => ({
      data: Array.isArray(newDataArray) ? newDataArray : [],
    })),
  getLastData: () => {
    const data = get().data;
    return data.length > 0 ? data[data.length - 1] : null;
  },
  getLastTenData: () => {
    const data = get().data;
    return data.slice(-10);
  },
  average10Data: () => {  
    return get().data.slice(-10)
      .reduce((sum, curr) => sum + (curr.pm2_5 || 0), 0) / 10;
  }  
}));
