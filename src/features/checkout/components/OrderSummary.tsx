import { useCartStore } from '@/features/cart/store/cartStore';
import { formatCurrency } from '@/shared/utils/format';

export function OrderSummary() {
    const { items, getSubtotal, getTax, getTotalPrice } = useCartStore();

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Resumen del Pedido</h2>

            <div className="mb-6 max-h-64 overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{item.product.name}</span>
                            <span className="text-gray-500">x {item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {formatCurrency(item.product.price * item.quantity)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-3 border-t pt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                    <span>IVA (19%)</span>
                    <span>{formatCurrency(getTax())}</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-base font-bold text-gray-900">
                    <span>Total a Pagar</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                </div>
            </div>
        </div>
    );
}
