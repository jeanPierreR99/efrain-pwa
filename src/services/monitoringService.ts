import apiClient from './api';

type Measurement = {
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
};

type DateData = {
  date: string;
  data: {
    [key: string]: Measurement;
  };
};

type MonitoringData = {
  mainDate: DateData;
  oneDayAgo: DateData;
  oneWeekAgo: DateData;
};

type MonitoringResponse = {
  success: boolean;
  data: MonitoringData;
};

export const monitoringService = {
  async getMonitoringData(date: string) {
    const res = await apiClient.get<MonitoringResponse>(`/sensor/specificdate-monitoring?date=${date}`);

    if (!res.success) {
      throw new Error('Error fetching monitoring data');
    }

    return res.data;
  }
};
