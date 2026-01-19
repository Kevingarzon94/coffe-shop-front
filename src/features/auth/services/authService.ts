import api from '@/shared/services/api';
import { AuthTokens, LoginCredentials, User, ApiResponse } from '@/shared/types';

export const login = async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const refreshToken = async (token: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
  const response = await api.post('/auth/refresh', { refreshToken: token });
  return response.data;
};
