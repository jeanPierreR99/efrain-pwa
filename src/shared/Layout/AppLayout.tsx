import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/sonner';
import { useDataStoreMonitoring } from '@/store/UseDataStoreMonitoring';
import { monitoringService } from '@/services/monitoringService';
import { useEffect } from 'react';

const AppLayout = () => {

  const { setLoading, setMonitoringData, isLoading } = useDataStoreMonitoring();

  const fetchMonitoringData = async (date: string) => {
    setLoading(true);
    try {
      const data: any = await monitoringService.getMonitoringData(date);
      setMonitoringData(data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchMonitoringData('2025-09-23');
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-900"></div>
            <span className="font-medium">Estableciendo conexión...</span>
          </div>
        </div>
      )}
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AppLayout;
