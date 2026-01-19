import api from '@/shared/services/api';
import { ApiResponse, CreateSaleData } from '@/shared/types';

export const createSale = async (data: CreateSaleData): Promise<ApiResponse<{ saleId: string; customerId: string; total: number }>> => {
    const response = await api.post('/sales', data);
    return response.data;
};
