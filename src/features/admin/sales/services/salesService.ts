import api from '@/shared/services/api';
import { ApiResponse, Sale, SaleItem, PaginatedResponse } from '@/shared/types';

export interface AdminSaleParams {
    page?: number;
    limit?: number;
    customerName?: string;
    startDate?: string;
    endDate?: string;
}

export const getSales = async (params?: AdminSaleParams): Promise<PaginatedResponse<Sale>> => {
    const response = await api.get('/admin/sales', { params });
    return response.data;
};

export const getSaleById = async (id: string): Promise<ApiResponse<Sale & { items: SaleItem[] }>> => {
    const response = await api.get(`/admin/sales/${id}`);
    return response.data;
};
