import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';


const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/'];


  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
