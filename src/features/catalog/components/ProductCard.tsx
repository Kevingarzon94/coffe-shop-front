import { ShoppingBag } from 'lucide-react';
import { Product } from '@/shared/types';
import { Button, Badge } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils/format';
import { useCartStore } from '@/features/cart/store/cartStore';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(product);
    };

    const isOutOfStock = product.stock === 0;

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
            onClick={onClick}
        >
            <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isOutOfStock && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="danger">Agotado</Badge>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-coffee-600 transition-colors">
                    {product.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                    </span>
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className="shrink-0"
                    >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Agregar
                    </Button>
                </div>
            </div>
        </div>
    );
}
