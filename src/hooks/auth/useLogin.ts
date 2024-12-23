
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { authApi } from '../../api/auth/authApi';
import type { LoginCredentials } from '../../types/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response = await authApi.login(credentials);
      
      // Store auth data
      setToken(response.access_token);
      setUser({
        id: '1', // This should come from a decoded token or user info endpoint
        username: credentials.username,
      });

      // Redirect to dashboard
      navigate('/');
      
      return true;
    } catch (err: any) {
      setError(
        err.response?.status === 401
          ? 'Nom d\'utilisateur ou mot de passe incorrect'
          : 'Une erreur est survenue, veuillez réessayer'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};