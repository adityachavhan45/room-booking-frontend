import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setIsAuthenticated(true);
      setUser({ name: userName });
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userName', name);
    setIsAuthenticated(true);
    setUser({ name });
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
