import { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';
import { Button, EmptyState } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils/format';
import { cn } from '@/shared/utils/cn';

export function CartSidebar() {
    const { isOpen, setIsOpen, items, getSubtotal, getTax, getTotalPrice } = useCartStore();
    const navigate = useNavigate();

    // Close on route change
    useEffect(() => {
        return () => setIsOpen(false);
    }, [location.pathname]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h2 className="text-lg font-semibold text-gray-900">Tu Carrito ({items.length})</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col justify-center">
                            <EmptyState
                                icon={ShoppingBag}
                                title="El carrito está vacío"
                                description="Parece que aún no has agregado productos a tu pedido."
                                action={
                                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                                        Volver al Menú
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {items.map((item) => (
                                <CartItem key={item.product.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t bg-gray-50 px-4 py-6">
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatCurrency(getSubtotal())}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>IVA (19%)</span>
                                <span>{formatCurrency(getTax())}</span>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t">
                                <span>Total</span>
                                <span>{formatCurrency(getTotalPrice())}</span>
                            </div>
                        </div>
                        <Button className="mt-6 w-full" onClick={handleCheckout}>
                            Ir a Pagar
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
