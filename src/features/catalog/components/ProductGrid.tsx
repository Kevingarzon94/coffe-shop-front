import { Product } from '@/shared/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/shared/components/ui';
import { Coffee } from 'lucide-react';

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
    onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, isLoading, onProductClick }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <EmptyState
                icon={Coffee}
                title="No se encontraron productos"
                description="Intenta ajustar los filtros de búsqueda."
                className="py-12"
            />
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onProductClick(product)}
                />
            ))}
        </div>
    );
}
