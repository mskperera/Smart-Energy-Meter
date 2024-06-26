import React, { createContext, useContext, useState } from 'react';

const SessionDateContext = createContext();

export const useSessionDate = () => useContext(SessionDateContext);

export const SessionDateProvider = ({ children }) => {
  const [sessionDate, setSessionDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');

  return (
    <SessionDateContext.Provider value={{ sessionDate, setSessionDate, numberOfDays, setNumberOfDays }}>
      {children}
    </SessionDateContext.Provider>
  );
};
