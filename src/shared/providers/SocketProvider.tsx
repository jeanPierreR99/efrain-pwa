import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDataStore } from '@/store/UseDataStore';
import { useSocketStore } from '@/store/UseSocketStore';
import {
  CheckCircle2,
  CircleAlert
} from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from '@/services/api';


interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe ser usado dentro de SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { addData } = useDataStore();
  const { setConnected } = useSocketStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Crear socket solo una vez
    if (!socketRef.current) {
      console.log('🔌 Iniciando conexión de socket...');
      socketRef.current = io(API_BASE_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
      });
    }

    const socket = socketRef.current;

    // Handler de conexión
    const onConnect = () => {
      console.log('✅ Socket conectado:', socket.id);
      setConnected(true);

      toast.info("¡Conectado en tiempo Real!", {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });
    };

    // Handler de desconexión
    const onDisconnect = (reason: string) => {
      console.log('❌ Socket desconectado. Razón:', reason);
      setConnected(false);
      toast.info("¡Se desconecto del server!", {
        icon: <CircleAlert className="h-5 w-5 text-yellow-500" />,
      });
    };

    // Handler de error
    const onError = (error: Error) => {
      console.error('⚠️ Error en socket:', error);
    };

    // Handler de datos
    const onNewMeasurement = (data: any) => {

      try {
        const transformedData = {
          temperature: data.dht.temperatura,
          humidity: data.dht.humedad,
          pm2: data.pm.pm1_0,
          pm2_5: data.pm.pm2_5,
          pm10: data.pm.pm10,
          co2: data.co2,
          co: data.co,
          tvoc: data.tvoc,
          date: new Date(data.timestamp).toLocaleDateString("es-PE"),
          hour: data.hour,
        };

        addData(transformedData);
      } catch (error) {
        console.error('❌ Error al transformar datos:', error);
      }
    };

    // Registrar eventos
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    socket.on('new-measurement', onNewMeasurement);

    // Log de todos los eventos para debug
    socket.onAny((eventName, ...args) => {
      console.log('📡 Evento recibido:', eventName, args);
    });

    // Cleanup
    return () => {
      console.log('🧹 Limpiando listeners...');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('new-measurement', onNewMeasurement);
      socket.offAny();
    };
  }, [ setConnected]);

  // Desconectar al desmontar el componente
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log('🔌 Desconectando socket completamente...');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
