import { useState } from 'react';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { Product } from '@/shared/types';
import { Modal, Button, Badge } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils/format';
import { useCartStore } from '@/features/cart/store/cartStore';

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    if (!product) return null;

    const handleAddToCart = () => {
        addItem(product, quantity);
        setQuantity(1);
        onClose();
    };

    const isOutOfStock = product.stock === 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Image Status */}
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80'}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                    {isOutOfStock && (
                        <div className="absolute top-4 right-4">
                            <Badge variant="danger" className="text-sm px-3 py-1">Agotado</Badge>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    <p className="mt-2 text-3xl font-bold text-coffee-600">
                        {formatCurrency(product.price)}
                    </p>

                    <div className="mt-6 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">Descripción</h4>
                        <p className="mt-2 text-base text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-700">Cantidad</span>
                            <div className="flex items-center space-x-3">
                                <button
                                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1 || isOutOfStock}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button
                                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock || isOutOfStock}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            {isOutOfStock ? 'Agotado' : 'Agregar al Pedido'}
                        </Button>

                        {!isOutOfStock && (
                            <p className="mt-2 text-center text-xs text-gray-500">
                                {product.stock} unidades disponibles
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
