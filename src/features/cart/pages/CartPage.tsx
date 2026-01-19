import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/CartItem';
import { Button, EmptyState } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils/format';

export function CartPage() {
  const { items, getSubtotal, getTax, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Tu carrito está vacío"
        description="Explora nuestro menú y agrega productos deliciosos."
        action={
          <Link to="/">
            <Button>Ver Menú</Button>
          </Link>
        }
        className="mt-12"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Item List */}
      <div className="lg:col-span-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Tu Pedido</h2>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              Vaciar Carrito
            </Button>
          </div>

          <div className="flex flex-col">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4">
        <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Resumen de Compra</h2>

          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(getSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (19%)</span>
              <span>{formatCurrency(getTax())}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(getTotalPrice())}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
              Ir a Pagar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/" className="block">
              <Button variant="secondary" className="w-full">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
