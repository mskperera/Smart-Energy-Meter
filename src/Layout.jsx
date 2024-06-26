import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = [
    '/',
    /^\/deviceregister\/.*$/,
    /^\/userregister\/.*$/
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    typeof route === 'string' ? location.pathname === route : route.test(location.pathname)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
