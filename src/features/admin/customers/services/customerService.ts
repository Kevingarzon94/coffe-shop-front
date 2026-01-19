import api from '@/shared/services/api';
import { ApiResponse, Customer, Sale, PaginatedResponse } from '@/shared/types';

export interface AdminCustomerParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const getCustomers = async (params?: AdminCustomerParams): Promise<PaginatedResponse<Customer>> => {
    const response = await api.get('/admin/customers', { params });
    return response.data;
};

export const getCustomerById = async (id: string): Promise<ApiResponse<Customer & { purchases: Sale[] }>> => {
    const response = await api.get(`/admin/customers/${id}`);
    return response.data;
};
