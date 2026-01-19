import api from '@/shared/services/api';
import { ApiResponse, Product, PaginatedResponse, CreateProductData, UpdateProductData } from '@/shared/types';
import { createFormData } from '@/shared/services/api';

export interface AdminProductParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const getProducts = async (params?: AdminProductParams): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (data: CreateProductData): Promise<ApiResponse<Product>> => {
    const formData = createFormData(data);
    const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateProduct = async (id: string, data: UpdateProductData): Promise<ApiResponse<Product>> => {
    const formData = createFormData(data);
    const response = await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteProduct = async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};
