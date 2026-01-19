import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as salesService from '../services/salesService';
import { AdminSaleParams } from '../services/salesService';

export const useSales = (params: AdminSaleParams) => {
    return useQuery({
        queryKey: ['admin', 'sales', params],
        queryFn: () => salesService.getSales(params),
        placeholderData: keepPreviousData,
    });
};

export const useSale = (id: string) => {
    return useQuery({
        queryKey: ['admin', 'sale', id],
        queryFn: () => salesService.getSaleById(id),
        enabled: !!id,
    });
};
