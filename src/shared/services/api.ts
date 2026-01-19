import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { AuthTokens } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const tokensString = localStorage.getItem('auth_tokens');
    if (tokensString) {
      // console.log('Found tokens in storage');
      try {
        const tokens: AuthTokens = JSON.parse(tokensString);
        if (tokens.accessToken) {
          console.log('Attaching Access Token to request:', config.url);
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
      } catch (error) {
        console.warn('Invalid auth token in storage, clearing...');
        localStorage.removeItem('auth_tokens');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/refresh') || originalRequest.url?.includes('/auth/login')) {
        // If refresh or login fails, reject
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokensString = localStorage.getItem('auth_tokens');
        if (!tokensString) throw new Error('No tokens');

        let tokens: AuthTokens;
        try {
          tokens = JSON.parse(tokensString);
        } catch (e) {
          localStorage.removeItem('auth_tokens');
          throw new Error('Invalid tokens');
        }
        // Direct call using absolute URL or separate instance to avoid interceptor loop
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: tokens.refreshToken
        });

        const { accessToken, refreshToken } = response.data.data;

        localStorage.setItem('auth_tokens', JSON.stringify({ accessToken, refreshToken }));

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed:', err);
        processQueue(err, null);
        localStorage.removeItem('auth_tokens');
        localStorage.removeItem('user_data');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Generic error handling
    if (!originalRequest?.url?.includes('/auth/me')) { // Don't toast on silent checks
      const message = (error.response?.data as any)?.message || 'Something went wrong';
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export const createFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Debug FormData
  // console.log('FormData created for keys:', Array.from((formData as any).keys()));

  return formData;
};

export default api;
