import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/features/cart/store/cartStore';
import { createSale } from '../services/checkoutService';
import { CheckoutForm } from '../components/CheckoutForm';
import { OrderSummary } from '../components/OrderSummary';
import { CheckoutSuccessModal } from '../components/CheckoutSuccessModal';
import { Button } from '@/shared/components/ui';
import { isValidEmail } from '@/shared/utils/validation';
import toast from 'react-hot-toast';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; total: number } | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    paymentMethod: 'cash' as 'cash' | 'card' | 'transfer',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !successData) {
      navigate('/cart');
    }
  }, [items, navigate, successData]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.firstName) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName) newErrors.lastName = 'Los apellidos son obligatorios';
    if (!formData.email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createSale({
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        })),
        paymentMethod: formData.paymentMethod,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }
      });

      if (response.success) {
        setSuccessData({
          id: response.data.saleId,
          total: response.data.total
        });
        clearCart();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al procesar el pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  if (items.length === 0 && !successData) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <h1 className="mb-8 text-3xl font-bold text-coffee-900">Finalizar Compra</h1>
      </div>

      {/* Form */}
      <div className="lg:col-span-8">
        <CheckoutForm
          data={formData}
          onChange={handleChange}
          errors={errors}
        />

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            Confirmar Pedido
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-4">
        <div className="sticky top-24">
          <OrderSummary />
        </div>
      </div>

      <CheckoutSuccessModal
        isOpen={!!successData}
        orderId={successData?.id || ''}
        total={successData?.total || 0}
        email={formData.email}
      />
    </div>
  );
}
