import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content container page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
