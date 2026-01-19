import { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginCredentials } from '@/shared/types';
import * as authService from '../services/authService';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useLocalStorage<{ accessToken: string; refreshToken: string } | null>('auth_tokens', null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    if (!tokens) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth check failed', error);
      // If profile check fails, we might still have valid refresh token logic in api interceptor
      // But if it fails completely, we should logout
      // However, api interceptor handles 401. 
      // This is for initial load.
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      if (response.success) {
        setTokens(response.data.tokens);
        setUser(response.data.user);
        toast.success(`Bienvenido, ${response.data.user.name}`);
      }
    } catch (error: any) {
      // Error handled by intersector/component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem('auth_tokens'); // Force remove just in case
    // Optionally call api.logout() but usually just clearing client state is enough for JWT
    // authService.logout().catch(console.error); 
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
