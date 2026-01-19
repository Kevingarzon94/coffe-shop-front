import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useAdminProducts, useDeleteProduct } from '../hooks/useAdminProducts';
import { AdminPageHeader } from '@/shared/components/admin/AdminPageHeader';
import { DataTable, Column } from '@/shared/components/admin/DataTable';
import { Button, Input, Badge, Pagination } from '@/shared/components/ui';
import { Product } from '@/shared/types';
import { formatCurrency } from '@/shared/utils/format';
import { DeleteProductModal } from '../components/DeleteProductModal';
import { useDebounce } from '@/shared/hooks/useDebounce';

export function ProductsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const { data, isLoading } = useAdminProducts({
        page,
        limit: 10,
        search: debouncedSearch,
    });

    const deleteProductMutation = useDeleteProduct();

    const handleDelete = () => {
        if (productToDelete) {
            deleteProductMutation.mutate(productToDelete.id, {
                onSuccess: () => setProductToDelete(null),
            });
        }
    };

    const columns: Column<Product>[] = [
        {
            header: 'Producto',
            cell: (product) => (
                <div className="flex items-center gap-3">
                    <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=100&q=80'}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{product.name}</span>
                        <span className="text-xs text-gray-500 line-clamp-1">{product.description}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Precio',
            accessorKey: 'price',
            cell: (product) => formatCurrency(product.price),
        },
        {
            header: 'Stock',
            accessorKey: 'stock',
            cell: (product) => (
                <Badge variant={product.stock < 5 ? 'danger' : product.stock < 20 ? 'warning' : 'success'}>
                    {product.stock} u.
                </Badge>
            )
        },
        {
            header: 'Acciones',
            cell: (product) => (
                <div className="flex items-center gap-2">
                    <Link to={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4 text-gray-500" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => setProductToDelete(product)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div>
            <AdminPageHeader
                title="Productos"
                description="Gestiona el catálogo de productos."
                actions={
                    <Link to="/admin/products/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Producto
                        </Button>
                    </Link>
                }
            />

            <div className="mb-6 flex gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Buscar producto..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                emptyMessage={search ? "No se encontraron productos con esa búsqueda" : "No hay productos registrados"}
            />

            {data && data.meta.lastPage > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={data.meta.page}
                        totalPages={data.meta.lastPage}
                        onPageChange={setPage}
                    />
                </div>
            )}

            <DeleteProductModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleDelete}
                productName={productToDelete?.name || ''}
                isLoading={deleteProductMutation.isPending}
            />
        </div>
    );
}
