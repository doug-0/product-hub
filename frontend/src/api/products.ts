import type { Product } from '@/types/Product';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const getProducts = () => api.get<Product[]>('/products');

export const createProduct = (data: Omit<Product, 'id'>) =>
  api.post<Product>('/products', data);