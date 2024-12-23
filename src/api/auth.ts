
import axios from 'axios';
import type { LoginCredentials, LoginResponse } from '../types/auth';

const API_URL = 'https://api.radio.audace.ovh';

/**
 * Appelle l'API pour authentifier l'utilisateur
 * @param credentials - Identifiants de l'utilisateur
 * @returns Réponse de l'API contenant le token
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/login`,
    new URLSearchParams(credentials),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data;
};
