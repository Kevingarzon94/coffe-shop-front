import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as customerService from '../services/customerService';
import { AdminCustomerParams } from '../services/customerService';

export const useCustomers = (params: AdminCustomerParams) => {
    return useQuery({
        queryKey: ['admin', 'customers', params],
        queryFn: () => customerService.getCustomers(params),
        placeholderData: keepPreviousData,
    });
};

export const useCustomer = (id: string) => {
    return useQuery({
        queryKey: ['admin', 'customer', id],
        queryFn: () => customerService.getCustomerById(id),
        enabled: !!id,
    });
};
