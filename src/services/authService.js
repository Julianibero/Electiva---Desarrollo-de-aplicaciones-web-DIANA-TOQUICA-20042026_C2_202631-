// src/services/authService.js
import api from '../api/axiosInstance';

export const loginRequest  = (credentials) => api.post('/auth/login', credentials);
export const logoutRequest = ()             => api.post('/auth/logout');
