import { Input } from '@/shared/components/ui';

interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    paymentMethod: 'cash' | 'card' | 'transfer';
}

interface CheckoutFormProps {
    data: CheckoutFormData;
    onChange: (key: keyof CheckoutFormData, value: string) => void;
    errors: Partial<Record<keyof CheckoutFormData, string>>;
}

export function CheckoutForm({ data, onChange, errors }: CheckoutFormProps) {
    return (
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Información de Contacto</h2>

            <div className="grid gap-6 sm:grid-cols-2">
                <Input
                    label="Nombre"
                    value={data.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    error={errors.firstName}
                    required
                />
                <Input
                    label="Apellidos"
                    value={data.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    error={errors.lastName}
                    required
                />
            </div>

            <Input
                label="Correo Electrónico"
                type="email"
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
                error={errors.email}
                required
                placeholder="ejemplo@correo.com"
            />

            <Input
                label="Dirección de envío (Opcional)"
                value={data.address}
                onChange={(e) => onChange('address', e.target.value)}
            />

            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                <div className="grid grid-cols-3 gap-3">
                    {['cash', 'card', 'transfer'].map((method) => (
                        <button
                            key={method}
                            type="button"
                            className={`flex items-center justify-center rounded-md border py-3 text-sm font-medium capitalize transition-all
                     ${data.paymentMethod === method
                                    ? 'border-coffee-600 bg-coffee-50 text-coffee-700 ring-1 ring-coffee-600'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                }
                  `}
                            onClick={() => onChange('paymentMethod', method as any)}
                        >
                            {method === 'cash' ? 'Efectivo' : method === 'card' ? 'Tarjeta' : 'Transferencia'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
