// src/services/compareService.ts

import apiClient from './api';
import { Data } from '@/store/UseDataStore';
import { format, parse } from 'date-fns';

// Estructura de la respuesta de la API
interface SensorReading {
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

interface ApiResponse {
  success: boolean;
  data: Record<string, SensorReading>;
}

interface CompareDataParams {
  dateFirst: string;  // formato: dd/MM/yy
  dateSecond: string; // formato: dd/MM/yy
}

/**
 * Transforma los datos de la API al formato esperado por la UI
 */
const transformSensorData = (apiData: Record<string, SensorReading>): Data[] => {
  return Object.entries(apiData).map(([id, reading]) => ({
    id,
    temperature: reading.dht.temperatura,
    humidity: reading.dht.humedad,
    pm2: reading.pm.pm1_0,
    pm2_5: reading.pm.pm2_5,
    pm10: reading.pm.pm10,
    co2: reading.co2,
    co: reading.co,
    tvoc: reading.tvoc,
    date: format(new Date(reading.timestamp), 'dd/MM/yy'),
    hour: reading.hour,
    timestamp: reading.timestamp,
  }));
};

/**
 * Convierte formato dd/MM/yy a yyyy-MM-dd para la API
 */
export const formatDateForApi = (dateString: string): string => {
  const date = parse(dateString, 'dd/MM/yy', new Date());
  return format(date, 'yyyy-MM-dd');
};

export const compareService = {
  /**
   * Obtiene datos de sensores para dos fechas específicas
   */
  getCompareData: async (params: CompareDataParams): Promise<Data[]> => {
    try {
      const fromDate = formatDateForApi(params.dateFirst);
      const toDate = formatDateForApi(params.dateSecond);

      const response = await apiClient.get<ApiResponse>('/sensor/range', {
        params: {
          from: fromDate,
          to: toDate,
        },
      });

      if (!response.success) {
        throw new Error('Error al obtener datos del sensor');
      }

      if (!response.data) {
        throw new Error('No hay datos en esas fechas');
      }

      return transformSensorData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de comparación:', error);
      throw error;
    }
  },

  /**
   * Obtiene datos de un rango de fechas específico
   */

  getDataForExportExcel: async (
    startDate: string,
    endDate: string
  ): Promise<Data[]> => {
    try {
      const response = await apiClient.get<ApiResponse>('/sensor/export-to-excel', {
        params: {
          from: startDate,
          to: endDate,
        },
      });

      if (!response.success) {
        throw new Error('Error al obtener datos del sensor');
      }

      if (!response.data) {
        throw new Error('No hay datos en esas fechas');
      }

      return transformSensorData(response.data);
    } catch (error) {
      console.error('Error al obtener datos por rango de fechas:', error);
      throw error;
    }
  },

  /**
   * Obtiene datos de fechas especificas
   */
  getDataBySpecificDate: async (params: CompareDataParams): Promise<Data[]> => {
    try {
      const fromDate = formatDateForApi(params.dateFirst);
      const toDate = formatDateForApi(params.dateSecond);

      const response = await apiClient.get<ApiResponse>('/sensor/specificdates', {
        params: {
          from: fromDate,
          to: toDate,
        },
      });

      if (!response.success) {
        throw new Error('Error al obtener datos del sensor');
      }

      if (!response.data) {
        throw new Error('No hay datos en esas fechas');
      }

      return transformSensorData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de comparación:', error);
      throw error;
    }
  },

  /**
   * Filtra datos por fecha específica
   */
  filterDataByDate: (data: Data[], targetDate: string): Data[] => {
    return data.filter(item => item.date === targetDate);
  },
};

export default compareService;
