// SharedDataContext.js
import { createContext, useContext, useState } from 'react';

const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
  const [someData, setSomeData] = useState('');

  const updateData = (newData) => {
    setSomeData(newData);
  };

  return (
    <SharedDataContext.Provider value={{ someData, updateData }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  return useContext(SharedDataContext);
};
