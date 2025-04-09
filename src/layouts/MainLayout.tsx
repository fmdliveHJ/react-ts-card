import { Outlet } from 'react-router-dom';
import Header from '@/components/global/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
