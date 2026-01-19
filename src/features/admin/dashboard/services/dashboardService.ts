import api from '@/shared/services/api';
import { ApiResponse, DashboardSummary, TopProduct, TopCustomer, LowStockProduct, SalesChartData } from '@/shared/types';

export const getSummary = async (): Promise<ApiResponse<DashboardSummary>> => {
    const response = await api.get('/admin/dashboard/summary');
    return response.data;
};

export const getTopProducts = async (limit = 5): Promise<ApiResponse<TopProduct[]>> => {
    const response = await api.get('/admin/dashboard/top-products', { params: { limit } });
    return response.data;
};

export const getTopCustomers = async (limit = 5): Promise<ApiResponse<TopCustomer[]>> => {
    const response = await api.get('/admin/dashboard/top-customers', { params: { limit } });
    return response.data;
};

export const getLowStockProducts = async (): Promise<ApiResponse<LowStockProduct[]>> => {
    const response = await api.get('/admin/dashboard/low-stock');
    return response.data;
};

export const getSalesChart = async (days = 30): Promise<ApiResponse<SalesChartData[]>> => {
    const response = await api.get('/admin/dashboard/sales-chart', { params: { days } });
    return response.data;
};
