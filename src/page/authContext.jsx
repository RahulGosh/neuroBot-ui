import { createContext, useContext, useEffect, useState } from 'react';
import { fakeAuth } from '../services/fakeAuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add this function to synchronize auth state
  const syncAuthState = () => {
    const currentUser = fakeAuth.getUser();
    setUser(currentUser);
    return currentUser;
  };

  useEffect(() => {
    // Initial auth check
    syncAuthState();
    setIsLoading(false);

    // Optional: Set up an interval to periodically check auth state
    // This can be useful if you expect auth state to change from other tabs
    const interval = setInterval(syncAuthState, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await fakeAuth.login(email, password);
      if (result.success) {
        setUser(syncAuthState()); // Use syncAuthState instead of direct getUser
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    try {
      fakeAuth.logout();
      setUser(syncAuthState()); // Use syncAuthState to ensure consistency
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout,
      syncAuthState // Expose this if components need to manually trigger sync
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);