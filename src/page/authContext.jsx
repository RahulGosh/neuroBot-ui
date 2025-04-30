import { createContext, useContext, useEffect, useState } from 'react';
import { fakeAuth } from '../services/fakeAuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const user = fakeAuth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const result = await fakeAuth.login(email, password);
    if (result.success) {
      setUser(fakeAuth.getUser());
    }
    return result;
  };

  const logout = () => {
    fakeAuth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);