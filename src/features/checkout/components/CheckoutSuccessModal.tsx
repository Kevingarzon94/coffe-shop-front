import { CheckCircle, ArrowRight } from 'lucide-react';
import { Modal, Button } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/utils/format';
import { Link } from 'react-router-dom';

interface CheckoutSuccessModalProps {
    isOpen: boolean;
    orderId: string;
    total: number;
    email: string;
}

export function CheckoutSuccessModal({ isOpen, orderId, total, email }: CheckoutSuccessModalProps) {
    // Prevent closing by clicking outside or escape to ensure they read it
    const handleClose = () => { };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">¡Gracias por tu compra!</h2>
                <p className="mt-2 text-gray-600">
                    Hemos recibido tu pedido correctamente.
                </p>

                <div className="mt-6 w-full rounded-lg bg-gray-50 p-4 text-left text-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">N° de Orden:</span>
                        <span className="font-mono font-medium text-gray-900">{orderId}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Total pagado:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium text-gray-900">{email}</span>
                    </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                    Te hemos enviado un correo de confirmación con los detalles.
                </p>

                <Link to="/" className="mt-8 w-full">
                    <Button className="w-full">
                        Volver al Menú <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </Modal>
    );
}
