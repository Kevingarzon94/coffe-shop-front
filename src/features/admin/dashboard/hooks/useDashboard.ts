import { useQuery } from '@tanstack/react-query';
import * as dashboardService from '../services/dashboardService';

export const useDashboardSummary = () => {
    return useQuery({
        queryKey: ['admin', 'dashboard', 'summary'],
        queryFn: dashboardService.getSummary,
    });
};

export const useTopProducts = (limit = 5) => {
    return useQuery({
        queryKey: ['admin', 'dashboard', 'top-products', limit],
        queryFn: () => dashboardService.getTopProducts(limit),
    });
};

export const useTopCustomers = (limit = 5) => {
    return useQuery({
        queryKey: ['admin', 'dashboard', 'top-customers', limit],
        queryFn: () => dashboardService.getTopCustomers(limit),
    });
};

export const useLowStockProducts = () => {
    return useQuery({
        queryKey: ['admin', 'dashboard', 'low-stock'],
        queryFn: dashboardService.getLowStockProducts,
    });
};

export const useSalesChart = (days = 30) => {
    return useQuery({
        queryKey: ['admin', 'dashboard', 'sales-chart', days],
        queryFn: () => dashboardService.getSalesChart(days),
    });
};
