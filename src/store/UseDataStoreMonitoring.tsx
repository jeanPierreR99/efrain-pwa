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

// Tipo para las métricas disponibles
type MetricKey =
  | 'temperature'
  | 'humidity'
  | 'pm2'
  | 'pm2_5'
  | 'pm10'
  | 'co2'
  | 'co'
  | 'tvoc';

interface DataStoreMonitoring {
  monitoringData: MonitoringData | null;
  isLoading: boolean;
  error: string | null;
  setMonitoringData: (data: MonitoringData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Métodos para obtener datos transformados
  getMainDateData: () => any[];
  getOneDayAgoData: () => any[];
  getOneWeekAgoData: () => any[];
  getDateData: (dateType: 'mainDate' | 'oneDayAgo' | 'oneWeekAgo') => any[];

  // Métodos para calcular promedios
  getMainDateAverage: (metric: MetricKey) => number | null;
  getOneDayAgoAverage: (metric: MetricKey) => number | null;
  getOneWeekAgoAverage: (metric: MetricKey) => number | null;
  // getDateAverage: (dateType: 'mainDate' | 'oneDayAgo' | 'oneWeekAgo', metric: MetricKey) => number | null;
  getDateAverage: (dateType: 'mainDate' | 'oneDayAgo' | 'oneWeekAgo', metric: string) => number | null;

  // Método para obtener todos los promedios de una fecha
  getAllAverages: (dateType: 'mainDate' | 'oneDayAgo' | 'oneWeekAgo') => Record<MetricKey, number | null>;

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

  // Transformar los datos del objeto a array
  getMainDateData: () => {
    const state = get();
    if (!state.monitoringData?.mainDate?.data) return [];
    return transformData(state.monitoringData.mainDate.data);
  },

  getOneDayAgoData: () => {
    const state = get();
    if (!state.monitoringData?.oneDayAgo?.data) return [];
    return transformData(state.monitoringData.oneDayAgo.data);
  },

  getOneWeekAgoData: () => {
    const state = get();
    if (!state.monitoringData?.oneWeekAgo?.data) return [];
    return transformData(state.monitoringData.oneWeekAgo.data);
  },

  getDateData: (dateType) => {
    const state = get();
    if (!state.monitoringData?.[dateType]?.data) return [];
    return transformData(state.monitoringData[dateType].data);
  },

  // Calcular promedio para mainDate
  getMainDateAverage: (metric) => {
    const data = get().getMainDateData();
    return calculateAverage(data, metric);
  },

  // Calcular promedio para oneDayAgo
  getOneDayAgoAverage: (metric) => {
    const data = get().getOneDayAgoData();
    return calculateAverage(data, metric);
  },

  // Calcular promedio para oneWeekAgo
  getOneWeekAgoAverage: (metric) => {
    const data = get().getOneWeekAgoData();
    return calculateAverage(data, metric);
  },

  // Calcular promedio para cualquier fecha
  getDateAverage: (dateType, metric) => {
    const data = get().getDateData(dateType);
    return calculateAverage(data, metric);
  },

  // Obtener todos los promedios de una fecha
  getAllAverages: (dateType) => {
    const metrics: MetricKey[] = ['temperature', 'humidity', 'pm2', 'pm2_5', 'pm10', 'co2', 'co', 'tvoc'];
    const averages: Record<MetricKey, number | null> = {} as Record<MetricKey, number | null>;

    metrics.forEach(metric => {
      averages[metric] = get().getDateAverage(dateType, metric);
    });

    return averages;
  },

  clearMonitoringData: () =>
    set(() => ({
      monitoringData: null,
      error: null,
      isLoading: false,
    })),
}));

// Función helper para transformar datos
const transformData = (data: { [key: string]: Measurement }) => {
  return Object.entries(data).map(([key, value]) => ({
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
};

// Función helper para calcular promedios
// const calculateAverage = (data: any[], metric: MetricKey): number | null => {
const calculateAverage = (data: any[], metric: string): number | null => {
  if (!data || data.length === 0) return null;

  const validValues = data
    .map(item => item[metric])
    .filter(value => value != null && !isNaN(value) && isFinite(value));

  if (validValues.length === 0) return null;

  const sum = validValues.reduce((acc, value) => acc + value, 0);
  return Number((sum / validValues.length).toFixed(2));
};
