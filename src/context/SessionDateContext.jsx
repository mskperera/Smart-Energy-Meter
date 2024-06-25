import React, { createContext, useState, useContext } from 'react';

const SessionDateContext = createContext();

export const useSessionDate = () => useContext(SessionDateContext);

export const SessionDateProvider = ({ children }) => {
  const [sessionDate, setSessionDate] = useState('24 Jun 2024'); 

  return (
    <SessionDateContext.Provider value={{ sessionDate, setSessionDate }}>
      {children}
    </SessionDateContext.Provider>
  );
};
