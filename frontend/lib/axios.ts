import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: any) => {
    if (true) {
      const token = getCookie('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("mmmmmmmmmmmmmil gya");
        
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   deleteCookie('authToken');
    //   deleteCookie('user');
    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/login';
    //   }
    // }
    return Promise.reject(error);
  }
);

export default apiClient;