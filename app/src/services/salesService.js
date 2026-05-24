// src/services/salesService.js
import api from '../api/axiosInstance';

export const getSales    = (params) => api.get('/sales', { params });
export const createSale  = (data)   => api.post('/sales', data);
export const getSaleById = (id)     => api.get(`/sales/${id}`);
