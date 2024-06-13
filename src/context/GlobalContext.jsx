import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [device, setDevice] = useState('');

  return (
    <GlobalContext.Provider value={{device, setDevice }}>
      {children}
    </GlobalContext.Provider>
  );
}

