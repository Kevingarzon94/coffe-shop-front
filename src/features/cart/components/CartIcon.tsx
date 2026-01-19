import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { cn } from '@/shared/utils/cn';

interface CartIconProps {
    className?: string;
}

export function CartIcon({ className }: CartIconProps) {
    const { getTotalItems, toggleCart } = useCartStore();
    const count = getTotalItems();

    return (
        <button
            onClick={toggleCart}
            className={cn("relative p-2 text-gray-600 hover:text-coffee-600 transition-colors", className)}
        >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coffee-600 text-xs font-bold text-white shadow-sm animate-in zoom-in">
                    {count}
                </span>
            )}
        </button>
    );
}
