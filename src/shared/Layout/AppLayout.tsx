import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/sonner';

const AppLayout = () => {
  return (
    <div className='bg-gray-50'>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AppLayout;
