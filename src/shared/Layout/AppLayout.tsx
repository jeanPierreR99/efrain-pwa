import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/sonner';

const AppLayout = () => {
    return (
        <div className='bg-gray-50'>
            <Header></Header>
            <Outlet />
            <Toaster></Toaster>
        </div>
    );
};

export default AppLayout;