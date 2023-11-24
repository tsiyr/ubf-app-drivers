// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState(null);

  const login = (userData, currency) => {
    // Perform authentication logic, e.g., API calls
    setUser(userData);
    setCurrency(currency);
  };

  const logout = () => {
    // Perform logout logic, e.g., clearing tokens
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ setUser, user, currency, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
