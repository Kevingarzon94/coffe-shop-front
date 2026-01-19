import api from '@/shared/services/api';
import { ApiResponse, PaginatedResponse, Product } from '@/shared/types';

export interface ProductParams {
    page?: number;
    limit?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const getProducts = async (params?: ProductParams): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
