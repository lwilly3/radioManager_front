
import axios from 'axios';
import type { LoginCredentials, LoginResponse } from '../../types/auth';

const API_URL = 'https://api.radio.audace.ovh';

/**
 * Handles user authentication with the backend API
 */
export const authApi = {
  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  },
};
