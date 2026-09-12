import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const currentUser = await getCurrentUser();
        if (mounted) setUser(currentUser);
      } catch (error) {
        console.error('Auth session error:', error);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSession();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
