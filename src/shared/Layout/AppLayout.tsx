import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/sonner';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDataStore } from '@/store/UseDataStore';

const API_BASE = "https://nest-iot-server.onrender.com"

const socket = io(API_BASE);


const AppLayout = () => {
    const { addData } = useDataStore()
    useEffect(() => {

        socket.on('connect', () => {
            console.log("socket conectado")
        });

        socket.on('disconnect', () => {
            console.log("socket desconectado")
        });

        const handler = (data: any) => {
            console.log(data)
            const transformedData = {
                temperature: data.dht.temperatura,
                humidity: data.dht.humedad,
                pm2: data.pm.pm1_0,
                pm2_5: data.pm.pm2_5,
                pm10: data.pm.pm10,
                co2: data.co2,
                co: data.co,
                date: new Date(data.timestamp).toLocaleDateString("es-PE"),
                hour: data.hour,
            };
            addData(transformedData);
        };

        socket.on("new-measurement", handler);

        return () => {
            socket.off("new-measurement", handler); // limpiar socket al desmontar
        };
    }, []);

    return (
        <div className='bg-gray-50'>
            <Header></Header>
            <Outlet />
            <Toaster></Toaster>
        </div>
    );
};

export default AppLayout;