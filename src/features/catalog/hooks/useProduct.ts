import { useQuery } from '@tanstack/react-query';
import * as catalogService from '../services/catalogService';

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => catalogService.getProductById(id),
        enabled: !!id,
    });
};
