import axios from 'axios';
import type { Invoice, CreateInvoiceDTO } from '../types/invoice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const invoiceApi = {
  getAll: async (): Promise<Invoice[]> => {
    const response = await apiClient.get<Invoice[]>('/Invoice');
    return response.data;
  },

  getById: async (id: number): Promise<Invoice> => {
    const response = await apiClient.get<Invoice>(`/Invoice/${id}`);
    return response.data;
  },

  create: async (dto: CreateInvoiceDTO): Promise<Invoice> => {
    const response = await apiClient.post<Invoice>('/Invoice', dto);
    return response.data;
  },
};
