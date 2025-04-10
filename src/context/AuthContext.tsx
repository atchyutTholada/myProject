import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(storedAuthState === 'true');
    };
    loadAuthState();
  }, []);

  const login = async () => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem('isAuthenticated', 'true');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);