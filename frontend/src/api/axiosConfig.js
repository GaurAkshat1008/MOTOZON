import axios from 'axios';

const api = axios.create({
  baseURL: '', // Empty string since we're using proxy
});

// Add token to headers if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;