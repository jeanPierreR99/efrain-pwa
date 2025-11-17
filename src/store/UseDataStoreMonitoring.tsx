import { create } from "zustand";

export interface Measurement {
  co: number;
  co2: number;
  dht: {
    humedad: number;
    temperatura: number;
  };
  hour: string;
  pm: {
    pm10: number;
    pm1_0: number;
    pm2_5: number;
  };
  timestamp: string;
  tvoc: number;
}

export interface DateData {
  date: string;
  data: {
    [key: string]: Measurement;
  };
}

export interface MonitoringData {
  mainDate: DateData;
  oneDayAgo: DateData;
  oneWeekAgo: DateData;
}

interface DataStoreMonitoring {
  monitoringData: MonitoringData | null;
  isLoading: boolean;
  error: string | null;
  setMonitoringData: (data: MonitoringData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // Métodos para obtener datos transformados
  getMainDateData: () => any[]; // Array de datos transformados para mainDate
  getOneDayAgoData: () => any[]; // Array de datos transformados para oneDayAgo
  getOneWeekAgoData: () => any[]; // Array de datos transformados para oneWeekAgo
  // Método para obtener datos de una fecha específica
  getDateData: (dateType: 'mainDate' | 'oneDayAgo' | 'oneWeekAgo') => any[];
  // Método para limpiar el store
  clearMonitoringData: () => void;
}

export const useDataStoreMonitoring = create<DataStoreMonitoring>((set, get) => ({
  monitoringData: null,
  isLoading: false,
  error: null,

  setMonitoringData: (data) =>
    set(() => ({
      monitoringData: data,
      error: null,
    })),

  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  setError: (error) =>
    set(() => ({
      error,
      isLoading: false,
    })),

  // Transformar los datos del objeto a array y aplicar formato similar al UseDataStore original
  getMainDateData: () => {
    const state = get();
    if (!state.monitoringData?.mainDate?.data) return [];

    return Object.entries(state.monitoringData.mainDate.data).map(([key, value]) => ({
      id: key,
      temperature: value.dht.temperatura,
      humidity: value.dht.humedad,
      pm2: value.pm.pm1_0,
      pm2_5: value.pm.pm2_5,
      pm10: value.pm.pm10,
      co2: value.co2,
      co: value.co,
      tvoc: value.tvoc,
      date: new Date(value.timestamp).toLocaleDateString("es-PE"),
      hour: value.hour,
      timestamp: value.timestamp,
    }));
  },

  getOneDayAgoData: () => {
    const state = get();
    if (!state.monitoringData?.oneDayAgo?.data) return [];

    return Object.entries(state.monitoringData.oneDayAgo.data).map(([key, value]) => ({
      id: key,
      temperature: value.dht.temperatura,
      humidity: value.dht.humedad,
      pm2: value.pm.pm1_0,
      pm2_5: value.pm.pm2_5,
      pm10: value.pm.pm10,
      co2: value.co2,
      co: value.co,
      tvoc: value.tvoc,
      date: new Date(value.timestamp).toLocaleDateString("es-PE"),
      hour: value.hour,
      timestamp: value.timestamp,
    }));
  },

  getOneWeekAgoData: () => {
    const state = get();
    if (!state.monitoringData?.oneWeekAgo?.data) return [];

    return Object.entries(state.monitoringData.oneWeekAgo.data).map(([key, value]) => ({
      id: key,
      temperature: value.dht.temperatura,
      humidity: value.dht.humedad,
      pm2: value.pm.pm1_0,
      pm2_5: value.pm.pm2_5,
      pm10: value.pm.pm10,
      co2: value.co2,
      co: value.co,
      tvoc: value.tvoc,
      date: new Date(value.timestamp).toLocaleDateString("es-PE"),
      hour: value.hour,
      timestamp: value.timestamp,
    }));
  },

  getDateData: (dateType) => {
    const state = get();
    if (!state.monitoringData?.[dateType]?.data) return [];

    return Object.entries(state.monitoringData[dateType].data).map(([key, value]) => ({
      id: key,
      temperature: value.dht.temperatura,
      humidity: value.dht.humedad,
      pm2: value.pm.pm1_0,
      pm2_5: value.pm.pm2_5,
      pm10: value.pm.pm10,
      co2: value.co2,
      co: value.co,
      tvoc: value.tvoc,
      date: new Date(value.timestamp).toLocaleDateString("es-PE"),
      hour: value.hour,
      timestamp: value.timestamp,
    }));
  },

  clearMonitoringData: () =>
    set(() => ({
      monitoringData: null,
      error: null,
      isLoading: false,
    })),
}));
