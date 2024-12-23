
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { login as loginApi } from '../api/auth';
import type { LoginCredentials } from '../types/auth';

/**
 * Hook personnalisé pour gérer l'authentification
 * Fournit les fonctions et états nécessaires pour la connexion
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  /**
   * Fonction de connexion
   * @param credentials - Identifiants de l'utilisateur
   * @returns true si la connexion est réussie, false sinon
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      const response = await loginApi(credentials);
      
      setToken(response.access_token);
      setUser({
        id: '1', // À remplacer par l'ID réel de l'utilisateur
        username: credentials.username,
      });
      
      return true;
    } catch (err) {
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
