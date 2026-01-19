import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import * as productService from '../services/productService';
import { AdminProductParams } from '../services/productService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useAdminProducts = (params: AdminProductParams) => {
    return useQuery({
        queryKey: ['admin', 'products', params],
        queryFn: () => productService.getProducts(params),
        placeholderData: keepPreviousData,
    });
};

export const useAdminProduct = (id: string) => {
    return useQuery({
        queryKey: ['admin', 'product', id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: productService.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            toast.success('Producto creado exitosamente');
            navigate('/admin/products');
        },
        onError: (error: any) => {
            console.error('Error creating product:', error);
            if (error.response) {
                console.error('Response data:', JSON.stringify(error.response.data, null, 2));
                console.error('Response status:', error.response.status);
            }
            toast.error(error.response?.data?.message || 'Error al crear producto');
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => productService.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            toast.success('Producto actualizado exitosamente');
            navigate('/admin/products');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Error al actualizar producto');
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            toast.success('Producto eliminado exitosamente');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Error al eliminar producto');
        },
    });
};
