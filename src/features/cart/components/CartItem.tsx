import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as ICartItem } from '@/shared/types';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '@/shared/utils/format';

interface CartItemProps {
    item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();
    const { product, quantity } = item;

    return (
        <div className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=100&q=80'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <span className="font-medium text-gray-900">{product.name}</span>
                <span className="text-sm text-gray-500">{formatCurrency(product.price)}</span>
            </div>

            <div className="flex items-center space-x-2">
                <div className="flex items-center rounded-md border border-gray-200">
                    <button
                        className="p-1 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                        className="p-1 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                    >
                        <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                </div>

                <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
