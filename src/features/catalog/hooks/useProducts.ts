import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as catalogService from '../services/catalogService';
import { ProductParams } from '../services/catalogService';

export const useProducts = (params: ProductParams) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => catalogService.getProducts(params),
        placeholderData: keepPreviousData,
    });
};
